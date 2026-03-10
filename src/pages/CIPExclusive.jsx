import { useContext } from 'react';
import { BookOpen, Newspaper, Code, Download, ExternalLink, Lock, ArrowRight } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';

const CIPExclusive = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user, loading } = useContext(AuthContext);

  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink     = darkMode ? '#f0e8dc' : '#1a1209';
  const muted   = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.65)';
  const rule    = darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)';
  const cardBg  = darkMode
    ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
    : 'linear-gradient(145deg, #ffffff, #fdf6ee)';
  const cardBorder = darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)';

  const handleDownload = (item) => {
    if (!user) { alert('Please login to download this content'); window.location.href = '/login'; return; }
    window.location.href = item.link;
  };

  const handleExternalLink = (link) => {
    if (!user) { alert('Please login to access Vartalang'); window.location.href = '/login'; return; }
    window.open(link, '_blank');
  };

  const exclusiveItems = [
    {
      id: 1, type: 'E-Books', icon: BookOpen,
      title: 'Premium E-Book Collection',
      description: 'Access our exclusive collection of digital books',
      num: '01',
      items: [
        { name: 'Ratna Rahasya V1',   size: 'Coming soon', link: '#' },
        { name: 'Hindu Dainik Charya', size: 'Coming soon', link: '#' },
        { name: 'Calendar 2026',       size: '31 MB',       link: 'https://drive.google.com/uc?export=download&id=1808RgqjgaALuzaM7v1tHbZVbmxj9jTRb' },
      ],
    },
    {
      id: 2, type: 'Magazines', icon: Newspaper,
      title: 'Digital Magazine Archive',
      description: 'Latest issues of our educational magazines',
      num: '02',
      items: [
        { name: 'CIP Jan Edition',       size: 'Coming soon', link: '#' },
        { name: 'Celestial 2025 Edition', size: 'Coming soon', link: '#' },
        { name: 'Literacy and Life',      size: 'Coming soon', link: '#' },
      ],
    },
    {
      id: 3, type: 'Software', icon: Code,
      title: 'Vartalang Software',
      description: 'Our exclusive language learning platform',
      num: '03',
      link: 'https://vartalang.in',
      isExternal: true,
    },
  ];

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .cip-wrap { font-family:'DM Sans',system-ui,sans-serif; background:${darkMode?'#141210':'#fdf6ee'}; }
      `}</style>
      <div className="cip-wrap" style={{ minHeight: '100vh', paddingTop: '10rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '3rem', height: '3rem', border: `3px solid ${accent}`,
            borderTopColor: 'transparent', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ color: muted, fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif' }}>Loading…</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .cip-wrap * { box-sizing: border-box; }
        .cip-wrap {
          font-family: 'DM Sans', system-ui, sans-serif;
          --ink: ${ink}; --paper: ${darkMode ? '#141210' : '#fdf6ee'};
          --accent: #c0392b; --saffron: #d4450c;
          --rule: ${rule}; --muted: ${muted};
          background: var(--paper); color: var(--ink);
        }
        .cip-wrap .yatra { font-family: 'Yatra One', serif; }
        .cip-wrap .h1    { font-family: 'Playfair Display', Georgia, serif; }
        .cip-wrap .ghost-num {
          font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900;
          color: transparent; -webkit-text-stroke: 1px var(--rule); user-select: none; line-height: 1;
        }
        @keyframes cipFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .cip-wrap .fu  { animation: cipFadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .cip-wrap .d1  { animation-delay: .08s; }
        .cip-wrap .d2  { animation-delay: .18s; }
        .cip-wrap .d3  { animation-delay: .28s; }

        @keyframes cipPulse {
          0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)}
          70%{box-shadow:0 0 0 14px rgba(192,57,43,0)}
          100%{box-shadow:0 0 0 0 rgba(192,57,43,0)}
        }
        .cip-wrap .pulse-btn:hover { animation: cipPulse 1s ease-out; }

        .cip-wrap .ex-card {
          transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, border-color .28s;
        }
        .cip-wrap .ex-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(192,57,43,0.18);
          border-color: rgba(192,57,43,0.5) !important;
        }

        .cip-wrap .dl-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1rem; background: none; text-align: left; cursor: pointer;
          transition: border-color .2s, transform .2s, background .2s;
          border: 1px solid ${rule};
          background: ${darkMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.6)'};
        }
        .cip-wrap .dl-btn:hover:not(:disabled) {
          border-color: ${accent};
          background: ${darkMode ? 'rgba(192,57,43,0.06)' : 'rgba(192,57,43,0.04)'};
        }
        .cip-wrap .dl-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div className="cip-wrap min-h-screen">

        {/* ── hero strip ── */}
        <section style={{
          minHeight: '24vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingTop: '5rem',
          background: darkMode
            ? 'radial-gradient(ellipse 90% 80% at 50% 40%, #2e0c07 0%, #141210 60%, #0e0c0a 100%)'
            : 'radial-gradient(ellipse 110% 90% at 50% 40%, #fdd8a8 0%, #fde8c8 40%, #fdf6ee 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `radial-gradient(circle, rgba(192,57,43,0.15) 1px, transparent 1px)`,
            backgroundSize: '36px 36px', opacity: 0.5 }} />

          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1rem' }}>
            <p className="yatra fu" style={{ fontSize: '0.82rem', letterSpacing: '0.14em', color: accent, marginBottom: '0.4rem' }}>
              विशेष सामग्री
            </p>
            <h1 className="h1 fu d1" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: ink, lineHeight: 1.1 }}>
              CIP <em style={{ color: accent }}>Exclusive</em>
            </h1>
            <p className="fu d2" style={{ color: muted, fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Premium digital content for our valued members
            </p>

            {!user && (
              <div className="fu d3" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '1rem', padding: '0.5rem 1rem',
                background: `${accent}15`, border: `1px solid ${accent}35`,
                fontSize: '0.82rem', fontWeight: 600, color: accent }}>
                <Lock style={{ width: '0.8rem', height: '0.8rem' }} />
                Login required to access content
              </div>
            )}
            {user && (
              <div className="fu d3" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '1rem', padding: '0.5rem 1rem',
                background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.3)',
                fontSize: '0.82rem', fontWeight: 600, color: '#1db954' }}>
                ✓ Welcome, <span style={{ fontFamily: 'Playfair Display, serif' }}>{user.name}</span>
              </div>
            )}
          </div>
        </section>

        {/* ── main content ── */}
        <section style={{
          padding: '4rem 0 6rem',
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #141210 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #fdf6ee 100%)',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>

            {/* section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem',
              marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: `1px solid ${rule}` }}>
              <span className="ghost-num">01</span>
              <div>
                <p className="yatra" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: accent, marginBottom: '0.25rem' }}>
                  डाउनलोड
                </p>
                <h2 className="h1" style={{ color: ink, fontSize: '2rem', fontWeight: 700 }}>
                  Exclusive Downloads
                </h2>
              </div>
            </div>

            {/* cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {exclusiveItems.map((section, idx) => (
                <div key={section.id} className={`ex-card fu`} style={{
                  animationDelay: `${idx * 0.1}s`,
                  background: cardBg, border: `1px solid ${cardBorder}`,
                  boxShadow: darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)',
                  position: 'relative', overflow: 'hidden', padding: '2rem',
                }}>
                  {/* top ink bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />
                  {/* ghost number */}
                  <span className="h1" style={{ position: 'absolute', bottom: '0.5rem', right: '0.75rem',
                    fontSize: '5rem', color: 'transparent', WebkitTextStroke: `1px ${darkMode ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.07)'}`,
                    lineHeight: 1, userSelect: 'none', pointerEvents: 'none', fontWeight: 900 }}>
                    {section.num}
                  </span>

                  {/* icon + label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', background: `${accent}12`, border: `1px solid ${accent}35`, flexShrink: 0 }}>
                      <section.icon style={{ width: '1.1rem', height: '1.1rem', color: accent }} />
                    </div>
                    <div>
                      <p className="yatra" style={{ fontSize: '0.65rem', letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: accent, marginBottom: '0.1rem' }}>
                        {section.type}
                      </p>
                      <h3 className="h1" style={{ color: ink, fontSize: '1rem', fontWeight: 700, lineHeight: 1.2 }}>
                        {section.title}
                      </h3>
                    </div>
                  </div>

                  <p style={{ color: muted, fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    {section.description}
                  </p>

                  <div style={{ height: '1px', background: `linear-gradient(90deg, ${accent}50, transparent)`, marginBottom: '1.25rem' }} />

                  {/* external (Vartalang) */}
                  {section.isExternal ? (
                    <button onClick={() => handleExternalLink(section.link)} className="pulse-btn"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        padding: '0.85rem',
                        background: user ? `linear-gradient(135deg, ${accent}, ${saffron})` : 'rgba(100,100,100,0.3)',
                        color: '#fff', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.04em',
                        border: 'none', cursor: user ? 'pointer' : 'not-allowed',
                        boxShadow: user ? `0 6px 20px rgba(192,57,43,0.3)` : 'none',
                      }}>
                      {!user && <Lock style={{ width: '0.85rem', height: '0.85rem' }} />}
                      <span className="h1">Visit Vartalang</span>
                      {user && <ExternalLink style={{ width: '0.85rem', height: '0.85rem' }} />}
                    </button>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {section.items.map((item, i) => (
                        <button key={i} onClick={() => handleDownload(item)}
                          className="dl-btn" disabled={!user || item.link === '#'}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                            {!user && <Lock style={{ width: '0.8rem', height: '0.8rem', color: muted, flexShrink: 0 }} />}
                            <div style={{ minWidth: 0 }}>
                              <p className="h1" style={{ color: ink, fontWeight: 600, fontSize: '0.85rem',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.name}
                              </p>
                              <p style={{ color: muted, fontSize: '0.72rem', marginTop: '0.1rem' }}>{item.size}</p>
                            </div>
                          </div>
                          <Download style={{ width: '1rem', height: '1rem', flexShrink: 0,
                            color: user && item.link !== '#' ? accent : muted }} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── info banner ── */}
            <div style={{ marginTop: '3rem', padding: '1.75rem 2rem',
              background: cardBg, border: `1px solid ${cardBorder}`,
              boxShadow: darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)',
              position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />

              {user ? (
                <p style={{ color: muted, fontSize: '0.92rem' }}>
                  ✅ Welcome{' '}
                  <span className="h1" style={{ color: accent, fontWeight: 700 }}>{user.name}</span>!
                  {' '}You have full access to all exclusive content.
                </p>
              ) : (
                <div>
                  <p style={{ color: muted, fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                    🔒 All content is exclusively for registered CIP members.
                  </p>
                  <a href="/login" className="pulse-btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.8rem 1.75rem',
                      background: `linear-gradient(135deg, ${accent}, ${saffron})`,
                      color: '#fff', fontWeight: 600, fontSize: '0.88rem',
                      letterSpacing: '0.04em', textDecoration: 'none',
                      boxShadow: `0 6px 20px rgba(192,57,43,0.3)` }}>
                    <span className="h1">Login to Access</span>
                    <ArrowRight style={{ width: '0.85rem', height: '0.85rem' }} />
                  </a>
                </div>
              )}
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default CIPExclusive;