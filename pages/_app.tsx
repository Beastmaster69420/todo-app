import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { getUserFromToken } from "../utils/auth";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: any) {
  const [isJwtAuthenticated, setIsJwtAuthenticated] = useState(false);

  useEffect(() => {
    // Check for JWT authentication on app load
    const user = getUserFromToken();
    setIsJwtAuthenticated(!!user);

    // Setup listener for storage events to handle login/logout in other tabs
    const handleStorageChange = () => {
      const user = getUserFromToken();
      setIsJwtAuthenticated(!!user);
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} isJwtAuthenticated={isJwtAuthenticated} />
      </ThemeProvider>
    </SessionProvider>
  );
}