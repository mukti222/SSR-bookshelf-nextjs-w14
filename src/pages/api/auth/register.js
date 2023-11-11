import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
require('dotenv').config();

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
}
