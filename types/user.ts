// types/user.ts
export interface User {
    id: number;
    email: string;
    name: string;
    // JWT specific fields
    iat?: number;  // Issued at timestamp
    exp?: number;  // Expiration timestamp
  }