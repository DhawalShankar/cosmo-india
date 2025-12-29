import connectDB from '../lib/mongodb.js';
import { setCORSHeaders, handleOptions, requireAuth } from '../lib/middleware.js';
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    id: Number,
    title: String,
    author: String,
    category: String,
    price: Number,
    originalPrice: Number,
    image: String,
    qty: Number
  }],
  updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

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

    let cart = await Cart.findOne({ userId: user._id });
    
    if (!cart) {
      cart = await Cart.create({ userId: user._id, items: [] });
    }

    res.status(200).json({ cart: cart.items });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export { Cart };