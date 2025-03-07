// utils/auth.ts
import { jwtDecode } from 'jwt-decode';
import { User } from '../types/user';

// Get JWT from localStorage
export const getJWTFromLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

// Decode JWT and return user information
export const getUserFromToken = (): Partial<User> | null => {
  const token = getJWTFromLocalStorage();
  
  if (!token) return null;
  
  try {
    // Decode the token to get user info
    const decoded = jwtDecode<Partial<User>>(token);
    
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      // Token is expired, clear it
      localStorage.removeItem('jwt_token');
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if user is authenticated (via JWT in localStorage)
export const isAuthenticated = (): boolean => {
  return getUserFromToken() !== null;
};

// Log out user (remove JWT from localStorage)
export const logoutUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
};

// Get authorization headers for API requests
export const getAuthHeaders = (): Record<string, string> => {
  const token = getJWTFromLocalStorage();
  return token ? { Authorization: `Bearer ${token}` } : {};
};