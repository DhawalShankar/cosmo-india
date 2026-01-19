import crypto from "crypto";
import nodemailer from "nodemailer";
import Order from "../models/Order";
import connectDB from "../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      notes, // comes from create-order
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

    /* ================= EXTRACT & SANITIZE ================= */
    const {
      orderType,
      userId,
      items = [],
      shippingAddress = {},
      totalPrice = 0,
      paymentMethod = "Razorpay",
      name,
      email,
      phone
    } = notes || {};

    const sanitizedItems = items.map(item => ({
      ...item,
      product: item.product === "UNLINKED" ? undefined : item.product
    }));

    if (!sanitizedItems.length) {
      return res.status(400).json({ error: "No order items found" });
    }

    await connectDB();
    
    /* ================= CREATE ORDER ================= */
    const createdOrder = await Order.create({
      user: orderType === "guest" || !userId ? null : userId,
      orderItems: sanitizedItems,
      shippingAddress,
      paymentMethod,
      paymentResult: {
        gateway: "Razorpay",
        transactionId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
        status: "paid"
      },
      totalPrice,
      isPaid: true,
      paidAt: new Date(),
      status: "Processing"
    });

    /* ================= SEND EMAIL ================= */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BUSINESS_EMAIL,
        pass: process.env.BUSINESS_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Cosmo India Orders" <${process.env.BUSINESS_EMAIL}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: "📦 New Order Received – Cosmo India",
      html: `
        <h2>📦 New Order Received – Cosmo India Prakashan</h2>
        <p><strong>Internal Order ID:</strong> ${createdOrder._id}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <h4>Items:</h4>
        <ul>
          ${sanitizedItems.map(i => `<li>${i.name} × ${i.qty}</li>`).join("")}
        </ul>

        <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        <p>✅ Payment verified successfully.</p>
      `,
    });

    /* ================= SUCCESS ================= */
    return res.status(200).json({
      success: true,
      message: "Payment verified & order created",
      orderId: createdOrder._id
    });

  } catch (err) {
    console.error("❌ Verify Error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
