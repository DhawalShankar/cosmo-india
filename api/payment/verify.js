import crypto from "crypto";
import { transporter } from "../lib/mailer.js";
import connectDB from "../lib/db.js";
import User from "../models/user.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, notes } = req.body;

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

      let products = [];
      try { products = JSON.parse(notes.products || "[]"); } catch { products = []; }

      const orderRecord = {
        orderId:   razorpay_order_id,
        paymentId: razorpay_payment_id,
        products,
        product:   notes.product,
        amount:    notes.amount,
        name:      notes.name,
        email:     notes.email,
        phone:     notes.phone,
        address:   notes.address,
        status:    "paid",
        date:      new Date(),
      };

      await User.findOneAndUpdate(
        { email: notes.email },
        { $push: { orders: orderRecord } }
      );
    }

    /* ================= SEND EMAILS ================= */
    const businessMail = `
      <div style="font-family:Georgia,serif;max-width:520px;margin:auto;padding:32px;
                  background:#fdf6ee;border:1px solid #e8d5b0;">
        <img src="https://cosmoindiaprakashan.in/cosmo-logo.png"
             alt="Cosmo India Prakashan"
             style="height:60px;margin-bottom:12px;display:block;" />
        <h2 style="color:#c0392b;margin-bottom:2px;font-size:20px;">Cosmo India Prakashan</h2>
        <p style="color:#888;font-size:12px;margin-top:0;">📦 New Order Received</p>
        <hr style="border:none;border-top:1px solid #e8d5b0;margin:16px 0;" />
        <table style="width:100%;font-size:14px;color:#1a1209;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#888;width:35%;">Name</td>    <td style="padding:6px 0;font-weight:bold;">${notes?.name}</td></tr>
          <tr><td style="padding:6px 0;color:#888;">Email</td>   <td style="padding:6px 0;">${notes?.email}</td></tr>
          <tr><td style="padding:6px 0;color:#888;">Phone</td>   <td style="padding:6px 0;">${notes?.phone}</td></tr>
          <tr><td style="padding:6px 0;color:#888;">Address</td> <td style="padding:6px 0;">${notes?.address}</td></tr>
          <tr><td style="padding:6px 0;color:#888;">Product</td> <td style="padding:6px 0;">${notes?.product}</td></tr>
          <tr><td style="padding:6px 0;color:#888;">Amount</td>  <td style="padding:6px 0;font-weight:bold;color:#c0392b;">₹${notes?.amount}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e8d5b0;margin:16px 0;" />
        <p style="color:#999;font-size:12px;">Payment ID: ${razorpay_payment_id}</p>
        <p style="color:#999;font-size:12px;">Order ID: ${razorpay_order_id}</p>
        <p style="color:#bbb;font-size:11px;margin-top:16px;">— Cosmo India Prakashan Admin</p>
      </div>
    `;

    const customerMail = `
      <div style="font-family:Georgia,serif;max-width:480px;margin:auto;padding:32px;
                  background:#fdf6ee;border:1px solid #e8d5b0;">

        <img src="https://cosmoindiaprakashan.in/cosmo-logo.png"
             alt="Cosmo India Prakashan"
             style="height:60px;margin-bottom:12px;display:block;" />

        <h2 style="color:#c0392b;margin-bottom:2px;font-size:22px;">Cosmo India Prakashan</h2>
        <p style="color:#888;font-size:12px;margin-top:0;letter-spacing:0.08em;">कॉस्मो इंडिया प्रकाशन</p>
        <hr style="border:none;border-top:2px solid #c0392b;margin:16px 0 24px;" />

        <p style="color:#1a1209;font-size:15px;margin-bottom:6px;">
          Dear <strong>${notes?.name}</strong>,
        </p>
        <p style="color:#555;font-size:14px;line-height:1.7;margin-bottom:24px;">
          Thank you for your order! Your payment has been received and your books
          will be dispatched to you soon via <strong>India Post</strong>.
        </p>

        <div style="text-align:center;background:#fff;border:1px solid #e8d5b0;
                    padding:24px;margin-bottom:24px;">
          <p style="color:#888;font-size:12px;letter-spacing:0.1em;
                    text-transform:uppercase;margin-bottom:8px;">Amount Paid</p>
          <p style="font-size:42px;font-weight:bold;color:#c0392b;
                    margin:0;font-family:Georgia,serif;">₹${notes?.amount}</p>
        </div>

        <table style="width:100%;font-size:13px;color:#1a1209;border-collapse:collapse;margin-bottom:24px;">
          <tr style="border-bottom:1px solid #e8d5b0;">
            <td style="padding:10px 0;color:#888;width:40%;">Product</td>
            <td style="padding:10px 0;">${notes?.product}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8d5b0;">
            <td style="padding:10px 0;color:#888;">Delivery To</td>
            <td style="padding:10px 0;">${notes?.address}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#888;">Payment ID</td>
            <td style="padding:10px 0;font-size:11px;color:#aaa;">${razorpay_payment_id}</td>
          </tr>
        </table>

        <div style="background:#fff8f0;border-left:3px solid #c0392b;
                    padding:12px 16px;font-size:13px;color:#555;margin-bottom:24px;">
          For any queries, simply reply to this email. We're happy to help.
        </div>

        <hr style="border:none;border-top:1px solid #e8d5b0;margin:0 0 16px;" />
        <p style="color:#bbb;font-size:11px;margin:0;">— Cosmo India Prakashan Team</p>
      </div>
    `;

    await Promise.all([
      transporter.sendMail({
        from:    `"Cosmo India Orders" <${process.env.BUSINESS_EMAIL}>`,
        to:      process.env.BUSINESS_EMAIL,
        subject: "📦 New Order Received – Cosmo India",
        html:    businessMail,
      }),
      transporter.sendMail({
        from:    `"Cosmo India Prakashan" <${process.env.BUSINESS_EMAIL}>`,
        to:      notes?.email,
        subject: "✅ Order Confirmed – Cosmo India Prakashan",
        html:    customerMail,
      }),
    ]);

    return res.status(200).json({ success: true, message: "Payment verified, order saved & emails sent" });
  } catch (err) {
    console.error("❌ Verify Error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
}