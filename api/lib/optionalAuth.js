import connectDB from "./db.js";
import User from "../models/user.js";
import { verifyToken } from "./jwt.js";
import { parseCookies } from "./cookies.js";

export async function getOptionalUser(req) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.token;

    if (!token) return null;

    await connectDB();

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    return user || null;
  } catch {
    return null;
  }
}
