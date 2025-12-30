import connectDB from './lib/db';
import User from './models/user';
import { hashPassword, comparePassword } from './lib/hash';
import { signToken, verifyToken } from './lib/jwt';

export default async function handler(req, res) {
  await connectDB();

  const { method, query } = req;
  const action = query.action;

  try {
    // REGISTER
    if (method === 'POST' && action === 'register') {
      const { name, email, password } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: 'User exists' });

      const user = await User.create({
        name,
        email,
        password: await hashPassword(password),
      });

      return res.status(201).json({ message: 'Registered' });
    }

    // LOGIN
    if (method === 'POST' && action === 'login') {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await comparePassword(password, user.password)))
        return res.status(401).json({ message: 'Invalid credentials' });

      const token = signToken({ userId: user._id });

      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; SameSite=Lax; Secure`
      );

      return res.json({ message: 'Logged in' });
    }

    // ME
    if (method === 'GET' && action === 'me') {
      const token = req.cookies?.token;
      if (!token) return res.status(401).json({ user: null });

      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId).select('-password');

      return res.json({ user });
    }

    // LOGOUT
    if (method === 'POST' && action === 'logout') {
      res.setHeader(
        'Set-Cookie',
        'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure'
      );
      return res.json({ message: 'Logged out' });
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
}
