import { useState, useContext } from 'react';
import { BookOpen, Calendar, Star, Heart, ArrowRight, Quote } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

type Author = {
  id: number;
  name: string;
  yearsActive: string;
  image: string;
  bio: string;
  notableWorks: { title: string; year: string }[];
  legacy: string;
  status: string;
};

const Authors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const { darkMode } = useContext(DarkModeContext);

  /* ── Colour tokens ── */
  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink       = darkMode ? '#f0e8dc'                       : '#1a1209';
  const paper     = darkMode ? '#141210'                       : '#fdf6ee';
  const ruleLine  = darkMode ? 'rgba(192,57,43,0.28)'          : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.82)'        : 'rgba(26,18,9,0.72)';

  /* ── Ticker content — 2 identical halves for seamless loop ── */
  const tickerItems = [...Array(10)].map((_, i) => (
    <span key={i} className="la-yatra text-white tracking-widest"
      style={{ fontSize: '0.75rem', paddingRight: '2.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
      ✦ &nbsp; विरासत के लेखक &nbsp; ✦ &nbsp; The Pens That Shaped Us &nbsp; ✦ &nbsp; Cosmo India Prakashan &nbsp; ✦ &nbsp; In Memoriam &nbsp; ✦
    </span>
  ));

  /* ── Data ── */
  const legacyAuthors = [
    {
      id: 1,
      name: 'Shri Kewal Anand Joshi',
      yearsActive: '1980–2015',
      image: 'keval.jpg',
      bio: 'Renowned author and scholar who contributed extensively to Vedic literature and spiritual studies of Astrology.',
      notableWorks: [{ title: 'सौरमंडल और आप', year: '' }],
      legacy: 'Pioneer in bringing Eastern philosophy to Western readers',
      status: 'departed',
    },
    {
      id: 2,
      name: 'Shri Shyamlal Saketi',
      yearsActive: '',
      image: 'saketi.jpeg',
      bio: 'Legendary astrologer and author whose works shaped modern Vedic astrology.',
      notableWorks: [{ title: 'अपराध ज्योतिष', year: '' }],
      legacy: 'Father of modern Indian astrology',
      status: 'departed',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');

        :root {
          --ink:     ${ink};
          --paper:   ${paper};
          --accent:  ${accent};
          --saffron: ${saffron};
          --rule:    ${ruleLine};
          --muted:   ${mutedText};
        }

        .la * { box-sizing: border-box; }
        .la {
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          font-size: 15.5px;
        }
        .la .la-yatra { font-family: 'Yatra One', serif; }
        .la .h1f      { font-family: 'Playfair Display', Georgia, serif; }
        .la .hindi    { font-family: 'Tiro Devanagari Hindi', 'Mangal', serif; line-height: 2.0; }

        .la .rule-b { border-bottom: 1px solid var(--rule); }
        .la .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--rule);
          user-select: none; pointer-events: none; line-height: 1;
        }

        /* Noise overlay */
        .la .noise::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; mix-blend-mode: multiply;
        }

        /* Ink lines */
        @keyframes la-inkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.7; }
          85%  { opacity:.7; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .la .ink-line { animation: la-inkRise linear infinite; }

        /* Stagger fade */
        @keyframes la-fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .la .fu  { animation: la-fadeUp .85s cubic-bezier(.22,1,.36,1) both; }
        .la .d1  { animation-delay:.12s; }
        .la .d2  { animation-delay:.26s; }
        .la .d3  { animation-delay:.40s; }

        /* Flicker */
        @keyframes la-flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.55} 53%{opacity:.95} }
        .la .flicker { animation: la-flicker 7s ease-in-out infinite; }

        /* ── Seamless ticker ── */
        @keyframes la-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .la .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: la-ticker 140s linear infinite;
        }
        .la .ticker-half { display: flex; flex-shrink: 0; }

        /* Lift */
        .la .lift { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
        .la .lift:hover { transform: translateY(-5px); }

        /* Stripe hover */
        .la .stripe-h { position:relative; overflow:hidden; }
        .la .stripe-h::after {
          content:''; position:absolute; bottom:0; left:0;
          height:2px; width:0;
          background:linear-gradient(90deg,var(--accent),var(--saffron));
          transition:width .42s ease;
        }
        .la .stripe-h:hover::after { width:100%; }

        /* Author image zoom */
        .la .author-img { transition: transform .6s ease; }
        .la .author-wrap:hover .author-img { transform: scale(1.05); }

        /* Deva stripe */
        .la .deva-stripe {
          writing-mode: vertical-rl;
          font-family: 'Yatra One', serif;
          font-size: 0.82rem; letter-spacing: 0.12em;
          color: ${darkMode ? 'rgba(240,200,160,0.7)' : 'rgba(139,32,16,0.55)'};
          user-select: none;
        }
      `}</style>

      <div className="la min-h-screen">

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative flex flex-col items-center justify-center noise overflow-hidden"
          style={{
            minHeight: '86vh',
            background: darkMode
              ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
              : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)',
          }}>

          {/* Ink lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { left:'10%', h:'36vh', delay:'1s', dur:'17s' },
              { left:'30%', h:'26vh', delay:'6s', dur:'21s' },
              { left:'55%', h:'44vh', delay:'2s', dur:'15s' },
              { left:'76%', h:'32vh', delay:'8s', dur:'19s' },
              { left:'92%', h:'38vh', delay:'4s', dur:'23s' },
            ].map((l, i) => (
              <div key={i} className="absolute bottom-0 ink-line"
                style={{ left:l.left, width:'1px', height:l.h,
                  background:`linear-gradient(to top,transparent,${accent}75,transparent)`,
                  animationDuration:l.dur, animationDelay:l.delay }} />
            ))}
          </div>

          {/* Devanagari side stripe */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
            <div className="w-px h-14" style={{ background:'var(--rule)' }} />
            <span className="deva-stripe">विरासत के लेखक</span>
            <div className="w-px h-14" style={{ background:'var(--rule)' }} />
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto px-8 lg:px-16 text-center py-20 pt-28">

            {/* Eyebrow */}
            <div className="fu flex items-center justify-center gap-4 mb-8">
              <div style={{ width:'2.2rem', height:'2px', background:accent, flexShrink:0 }} />
              <span className="la-yatra font-medium"
                style={{ color: darkMode ? '#f0c8a0' : '#8b2010', fontSize:'1.05rem', letterSpacing:'0.06em',
                  textShadow: darkMode ? '0 0 18px rgba(240,160,80,0.35)' : 'none' }}>
                विरासत के लेखक
              </span>
              <div style={{ width:'2.2rem', height:'2px', background:accent, flexShrink:0 }} />
            </div>

            {/* Headline */}
            <h1 className="h1f fu d1 font-black leading-[1.06] mb-8"
              style={{ fontSize:'clamp(2.8rem, 6vw, 5rem)', color:'var(--ink)' }}>
              The Pens That<br /><em style={{ color:accent }}>Built Our Legacy.</em>
            </h1>

            {/* Pull quote */}
            <div className="fu d2 max-w-2xl mx-auto px-5 py-6 mb-10"
              style={{ borderLeft:`3px solid ${accent}`, borderRight:`3px solid ${accent}`,
                background: darkMode ? 'rgba(192,57,43,0.06)' : 'rgba(192,57,43,0.04)' }}>
              <Quote style={{ width:'1.2rem', height:'1.2rem', color:`${accent}aa`, margin:'0 auto 0.75rem' }} />
              <p className="flicker hindi italic" style={{ color:'var(--muted)', fontSize:'1.05rem' }}>
                "उनकी कलम रुकी, पर उनका विचार आज भी हमारे पन्नों में जीवित है।"
              </p>
              <p className="mt-3 tracking-widest uppercase" style={{ color:accent, fontSize:'0.72rem' }}>
                — Cosmo India Prakashan
              </p>
            </div>

            {/* Trust line */}
            <p className="fu d3" style={{ color:'var(--muted)', fontSize:'0.78rem', letterSpacing:'0.08em' }}>
              In Memoriam &nbsp;•&nbsp; Vedic Astrology &nbsp;•&nbsp; Bharatiya Literature &nbsp;•&nbsp; Since 1982
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span style={{ fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--muted)' }}>Scroll</span>
            <div style={{ width:'1px', height:'1.8rem', background:`linear-gradient(to bottom,${accent},transparent)` }} />
          </div>
        </section>

        {/* ════════════════════════════
            TICKER — seamless
        ════════════════════════════ */}
        <div style={{ background: accent, overflow: 'hidden', padding: '10px 0' }}>
          <div className="ticker-track">
            <div className="ticker-half">{tickerItems}</div>
            <div className="ticker-half">{tickerItems}</div>
          </div>
        </div>

        {/* ═══════════ LEGACY AUTHORS ═══════════ */}
        <section className="py-24 relative" style={{
          background: darkMode
            ? 'linear-gradient(180deg, #160e08 0%, #0e0c09 100%)'
            : 'linear-gradient(180deg, #ffe8cc 0%, #fff3e8 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">

            <div className="flex items-center gap-5 mb-14 rule-b pb-6">
              <span className="ghost-num">01</span>
              <div>
                <p className="la-yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>विरासत के लेखक</p>
                <h2 className="h1f font-bold" style={{ color:'var(--ink)', fontSize:'2rem' }}>Legacy Authors</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {legacyAuthors.map((author) => (
                <div key={author.id}
                  className="lift stripe-h author-wrap group cursor-pointer relative overflow-hidden"
                  onClick={() => setSelectedAuthor(selectedAuthor?.id === author.id ? null : author)}
                  style={{
                    background: darkMode
                      ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                      : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
                    border:`1px solid ${selectedAuthor?.id === author.id
                      ? accent
                      : (darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)')}`,
                    boxShadow: selectedAuthor?.id === author.id
                      ? `0 0 0 2px ${accent}, 0 20px 50px rgba(192,57,43,0.2)`
                      : (darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)'),
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />

                  <div className="relative overflow-hidden" style={{ height:'280px' }}>
                    <div className="absolute inset-0 z-10"
                      style={{ background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                    <img src={author.image} alt={author.name}
                      className="author-img w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />

                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase"
                        style={{ background:'rgba(0,0,0,0.75)', color:'rgba(240,232,220,0.85)',
                          border:'1px solid rgba(240,232,220,0.2)' }}>
                        In Memoriam
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-6 right-6 z-20">
                      <h3 className="h1f font-bold text-white mb-1" style={{ fontSize:'1.25rem', lineHeight:'1.2' }}>
                        {author.name}
                      </h3>
                      {author.yearsActive && (
                        <div className="flex items-center gap-2" style={{ color:'rgba(240,232,220,0.7)', fontSize:'0.82rem' }}>
                          <Calendar style={{ width:'0.8rem', height:'0.8rem' }} />
                          <span>{author.yearsActive}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <p style={{ color:'var(--muted)', fontSize:'0.93rem', lineHeight:'1.75',
                      display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                      {author.bio}
                    </p>
                    <div className="flex items-center justify-between pt-4 mt-4"
                      style={{ borderTop:`1px solid ${darkMode ? 'rgba(192,57,43,0.15)' : 'rgba(192,57,43,0.12)'}` }}>
                      <div className="flex items-center gap-2">
                        <BookOpen style={{ width:'0.9rem', height:'0.9rem', color:accent }} />
                        <span style={{ color:'var(--muted)', fontSize:'0.82rem', fontWeight:600 }}>
                          {author.notableWorks.length} Notable Work{author.notableWorks.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <button className="flex items-center gap-1.5 font-semibold transition-all duration-300 hover:gap-3"
                        style={{ color:accent, fontSize:'0.88rem' }}>
                        {selectedAuthor?.id === author.id ? 'Show Less' : 'Read More'}
                        <ArrowRight style={{ width:'0.85rem', height:'0.85rem' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded author detail */}
            {selectedAuthor && (
              <div className="relative p-8 md:p-12"
                style={{
                  background: darkMode
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))'
                    : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
                  border:`1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)'}`,
                  boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
                }}>
                <div className="absolute top-0 left-0 w-7 h-7" style={{ borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
                <div className="absolute bottom-0 right-0 w-7 h-7" style={{ borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <p className="la-yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>विरासत</p>
                    <h3 className="h1f font-bold mb-4" style={{ color:'var(--ink)', fontSize:'1.75rem', lineHeight:'1.15' }}>
                      {selectedAuthor.name}
                    </h3>
                    <p style={{ color:'var(--muted)', fontSize:'0.98rem', lineHeight:'1.88', marginBottom:'1.5rem' }}>
                      {selectedAuthor.bio}
                    </p>
                    <div className="flex items-start gap-3 p-4"
                      style={{ background:`${accent}10`, border:`1px solid ${accent}30` }}>
                      <Star style={{ width:'1rem', height:'1rem', color:accent, flexShrink:0, marginTop:'2px' }} />
                      <div>
                        <h4 className="h1f font-bold mb-1" style={{ color:'var(--ink)', fontSize:'0.95rem' }}>Literary Legacy</h4>
                        <p style={{ color:'var(--muted)', fontSize:'0.9rem' }}>{selectedAuthor.legacy}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="la-yatra mb-4" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>उल्लेखनीय कार्य</p>
                    <div className="space-y-3">
                      {selectedAuthor.notableWorks.map((work, i) => (
                        <div key={i} className="lift stripe-h p-4"
                          style={{
                            background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                            border:`1px solid ${darkMode ? 'rgba(192,57,43,0.15)' : 'rgba(192,57,43,0.12)'}`,
                          }}>
                          <div className="flex items-center justify-between">
                            <h5 className="hindi h1f font-semibold" style={{ color:'var(--ink)', fontSize:'1.05rem' }}>
                              {work.title}
                            </h5>
                            <BookOpen style={{ width:'1rem', height:'1rem', color:accent, flexShrink:0 }} />
                          </div>
                          {work.year && (
                            <p style={{ color:'var(--muted)', fontSize:'0.8rem', marginTop:'0.25rem' }}>Published {work.year}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tribute note */}
            <div className="mt-14 text-center p-8" style={{
              background: darkMode ? 'rgba(192,57,43,0.05)' : 'rgba(192,57,43,0.04)',
              border:`1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`,
            }}>
              <Heart style={{ width:'2rem', height:'2rem', color:accent, margin:'0 auto 1rem' }} />
              <h3 className="h1f font-bold mb-3" style={{ color:'var(--ink)', fontSize:'1.3rem' }}>Their Words Live On</h3>
              <p style={{ color:'var(--muted)', fontSize:'0.98rem', lineHeight:'1.85', maxWidth:'38rem', margin:'0 auto' }}>
                Though they may have departed or retired from active writing, their contributions continue to inspire and enlighten readers. Their legacy remains eternal in the pages they gifted to humanity.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Authors;