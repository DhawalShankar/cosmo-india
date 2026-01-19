import connectDB from "./lib/db.js";
import Order from "./models/Order.js";
import { protect } from "./middleware/authMiddleware.js";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // DB connection
  try {
    await connectDB();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }

  // Only support: GET /api/orders?action=my
  if (req.method !== "GET" || req.query.action !== "my") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  // Auth (cookie-based)
  return protect(req, res, async () => {
    try {
      const orders = await Order.find({ user: req.user._id })
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        orders
      });
    } catch (err) {
      console.error("❌ Fetch orders error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch orders"
      });
    }
  });
}
