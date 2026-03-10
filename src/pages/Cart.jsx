import { useState, useEffect, useContext } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink     = darkMode ? '#f0e8dc' : '#1a1209';
  const muted   = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.65)';
  const rule    = darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)';
  const cardBg  = darkMode
    ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
    : 'linear-gradient(145deg, #ffffff, #fdf6ee)';
  const cardBorder = darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)';

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const savings  = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.qty), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total    = subtotal + shipping;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .cart-wrap * { box-sizing: border-box; }
        .cart-wrap {
          font-family: 'DM Sans', system-ui, sans-serif;
          --ink:     ${ink};
          --paper:   ${darkMode ? '#141210' : '#fdf6ee'};
          --accent:  #c0392b;
          --saffron: #d4450c;
          --rule:    ${rule};
          --muted:   ${muted};
          background: var(--paper);
          color: var(--ink);
        }
        .cart-wrap .yatra { font-family: 'Yatra One', serif; }
        .cart-wrap .h1    { font-family: 'Playfair Display', Georgia, serif; }
        .cart-wrap .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900; color: transparent;
          -webkit-text-stroke: 1px var(--rule); user-select: none; line-height: 1;
        }
        @keyframes cartFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .cart-wrap .fu  { animation: cartFadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .cart-wrap .d1  { animation-delay: .08s; }
        .cart-wrap .d2  { animation-delay: .18s; }
        .cart-wrap .d3  { animation-delay: .28s; }

        @keyframes cartPulse {
          0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)}
          70%{box-shadow:0 0 0 14px rgba(192,57,43,0)}
          100%{box-shadow:0 0 0 0 rgba(192,57,43,0)}
        }
        .cart-wrap .pulse-btn:hover { animation: cartPulse 1s ease-out; }

        .cart-wrap .item-card {
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s;
        }
        .cart-wrap .item-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(192,57,43,0.12);
        }

        .cart-wrap .qty-btn {
          background: none; border: none; cursor: pointer;
          padding: 0.4rem; transition: color .2s;
          color: var(--muted);
        }
        .cart-wrap .qty-btn:hover:not(:disabled) { color: var(--accent); }
        .cart-wrap .qty-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .cart-wrap .remove-btn {
          background: none; border: none; cursor: pointer;
          padding: 0.4rem; color: var(--muted);
          transition: color .2s, background .2s;
        }
        .cart-wrap .remove-btn:hover { color: var(--accent); }

        .cart-wrap .trust-row { display: flex; align-items: center; gap: 0.6rem; }

        .cart-wrap .back-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: var(--muted); text-decoration: none; font-size: 0.88rem;
          font-weight: 500; transition: color .2s; margin-bottom: 2.5rem;
          letter-spacing: 0.03em;
        }
        .cart-wrap .back-link:hover { color: var(--accent); }
        .cart-wrap .back-link svg { transition: transform .2s; }
        .cart-wrap .back-link:hover svg { transform: translateX(-3px); }
      `}</style>

      <div className="cart-wrap min-h-screen">

        {/* ── Hero mini-header ── */}
        <section style={{
          minHeight: '22vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              खरीदारी की टोकरी
            </p>
            <h1 className="h1 fu d1" style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: ink, lineHeight: 1.1 }}>
              Shopping <em style={{ color: accent }}>Cart</em>
            </h1>
            <p className="fu d2" style={{ color: muted, fontSize: '0.9rem', marginTop: '0.5rem' }}>
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </section>

        {/* ── Main content ── */}
        <section style={{
          padding: '3rem 0 5rem',
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #141210 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #fdf6ee 100%)',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>

            <a href="/marketplace" className="back-link">
              <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
              Continue Shopping
            </a>

            {cart.length === 0 ? (
              /* ── Empty state ── */
              <div className="fu" style={{ textAlign: 'center', padding: '5rem 1rem',
                position: 'relative', overflow: 'hidden',
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '1.75rem', height: '1.75rem',
                  borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1.75rem', height: '1.75rem',
                  borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />

                <div style={{ width: '5rem', height: '5rem', margin: '0 auto 1.75rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${accent}12`, border: `1px solid ${accent}35` }}>
                  <ShoppingCart style={{ width: '2.2rem', height: '2.2rem', color: accent }} />
                </div>
                <p className="yatra" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: accent, marginBottom: '0.4rem' }}>
                  खाली टोकरी
                </p>
                <h2 className="h1" style={{ color: ink, fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Your cart is empty
                </h2>
                <p style={{ color: muted, fontSize: '1rem', marginBottom: '2rem' }}>
                  Add some books to get started!
                </p>
                <a href="/marketplace" className="pulse-btn" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.85rem 2rem',
                  background: `linear-gradient(135deg, ${accent}, ${saffron})`,
                  color: '#fff', fontWeight: 600, fontSize: '0.92rem',
                  letterSpacing: '0.04em', textDecoration: 'none',
                  boxShadow: `0 6px 24px rgba(192,57,43,0.35)`,
                }}>
                  <span className="h1">Browse Books</span>
                  <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
                </a>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}
                  className="cart-cols">
                  <style>{`
                    @media(min-width:900px){ .cart-cols{ grid-template-columns: 1fr 340px !important; } }
                  `}</style>

                  {/* LEFT — items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* section label */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem',
                      paddingBottom: '1rem', borderBottom: `1px solid ${rule}`, marginBottom: '0.25rem' }}>
                      <span className="ghost-num">01</span>
                      <div>
                        <p className="yatra" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: accent }}>आपकी किताबें</p>
                        <p className="h1" style={{ color: ink, fontSize: '1.1rem', fontWeight: 700 }}>Your Books</p>
                      </div>
                    </div>

                    {cart.map((item, idx) => (
                      <div key={item.id} className="item-card fu" style={{
                        animationDelay: `${idx * 0.07}s`,
                        background: cardBg,
                        border: `1px solid ${cardBorder}`,
                        boxShadow: darkMode ? 'none' : '0 4px 20px rgba(192,57,43,0.06)',
                        position: 'relative', overflow: 'hidden',
                        padding: '1.5rem',
                        display: 'flex', gap: '1.25rem', flexWrap: 'wrap',
                      }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                          background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />

                        {/* image */}
                        <div style={{ flexShrink: 0 }}>
                          <img src={item.image} alt={item.title}
                            style={{ width: '6rem', height: '8rem', objectFit: 'cover',
                              border: `1px solid ${cardBorder}` }} />
                        </div>

                        {/* details */}
                        <div style={{ flex: 1, minWidth: '160px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div>
                              <h3 className="h1" style={{ color: ink, fontSize: '1.1rem', fontWeight: 700,
                                marginBottom: '0.2rem', lineHeight: 1.3 }}>
                                {item.title}
                              </h3>
                              <p style={{ color: muted, fontSize: '0.82rem', marginBottom: '0.5rem' }}>by {item.author}</p>
                              <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem',
                                background: `${accent}15`, border: `1px solid ${accent}30`,
                                color: accent, fontSize: '0.65rem', letterSpacing: '0.18em',
                                textTransform: 'uppercase', fontWeight: 600 }}>
                                {item.category}
                              </span>
                            </div>
                            <button className="remove-btn" onClick={() => removeItem(item.id)}
                              aria-label="Remove item">
                              <Trash2 style={{ width: '1rem', height: '1rem' }} />
                            </button>
                          </div>

                          {/* price + qty */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexWrap: 'wrap', gap: '1rem', marginTop: '1rem',
                            paddingTop: '1rem', borderTop: `1px solid ${rule}` }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                              <span className="h1" style={{ color: accent, fontSize: '1.4rem', fontWeight: 900 }}>
                                ₹{item.price}
                              </span>
                              {item.originalPrice && (
                                <span style={{ color: muted, fontSize: '1rem', textDecoration: 'line-through' }}>
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>

                            {/* qty control */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem',
                              border: `1px solid ${rule}`,
                              background: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                              padding: '0.1rem 0.5rem' }}>
                              <button className="qty-btn" onClick={() => decreaseQty(item.id)}
                                disabled={item.qty === 1}>
                                <Minus style={{ width: '0.9rem', height: '0.9rem' }} />
                              </button>
                              <span className="h1" style={{ minWidth: '2rem', textAlign: 'center',
                                color: ink, fontWeight: 700, fontSize: '1rem' }}>
                                {item.qty}
                              </span>
                              <button className="qty-btn" onClick={() => increaseQty(item.id)}>
                                <Plus style={{ width: '0.9rem', height: '0.9rem' }} />
                              </button>
                            </div>

                            <span className="h1" style={{ color: ink, fontWeight: 700, fontSize: '1rem' }}>
                              ₹{item.price * item.qty}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* RIGHT — summary */}
                  <div style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
                    <div style={{
                      background: cardBg, border: `1px solid ${cardBorder}`,
                      boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
                      position: 'relative', overflow: 'hidden', padding: '2rem',
                    }}>
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
                          <p className="h1" style={{ color: ink, fontWeight: 700, fontSize: '1rem' }}>Order Summary</p>
                        </div>
                      </div>

                      {/* rows */}
                      {[
                        { label: `Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} items)`, value: `₹${subtotal}`, color: ink },
                        { label: 'Shipping', value: shipping === 0 ? 'FREE' : `₹${shipping}`, color: shipping === 0 ? '#1db954' : ink },
                        ...(savings > 0 ? [{ label: 'Total Savings', value: `-₹${savings}`, color: '#1db954' }] : []),
                      ].map((row, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                          marginBottom: '0.85rem', fontSize: '0.92rem' }}>
                          <span style={{ color: muted }}>{row.label}</span>
                          <span className="h1" style={{ color: row.color, fontWeight: 700 }}>{row.value}</span>
                        </div>
                      ))}

                      <div style={{ height: '2px', background: `linear-gradient(90deg, ${accent}70, ${saffron}50, transparent)`,
                        margin: '1rem 0' }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                        <span className="h1" style={{ color: ink, fontSize: '1.1rem', fontWeight: 700 }}>Total</span>
                        <span className="h1" style={{ color: accent, fontSize: '1.75rem', fontWeight: 900 }}>₹{total}</span>
                      </div>

                      {shipping > 0 && (
                        <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem',
                          background: darkMode ? 'rgba(255,193,7,0.08)' : 'rgba(255,193,7,0.1)',
                          border: `1px solid ${darkMode ? 'rgba(255,193,7,0.2)' : 'rgba(180,130,0,0.25)'}`,
                          fontSize: '0.82rem', color: darkMode ? '#fbbf24' : '#92650a' }}>
                          Add ₹{500 - subtotal} more for FREE shipping 🎉
                        </div>
                      )}

                      <button
                        className="pulse-btn"
                        disabled={cart.length === 0}
                        onClick={() => navigate(user ? '/checkout' : '/checkout?guest=1')}
                        style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', gap: '0.6rem',
                          background: `linear-gradient(135deg, ${accent}, ${saffron})`,
                          color: '#fff', fontWeight: 600, fontSize: '0.95rem',
                          letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
                          boxShadow: `0 6px 24px rgba(192,57,43,0.35)`, transition: 'gap .3s',
                        }}>
                        <span className="h1">Proceed to Checkout</span>
                        <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
                      </button>

                      {/* trust badges */}
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: `1px solid ${rule}`,
                        display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {[
                          { icon: ShieldCheck, text: 'Secure Payment' },
                          { icon: Truck,       text: 'Fast Delivery' },
                          { icon: Package,     text: 'Easy Returns' },
                        ].map(({ icon: Icon, text }) => (
                          <div key={text} className="trust-row" style={{ color: muted, fontSize: '0.83rem' }}>
                            <Icon style={{ width: '0.9rem', height: '0.9rem', color: accent, flexShrink: 0 }} />
                            {text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;