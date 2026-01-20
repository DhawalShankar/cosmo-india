import connectDB from "./db.js";
import User from "../models/user.js";
import { verifyToken } from "./jwt.js";

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach(cookie => {
    const [name, ...rest] = cookie.split("=");
    cookies[name.trim()] = rest.join("=").trim();
  });

  return cookies;
}

export async function getOptionalUser(req) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.token;

    if (!token){
        return null;
    }

    await connectDB();

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    return user || null;
  } catch {
    return null;
  }
}
