import User from "../models/user.js";
import { verifyToken } from "../lib/jwt.js";
import connectDB from "../lib/db.js";

// Cookie parser (same as user.js)
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach(cookie => {
      const [name, ...rest] = cookie.split("=");
      cookies[name.trim()] = rest.join("=").trim();
    });
  }
  return cookies;
}

// Middleware
export async function protect(req, res, next) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }
    await connectDB();
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // Attach user to request (IMPORTANT)
    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
}
