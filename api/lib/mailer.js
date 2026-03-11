// api/lib/mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.BUSINESS_EMAIL_PASSWORD,
  },
});

// ── OTP email for signup verification ──
export const sendOTPEmail = async (email, name, otp) => {
  await transporter.sendMail({
    from: `"Cosmo India Prakashan" <${process.env.BUSINESS_EMAIL}>`,
    to: email,
    subject: "Your Verification Code — Cosmo India",
    html: `
      <div style="font-family:Georgia,serif;max-width:480px;margin:auto;padding:32px;
                  background:#fdf6ee;border:1px solid #e8d5b0;">
        <h2 style="color:#c0392b;margin-bottom:4px;">Cosmo India Prakashan</h2>
        <p style="color:#1a1209;font-size:15px;">Hi ${name},</p>
        <p style="color:#555;font-size:14px;">
          Use the code below to verify your email address.
          It expires in <strong>10 minutes</strong>.
        </p>
        <div style="text-align:center;margin:32px 0;">
          <span style="font-size:42px;font-weight:bold;
                       letter-spacing:14px;color:#c0392b;">${otp}</span>
        </div>
        <p style="color:#999;font-size:12px;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="border:none;border-top:1px solid #e8d5b0;margin:24px 0;" />
        <p style="color:#bbb;font-size:11px;">— Cosmo India Prakashan Team</p>
      </div>
    `,
  });
};