import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      amount,
      name,
      email,
      phone,
      address,
      product,
      orderType, // "logged-in" | "guest"
    } = req.body;

    if (!amount || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // INR → paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        name: name || "Guest User",
        email,
        phone: phone || "N/A",
        address: address || "N/A",
        product: product || "Cosmo India Order",
        orderType: orderType || "guest",
        userId: req.user && req.user._id ? String(req.user._id) : null,

        items: [
          {
            name: product || "Cosmo India Order",
            qty: 1,
            image: "",
            price: amount,
            product: "UNLINKED" // placeholder, resolved during order creation
          }
        ],

        shippingAddress: {
          address: address || "N/A",
          city: "N/A",
          postalCode: "N/A",
          country: "India"
        },

        totalPrice: amount,
        paymentMethod: "Razorpay"
      },
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    return res.status(500).json({ error: "Order creation failed" });
  }
}
