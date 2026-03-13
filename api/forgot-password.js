import clientPromise from "../src/lib/mongodb.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// Random 10-char password generator
const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$!';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.BUSINESS_EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email });

    // Security: same response even if user not found
    if (!user) {
      return res.status(200).json({ success: true });
    }

    const newPassword = generatePassword();
    const hashed = await bcrypt.hash(newPassword, 10);

    await db.collection('users').updateOne(
      { email },
      { $set: { password: hashed, mustChangePassword: true } }
    );

    await transporter.sendMail({
      from: `"Cosmo India Prakashan" <${process.env.BUSINESS_EMAIL}>`,
      to: email,
      subject: 'Your Temporary Password — Cosmo India Prakashan',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Temporary Password</title>
</head>
<body style="margin:0;padding:0;background:#f5ede0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5ede0;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fdf6ee;border:1px solid rgba(192,57,43,0.18);max-width:600px;width:100%;">

        <!-- Top accent line -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#c0392b,#d4450c);"></td></tr>

        <!-- Header -->
        <tr>
          <td style="padding:36px 44px 24px;border-bottom:1px solid rgba(192,57,43,0.12);">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 2px;font-family:'Georgia',serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#c0392b;">
                    कॉस्मो इंडिया प्रकाशन
                  </p>
                  <h1 style="margin:0;font-family:'Georgia',serif;font-size:26px;font-weight:900;color:#1a1209;line-height:1.1;">
                    Cosmo India <em style="color:#c0392b;">Prakashan</em>
                  </h1>
                </td>
                <td align="right" style="font-size:28px;">📖</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 44px;">
            <p style="font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#c0392b;margin:0 0 8px;font-family:'Georgia',serif;">
              पासवर्ड रीसेट
            </p>
            <h2 style="font-family:'Georgia',serif;font-size:22px;font-weight:900;color:#1a1209;margin:0 0 20px;line-height:1.2;">
              Your Temporary Password
            </h2>

            <p style="color:rgba(26,18,9,0.7);font-size:15px;line-height:1.7;margin:0 0 24px;">
              Namaste,<br/>
              We received a request to reset your password. Here is your temporary password:
            </p>

            <!-- Password box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="background:#fff;border:1px solid rgba(192,57,43,0.25);border-left:4px solid #c0392b;padding:20px 24px;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(26,18,9,0.5);">
                    Temporary Password
                  </p>
                  <p style="margin:0;font-family:'Courier New',monospace;font-size:22px;font-weight:700;color:#c0392b;letter-spacing:0.1em;">
                    ${newPassword}
                  </p>
                </td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:rgba(192,57,43,0.05);border:1px solid rgba(192,57,43,0.15);padding:14px 18px;">
                  <p style="margin:0;color:rgba(26,18,9,0.65);font-size:13px;line-height:1.6;">
                    ⚠️ Please <strong>login and change your password immediately</strong> from your account settings. This temporary password will work until you update it.
                  </p>
                </td>
              </tr>
            </table>

            <p style="color:rgba(26,18,9,0.6);font-size:13px;line-height:1.7;margin:0 0 8px;">
              If you did not request this, please ignore this email — your account remains secure.
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="height:1px;background:rgba(192,57,43,0.1);margin:0 44px;"></td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 44px 32px;">
            <p style="margin:0 0 4px;font-family:'Georgia',serif;font-style:italic;color:rgba(26,18,9,0.45);font-size:12px;">
              "रोकने से कलम रुकती नहीं है।"
            </p>
            <p style="margin:0;color:rgba(26,18,9,0.35);font-size:11px;letter-spacing:0.08em;">
              — Cosmo India Prakashan · Since 1980s
            </p>
          </td>
        </tr>

        <!-- Bottom accent -->
        <tr><td style="height:2px;background:linear-gradient(90deg,#c0392b,#d4450c,transparent);"></td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}