import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { logout } from "../utils/auth";

const Navbar = () => {
  const router = useRouter();
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("token");

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          To-Do App
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
