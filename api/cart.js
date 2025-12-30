import connectDB from './lib/db.js';
import User from './models/user.js';
import { verifyToken } from './lib/jwt.js';

export default async function handler(req, res) {
  await connectDB();

  const token = req.cookies?.token;
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

  // UPDATE CART (replace whole cart)
  if (req.method === 'POST') {
    const { cart } = req.body;
    if (!Array.isArray(cart))
      return res.status(400).json({ message: 'Invalid cart' });

    await User.findByIdAndUpdate(userId, { cart });
    return res.json({ message: 'Cart updated' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
