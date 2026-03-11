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
  if (req.method !== 'GET') 
    return res.status(405).json({ message: 'Method not allowed' });

  await connectDB();

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  let userId;
  try {
    userId = verifyToken(token).userId;
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const user = await User.findById(userId).select('orders');
  return res.status(200).json({ orders: user.orders || [] });
}