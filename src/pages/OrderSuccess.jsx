import { useContext } from 'react';
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const OrderSuccess = () => {
  const { darkMode } = useContext(DarkModeContext);

  const accent  = '#c0392b';
  const saffron = '#d4450c';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .os-wrap * { box-sizing: border-box; }
        .os-wrap {
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
        .os-wrap .yatra { font-family: 'Yatra One', serif; }
        .os-wrap .h1    { font-family: 'Playfair Display', Georgia, serif; }

        @keyframes osFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .os-wrap .fu  { animation: osFadeUp .75s cubic-bezier(.22,1,.36,1) both; }
        .os-wrap .d1  { animation-delay: .1s; }
        .os-wrap .d2  { animation-delay: .22s; }
        .os-wrap .d3  { animation-delay: .36s; }
        .os-wrap .d4  { animation-delay: .5s; }

        @keyframes osPop { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        .os-wrap .check-pop { animation: osPop .65s cubic-bezier(.22,1,.36,1) .08s both; }

        @keyframes osPulseBtn {
          0%  { box-shadow: 0 0 0 0 rgba(192,57,43,.45); }
          70% { box-shadow: 0 0 0 14px rgba(192,57,43,0); }
          100%{ box-shadow: 0 0 0 0 rgba(192,57,43,0); }
        }
        .os-wrap .pulse-btn:hover { animation: osPulseBtn 1s ease-out; }

        @keyframes osInkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.6; } 85% { opacity:.6; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .os-wrap .ink-line { animation: osInkRise linear infinite; }
      `}</style>

      <div className="os-wrap min-h-screen" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '7rem 1.5rem 4rem',
        background: darkMode
          ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
          : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* ink rise lines — mirrors hero */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[
            { left: '10%', h: '38vh', delay: '0s',  dur: '15s' },
            { left: '28%', h: '28vh', delay: '4s',  dur: '19s' },
            { left: '54%', h: '46vh', delay: '8s',  dur: '13s' },
            { left: '73%', h: '33vh', delay: '2s',  dur: '17s' },
            { left: '89%', h: '40vh', delay: '6s',  dur: '21s' },
          ].map((l, i) => (
            <div key={i} className="ink-line" style={{
              position: 'absolute', bottom: 0, left: l.left,
              width: '1px', height: l.h,
              background: `linear-gradient(to top, transparent, ${accent}75, transparent)`,
              animationDuration: l.dur, animationDelay: l.delay,
            }} />
          ))}
        </div>

        {/* card */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '30rem', width: '100%',
          padding: '3rem 2.5rem',
          background: darkMode
            ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
            : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
          border: `1px solid ${darkMode ? 'rgba(192,57,43,0.25)' : 'rgba(192,57,43,0.18)'}`,
          boxShadow: darkMode ? '0 24px 60px rgba(0,0,0,0.6)' : '0 8px 40px rgba(192,57,43,0.12)',
          textAlign: 'center',
        }}>
          {/* corner accents */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '1.75rem', height: '1.75rem',
            borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '1.75rem', height: '1.75rem',
            borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />
          {/* top ink bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />

          {/* ghost watermark */}
          <div className="h1" style={{ position: 'absolute', bottom: '-0.5rem', right: '0.75rem',
            fontSize: '7rem', fontWeight: 900, color: 'transparent', lineHeight: 1,
            WebkitTextStroke: `1px ${darkMode ? 'rgba(192,57,43,0.08)' : 'rgba(192,57,43,0.06)'}`,
            userSelect: 'none', pointerEvents: 'none' }}>✦</div>

          {/* green check */}
          <div className="check-pop" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '5rem', height: '5rem', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.4)' }}>
              <CheckCircle style={{ width: '2.5rem', height: '2.5rem', color: '#1db954' }} />
            </div>
          </div>

          {/* label */}
          <p className="yatra fu d1" style={{ fontSize: '0.82rem', letterSpacing: '0.14em',
            color: '#1db954', marginBottom: '0.4rem' }}>
            ऑर्डर सफल
          </p>

          <h1 className="h1 fu d2" style={{ color: 'var(--ink)', fontSize: '2rem',
            fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}>
            Order <em style={{ color: '#1db954' }}>Successful!</em>
          </h1>

          {/* ink bar */}
          <div className="fu d3" style={{ height: '2px', margin: '0 auto 1.25rem',
            width: '4rem', background: `linear-gradient(90deg, ${accent}, ${saffron})` }} />

          <p className="fu d3" style={{ color: 'var(--muted)', fontSize: '1rem',
            lineHeight: '1.75', marginBottom: '2rem' }}>
            Thank you for your purchase.<br />
            A confirmation has been sent to your email.
          </p>

          <div className="fu d4" style={{ display: 'flex', gap: '0.75rem',
            justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/marketplace" className="pulse-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.8rem 1.6rem',
                background: `linear-gradient(135deg, ${accent}, ${saffron})`,
                color: '#fff', fontWeight: 600, fontSize: '0.88rem',
                letterSpacing: '0.04em', textDecoration: 'none',
                boxShadow: `0 6px 24px rgba(192,57,43,0.35)` }}>
              <span className="h1">Continue Shopping</span>
              <ArrowRight style={{ width: '0.85rem', height: '0.85rem' }} />
            </a>

            <a href="/orders"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.8rem 1.6rem',
                border: `1.5px solid ${darkMode ? 'rgba(240,232,220,0.22)' : 'rgba(26,18,9,0.22)'}`,
                color: 'var(--ink)', fontWeight: 600, fontSize: '0.88rem',
                letterSpacing: '0.04em', textDecoration: 'none',
                background: 'transparent', transition: 'border-color .2s' }}>
              <BookOpen style={{ width: '0.85rem', height: '0.85rem' }} />
              <span className="h1">My Orders</span>
            </a>
          </div>
        </div>

      </div>
    </>
  );
};

export default OrderSuccess;