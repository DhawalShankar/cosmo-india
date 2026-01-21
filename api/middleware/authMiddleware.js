import User from "../models/user.js";
import { verifyToken } from "../lib/jwt.js";
import connectDB from "../lib/db.js";
import { parseCookies } from "../lib/cookies.js";

export async function protect(req, res, next) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    await connectDB();

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}
