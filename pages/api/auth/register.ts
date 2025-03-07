import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../../../data/users"; // Simulated user database

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; // Use environment variable

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user (replace with actual DB logic)
  const newUser = { id: Date.now(), email, password: hashedPassword };
  users.push(newUser);

  // Generate JWT
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: "1h" });

  res.status(201).json({ message: "User registered successfully", token });
}
