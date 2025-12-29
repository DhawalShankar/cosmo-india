import connectDB from '../lib/mongodb.js';
import { setCORSHeaders, handleOptions, requireAuth } from '../lib/middleware.js';
import { Order } from './create.js';

export default async function handler(req, res) {
  setCORSHeaders(req, res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    await connectDB();

    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('List orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}