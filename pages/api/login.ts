import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { User } from '../../types/user';


const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', 
    name: 'Test User'
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT payload (exclude sensitive data like password)
  const payload: Partial<User> = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  // Sign the JWT
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
    { expiresIn: '1d' } 
  );

  res.status(200).json({ token, user: payload });
}