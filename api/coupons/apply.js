// api/coupons/apply.js
// POST { code, cartTotal } → { valid, discount, discountType, discountValue, finalTotal, message }

const COUPONS = {
  WELCOME10:  { type: 'percent', value: 10,  minOrder: 0,   description: '10% off' },
  COSMO20:    { type: 'percent', value: 20,  minOrder: 500, description: '20% off orders above ₹500' },
  FLAT50:     { type: 'flat',    value: 50,  minOrder: 300, description: '₹50 off orders above ₹300' },
  FLAT100:    { type: 'flat',    value: 100, minOrder: 800, description: '₹100 off orders above ₹800' },
  BOOKFEST:   { type: 'percent', value: 15,  minOrder: 0,   description: '15% off' },
};

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { code, cartTotal } = req.body;

  if (!code || cartTotal == null)
    return res.status(400).json({ valid: false, message: 'Missing code or cart total' });

  const coupon = COUPONS[code.trim().toUpperCase()];

  if (!coupon)
    return res.status(200).json({ valid: false, message: 'Invalid coupon code' });

  if (cartTotal < coupon.minOrder)
    return res.status(200).json({
      valid: false,
      message: `Minimum order of ₹${coupon.minOrder} required for this coupon`,
    });

  const discount =
    coupon.type === 'percent'
      ? Math.round((cartTotal * coupon.value) / 100)
      : coupon.value;

  const finalTotal = Math.max(0, cartTotal - discount);

  return res.status(200).json({
    valid: true,
    code: code.trim().toUpperCase(),
    discount,
    discountType: coupon.type,
    discountValue: coupon.value,
    description: coupon.description,
    finalTotal,
    message: `Coupon applied! You save ₹${discount}`,
  });
}