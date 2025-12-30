import { verifyToken } from '../lib/jwt';
import connectDB from '../lib/db';
import User from '../models/user';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectDB();

    const token = req.cookies?.token;
    if (!token)
      return res.status(401).json({ user: null });

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId)
      .select('-password');

    if (!user)
      return res.status(401).json({ user: null });

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(401).json({ user: null });
  }
}
