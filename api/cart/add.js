import connectDB from '../lib/mongodb.js';
import { setCORSHeaders, handleOptions, requireAuth } from '../lib/middleware.js';
import { Cart } from './get.js';

export default async function handler(req, res) {
  setCORSHeaders(req, res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    await connectDB();

    const { book } = req.body;

    if (!book || !book.id) {
      return res.status(400).json({ error: 'Invalid book data' });
    }

    let cart = await Cart.findOne({ userId: user._id });
    
    if (!cart) {
      cart = await Cart.create({ 
        userId: user._id, 
        items: [{ ...book, qty: 1 }] 
      });
    } else {
      const existingItem = cart.items.find(item => item.id === book.id);
      
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({ ...book, qty: 1 });
      }
      
      cart.updatedAt = Date.now();
      await cart.save();
    }

    res.status(200).json({ 
      success: true,
      cart: cart.items 
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}