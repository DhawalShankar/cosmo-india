import { useContext } from 'react';
import { Package, ArrowRight } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const Orders = () => {
  const { darkMode } = useContext(DarkModeContext);

  const accent  = '#c0392b';
  const saffron = '#d4450c';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .ord-wrap * { box-sizing: border-box; }
        .ord-wrap {
          font-family: 'DM Sans', system-ui, sans-serif;
          --ink:     ${darkMode ? '#f0e8dc' : '#1a1209'};
          --paper:   ${darkMode ? '#141210' : '#fdf6ee'};
          --accent:  #c0392b;
          --saffron: #d4450c;
          --rule:    ${darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)'};
          --muted:   ${darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.65)'};
          background: var(--paper);
          color: var(--ink);
        }
        .ord-wrap .yatra { font-family: 'Yatra One', serif; }
        .ord-wrap .h1    { font-family: 'Playfair Display', Georgia, serif; }
        .ord-wrap .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--rule);
          user-select: none; line-height: 1;
        }
        @keyframes ordPulseBtn {
          0%  { box-shadow: 0 0 0 0 rgba(192,57,43,.45); }
          70% { box-shadow: 0 0 0 14px rgba(192,57,43,0); }
          100%{ box-shadow: 0 0 0 0 rgba(192,57,43,0); }
        }
        .ord-wrap .pulse-btn:hover { animation: ordPulseBtn 1s ease-out; }
        @keyframes ordFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .ord-wrap .fu { animation: ordFadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .ord-wrap .d1 { animation-delay: .1s; }
        .ord-wrap .d2 { animation-delay: .22s; }
      `}</style>

      <div className="ord-wrap min-h-screen">
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '8rem 2rem 5rem' }}>

          {/* Section header — mirrors home page pattern */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem',
            marginBottom: '3rem', paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--rule)' }}>
            <span className="ghost-num">01</span>
            <div>
              <p className="yatra" style={{ fontSize: '0.82rem', letterSpacing: '0.12em',
                color: accent, marginBottom: '0.25rem' }}>ऑर्डर</p>
              <h1 className="h1" style={{ color: 'var(--ink)', fontSize: '2rem', fontWeight: 700 }}>
                My Orders
              </h1>
            </div>
          </div>

          {/* Empty state */}
          <div className="fu d1" style={{ textAlign: 'center', padding: '5rem 1rem',
            position: 'relative', overflow: 'hidden',
            background: darkMode
              ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))'
              : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
            border: `1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)'}`,
            boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
          }}>
            {/* corner accents */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '1.75rem', height: '1.75rem',
              borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1.75rem', height: '1.75rem',
              borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />

            {/* ghost watermark */}
            <div className="h1" style={{ position: 'absolute', bottom: '-1rem', right: '1rem',
              fontSize: '9rem', fontWeight: 900, color: 'transparent', lineHeight: 1,
              WebkitTextStroke: `1px ${darkMode ? 'rgba(192,57,43,0.08)' : 'rgba(192,57,43,0.06)'}`,
              userSelect: 'none', pointerEvents: 'none' }}>
              ✦
            </div>

            <div style={{ width: '5rem', height: '5rem', margin: '0 auto 1.75rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${accent}12`, border: `1px solid ${accent}35` }}>
              <Package style={{ width: '2.2rem', height: '2.2rem', color: accent }} />
            </div>

            <p className="yatra fu d1" style={{ fontSize: '0.85rem', letterSpacing: '0.12em',
              color: accent, marginBottom: '0.5rem' }}>
              कोई ऑर्डर नहीं
            </p>
            <h2 className="h1 fu d2" style={{ color: 'var(--ink)', fontSize: '1.6rem',
              fontWeight: 700, marginBottom: '0.75rem' }}>
              No orders yet
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.7' }}>
              Start shopping and your orders will appear here.
            </p>

            <a href="/marketplace" className="pulse-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.85rem 2rem',
                background: `linear-gradient(135deg, ${accent}, ${saffron})`,
                color: '#fff', fontWeight: 600, fontSize: '0.92rem',
                letterSpacing: '0.04em', textDecoration: 'none',
                boxShadow: `0 6px 24px rgba(192,57,43,0.35)` }}>
              <span className="h1">Browse Books</span>
              <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Orders;