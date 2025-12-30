import connectDB from '../lib/db';
import User from '../models/user';
import { comparePassword } from '../lib/hash';
import { signToken } from '../lib/jwt';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await comparePassword(password, user.password);
    if (!ok)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ userId: user._id });

    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; SameSite=Lax; Secure`
    );

    return res.status(200).json({ message: 'Logged in' });
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
}
