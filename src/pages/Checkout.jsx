import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, User, Mail, Phone, MapPin, CreditCard, Lock, ArrowRight } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isGuest = new URLSearchParams(location.search).get('guest') === '1';

  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false); // ← add this

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total    = subtotal + shipping;

  useEffect(() => { if (cart.length === 0 && !isOrderComplete) navigate('/marketplace'); }, [cart, navigate, isOrderComplete]);
  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink     = darkMode ? '#f0e8dc' : '#1a1209';
  const muted   = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.65)';
  const rule    = darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)';
  // Neutral border for form inputs — distinct from the decorative rule color
  const inputBorder = darkMode ? 'rgba(240,232,220,0.15)' : 'rgba(26,18,9,0.2)';
  const cardBg  = darkMode
    ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
    : 'linear-gradient(145deg, #ffffff, #fdf6ee)';
  const cardBorder = darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)';

  const validateForm = () => {
    const e = {};
    if (!guestDetails.name.trim())    e.name    = 'Name is required';
    if (!guestDetails.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestDetails.email.trim()))
                                       e.email   = 'Please enter a valid email address';
    if (!guestDetails.phone.trim())   e.phone   = 'Phone is required';
    else if (!/^\+?[\d\s\-().]{7,15}$/.test(guestDetails.phone.trim()))
                                       e.phone   = 'Please enter a valid phone number';
    if (!guestDetails.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handlePayment = async () => {
    if (!isGuest && user && (!user.phone || !user.address)) {
      alert('Please update your phone and address in Profile Settings before checkout.');
      navigate('/profile');
      return;
    }
    if (isGuest && !validateForm()) return;

    setIsProcessing(true);
    try {
      const orderData = {
        amount: total,
        email: isGuest ? guestDetails.email : user?.email,
        name:  isGuest ? guestDetails.name  : user?.name,
        phone: isGuest ? guestDetails.phone : user?.phone,
        address: isGuest ? guestDetails.address : user?.address,
        product: cart.map(i => `${i.title} (x${i.qty})`).join(', '),
        orderType: isGuest ? 'guest' : 'logged-in',
      };

      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const { order } = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount, currency: 'INR',
        name: 'Cosmo India Prakashan', description: 'Book Purchase',
        order_id: order.id,
        handler: async (response) => {
          try {
            const vRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, notes: order.notes }),
            });
            const vData = await vRes.json();
            if (vData.success) { setIsOrderComplete(true); await clearCart(); window.location.href = '/order-success'; }
            else alert('Payment verification failed. Please contact support.');
          } catch { alert('Payment verification failed. Please contact support.'); }
        },
        prefill: { name: orderData.name, email: orderData.email, contact: orderData.phone },
        theme: { color: accent },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (r) => { alert('Payment failed: ' + r.error.description); setIsProcessing(false); });
      rzp.open();
      setIsProcessing(false);
    } catch { alert('Payment failed. Try again.'); setIsProcessing(false); }
  };

  /* ── Shared input style ── */
  const inputStyle = (field) => ({
    width: '100%', padding: '0.75rem 1rem',
    border: `1px solid ${errors[field] ? accent : inputBorder}`,
    background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)',
    color: ink, fontFamily: 'DM Sans, sans-serif', fontSize: '1rem',
    outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .co-wrap * { box-sizing: border-box; }
        .co-wrap {
          font-family: 'DM Sans', system-ui, sans-serif;
          --ink: ${ink}; --paper: ${darkMode ? '#141210' : '#fdf6ee'};
          --accent: #c0392b; --saffron: #d4450c;
          --rule: ${rule}; --muted: ${muted};
          background: var(--paper); color: var(--ink);
        }
        .co-wrap .yatra { font-family: 'Yatra One', serif; }
        .co-wrap .h1    { font-family: 'Playfair Display', Georgia, serif; }
        .co-wrap .ghost-num {
          font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900;
          color: transparent; -webkit-text-stroke: 1px var(--rule); user-select: none; line-height: 1;
        }
        @keyframes coFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .co-wrap .fu  { animation: coFadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .co-wrap .d1  { animation-delay: .1s; }
        .co-wrap .d2  { animation-delay: .22s; }

        @keyframes coPulse {
          0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)}
          70%{box-shadow:0 0 0 14px rgba(192,57,43,0)}
          100%{box-shadow:0 0 0 0 rgba(192,57,43,0)}
        }
        .co-wrap .pulse-btn:hover { animation: coPulse 1s ease-out; }

        .co-wrap .ci-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px rgba(192,57,43,.12);
        }
        .co-wrap .ci-input::placeholder { color: var(--muted); }

        .co-wrap .info-row { display: flex; align-items: flex-start; gap: 0.75rem; padding: '0.5rem 0'; }
      `}</style>

      <div className="co-wrap min-h-screen">

        {/* hero strip */}
        <section style={{
          minHeight: '18vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingTop: '5rem',
          background: darkMode
            ? 'radial-gradient(ellipse 90% 80% at 50% 40%, #2e0c07 0%, #141210 60%, #0e0c0a 100%)'
            : 'radial-gradient(ellipse 110% 90% at 50% 40%, #fdd8a8 0%, #fde8c8 40%, #fdf6ee 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `radial-gradient(circle, rgba(192,57,43,0.15) 1px, transparent 1px)`,
            backgroundSize: '36px 36px', opacity: 0.5 }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <p className="yatra fu" style={{ fontSize: '0.82rem', letterSpacing: '0.14em', color: accent, marginBottom: '0.4rem' }}>
              भुगतान
            </p>
            <h1 className="h1 fu d1" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: ink, lineHeight: 1.1 }}>
              Check<em style={{ color: accent }}>out</em>
            </h1>
          </div>
        </section>

        <section style={{
          padding: '3rem 0 5rem',
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #141210 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #fdf6ee 100%)',
        }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'grid', gap: '2rem' }} className="co-grid">
              <style>{`@media(min-width:860px){ .co-grid{ grid-template-columns: 1fr 320px !important; } }`}</style>

              {/* ── LEFT: delivery info ── */}
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`,
                boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
                position: 'relative', overflow: 'hidden', padding: '2rem' }}>

                <div style={{ position: 'absolute', top: 0, left: 0, width: '1.75rem', height: '1.75rem',
                  borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1.75rem', height: '1.75rem',
                  borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem',
                  marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: `1px solid ${rule}` }}>
                  <span className="ghost-num" style={{ fontSize: '2rem' }}>01</span>
                  <div>
                    <p className="yatra" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: accent }}>विवरण</p>
                    <p className="h1" style={{ color: ink, fontWeight: 700, fontSize: '1.05rem' }}>
                      {isGuest ? 'Your Details' : 'Delivery Information'}
                    </p>
                  </div>
                </div>

                {/* logged-in user */}
                {!isGuest && user && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { icon: User,   label: 'Name',    value: user.name    || 'Not provided' },
                      { icon: Mail,   label: 'Email',   value: user.email },
                      { icon: Phone,  label: 'Phone',   value: user.phone   || 'Not provided' },
                      { icon: MapPin, label: 'Address', value: user.address || 'Not provided' },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                        padding: '0.85rem 1rem',
                        background: darkMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.7)',
                        border: `1px solid ${rule}` }}>
                        <Icon style={{ width: '1rem', height: '1rem', color: accent, flexShrink: 0, marginTop: '0.15rem' }} />
                        <div>
                          <p style={{ fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                            color: muted, marginBottom: '0.2rem' }}>{label}</p>
                          <p className="h1" style={{ color: ink, fontWeight: 600, fontSize: '0.95rem' }}>{value}</p>
                        </div>
                      </div>
                    ))}

                    {(!user.phone || !user.address) && (
                      <div style={{ padding: '0.9rem 1rem',
                        background: darkMode ? 'rgba(251,191,36,0.06)' : 'rgba(251,191,36,0.1)',
                        border: `1px dashed ${darkMode ? 'rgba(251,191,36,0.3)' : 'rgba(180,130,0,0.35)'}`,
                        fontSize: '0.85rem', color: darkMode ? '#fbbf24' : '#92650a' }}>
                        ⚠️ Please update your phone and address in{' '}
                        <a href="/profile" style={{ fontWeight: 700, color: accent, textDecoration: 'none' }}>
                          Profile Settings
                        </a>{' '}
                        before checkout.
                      </div>
                    )}
                  </div>
                )}

                {/* guest form */}
                {isGuest && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    {[
                      { name: 'name',    type: 'text',  label: 'Full Name',        icon: User,   placeholder: 'Your full name' },
                      { name: 'email',   type: 'email', label: 'Email Address',    icon: Mail,   placeholder: 'your@email.com' },
                      { name: 'phone',   type: 'tel',   label: 'Phone Number',     icon: Phone,  placeholder: '+91 98765 43210' },
                    ].map(({ name, type, label, icon: Icon, placeholder }) => (
                      <div key={name}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600,
                          letterSpacing: '0.06em', textTransform: 'uppercase', color: muted, marginBottom: '0.4rem' }}>
                          {label} *
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Icon style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                            width: '0.9rem', height: '0.9rem', color: muted, pointerEvents: 'none' }} />
                          <input type={type} name={name} value={guestDetails[name]}
                            onChange={handleInputChange} placeholder={placeholder}
                            className="ci-input"
                            style={{ ...inputStyle(name), paddingLeft: '2.25rem' }} />
                        </div>
                        {errors[name] && <p style={{ marginTop: '0.3rem', fontSize: '0.78rem', color: accent }}>{errors[name]}</p>}
                      </div>
                    ))}

                    {/* address textarea */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600,
                        letterSpacing: '0.06em', textTransform: 'uppercase', color: muted, marginBottom: '0.4rem' }}>
                        Delivery Address *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <MapPin style={{ position: 'absolute', left: '0.75rem', top: '0.85rem',
                          width: '0.9rem', height: '0.9rem', color: muted, pointerEvents: 'none' }} />
                        <textarea name="address" value={guestDetails.address}
                          onChange={handleInputChange} rows="3"
                          placeholder="Complete delivery address"
                          className="ci-input"
                          style={{ ...inputStyle('address'), paddingLeft: '2.25rem', resize: 'none' }} />
                      </div>
                      {errors.address && <p style={{ marginTop: '0.3rem', fontSize: '0.78rem', color: accent }}>{errors.address}</p>}
                    </div>
                  </div>
                )}
              </div>

              {/* ── RIGHT: order summary ── */}
              <div style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
              <div style={{
                background: cardBg, border: `1px solid ${cardBorder}`,
                boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
                position: 'relative', overflow: 'hidden', padding: '2rem' }}>

                <div style={{ position: 'absolute', top: 0, left: 0, width: '1.75rem', height: '1.75rem',
                  borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1.75rem', height: '1.75rem',
                  borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem',
                  marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid ${rule}` }}>
                  <span className="ghost-num" style={{ fontSize: '2rem' }}>02</span>
                  <div>
                    <p className="yatra" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: accent }}>सारांश</p>
                    <p className="h1" style={{ color: ink, fontWeight: 700, fontSize: '1.05rem' }}>Order Summary</p>
                  </div>
                </div>

                {/* cart items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.75rem',
                      padding: '0.75rem', background: darkMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.7)',
                      border: `1px solid ${rule}` }}>
                      <img src={item.image} alt={item.title}
                        style={{ width: '3.5rem', height: '4.5rem', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="h1" style={{ color: ink, fontWeight: 700, fontSize: '0.85rem',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </p>
                        <p style={{ color: muted, fontSize: '0.75rem' }}>Qty: {item.qty}</p>
                        <p className="h1" style={{ color: accent, fontWeight: 700, fontSize: '0.9rem' }}>
                          ₹{item.price * item.qty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* price rows */}
                {[
                  { label: `Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} items)`, value: `₹${subtotal}`, color: ink },
                  { label: 'Shipping', value: shipping === 0 ? 'FREE' : `₹${shipping}`, color: shipping === 0 ? '#1db954' : ink },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                    marginBottom: '0.65rem', fontSize: '0.88rem' }}>
                    <span style={{ color: muted }}>{row.label}</span>
                    <span className="h1" style={{ color: row.color, fontWeight: 700 }}>{row.value}</span>
                  </div>
                ))}

                <div style={{ height: '2px', background: `linear-gradient(90deg, ${accent}70, ${saffron}50, transparent)`, margin: '0.85rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                  <span className="h1" style={{ color: ink, fontSize: '1rem', fontWeight: 700 }}>Total</span>
                  <span className="h1" style={{ color: accent, fontSize: '1.6rem', fontWeight: 900 }}>₹{total}</span>
                </div>

                <button onClick={handlePayment} disabled={isProcessing} className="pulse-btn"
                  style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '0.6rem',
                    background: isProcessing ? 'rgba(100,100,100,0.4)' : 'linear-gradient(135deg,#1db954,#128c7e)',
                    color: '#fff', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em',
                    border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 24px rgba(29,185,84,0.3)', transition: 'gap .3s',
                  }}>
                  <Lock style={{ width: '0.9rem', height: '0.9rem' }} />
                  <span className="h1">{isProcessing ? 'Processing…' : `Pay ₹${total} Securely`}</span>
                  {!isProcessing && <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />}
                </button>

                <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
                  background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.25)', fontSize: '0.78rem',
                  color: darkMode ? '#86efac' : '#166534' }}>
                  <CreditCard style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0 }} />
                  Secure payment powered by Razorpay
                </div>
              </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;