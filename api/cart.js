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
  if (req.method === 'POST' && req.query.coupon) {
    const { code, cartTotal } = req.body;

      const COUPONS = {
        WELCOME10: { type: 'percent', value: 10, minOrder: 0, description: '10% off' },
        COSMO20: { type: 'percent', value: 20, minOrder: 500, description: '20% off orders above ₹500' },
        FLAT50: { type: 'flat', value: 50, minOrder: 300, description: '₹50 off orders above ₹300' },
        FLAT100: { type: 'flat', value: 100, minOrder: 800, description: '₹100 off orders above ₹800' },
        BOOKFEST: { type: 'percent', value: 15, minOrder: 0, description: '15% off' },
      };

      const coupon = COUPONS[code?.trim()?.toUpperCase()];

      if (!coupon)
        return res.status(200).json({ valid: false, message: 'Invalid coupon code' });

      if (cartTotal < coupon.minOrder)
        return res.status(200).json({
          valid: false,
          message: `Minimum order of ₹${coupon.minOrder} required for this coupon`,
        });

      const discount =
        coupon.type === 'percent'
          ? Math.round((cartTotal * coupon.value) / 100)
          : coupon.value;

      return res.status(200).json({
        valid: true,
        code: code.toUpperCase(),
        discount,
        finalTotal: Math.max(0, cartTotal - discount),
      });
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