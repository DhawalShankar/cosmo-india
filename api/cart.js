import connectDB from './lib/db.js';
import User from './models/user.js';
import { verifyToken } from './lib/jwt.js';

function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, ...rest] = cookie.split('=');
      cookies[name.trim()] = rest.join('=').trim();
    });
  }
  return cookies;
}

export default async function handler(req, res) {
  await connectDB();

  // ── Auth: cookie first, Authorization header as fallback ──
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  let userId;
  try {
    userId = verifyToken(token).userId;
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // ── GET: return saved cart ──
  if (req.method === 'GET') {
    try {
      const user = await User.findById(userId).select('cart');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json({ cart: user.cart || [] });
    } catch (err) {
      console.error('GET cart error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // ── POST: replace whole cart ──
  if (req.method === 'POST') {
    const { cart } = req.body;
    if (!Array.isArray(cart))
      return res.status(400).json({ message: 'Invalid cart' });
    try {
      await User.findByIdAndUpdate(userId, { cart }, { new: true });
      return res.json({ message: 'Cart saved', cart });
    } catch (err) {
      console.error('POST cart error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}