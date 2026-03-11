// api/user.js
import connectDB from './lib/db.js';
import User from './models/user.js';
import OtpModel from './models/otp.js';
import { hashPassword, comparePassword } from './lib/hash.js';
import { signToken, verifyToken } from './lib/jwt.js';
import { sendOTPEmail } from "./lib/mailer.js";

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

async function verifyUser(req) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;
  if (!token) throw new Error('Not authenticated');
  const decoded = verifyToken(token);
  const user = await User.findById(decoded.userId);
  if (!user) throw new Error('User not found');
  return user;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
  } catch (e) {
    console.error('❌ DB Connection Error:', e.message);
    return res.status(500).json({ success: false, message: 'Database connection failed', error: e.message });
  }

  const { method } = req;
  const { action } = req.query;

  if (!action) {
    return res.status(400).json({ success: false, message: 'Action parameter is required' });
  }

  try {

    /* ==================== SEND OTP ==================== */
    if (method === 'POST' && action === 'send-otp') {
      const { name, email, password } = req.body || {};

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
      }
      if (password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
      }

      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists) {
        return res.status(409).json({ success: false, error: 'User already exists with this email' });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await hashPassword(password);

      await OtpModel.findOneAndUpdate(
        { email: email.toLowerCase() },
        { otp, name, hashedPassword, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
        { upsert: true, new: true }
      );

      await sendOTPEmail(email, name, otp);

      console.log('✅ OTP sent to:', email);
      return res.status(200).json({ success: true, message: 'OTP sent to your email' });
    }

    /* ==================== VERIFY OTP ==================== */
    if (method === 'POST' && action === 'verify-otp') {
      const { email, otp } = req.body || {};

      if (!email || !otp) {
        return res.status(400).json({ success: false, error: 'Email and OTP are required' });
      }

      const record = await OtpModel.findOne({ email: email.toLowerCase() });

      if (!record) {
        return res.status(400).json({ success: false, error: 'OTP not found. Please request a new one.' });
      }
      if (Date.now() > record.expiresAt.getTime()) {
        await OtpModel.deleteOne({ email: email.toLowerCase() });
        return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new one.' });
      }
      if (record.otp !== otp.toString().trim()) {
        return res.status(400).json({ success: false, error: 'Invalid OTP. Please try again.' });
      }

      const user = await User.create({
        name: record.name,
        email: email.toLowerCase(),
        password: record.hashedPassword,
      });

      await OtpModel.deleteOne({ email: email.toLowerCase() });

      const token = signToken({ userId: user._id.toString() });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`);

      console.log('✅ User verified & created:', email);
      return res.status(201).json({ success: true, message: 'Account created successfully', user: user.toJSON() });
    }

    /* ==================== REGISTER ==================== */
    if (method === 'POST' && action === 'register') {
      const { name, email, password } = req.body || {};

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
      }
      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
      }

      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists) {
        return res.status(409).json({ success: false, message: 'User already exists with this email' });
      }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });

      console.log('✅ User registered:', email);
      return res.status(201).json({ success: true, message: 'Registration successful', user: user.toJSON() });
    }

    /* ==================== LOGIN ==================== */
    if (method === 'POST' && action === 'login') {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = signToken({ userId: user._id.toString() });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`);

      console.log('✅ User logged in:', email);
      return res.status(200).json({ success: true, message: 'Login successful', user: user.toJSON() });
    }

    /* ==================== GET CURRENT USER (ME) ==================== */
    if (method === 'GET' && action === 'me') {
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ success: false, user: null, message: 'Not authenticated' });
      }

      let decoded;
      try {
        decoded = verifyToken(token);
      } catch (err) {
        console.error('❌ Token verification failed:', err.message);
        return res.status(401).json({ success: false, user: null, message: 'Invalid or expired token' });
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ success: false, user: null, message: 'User not found' });
      }

      return res.status(200).json({ success: true, user: user.toJSON() });
    }

    /* ==================== UPDATE PROFILE ==================== */
    if (method === 'PUT' && action === 'update') {
      const user = await verifyUser(req);
      const { name, phone, address } = req.body || {};

      if (name !== undefined) user.name = name;
      if (phone !== undefined) user.phone = phone;
      if (address !== undefined) user.address = address;

      await user.save();

      console.log('✅ Profile updated:', user.email);
      return res.status(200).json({ success: true, message: 'Profile updated successfully', user: user.toJSON() });
    }

    /* ==================== CHANGE PASSWORD ==================== */
    if (method === 'PUT' && action === 'change-password') {
      const user = await verifyUser(req);
      const { currentPassword, newPassword } = req.body || {};

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'Current and new password are required' });
      }

      const isValid = await comparePassword(currentPassword, user.password);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
      }

      user.password = await hashPassword(newPassword);
      await user.save();

      console.log('✅ Password changed:', user.email);
      return res.status(200).json({ success: true, message: 'Password changed successfully' });
    }

    /* ==================== LOGOUT ==================== */
    if (method === 'POST' && action === 'logout') {
      res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0');
      return res.status(200).json({ success: true, message: 'Logged out successfully' });
    }

    /* ==================== METHOD NOT ALLOWED ==================== */
    return res.status(405).json({ success: false, message: `Method ${method} not allowed for action: ${action}` });

  } catch (err) {
    console.error('❌ Server Error:', err);

    if (err.message === 'Not authenticated' || err.message === 'User not found') {
      return res.status(401).json({ success: false, message: err.message });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}