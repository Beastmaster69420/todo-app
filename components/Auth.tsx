"use client"; 

import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Box, Typography, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";

const Auth = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt_token");
    }
  
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
      {session ? (
        <>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={session.user?.image || ""} alt="User Avatar" />
            <Typography variant="body1">Hello, {session.user?.name}!</Typography>
          </Box>
          <Button variant="contained" color="error" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button variant="contained" color="error" onClick={() => signIn("google")}>
          Sign In with Google
        </Button>
      )}
    </Box>
  );
};

export default Auth;