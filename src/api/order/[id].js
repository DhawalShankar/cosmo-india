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

    const { id } = req.query;

    const order = await Order.findOne({ 
      orderId: id,
      userId: user._id 
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}