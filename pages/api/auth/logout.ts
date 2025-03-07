const logout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    window.location.href = "/login"; // Redirect to login page
  };
  