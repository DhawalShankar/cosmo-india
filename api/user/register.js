import connectDB from '../lib/db';
import User from '../models/user';
import { hashPassword } from '../lib/hash';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Missing fields' });

  try {
    await connectDB();

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: 'User already exists' });

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return res.status(201).json({ message: 'Registered' });
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
}
