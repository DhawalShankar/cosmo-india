import connectDB from '../lib/mongodb.js';
import { setCORSHeaders, handleOptions, requireAuth } from '../lib/middleware.js';
import { Cart } from './get.js';

export default async function handler(req, res) {
  setCORSHeaders(req, res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    await connectDB();

    const { bookId, qty } = req.body;

    const cart = await Cart.findOne({ userId: user._id });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(item => item.id === bookId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (qty <= 0) {
      cart.items = cart.items.filter(item => item.id !== bookId);
    } else {
      item.qty = qty;
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ 
      success: true,
      cart: cart.items 
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}