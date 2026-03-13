import { useState, useContext, useEffect } from 'react';
import { ShoppingCart, Heart, ArrowRight, Star, SlidersHorizontal, BookOpen } from 'lucide-react';
import PrivacyPolicy from "../policies/PrivacyPolicy";
import Terms from "../policies/Terms";
import Shipping from "../policies/Shipping";
import Refund from "../policies/Refund";
import Contact from "../policies/Contact";
import { useNavigate, useLocation } from "react-router-dom";
import { DarkModeContext } from '../context/DarkModeContext';
import { useCart } from "../context/CartContext";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

// ── Fallback jab image na ho ──
const BookFallback = ({ darkMode, accent, saffron }) => (
  <div style={{
    width: '100%', height: '100%', position: 'relative',
    background: darkMode
      ? 'linear-gradient(135deg, #1a0a08 0%, #2e0c07 50%, #1a0a08 100%)'
      : 'linear-gradient(135deg, #fde8c8 0%, #f9c88a 50%, #fde8c8 100%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
  }}>
    <div style={{ position: 'absolute', inset: '12px',
      border: `1px solid ${darkMode ? 'rgba(192,57,43,0.25)' : 'rgba(192,57,43,0.2)'}`, pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', inset: '18px',
      border: `1px solid ${darkMode ? 'rgba(192,57,43,0.12)' : 'rgba(192,57,43,0.1)'}`, pointerEvents: 'none' }} />
    <div style={{ width: '3.5rem', height: '3.5rem',
      background: `linear-gradient(135deg, ${accent}, ${saffron})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BookOpen style={{ width: '1.75rem', height: '1.75rem', color: '#fff' }} />
    </div>
    <div style={{ display: 'flex', gap: '6px', marginTop: '0.5rem' }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ width: '5px', height: '5px',
          background: i === 1 ? accent : `${accent}50`, borderRadius: '50%' }} />
      ))}
    </div>
  </div>
);

// ── Interactive Rating Stars ──
const RatingStars = ({ productId, currentRating, ratingCount, darkMode, accent, saffron, muted, onRated }) => {
  const [hovered, setHovered] = useState(0);
  const [userRating, setUserRating] = useState(() => {
    try { return parseInt(localStorage.getItem(`rating_${productId}`)) || 0; } catch { return 0; }
  });
  const [submitting, setSubmitting] = useState(false);
  const [justRated, setJustRated] = useState(false);

  const handleRate = async (star) => {
    if (userRating || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${BACKEND}/products/${productId}/rating`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: star }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(`rating_${productId}`, star);
        setUserRating(star);
        setJustRated(true);
        onRated(productId, data.product.rating, data.product.rating_count);
        setTimeout(() => setJustRated(false), 2000);
      }
    } catch { /* fail silently */ }
    finally { setSubmitting(false); }
  };

  const displayRating = hovered || userRating || currentRating;
  const alreadyRated = Boolean(userRating);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {/* Stars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !alreadyRated && setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            disabled={alreadyRated || submitting}
            style={{
              background: 'none', border: 'none', padding: '1px',
              cursor: alreadyRated ? 'default' : 'pointer',
              transform: hovered >= star && !alreadyRated ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            }}
          >
            <Star style={{
              width: '0.82rem', height: '0.82rem',
              color: star <= Math.floor(displayRating) ? saffron : (hovered >= star && !alreadyRated ? saffron : (darkMode ? 'rgba(192,57,43,0.3)' : 'rgba(192,57,43,0.2)')),
              fill: star <= Math.floor(displayRating) ? saffron : 'none',
              transition: 'color 0.15s, fill 0.15s',
            }} />
          </button>
        ))}
        <span style={{ fontSize: '0.72rem', color: muted, marginLeft: '4px' }}>
          {currentRating > 0 ? currentRating.toFixed(1) : '—'}
          {ratingCount > 0 && <span style={{ opacity: 0.6 }}> ({ratingCount})</span>}
        </span>
      </div>

      {/* Feedback text */}
      <p style={{ fontSize: '0.65rem', margin: 0,
        color: justRated ? '#1db954' : alreadyRated ? muted : accent,
        opacity: alreadyRated || justRated ? 1 : 0.8,
      }}>
        {justRated ? '✓ Thanks for rating!' : alreadyRated ? `You rated ${userRating}★` : 'Tap to rate'}
      </p>
    </div>
  );
};

