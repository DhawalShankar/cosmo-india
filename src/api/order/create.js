import connectDB from '../lib/mongodb.js';
import { setCORSHeaders, handleOptions, optionalAuth } from '../lib/middleware.js';
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestEmail: String,
  items: [{
    id: Number,
    title: String,
    author: String,
    price: Number,
    qty: Number,
    image: String
  }],
  totalAmount: { type: Number, required: true },
  address: {
    name: String,
    email: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default async function handler(req, res) {
  setCORSHeaders(req, res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const user = await optionalAuth(req);
    const { items, totalAmount, address, razorpayOrderId, razorpayPaymentId, paymentStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in order' });
    }

    if (!address || !address.name || !address.email || !address.phone) {
      return res.status(400).json({ error: 'Invalid address' });
    }

    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const order = await Order.create({
      orderId,
      userId: user ? user._id : null,
      guestEmail: user ? null : address.email,
      items,
      totalAmount,
      address,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus: paymentStatus || 'completed'
    });

    res.status(201).json({
      success: true,
      order: {
        orderId: order.orderId,
        totalAmount: order.totalAmount,
        items: order.items,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export { Order };