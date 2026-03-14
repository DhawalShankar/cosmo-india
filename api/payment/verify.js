// api/payment/verify.js
import crypto from "crypto";
import { transporter } from "../lib/mailer.js"; // ← only change
import connectDB from "../lib/db.js";
import User from "../models/user.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      notes,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    /* ================= VERIFY SIGNATURE ================= */
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    /* ================= SAVE ORDER TO DB ================= */
    if (notes?.orderType === "logged-in" && notes?.email) {
      await connectDB();

      const orderRecord = {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        products: JSON.parse(notes.products || '[]'), 
        product: notes.product,
        amount: notes.amount,
        name: notes.name,
        email: notes.email,
        phone: notes.phone,
        address: notes.address,
        status: "paid",
        date: new Date(),
      };

      await User.findOneAndUpdate(
        { email: notes.email },
        { $push: { orders: orderRecord } }
      );
    }

    /* ================= SEND EMAILS ================= */
    const businessMail = `
      <h2>📦 New Order Received – Cosmo India Prakashan</h2>
      <p><strong>Order Type:</strong> ${notes?.orderType || "guest"}</p>
      <p><strong>Product:</strong> ${notes?.product}</p>
      <p><strong>Name:</strong> ${notes?.name}</p>
      <p><strong>Email:</strong> ${notes?.email}</p>
      <p><strong>Phone:</strong> ${notes?.phone}</p>
      <p><strong>Address:</strong> ${notes?.address}</p>
      <p><strong>Amount:</strong> ₹${notes?.amount}</p>
      <hr />
      <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
      <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
      <p>✅ Payment verified successfully.</p>
    `;

    const customerMail = `
      <h2>✅ Order Confirmed – Cosmo India Prakashan</h2>
      <p>Dear ${notes?.name},</p>
      <p>Thank you for your purchase! Your order has been confirmed.</p>
      <hr />
      <p><strong>Product:</strong> ${notes?.product}</p>
      <p><strong>Amount Paid:</strong> ₹${notes?.amount}</p>
      <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
      <p><strong>Delivery Address:</strong> ${notes?.address}</p>
      <hr />
      <p>We will ship your order soon. For any queries, reply to this email.</p>
      <p>– Cosmo India Prakashan Team</p>
    `;

    await Promise.all([
      transporter.sendMail({
        from: `"Cosmo India Orders" <${process.env.BUSINESS_EMAIL}>`,
        to: process.env.BUSINESS_EMAIL,
        subject: "📦 New Order Received – Cosmo India",
        html: businessMail,
      }),
      transporter.sendMail({
        from: `"Cosmo India Prakashan" <${process.env.BUSINESS_EMAIL}>`,
        to: notes?.email,
        subject: "✅ Order Confirmed – Cosmo India Prakashan",
        html: customerMail,
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Payment verified, order saved & emails sent",
    });
  } catch (err) {
    console.error("❌ Verify Error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}