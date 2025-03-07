import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// NextAuth configuration
export default NextAuth({
  // Specify the authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
    }),
  ],

  // Add a custom secret key for encryption
  secret: process.env.NEXTAUTH_SECRET,  // This is a random string for session encryption

  // Custom URL paths (optional, only if you want to customize)
  pages: {
    signIn: "/auth/signin",  // You can customize the login page if needed
    error: "/auth/error",    // Optional: custom error page
    // Other pages can be added here if needed 
  },

  // Optionally, configure a session callback
  session: {
    strategy: "jwt", // Use JWT for session handling
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;  // Store the access token
      }
      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken; // Add the access token to the session
      return session;
    },
  },
});
