import { setCORSHeaders, handleOptions } from '../lib/middleware.js';
import { clearAuthCookie } from '../lib/auth.js';

export default async function handler(req, res) {
  setCORSHeaders(req, res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  clearAuthCookie(res);

  res.status(200).json({ success: true, message: 'Logged out' });
}