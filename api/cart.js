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

  // Support both cookie and Authorization header
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  let userId;
  try {
    userId = verifyToken(token).userId;
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // GET CART
  if (req.method === 'GET') {
    const user = await User.findById(userId).select('cart');
    return res.json({ cart: user.cart || [] });
  }

  // SAVE CART (replace whole cart)
  if (req.method === 'POST') {
    const { cart } = req.body;
    if (!Array.isArray(cart))
      return res.status(400).json({ message: 'Invalid cart' });
    await User.findByIdAndUpdate(userId, { cart });
    return res.json({ message: 'Cart saved', cart });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}