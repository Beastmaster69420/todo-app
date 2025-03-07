export const logout = () => {
    localStorage.removeItem("token"); // Remove JWT token from localStorage
    window.location.href = "/login"; // Redirect to login page
  };
  