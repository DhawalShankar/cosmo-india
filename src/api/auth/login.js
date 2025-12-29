import connectDB from '../lib/mongodb.js';
import { generateToken } from '../lib/auth.js';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';

// User model (inline for simplicity)
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
      sameSite: 'lax'
    }));

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// ---

// ## 🚀 **How URLs Work:**

// ### **Frontend Routes (React Router):**
// ```
// cosmoindiaprakashan.in/              → Home.jsx
// cosmoindiaprakashan.in/marketplace   → Marketplace.jsx
// cosmoindiaprakashan.in/cart          → Cart.jsx
// cosmoindiaprakashan.in/checkout      → Checkout.jsx
// cosmoindiaprakashan.in/login         → Login.jsx
// ```

// ### **Backend API Routes (Serverless Functions):**
// ```
// cosmoindiaprakashan.in/api/auth/login          → api/auth/login.js
// cosmoindiaprakashan.in/api/cart/add            → api/cart/add.js
// cosmoindiaprakashan.in/api/payment/create-order → api/payment/create-order.js
// cosmoindiaprakashan.in/api/orders/create       → api/orders/create.js