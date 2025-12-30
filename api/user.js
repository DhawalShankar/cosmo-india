import connectDB from './lib/db.js';
import User from './models/user.js';
import { hashPassword, comparePassword } from './lib/hash.js';
import { signToken, verifyToken } from './lib/jwt.js';

// Cookie parser utility
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

// Middleware to verify user from token
async function verifyUser(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  if (!token) {
    throw new Error('Not authenticated');
  }

  const decoded = verifyToken(token);
  const user = await User.findById(decoded.userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Connect to database
  try {
    await connectDB();
  } catch (e) {
    console.error('❌ DB Connection Error:', e.message);
    return res.status(500).json({ 
      success: false,
      message: 'Database connection failed',
      error: e.message 
    });
  }

  const { method } = req;
  const { action } = req.query;

  // Validate action parameter
  if (!action) {
    return res.status(400).json({ 
      success: false,
      message: 'Action parameter is required' 
    });
  }

  try {
    /* ==================== REGISTER ==================== */
    if (method === 'POST' && action === 'register') {
      const { name, email, password } = req.body || {};
      
      if (!name || !email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Name, email, and password are required' 
        });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({ 
          success: false,
          message: 'Password must be at least 6 characters' 
        });
      }

      // Check if user exists
      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists) {
        return res.status(409).json({ 
          success: false,
          message: 'User already exists with this email' 
        });
      }

      // Create new user
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      console.log('✅ User registered:', email);
      
      return res.status(201).json({ 
        success: true,
        message: 'Registration successful',
        user: user.toJSON() 
      });
    }

    /* ==================== LOGIN ==================== */
    if (method === 'POST' && action === 'login') {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Email and password are required' 
        });
      }

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid email or password' 
        });
      }

      // Verify password
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid email or password' 
        });
      }

      // Generate JWT token
      const token = signToken({ userId: user._id.toString() });
      
      // Set HTTP-only cookie
      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; SameSite=None; Secure; Max-Age=604800`
      );

      console.log('✅ User logged in:', email);
      
      return res.status(200).json({ 
        success: true,
        message: 'Login successful',
        user: user.toJSON() 
      });
    }

    /* ==================== GET CURRENT USER (ME) ==================== */
    if (method === 'GET' && action === 'me') {
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ 
          success: false,
          user: null,
          message: 'Not authenticated' 
        });
      }

      // Verify token
      let decoded;
      try {
        decoded = verifyToken(token);
      } catch (err) {
        console.error('❌ Token verification failed:', err.message);
        return res.status(401).json({ 
          success: false,
          user: null,
          message: 'Invalid or expired token' 
        });
      }

      // Find user
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ 
          success: false,
          user: null,
          message: 'User not found' 
        });
      }

      return res.status(200).json({ 
        success: true,
        user: user.toJSON() 
      });
    }

    /* ==================== UPDATE PROFILE ==================== */
    if (method === 'PUT' && action === 'update') {
      const user = await verifyUser(req);
      const { name, phone, address } = req.body || {};

      // Update only provided fields
      if (name !== undefined) user.name = name;
      if (phone !== undefined) user.phone = phone;
      if (address !== undefined) user.address = address;

      await user.save();

      console.log('✅ Profile updated:', user.email);

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: user.toJSON()
      });
    }

    /* ==================== CHANGE PASSWORD ==================== */
    if (method === 'PUT' && action === 'change-password') {
      const user = await verifyUser(req);
      const { currentPassword, newPassword } = req.body || {};

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current and new password are required'
        });
      }

      // Verify current password
      const isValid = await comparePassword(currentPassword, user.password);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Validate new password
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters'
        });
      }

      // Update password
      user.password = await hashPassword(newPassword);
      await user.save();

      console.log('✅ Password changed:', user.email);

      return res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      });
    }

    /* ==================== LOGOUT ==================== */
    if (method === 'POST' && action === 'logout') {
      // Clear cookie
      res.setHeader(
        'Set-Cookie',
        'token=; HttpOnly; Path=/; SameSite=None; Secure; Max-Age=0'
      );
      
      return res.status(200).json({ 
        success: true,
        message: 'Logged out successfully' 
      });
    }

    /* ==================== METHOD NOT ALLOWED ==================== */
    return res.status(405).json({ 
      success: false,
      message: `Method ${method} not allowed for action: ${action}` 
    });

  } catch (err) {
    console.error('❌ Server Error:', err);
    
    // Handle auth errors
    if (err.message === 'Not authenticated' || err.message === 'User not found') {
      return res.status(401).json({
        success: false,
        message: err.message
      });
    }

    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}