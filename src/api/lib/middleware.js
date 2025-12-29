import { getUserFromRequest } from './auth.js';
import connectDB from './mongodb.js';
import mongoose from 'mongoose';

// User Model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// CORS Middleware
export function setCORSHeaders(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Handle OPTIONS preflight
export function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

// Require authentication
export async function requireAuth(req, res) {
  await connectDB();
  
  const userId = getUserFromRequest(req);
  
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(401).json({ error: 'User not found' });
    return null;
  }

  return user;
}

// Optional auth (doesn't fail if not authenticated)
export async function optionalAuth(req) {
  await connectDB();
  
  const userId = getUserFromRequest(req);
  
  if (!userId) return null;

  const user = await User.findById(userId);
  return user;
}

export { User };