const Marketplace = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink     = darkMode ? '#f0e8dc' : '#1a1209';
  const paper   = darkMode ? '#141210' : '#fdf6ee';
  const muted   = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.62)';
  const rule    = darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.15)';

  // ── Fetch products ──
  useEffect(() => {
    fetch(`${BACKEND}/products`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.products || []);
        setProducts(list.map(p => ({
          ...p,
          originalPrice: p.original_price || p.price,
          inStock:       p.in_stock ?? true,
        })));
      })
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  // ── Update rating locally after user rates ──
  const handleRated = (productId, newRating, newCount) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, rating: newRating, rating_count: newCount } : p
    ));
  };

  const policyMap = {
    "/privacy-policy": <PrivacyPolicy />,
    "/terms": <Terms />,
    "/shipping-policy": <Shipping />,
    "/refund-policy": <Refund />,
    "/contact": <Contact />,
  };
  const policyContent = policyMap[location.pathname] || null;

  const allCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const categories = [
    { id: 'all', name: 'All Books', count: products.length },
    ...allCategories.map(cat => ({
      id: cat, name: cat,
      count: products.filter(p => p.category === cat).length,
    })),
  ];

  const filteredProducts = products.filter(p =>
    selectedCategory === 'all' || p.category === selectedCategory
  );
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLow')  return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (sortBy === 'rating')    return b.rating - a.rating;
    return 0;
  });

  const toggleWishlist = (id) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const discount = (orig, price) => orig > price ? Math.round(((orig - price) / orig) * 100) : 0;

  return (
    <div style={{ background: paper, color: ink, fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif", minHeight:'100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .mp * { box-sizing: border-box; }
        .mp-h1    { font-family: 'Playfair Display', Georgia, serif; }
        .mp-yatra { font-family: 'Yatra One', serif; }

        .mp-card {
          transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
          cursor: pointer;
        }
        .mp-card:hover { transform: translateY(-6px); }

        .mp-btn-primary {
          background: linear-gradient(135deg, ${accent}, ${saffron});
          color: #fff; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600;
          transition: opacity .2s, box-shadow .25s;
        }
        .mp-btn-primary:hover { opacity: 0.92; box-shadow: 0 8px 28px rgba(192,57,43,0.38); }
        .mp-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }

        .mp-cat-btn {
          background: none; border: 1px solid ${rule}; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500;
          padding: 7px 18px; color: ${muted}; transition: all .2s;
        }
        .mp-cat-btn:hover { border-color: ${accent}; color: ${accent}; }
        .mp-cat-btn.active {
          background: linear-gradient(135deg, ${accent}, ${saffron});
          border-color: transparent; color: #fff;
        }

        .mp-select {
          background: ${darkMode ? 'rgba(255,255,255,0.04)' : '#ffffff'};
          border: 1px solid ${rule}; color: ${ink};
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
          padding: 8px 14px; outline: none; cursor: pointer;
        }
        .mp-select:focus { border-color: ${accent}; }

        .mp-wish {
          position: absolute; top: 12px; right: 12px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          background: ${darkMode ? 'rgba(20,18,16,0.75)' : 'rgba(253,246,238,0.88)'};
          border: 1px solid ${rule}; backdrop-filter: blur(6px);
          cursor: pointer; transition: background .2s, border-color .2s;
        }
        .mp-wish:hover, .mp-wish.active { background: ${accent}; border-color: ${accent}; }
        .mp-wish.active svg { color: #fff; fill: #fff; }
        .mp-wish:hover svg { color: #fff; }

        @keyframes pulseBtn {
          0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)}
          70%{box-shadow:0 0 0 14px rgba(192,57,43,0)}
          100%{box-shadow:0 0 0 0 rgba(192,57,43,0)}
        }
        .mp-btn-primary:active:not(:disabled) { animation: pulseBtn .6s ease-out; }

        @keyframes inkRise {
          0%{transform:translateY(110%);opacity:0} 15%{opacity:.7}
          85%{opacity:.7} 100%{transform:translateY(-110%);opacity:0}
        }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        @keyframes shimmer {
          0%{background-position:-400px 0} 100%{background-position:400px 0}
        }
        .mp-skeleton {
          background: ${darkMode
            ? 'linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%)'
            : 'linear-gradient(90deg,#f0e8dc 25%,#e8ddd0 50%,#f0e8dc 75%)'};
          background-size: 400px 100%;
          animation: shimmer 1.4s ease infinite;
        }
      `}</style>

      <div className="mp">

        {/* ══ HERO ══ */}
        <section className="relative overflow-hidden" style={{
          paddingTop: '120px', paddingBottom: '72px',
          background: darkMode
            ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2a0c07 0%, #141210 55%, #0e0c0a 100%)'
            : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)',
        }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`radial-gradient(circle, ${darkMode?'rgba(192,57,43,0.15)':'rgba(192,57,43,0.12)'} 1px, transparent 1px)`,
            backgroundSize:'36px 36px', opacity:0.55,
          }}/>
          {[
            { left:'8%',  delay:'0s',   dur:'9s',  h:'55%', op:0.12 },
            { left:'28%', delay:'2s',   dur:'12s', h:'45%', op:0.08 },
            { left:'62%', delay:'1s',   dur:'10s', h:'60%', op:0.1  },
            { left:'82%', delay:'3.5s', dur:'8s',  h:'40%', op:0.09 },
          ].map((l,i) => (
            <div key={i} className="absolute bottom-0 pointer-events-none" style={{
              left:l.left, width:'1px', height:l.h,
              background:`linear-gradient(to top,${accent},transparent)`,
              opacity:l.op, animation:`inkRise ${l.dur} ${l.delay} linear infinite`,
            }}/>
          ))}
          <div className="absolute inset-0 pointer-events-none" style={{
            background:`radial-gradient(ellipse 50% 60% at 50% 60%, rgba(192,57,43,0.1) 0%, transparent 70%)`
          }}/>
          <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-16 text-center">
            <p className="mp-yatra mb-3" style={{ color:accent, fontSize:'0.88rem', letterSpacing:'0.12em' }}>
              पुस्तक भंडार
            </p>
            <h1 className="mp-h1 font-black mb-4 leading-tight"
              style={{ fontSize:'clamp(2.4rem,5.5vw,4rem)', color: darkMode?'#f0e8dc':ink }}>
              Book <em style={{ color:accent }}>Marketplace</em>
            </h1>
            <p style={{ color:muted, fontSize:'1.05rem', maxWidth:'36rem', margin:'0 auto 1.5rem' }}>
              Discover timeless wisdom from our curated collection of Bharatiya literature
            </p>
            <span style={{
              display:'inline-block', padding:'6px 20px', border:`1px solid ${rule}`,
              background: darkMode?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.55)',
              color:muted, fontSize:'0.82rem', letterSpacing:'0.06em',
            }}>
              {productsLoading ? 'Loading…' : `${sortedProducts.length} Books Available`}
            </span>
          </div>
        </section>

        {/* ══ MARQUEE ══ */}
        <div style={{ background: accent, overflow: 'hidden', padding: '10px 0' }}>
          <div style={{ display:'flex', width:'max-content', willChange:'transform', animation:'marquee 140s linear infinite' }}>
            {[...Array(2)].map((_, gi) => (
              <div key={gi} style={{ display:'flex', flexShrink:0 }}>
                {[...Array(10)].map((_, i) => (
                  <span key={i} style={{
                    fontSize:'0.75rem', paddingRight:'2.5rem', whiteSpace:'nowrap',
                    flexShrink:0, color:'#fff', fontFamily:"'Yatra One', serif", letterSpacing:'0.1em',
                  }}>
                    ✦ &nbsp; कलम की आग &nbsp; ✦ &nbsp; Fearless Stories of Bharat &nbsp; ✦ &nbsp; Cosmo India Prakashan &nbsp; ✦ &nbsp; भारतीय विचार &nbsp; ✦ &nbsp; Since 1980s
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══ FILTERS + PRODUCTS ══ */}
        <section className="py-16" style={{ background: paper }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">

            <div className="flex items-center gap-5 mb-10 pb-5" style={{ borderBottom:`1px solid ${rule}` }}>
              <span className="mp-h1 font-black shrink-0"
                style={{ fontSize:'3rem', color:'transparent', WebkitTextStroke:`1px ${rule}`, lineHeight:1 }}>
                01
              </span>
              <div>
                <p className="mp-yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>हमारा संग्रह</p>
                <h2 className="mp-h1 font-bold" style={{ color:ink, fontSize:'1.85rem' }}>Our Publications</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <div className="flex flex-wrap gap-2.5 items-center">
                <SlidersHorizontal style={{ width:'0.95rem', height:'0.95rem', color:muted, flexShrink:0 }}/>
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                    className={`mp-cat-btn${selectedCategory === cat.id ? ' active' : ''}`}>
                    {cat.name}
                    <span style={{ marginLeft:'4px', opacity:0.7 }}>({cat.count})</span>
                  </button>
                ))}
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="mp-select">
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* ── Skeletons ── */}
            {productsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ border:`1px solid ${rule}`, overflow:'hidden',
                    background: darkMode?'rgba(255,255,255,0.03)':'#fff' }}>
                    <div className="mp-skeleton" style={{ height:'260px' }} />
                    <div style={{ padding:'1.4rem 1.5rem', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                      <div className="mp-skeleton" style={{ height:'12px', width:'40%' }} />
                      <div className="mp-skeleton" style={{ height:'18px', width:'80%' }} />
                      <div className="mp-skeleton" style={{ height:'14px', width:'55%' }} />
                      <div className="mp-skeleton" style={{ height:'40px', marginTop:'0.5rem' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Products grid ── */}
            {!productsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="mp-card relative overflow-hidden"
                    style={{
                      background: darkMode
                        ? 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))'
                        : 'linear-gradient(145deg,#ffffff,#fdf6ee)',
                      border:`1px solid ${rule}`,
                      boxShadow: darkMode ? 'none' : '0 2px 20px rgba(192,57,43,0.06)',
                    }}>

                    <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px',
                      background:`linear-gradient(90deg,${accent},${saffron},transparent)`, zIndex:2 }}/>

                    {/* Image */}
                    <div style={{ position:'relative', height:'260px', overflow:'hidden' }}>
                      {product.image && !imgErrors[product.id] ? (
                        <img src={product.image} alt={product.title}
                          style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .6s ease' }}
                          onMouseEnter={e => e.currentTarget.style.transform='scale(1.06)'}
                          onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                          onError={() => setImgErrors(prev => ({ ...prev, [product.id]: true }))}
                        />
                      ) : (
                        <BookFallback darkMode={darkMode} accent={accent} saffron={saffron} />
                      )}

                      <div style={{ position:'absolute', inset:0,
                        background:`linear-gradient(to top, ${darkMode?'rgba(20,18,16,0.7)':'rgba(253,246,238,0.5)'} 0%, transparent 50%)` }}/>

                      {product.bestseller && (
                        <span style={{ position:'absolute', top:'12px', left:'12px', zIndex:3,
                          background:`linear-gradient(135deg,${accent},${saffron})`,
                          color:'#fff', fontSize:'0.62rem', fontWeight:700,
                          padding:'4px 10px', letterSpacing:'0.12em', textTransform:'uppercase' }}>
                          Bestseller
                        </span>
                      )}

                      {discount(product.originalPrice, product.price) > 0 && (
                        <span style={{ position:'absolute', bottom:'12px', left:'12px', zIndex:3,
                          background:'rgba(34,197,94,0.9)', backdropFilter:'blur(4px)',
                          color:'#fff', fontSize:'0.65rem', fontWeight:700,
                          padding:'3px 8px', letterSpacing:'0.06em' }}>
                          {discount(product.originalPrice, product.price)}% OFF
                        </span>
                      )}

                      {/* Out of stock overlay */}
                      {!product.inStock && (
                        <div style={{ position:'absolute', inset:0, zIndex:4,
                          background:'rgba(0,0,0,0.55)', backdropFilter:'blur(2px)',
                          display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ background:'rgba(0,0,0,0.7)', color:'#fff',
                            padding:'6px 16px', fontSize:'0.75rem', fontWeight:700,
                            letterSpacing:'0.12em', textTransform:'uppercase',
                            border:'1px solid rgba(255,255,255,0.2)' }}>Out of Stock</span>
                        </div>
                      )}

                      <button onClick={() => toggleWishlist(product.id)}
                        className={`mp-wish${wishlist.includes(product.id) ? ' active' : ''}`}
                        style={{ zIndex:5 }}>
                        <Heart style={{ width:'0.9rem', height:'0.9rem',
                          color: wishlist.includes(product.id) ? '#fff' : muted }}/>
                      </button>
                    </div>

                    {/* Info */}
                    <div style={{ padding:'1.4rem 1.5rem 1.6rem' }}>

                      {/* Category + Rating row */}
                      <div style={{ display:'flex', alignItems:'flex-start',
                        justifyContent:'space-between', marginBottom:'0.75rem', gap:'0.5rem' }}>
                        <span style={{
                          fontSize:'0.62rem', letterSpacing:'0.18em', textTransform:'uppercase',
                          fontWeight:600, color:accent, flexShrink:0,
                          background:`${accent}12`, border:`1px solid ${accent}28`, padding:'2px 10px',
                        }}>
                          {product.category}
                        </span>
                        {/* ── Interactive Rating ── */}
                        <RatingStars
                          productId={product.id}
                          currentRating={product.rating || 0}
                          ratingCount={product.rating_count || 0}
                          darkMode={darkMode}
                          accent={accent}
                          saffron={saffron}
                          muted={muted}
                          onRated={handleRated}
                        />
                      </div>

                      <h3 className="mp-h1 font-bold mb-1 leading-snug"
                        style={{ color:ink, fontSize:'1.08rem', lineHeight:'1.4' }}>
                        {product.title}
                      </h3>
                      <p style={{ color:muted, fontSize:'0.82rem', marginBottom:'0.6rem', letterSpacing:'0.02em' }}>
                        by {product.author}
                      </p>
                      <p style={{ color:muted, fontSize:'0.88rem', lineHeight:'1.65',
                        marginBottom:'1rem', borderLeft:`2px solid ${accent}40`, paddingLeft:'10px' }}>
                        {product.description}
                      </p>

                      <div style={{ display:'flex', alignItems:'baseline', gap:'10px',
                        marginBottom:'1rem', paddingTop:'0.75rem', borderTop:`1px solid ${rule}` }}>
                        <span className="mp-h1 font-black" style={{ color:accent, fontSize:'1.5rem' }}>
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span style={{ color:muted, fontSize:'0.95rem', textDecoration:'line-through' }}>
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => product.inStock && addToCart(product)}
                        disabled={!product.inStock}
                        className="mp-btn-primary"
                        style={{ width:'100%', padding:'11px 0',
                          display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                          fontSize:'0.9rem', letterSpacing:'0.03em' }}>
                        <ShoppingCart style={{ width:'0.95rem', height:'0.95rem' }}/>
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        {product.inStock && <ArrowRight style={{ width:'0.85rem', height:'0.85rem' }}/>}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!productsLoading && sortedProducts.length === 0 && (
              <div style={{ textAlign:'center', padding:'5rem 0', color:muted }}>
                <p className="mp-h1" style={{ fontSize:'1.4rem', marginBottom:'0.5rem' }}>No books found</p>
                <p style={{ fontSize:'0.95rem' }}>Try a different category</p>
              </div>
            )}

          </div>
        </section>

        {/* Policy modal */}
        {policyContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }}>
            <div style={{ background:paper, border:`1px solid ${rule}`,
              maxWidth:'700px', width:'100%', maxHeight:'80vh',
              overflowY:'auto', padding:'2rem', position:'relative' }}>
              <button onClick={() => navigate('/marketplace')}
                style={{ position:'absolute', top:'1rem', right:'1rem',
                  background:'none', border:`1px solid ${rule}`,
                  color:muted, cursor:'pointer', padding:'4px 10px', fontSize:'0.8rem' }}>
                ✕ Close
              </button>
              {policyContent}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Marketplace;