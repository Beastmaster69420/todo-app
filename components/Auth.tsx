"use client"; // Required for Next.js App Router

import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Box, Typography, Avatar } from "@mui/material";

const Auth = () => {
  const { data: session } = useSession();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
      {session ? (
        <>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={session.user?.image || ""} alt="User Avatar" />
            <Typography variant="body1">Hello, {session.user?.name}!</Typography>
          </Box>
          <Button variant="contained" color="secondary" onClick={() => signOut()}>
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
