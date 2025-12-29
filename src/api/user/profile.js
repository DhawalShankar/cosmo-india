import connectDB from '../lib/mongodb.js';
import { setCORSHeaders, handleOptions, requireAuth } from '../lib/middleware.js';

export default async function handler(req, res) {
  setCORSHeaders(req, res);
  if (handleOptions(req, res)) return;

  try {
    const user = await requireAuth(req, res);
    if (!user) return;

    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt
        }
      });
    }

    if (req.method === 'PUT') {
      const { name, phone } = req.body;

      if (name) user.name = name;
      if (phone) user.phone = phone;

      await user.save();

      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}