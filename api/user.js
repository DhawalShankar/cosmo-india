import connectDB from './lib/db';
import User from './models/user';
import { hashPassword, comparePassword } from './lib/hash';
import { signToken, verifyToken } from './lib/jwt';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (e) {
    return res.status(500).json({ message: 'DB connection failed' });
  }

  const { method } = req;
  const action = req.query?.action;

  // ❗ action mandatory
  if (!action) {
    return res.status(400).json({ message: 'Action missing' });
  }

  try {
    /* ================= REGISTER ================= */
    if (method === 'POST' && action === 'register') {
      if (!req.body) {
        return res.status(400).json({ message: 'No body received' });
      }

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ message: 'User already exists' });
      }

      await User.create({
        name,
        email,
        password: await hashPassword(password),
      });

      return res.status(201).json({ message: 'Registered' });
    }

    /* ================= LOGIN ================= */
    if (method === 'POST' && action === 'login') {
      if (!req.body) {
        return res.status(400).json({ message: 'No body received' });
      }

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const ok = await comparePassword(password, user.password);
      if (!ok) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = signToken({ userId: user._id });

      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; SameSite=Lax; Secure`
      );

      return res.json({ message: 'Logged in' });
    }

    /* ================= ME ================= */
    if (method === 'GET' && action === 'me') {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).json({ user: null });
      }

      let decoded;
      try {
        decoded = verifyToken(token);
      } catch {
        return res.status(401).json({ user: null });
      }

      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ user: null });
      }

      return res.json({ user });
    }

    /* ================= LOGOUT ================= */
    if (method === 'POST' && action === 'logout') {
      res.setHeader(
        'Set-Cookie',
        'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure'
      );
      return res.json({ message: 'Logged out' });
    }

    /* ================= FALLBACK ================= */
    return res.status(405).json({ message: 'Method not allowed' });

  } catch (err) {
    console.error('USER API ERROR:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
