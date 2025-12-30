import crypto from "crypto";
import nodemailer from "nodemailer";

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

    /* ================= SEND EMAIL ================= */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BUSINESS_EMAIL,
        pass: process.env.BUSINESS_EMAIL_PASSWORD,
      },
    });

    const mailHtml = `
      <h2>📦 New Order Received – Cosmo India Prakashan</h2>
      <p><strong>Order Type:</strong> ${notes?.orderType || "guest"}</p>
      <p><strong>Product:</strong> ${notes?.product}</p>
      <p><strong>Name:</strong> ${notes?.name}</p>
      <p><strong>Email:</strong> ${notes?.email}</p>
      <p><strong>Phone:</strong> ${notes?.phone}</p>
      <p><strong>Address:</strong> ${notes?.address}</p>

      <hr />
      <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
      <p><strong>Order ID:</strong> ${razorpay_order_id}</p>

      <p>✅ Payment verified successfully.</p>
    `;

    await transporter.sendMail({
      from: `"Cosmo India Orders" <${process.env.BUSINESS_EMAIL}>`,
      to: process.env.BUSINESS_EMAIL,
      subject: "📦 New Order Received – Cosmo India",
      html: mailHtml,
    });

    /* ================= SUCCESS ================= */
    return res.status(200).json({
      success: true,
      message: "Payment verified & order email sent",
    });

  } catch (err) {
    console.error("❌ Verify Error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}
