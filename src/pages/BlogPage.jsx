import { useContext, useState } from 'react';
import { PenTool, ArrowRight } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import { Link } from 'react-router-dom'; // swap/remove if you're not using react-router
import Posts from './Posts';

const BlogPage = () => {
  const { darkMode } = useContext(DarkModeContext);

  // Active tag filters — multi-select. Empty array = show everything.
  // This is shared with <Posts>, which also has its own dynamic tag bar
  // built from whatever tags actually exist in the doc; the hero scraps
  // below are just shortcuts into that same set, not a separate fixed list.
  const [selectedTags, setSelectedTags] = useState([]);

  const accent = '#c0392b';
  const saffron = '#d4450c';
  const ink = darkMode ? '#f0e8dc' : '#1a1209';
  const paper = darkMode ? '#141210' : '#fdf6ee';
  const ruleLine = darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.82)' : 'rgba(26,18,9,0.72)';

  // Hero follows the toggle like everything else — light mode just gets a
  // saturated terracotta/rust instead of falling back to white/cream.
  const heroBg = darkMode
    ? 'radial-gradient(ellipse 120% 90% at 50% 28%, #2a1008 0%, #1a0d06 48%, #100804 100%)'
    : 'radial-gradient(ellipse 120% 90% at 50% 28%, #f2a65a 0%, #dd7a3a 48%, #b8502a 100%)';
  const heroInk = darkMode ? '#f2e9dc' : '#2a1208';
  const heroMuted = darkMode ? 'rgba(242,233,220,0.68)' : 'rgba(42,18,8,0.62)';
  const heroDotColor = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  // "tag" is matched (case-insensitively) against each post's Tags: list in
  // the doc. "label"/"hindi" are just what's printed on the scrap itself.
  const scraps = [
    { label: 'My Story?', hindi: 'मेरी कहानी', tag: 'My Story', top: '10%', left: '4%', right: 'auto', bottom: 'auto', rotate: '-7deg' },
    { label: 'Your Story?', hindi: 'तुम्हारी कहानी', tag: 'Your Story', top: '6%', right: '5%', left: 'auto', bottom: 'auto', rotate: '5deg' },
    { label: 'Poetry?', hindi: 'कविता', tag: 'Poetry', top: 'auto', left: '7%', right: 'auto', bottom: '10%', rotate: '4deg' },
    { label: 'Spirituality!!', hindi: 'आध्यात्म', tag: 'Spirituality', top: 'auto', right: '6%', left: 'auto', bottom: '8%', rotate: '-5deg' },
  ];

  // Toggle a tag in/out of the selection (multi-select, OR-matched in Posts).
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.toLowerCase() === tag.toLowerCase())
        ? prev.filter((t) => t.toLowerCase() !== tag.toLowerCase())
        : [...prev, tag]
    );
  };
  const clearTags = () => setSelectedTags([]);
  const isTagActive = (tag) => selectedTags.some((t) => t.toLowerCase() === tag.toLowerCase());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Caveat:wght@500;700&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');

        :root {
          --bp-ink: ${ink}; --bp-paper: ${paper}; --bp-accent: ${accent};
          --bp-saffron: ${saffron}; --bp-rule: ${ruleLine}; --bp-muted: ${mutedText};
        }
        .bp * { box-sizing: border-box; }
        .bp { background: var(--bp-paper); color: var(--bp-ink);
              font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif; font-size: 15.5px; }
        .bp .yatra   { font-family: 'Yatra One', serif; }
        .bp .h1f     { font-family: 'Playfair Display', Georgia, serif; }
        .bp .caveat  { font-family: 'Caveat', cursive; }

        @keyframes bp-fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .bp .fu { animation: bp-fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .bp .d1 { animation-delay:.1s; }
        .bp .d2 { animation-delay:.2s; }

        .bp .cta-link { transition: gap .3s ease; }
        .bp .cta-link:hover { gap: 0.7rem !important; }

        /* ── Scattered paper scraps ── */
        @keyframes bp-scrapIn {
          from { opacity:0; transform: translateY(14px) rotate(var(--r)) scale(0.92); }
          to   { opacity:1; transform: translateY(0) rotate(var(--r)) scale(1); }
        }
        .bp .scrap {
          position: absolute;
          background: linear-gradient(160deg,#fbf3e4,#efe0c4);
          color: #2a1208;
          padding: 0.9rem 1.15rem;
          box-shadow: 0 14px 34px rgba(0,0,0,0.4), 0 2px 0 rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.05);
          transform: rotate(var(--r));
          animation: bp-scrapIn .8s cubic-bezier(.22,1,.36,1) both;
          transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
          cursor: pointer;
          max-width: 180px;
        }
        .bp .scrap:hover {
          transform: rotate(0deg) translateY(-4px) scale(1.04);
          box-shadow: 0 22px 44px rgba(0,0,0,0.5);
          z-index: 5;
        }
        .bp .scrap.active {
          transform: rotate(0deg) translateY(-4px) scale(1.06);
          box-shadow: 0 0 0 2px ${accent}, 0 22px 44px rgba(0,0,0,0.5);
          z-index: 5;
        }
        .bp .scrap::before {
          content: '';
          position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(-3deg);
          width: 34px; height: 14px;
          background: rgba(192,57,43,0.55);
          box-shadow: 0 2px 4px rgba(0,0,0,0.25);
        }
        .bp .scrap .lbl { font-family:'Playfair Display',serif; font-weight:700; font-size:1rem; line-height:1.2; display:block; }
        .bp .scrap .hin { font-family:'Yatra One',serif; font-size:0.72rem; color:${accent}; display:block; margin-top:0.3rem; }

        .bp .scrap-mob {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: pointer;
        }
        .bp .scrap-mob.active {
          box-shadow: 0 0 0 2px ${accent}, 0 8px 18px rgba(0,0,0,0.35) !important;
        }

        @media (max-width: 767px) {
          .bp .scrap-desktop { display: none; }
        }
        @media (min-width: 768px) {
          .bp .scrap-mobile { display: none; }
        }
      `}</style>

      <div className="bp min-h-screen pt-20">

        {/* ═══════════ HERO — dark ink desk with scattered notes ═══════════ */}
        <header className="relative overflow-hidden"
          style={{
            minHeight: '52vh',
            background: heroBg,
          }}>
          {/* faint paper-grain */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle, ${heroDotColor} 1px, transparent 1px)`,
            backgroundSize: '30px 30px', opacity: 0.4,
          }} />

          {/* Desktop scattered scraps */}
          <div className="scrap-desktop">
            {scraps.map((s, i) => (
              <button
                key={i}
                type="button"
                className={`scrap${isTagActive(s.tag) ? ' active' : ''}`}
                style={{
                  top: s.top, left: s.left, right: s.right, bottom: s.bottom,
                  '--r': s.rotate,
                  animationDelay: `${0.3 + i * 0.12}s`,
                  font: 'inherit', textAlign: 'left',
                }}
                onClick={() => toggleTag(s.tag)}
                aria-pressed={isTagActive(s.tag)}
              >
                <span className="lbl">{s.label}</span>
                <span className="hin">{s.hindi}</span>
              </button>
            ))}
          </div>

          {/* Center headline */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6"
            style={{ minHeight: '62vh', paddingTop: '4rem', paddingBottom: '4rem' }}>
            <p className="fu yatra mb-4" style={{ color: `${accent}dd`, fontSize: '0.95rem', letterSpacing: '0.1em' }}>
              मंथन की कलम
            </p>
            <h1 className="fu d1 h1f font-black"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', lineHeight: 1.05, color: heroInk }}>
              Cosmo India <em style={{ color: accent, fontStyle: 'italic' }}>Blogs</em>
            </h1>
            <p className="fu d2 caveat mt-5" style={{ color: heroMuted, fontSize: '1.4rem' }}>
              what should you read today?
            </p>

            {/* Mobile scraps — a simple row beneath the question */}
            <div className="scrap-mobile flex flex-wrap justify-center gap-3 mt-8 max-w-sm">
              {scraps.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className={`scrap-mob${isTagActive(s.tag) ? ' active' : ''}`}
                  style={{
                    background: 'linear-gradient(160deg,#fbf3e4,#efe0c4)', color: '#2a1208',
                    padding: '0.6rem 0.9rem', boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
                    transform: `rotate(${i % 2 === 0 ? '-3deg' : '3deg'})`,
                    border: 'none', font: 'inherit',
                  }}
                  onClick={() => toggleTag(s.tag)}
                  aria-pressed={isTagActive(s.tag)}
                >
                  <span className="h1f font-bold" style={{ fontSize: '0.82rem' }}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ═══════════ POSTS ═══════════ */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Posts
              darkMode={darkMode}
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
              onClearTags={clearTags}
            />
          </div>
        </section>

        {/* ═══════════ WRITE FOR US CTA ═══════════ */}
        <section className="py-16 px-6" style={{ borderTop: `1px solid var(--bp-rule)` }}>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-8"
            style={{
              background: darkMode
                ? 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))'
                : 'linear-gradient(145deg,#ffffff,#fdf6ee)',
              border: `1px solid ${darkMode ? 'rgba(192,57,43,0.25)' : 'rgba(192,57,43,0.18)'}`,
            }}>
            <div>
              <h3 className="h1f font-bold mb-1" style={{ fontSize: '1.15rem' }}>Have something to say?</h3>
              <p style={{ color: mutedText, fontSize: '0.92rem' }}>Learn how to write for CIP Manthan.</p>
            </div>
            {/* Point this at wherever you mount <Manthan /> */}
            <Link to="/write-for-us"
              className="cta-link inline-flex items-center gap-2 px-6 py-3 font-semibold text-white shrink-0"
              style={{ background: `linear-gradient(135deg,${accent},${saffron})`, fontSize: '0.9rem', textDecoration: 'none' }}>
              <PenTool className="w-4 h-4" />
              <span className="h1f">Write for Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default BlogPage;