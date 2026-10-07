import { useContext, useEffect } from 'react';
import {
  Edit3, FileText, Palette, Award,
  CheckCircle, ArrowRight, BookOpen, Users, Globe,
  Percent, Printer, Shield, Package, Sparkles,
} from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

/* ── Constants ── */
const ACCENT = '#c0392b';
const SAFFRON = '#d4450c';

const WHATSAPP = 'https://wa.me/917388270331';
const PHONE = 'tel:+917388270331';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap';

const waLink = (text) => `${WHATSAPP}?text=${encodeURIComponent(text)}`;

/* ── Data ── */
const evaluationFactors = [
  { label: 'Manuscript Quality', desc: 'Writing clarity, originality, and reader value' },
  { label: 'Subject Relevance',  desc: 'Long-term relevance and sustained reader interest' },
  { label: 'Author Vision',      desc: 'Seriousness toward building a dedicated readership' },
];

const tiers = [
  {
    name: 'Starter', fee: '₹14,499', pages: 'Up to 200 pages',
    rows: [
      ['Editing', 'Proofreading + light edit'],
      ['Cover', 'Standard design, 2 revisions'],
      ['Print run', '100 copies'],
      ['Free author copies', '10'],
      ['Launch', 'Website + Amazon listing'],
    ],
  },
  {
    name: 'Professional', fee: '₹24,999', pages: 'Up to 350 pages',
    rows: [
      ['Editing', 'Developmental edit + full line edit'],
      ['Cover', 'Premium custom design, 4 revisions'],
      ['Print run', '100 copies'],
      ['Free author copies', '10'],
      ['Launch', 'Instagram promotion, review outreach, author page and extended promotion'],
    ],
  },
];

const processSteps = [
  { step: 'Apply',   detail: 'Free. Send a synopsis, a short author bio, and 2–3 sample chapters.' },
  { step: 'Review',  detail: 'We evaluate every submission on quality, relevance, and author vision.' },
  { step: 'Accept',  detail: 'Only selected manuscripts are accepted. No fee is charged before acceptance.' },
  { step: 'Agree',   detail: 'You choose a package and we sign the publishing agreement.' },
  { step: 'Publish', detail: 'Editing, cover, layout, and printing. Typical timeline is 60–90 days from the final manuscript.' },
];

const authorBenefits = [
  { label: 'Complimentary Copies', detail: '10 copies with every package' },
  { label: 'Additional Copies',    detail: 'Available at 40% discount on MRP, for personal use or your own sales' },
];

const publishingStages = [
  { icon: Edit3,    step: '01', title: 'Editing',            desc: 'Manuscript editing and meticulous proofreading' },
  { icon: Palette,  step: '02', title: 'Cover Design',       desc: 'Minimal, sophisticated, and professional cover design' },
  { icon: FileText, step: '03', title: 'Interior Layout',    desc: 'Professional typesetting and formatting' },
  { icon: Award,    step: '04', title: 'ISBN Registration',  desc: 'Official book identification and barcode generation' },
  { icon: Printer,  step: '05', title: 'Printing',           desc: 'Professional production to the highest standard' },
  { icon: Globe,    step: '06', title: 'Distribution Setup', desc: 'Retail, institutional, and online channel availability' },
  { icon: BookOpen, step: '07', title: 'Ebook Conversion',   desc: 'Digital publishing across major ebook platforms' },
];

const royalties = [
  { format: 'Paperback', pct: '10%', basis: 'of MRP' },
  { format: 'Hardcover', pct: '12%', basis: 'of MRP' },
  { format: 'Ebook',     pct: '20%', basis: 'of net receipts' },
];

const distributionChannels = [
  { heading: 'Retail Platforms',     items: ['Amazon', 'Our Website', 'Kindle', 'Other online marketplaces'] },
  { heading: 'Physical Circulation', items: ['Book stores', 'Libraries', 'Educational institutions', 'Literary networks & events'] },
  { heading: 'Digital Reach',        items: ['Instagram promotions', 'Social media visibility', 'Online reader communities', 'Additional digital channels'] },
];

/* ── Helpers (defined outside the page so they don't remount on every render) ── */
const TopBar = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
    background: `linear-gradient(90deg,${ACCENT},${SAFFRON},transparent)` }} />
);

const IconBox = ({ children }) => (
  <div style={{ width: '2.4rem', height: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: `${ACCENT}15`, border: `1px solid ${ACCENT}35`, color: ACCENT, marginBottom: '1.1rem' }}>
    {children}
  </div>
);

const SectionHeader = ({ num, hindi, english, dark = false, ink, ruleLine }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '3rem',
    paddingBottom: '1.5rem',
    borderBottom: `1px solid ${dark ? 'rgba(192,57,43,0.3)' : ruleLine}` }}>
    <span aria-hidden="true" style={{ fontFamily: "'Playfair Display',serif", fontSize: '3rem', fontWeight: 900,
      color: dark ? '#ffffff' : 'transparent',
      WebkitTextStroke: dark ? '0' : `1px ${ACCENT}99`,
      userSelect: 'none', lineHeight: 1, flexShrink: 0 }}>{num}</span>
    <div>
      <p lang="hi" style={{ fontFamily: "'Yatra One',serif", fontSize: '0.82rem', letterSpacing: '0.12em',
        color: dark ? `${ACCENT}dd` : ACCENT, margin: 0, marginBottom: '3px' }}>{hindi}</p>
      <h2 style={{ fontFamily: "'Playfair Display',serif", color: dark ? '#f0e8dc' : ink,
        fontSize: '1.9rem', fontWeight: 700, margin: 0 }}>{english}</h2>
    </div>
  </div>
);

const PublishingServices = () => {
  const { darkMode } = useContext(DarkModeContext);

  const ink       = darkMode ? '#f0e8dc'                : '#1a1209';
  const paper     = darkMode ? '#141210'                : '#fdf6ee';
  const ruleLine  = darkMode ? 'rgba(192,57,43,0.28)'   : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.62)';

  // Load fonts via <link> in <head> (faster than @import inside <style>)
  useEffect(() => {
    if (document.getElementById('ps-fonts')) return;
    const pre1 = document.createElement('link');
    pre1.rel = 'preconnect';
    pre1.href = 'https://fonts.googleapis.com';
    const pre2 = document.createElement('link');
    pre2.rel = 'preconnect';
    pre2.href = 'https://fonts.gstatic.com';
    pre2.crossOrigin = 'anonymous';
    const link = document.createElement('link');
    link.id = 'ps-fonts';
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    document.head.append(pre1, pre2, link);
  }, []);

  const note = {
    color: mutedText, fontSize: '0.88rem', lineHeight: '1.75', paddingLeft: '1rem',
    borderLeft: `2px solid ${ACCENT}40`, margin: 0,
  };

  return (
    <>
      <style>{`
        .ps * { box-sizing: border-box; }
        .ps {
          background: ${paper};
          color: ${ink};
          font-family: 'DM Sans','Segoe UI',system-ui,sans-serif;
          font-size: 15.5px; min-height: 100vh;
        }

        .ps a:focus-visible { outline: 2px solid ${SAFFRON}; outline-offset: 3px; }

        @keyframes ps-inkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.55; } 85% { opacity:.55; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .ps .ink-line { animation: ps-inkRise linear infinite; }

        @keyframes ps-fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .ps .fu  { animation: ps-fadeUp .8s cubic-bezier(.22,1,.36,1) both; }
        .ps .d1  { animation-delay:.08s; } .ps .d2 { animation-delay:.2s; }
        .ps .d3  { animation-delay:.34s; } .ps .d4 { animation-delay:.48s; }

        @keyframes ps-flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.5} 53%{opacity:.95} }
        .ps .flicker { animation: ps-flicker 8s ease-in-out infinite; }

        .ps .ink-bar {
          height: 2px;
          background: linear-gradient(90deg,transparent,${ACCENT} 30%,${SAFFRON} 70%,transparent);
        }

        @keyframes ps-pulse {
          0%  { box-shadow:0 0 0 0 rgba(192,57,43,.45); }
          70% { box-shadow:0 0 0 14px rgba(192,57,43,0); }
          100%{ box-shadow:0 0 0 0 rgba(192,57,43,0); }
        }
        .ps .pulse-btn:hover { animation: ps-pulse 1s ease-out; }

        .ps .dark-section {
          background: ${darkMode
            ? 'linear-gradient(135deg,#0e0a07 0%,#1a0d08 40%,#120c08 100%)'
            : 'linear-gradient(135deg,#1a0d06 0%,#2a1008 40%,#1a0905 100%)'};
        }
        .ps .light-section {
          background: ${darkMode
            ? 'linear-gradient(180deg,#0e0c09 0%,#160e08 100%)'
            : 'linear-gradient(180deg,#fff3e8 0%,#ffe8cc 100%)'};
        }

        .ps .dot-ov {
          position:absolute; inset:0; pointer-events:none;
          background-image:radial-gradient(circle,rgba(192,57,43,0.18) 1px,transparent 1px);
          background-size:36px 36px; opacity:.5;
        }
        .ps .rad-ov {
          position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(192,57,43,0.12) 0%,transparent 70%);
        }

        .ps .ps-card {
          background: ${darkMode
            ? 'linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))'
            : 'linear-gradient(145deg,#fffaf4,#fdf0e0)'};
          border: 1px solid ${darkMode ? 'rgba(192,57,43,0.3)' : 'rgba(192,57,43,0.2)'};
          position:relative; overflow:hidden;
          transition:transform .3s,box-shadow .3s,border-color .3s;
        }
        .ps .ps-card:hover {
          transform:translateY(-5px);
          box-shadow:0 18px 48px rgba(192,57,43,0.2);
          border-color:rgba(192,57,43,0.55);
        }

        .ps .proc-card {
          background: linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03));
          border:1px solid rgba(192,57,43,0.28);
          position:relative; overflow:hidden;
          transition:transform .28s,box-shadow .28s,border-color .28s;
        }
        .ps .proc-card:hover {
          transform:translateY(-4px);
          box-shadow:0 14px 40px rgba(192,57,43,0.28);
          border-color:rgba(192,57,43,0.6);
          background: linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05));
        }

        .ps .feat-item {
          display:flex; align-items:center; gap:10px;
          padding:6px 0; border-bottom:1px solid ${ruleLine};
          font-size:0.88rem;
        }
        .ps .feat-item:last-child { border-bottom:none; }

        .ps .tier-row {
          display:grid; grid-template-columns:1fr 1.4fr; gap:12px;
          padding:10px 0; border-bottom:1px solid ${ruleLine}; font-size:0.88rem;
        }
        .ps .tier-row:last-child { border-bottom:none; }

        @media(max-width:768px) {
          .ps-two-col   { grid-template-columns:1fr !important; }
          .ps-three-col { grid-template-columns:1fr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ps .ink-line, .ps .fu, .ps .flicker, .ps .pulse-btn:hover { animation: none !important; }
          .ps .ps-card, .ps .proc-card { transition: none; }
          .ps .ps-card:hover, .ps .proc-card:hover { transform: none; }
        }
      `}</style>

      <div className="ps">

        {/* ── Fixed background ── */}
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: darkMode
              ? 'radial-gradient(ellipse 90% 70% at 48% 38%,#2e0c07 0%,#141210 55%,#0e0c0a 100%)'
              : 'radial-gradient(ellipse 110% 85% at 46% 35%,#fdd8a8 0%,#f9c88a 18%,#fde8c8 45%,#fdf6ee 100%)',
          }} />
          {[
            { left: '8%',  h: '35vh', delay: '0s', dur: '15s' },
            { left: '25%', h: '28vh', delay: '5s', dur: '19s' },
            { left: '55%', h: '42vh', delay: '9s', dur: '13s' },
            { left: '74%', h: '30vh', delay: '2s', dur: '17s' },
            { left: '91%', h: '38vh', delay: '7s', dur: '21s' },
          ].map((l, i) => (
            <div key={i} className="ink-line" style={{
              position: 'absolute', bottom: 0, left: l.left, width: '1px', height: l.h,
              background: `linear-gradient(to top,transparent,${ACCENT}65,transparent)`,
              animationDuration: l.dur, animationDelay: l.delay,
            }} />
          ))}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `radial-gradient(circle,${darkMode ? 'rgba(192,57,43,0.13)' : 'rgba(192,57,43,0.09)'} 1px,transparent 1px)`,
            backgroundSize: '38px 38px', opacity: .55,
          }} />
        </div>

        {/* ══ HERO ══ */}
        <section style={{ position: 'relative', zIndex: 1, paddingTop: '5.5rem', paddingBottom: '3rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '40px 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="ps-two-col">

              <div>
                <div className="fu" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                  <div style={{ width: '1.8rem', height: '2px', background: ACCENT, flexShrink: 0 }} />
                  <span lang="hi" style={{ fontFamily: "'Yatra One',serif", color: darkMode ? '#f0c8a0' : '#8b2010',
                    fontSize: '0.9rem', letterSpacing: '0.06em' }}>प्रकाशन साझेदारी</span>
                </div>

                <h1 className="fu d1" style={{ fontFamily: "'Playfair Display',serif",
                  fontSize: 'clamp(2.2rem,4vw,3.8rem)', fontWeight: 900, lineHeight: 1.06,
                  margin: 0, marginBottom: '1.2rem', color: ink }}>
                  Publishing<br />
                  <em style={{ color: ACCENT }}>Partnership</em><br />
                  Model.
                </h1>

                <div className="fu d2" style={{ paddingLeft: '1rem', borderLeft: `3px solid ${ACCENT}`, marginBottom: '1.8rem' }}>
                  <p lang="hi" className="flicker" style={{ fontFamily: "'Tiro Devanagari Hindi','Mangal',serif",
                    lineHeight: 2.0, color: mutedText, fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                    "गंभीर पुस्तकें गंभीर प्रकाशन की पात्र हैं।"
                  </p>
                  <p style={{ color: ACCENT, fontSize: '0.65rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', marginTop: '5px', marginBottom: 0 }}>
                    — Cosmo India Prakashan
                  </p>
                </div>

                <div className="fu d3" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a href={waLink("I'm interested in your publishing services")}
                    target="_blank" rel="noopener noreferrer" className="pulse-btn"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px',
                      textDecoration: 'none', background: `linear-gradient(135deg,${ACCENT},${SAFFRON})`,
                      color: '#fff', fontFamily: "'Playfair Display',serif", fontWeight: 700,
                      fontSize: '0.88rem', letterSpacing: '0.04em', boxShadow: `0 8px 28px ${ACCENT}40`,
                    }}>
                    Apply With Your Manuscript
                    <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
                  </a>
                  <a href={PHONE}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px',
                      textDecoration: 'none',
                      border: `1.5px solid ${darkMode ? 'rgba(240,232,220,0.25)' : 'rgba(26,18,9,0.25)'}`,
                      color: ink, fontFamily: "'Playfair Display',serif", fontWeight: 700,
                      fontSize: '0.88rem', letterSpacing: '0.04em', transition: 'border-color .22s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = darkMode ? 'rgba(240,232,220,0.25)' : 'rgba(26,18,9,0.25)')}>
                    Call Now
                  </a>
                </div>
              </div>

              <div className="fu d2">
                <p style={{ color: mutedText, fontSize: '0.98rem', lineHeight: '1.9', marginBottom: '1.8rem' }}>
                  Publishing a book is not merely printing pages. It is the process of taking an idea from a manuscript to the hands of readers. At Cosmo India Prakashan, we follow a partnership-based publishing model, where the author and publisher work together to bring meaningful books to the market.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
                  background: ruleLine, border: `1px solid ${ruleLine}`, overflow: 'hidden' }}>
                  {[
                    { label: 'Our Principle',     value: 'Serious books deserve serious publishing' },
                    { label: 'Packages',          value: 'Free for exceptional books · paid from ₹14,499 + GST' },
                    { label: 'Initial Print Run', value: '100 copies for every title' },
                    { label: 'Author Royalty',    value: '10% paperback · 12% hardcover · 20% ebook, after 50 copies sold' },
                  ].map((stat, i) => (
                    <div key={i} style={{ padding: '0.9rem 1.1rem',
                      background: darkMode
                        ? (i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)')
                        : (i % 2 === 0 ? 'rgba(255,255,255,0.75)' : 'rgba(255,243,228,0.75)') }}>
                      <p style={{ color: mutedText, fontSize: '0.65rem', letterSpacing: '0.1em',
                        textTransform: 'uppercase', margin: 0, marginBottom: '3px' }}>{stat.label}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", color: ink,
                        fontSize: '0.85rem', fontWeight: 700, margin: 0, lineHeight: '1.35' }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ 01 — SELECTIVE PUBLISHING ══ */}
        <section className="dark-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div className="dot-ov" /><div className="rad-ov" />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <SectionHeader num="01" hindi="चयनात्मक प्रकाशन" english="Selective Publishing" dark ink={ink} ruleLine={ruleLine} />
            <p style={{ color: 'rgba(240,232,220,0.75)', fontSize: '1.02rem', lineHeight: '1.9', marginBottom: '1.2rem', maxWidth: '680px' }}>
              We do not publish every manuscript we receive. Each submission is carefully evaluated, and only selected manuscripts are accepted. We take on a limited number of books each month so every title gets full attention.
            </p>
            <p style={{ color: 'rgba(240,232,220,0.6)', fontSize: '0.92rem', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '680px',
              paddingLeft: '1rem', borderLeft: '2px solid rgba(192,57,43,0.4)' }}>
              If your book and you as an author carry enough value and audience, we charge nothing. Just submit your manuscript and let the magic happen. This is entirely at our discretion and reserved for books with clear value for readers.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.2rem' }}>
              {evaluationFactors.map((f, i) => (
                <div key={i} className="proc-card" style={{ padding: '1.75rem' }}>
                  <span aria-hidden="true" style={{ fontFamily: "'Playfair Display',serif", position: 'absolute', bottom: '8px', right: '12px',
                    fontSize: '5rem', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.1)',
                    lineHeight: 1, userSelect: 'none' }}>0{i + 1}</span>
                  <div style={{ width: '2.4rem', height: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.35)',
                    color: '#e8a090', marginBottom: '1.1rem' }}>
                    <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", color: '#f0e8dc', fontSize: '1.08rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.label}</h3>
                  <p style={{ color: 'rgba(240,232,220,0.65)', fontSize: '0.9rem', lineHeight: '1.75', margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 02 — PACKAGES ══ */}
        <section className="light-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <SectionHeader num="02" hindi="प्रकाशन पैकेज" english="Publishing Packages" ink={ink} ruleLine={ruleLine} />
            <p style={{ color: mutedText, fontSize: '1.02rem', lineHeight: '1.9', marginBottom: '2.5rem', maxWidth: '680px' }}>
              Fees apply only after your manuscript is accepted. Every package includes interior layout, ISBN registration, ebook conversion, and distribution setup.
            </p>

            {/* Free model banner */}
            <div className="ps-card" style={{ padding: '2rem', marginBottom: '1.2rem',
              borderColor: `${ACCENT}99`, boxShadow: `0 12px 40px ${ACCENT}22` }}>
              <TopBar />
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <IconBox><Sparkles style={{ width: '1rem', height: '1rem' }} /></IconBox>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <p lang="hi" style={{ fontFamily: "'Yatra One',serif", color: `${ACCENT}cc`, fontSize: '0.76rem',
                    letterSpacing: '0.1em', margin: 0, marginBottom: '4px' }}>निःशुल्क प्रकाशन</p>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", color: ink, fontSize: '1.3rem', fontWeight: 700,
                    margin: 0, marginBottom: '0.6rem' }}>
                    Free Publishing Model — <span style={{ color: ACCENT }}>₹0</span>
                  </h3>
                  <p style={{ color: mutedText, fontSize: '0.95rem', lineHeight: '1.85', margin: 0 }}>
                    If your book and you as an author carry enough value and audience, we charge nothing. Just submit your
                    manuscript and let the magic happen. You might qualify for the best. Free titles are published on the same
                    royalty terms, and the decision rests entirely with the publisher.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.2rem', marginBottom: '1.5rem' }} className="ps-three-col">
              {tiers.map((t, i) => (
                <div key={i} className="ps-card" style={{ padding: '2rem' }}>
                  <TopBar />
                  <h3 style={{ fontFamily: "'Playfair Display',serif", color: ink, fontSize: '1.1rem', fontWeight: 700, margin: 0, marginBottom: '0.6rem' }}>{t.name}</h3>
                  <p style={{ fontFamily: "'Playfair Display',serif", color: ACCENT, fontSize: '2.2rem', fontWeight: 900, lineHeight: 1, margin: 0, marginBottom: '0.4rem' }}>{t.fee}</p>
                  <p style={{ color: mutedText, fontSize: '0.82rem', margin: 0, marginBottom: '1.2rem' }}>{t.pages}</p>
                  <div className="ink-bar" style={{ marginBottom: '0.6rem' }} />
                  {t.rows.map((r, j) => (
                    <div key={j} className="tier-row">
                      <span style={{ color: mutedText }}>{r[0]}</span>
                      <span style={{ color: ink, fontWeight: 500 }}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p style={{ ...note, marginBottom: '0.8rem' }}>
              Books beyond the page limit: ₹60 per extra page, up to 300 pages (Starter) or 400 pages (Professional). Longer books are quoted individually. Pages are counted on the final typeset book, not the manuscript.
            </p>
            <p style={note}>
              Packages include 2 rounds of revisions. Hardcover editions are available on request and quoted separately. All fees are exclusive of GST, which is charged as applicable.
            </p>
          </div>
        </section>

        {/* ══ 03 — HOW IT WORKS ══ */}
        <section className="dark-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div className="dot-ov" /><div className="rad-ov" />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <SectionHeader num="03" hindi="प्रकाशन प्रक्रिया" english="How Publishing Works" dark ink={ink} ruleLine={ruleLine} />
            <p style={{ color: 'rgba(240,232,220,0.75)', fontSize: '1.02rem', lineHeight: '1.9', marginBottom: '2.5rem', maxWidth: '680px' }}>
              Publishing is a collaborative effort. You apply for free, we review, and you pay only if your book is accepted.
            </p>

            <div style={{ border: '1px solid rgba(192,57,43,0.25)', overflow: 'hidden' }}>
              {processSteps.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem',
                  padding: '16px 20px',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(192,57,43,0.15)' }}
                  className="ps-two-col">
                  <span style={{ fontFamily: "'Playfair Display',serif", color: '#f0e8dc', fontWeight: 700, fontSize: '0.95rem' }}>{i + 1}. {row.step}</span>
                  <span style={{ color: 'rgba(240,232,220,0.7)', fontSize: '0.92rem', lineHeight: '1.6' }}>{row.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 04 — PRINT RUN & AUTHOR COPIES ══ */}
        <section className="light-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <SectionHeader num="04" hindi="मुद्रण और लेखक प्रतियां" english="Print Run & Author Copies" ink={ink} ruleLine={ruleLine} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="ps-two-col">

              <div className="ps-card" style={{ padding: '2rem' }}>
                <TopBar />
                <IconBox><Printer style={{ width: '1rem', height: '1rem' }} /></IconBox>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: ink, fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>Initial Print Run</h3>
                <p style={{ fontFamily: "'Playfair Display',serif", color: ACCENT, fontSize: '3rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.8rem' }}>100</p>
                <p style={{ color: mutedText, fontSize: '0.9rem', lineHeight: '1.75', marginBottom: '1.2rem' }}>
                  Every accepted book launches with 100 printed copies, managed under the publisher's distribution system. After that, copies are printed on demand as orders arrive.
                </p>
                <div className="ink-bar" style={{ marginBottom: '1rem' }} />
                <p style={{ color: mutedText, fontSize: '0.82rem', lineHeight: '1.7', margin: 0 }}>
                  Enough copies for early readers, author events, and distribution channels, with no unsold stock to worry about.
                </p>
              </div>

              <div className="ps-card" style={{ padding: '2rem' }}>
                <TopBar />
                <IconBox><Package style={{ width: '1rem', height: '1rem' }} /></IconBox>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: ink, fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Author Benefits</h3>
                {authorBenefits.map((b, i) => (
                  <div key={i} className="feat-item">
                    <CheckCircle style={{ width: '0.85rem', height: '0.85rem', color: ACCENT, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontFamily: "'Playfair Display',serif", color: ink, fontWeight: 700, fontSize: '0.9rem' }}>{b.label}</span>
                      <span style={{ color: mutedText, fontSize: '0.88rem' }}> — {b.detail}</span>
                    </div>
                  </div>
                ))}
                <div className="ink-bar" style={{ margin: '1.2rem 0' }} />
                <p style={{ color: mutedText, fontSize: '0.82rem', lineHeight: '1.7', margin: 0 }}>
                  Copies may be used for book launches, reader events, personal network circulation, and direct sales by the author.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 05 — PUBLISHING SERVICES ══ */}
        <section className="dark-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div className="dot-ov" /><div className="rad-ov" />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <SectionHeader num="05" hindi="प्रकाशन सेवाएं" english="Publishing Services" dark ink={ink} ruleLine={ruleLine} />
            <p style={{ color: 'rgba(240,232,220,0.75)', fontSize: '1.02rem', lineHeight: '1.9', marginBottom: '2.5rem', maxWidth: '680px' }}>
              The publisher manages the entire professional publishing process, from manuscript to market. Every stage is handled with care and expertise.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.2rem' }}>
              {publishingStages.map((s, i) => (
                <div key={i} className="proc-card" style={{ padding: '1.6rem' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg,${ACCENT},${SAFFRON},transparent)` }} />
                  <span aria-hidden="true" style={{ fontFamily: "'Playfair Display',serif", display: 'block', fontSize: '3.5rem', fontWeight: 900,
                    color: '#ffffff', opacity: 0.9,
                    lineHeight: 1, marginBottom: '0.7rem', userSelect: 'none' }}>{s.step}</span>
                  <div style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.35)',
                    color: '#e8a090', marginBottom: '0.9rem' }}>
                    <s.icon style={{ width: '0.95rem', height: '0.95rem' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", color: '#f0e8dc', fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.4rem' }}>{s.title}</h3>
                  <p style={{ color: 'rgba(240,232,220,0.65)', fontSize: '0.88rem', lineHeight: '1.75', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ color: 'rgba(240,232,220,0.5)', fontSize: '0.82rem', lineHeight: '1.75',
              marginTop: '1.5rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(192,57,43,0.3)' }}>
              For complex or highly customised cover designs, additional design charges may apply.
            </p>
          </div>
        </section>

        {/* ══ 06 — ROYALTIES ══ */}
        <section className="light-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <SectionHeader num="06" hindi="रॉयल्टी" english="Royalties" ink={ink} ruleLine={ruleLine} />
            <p style={{ color: mutedText, fontSize: '1.02rem', lineHeight: '1.9', marginBottom: '1.5rem', maxWidth: '680px' }}>
              Authors earn royalties on book sales once the book enters its regular distribution phase. Royalties begin once the first 50 copies have been sold through the publisher's channels. After that, royalty is calculated on all such sales, starting from the first copy.
            </p>
            <p style={{ ...note, marginBottom: '2rem', maxWidth: '680px' }}>
              Complimentary copies and copies purchased by the author at a discount are not counted as royalty-bearing sales. Print royalties (paperback and hardcover) are calculated on MRP; ebook royalty is calculated on net receipts. Royalty statements are issued twice a year, according to the publishing agreement.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', marginBottom: '1.5rem' }} className="ps-three-col">
              {royalties.map((r, i) => (
                <div key={i} className="ps-card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <TopBar />
                  <div style={{ width: '2.4rem', height: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${ACCENT}15`, border: `1px solid ${ACCENT}35`, color: ACCENT,
                    margin: '0 auto 1rem' }}>
                    <Percent style={{ width: '1rem', height: '1rem' }} />
                  </div>
                  <p style={{ color: mutedText, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{r.format}</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.4rem', fontWeight: 900, color: ACCENT, lineHeight: 1 }}>{r.pct}</p>
                  <p style={{ color: mutedText, fontSize: '0.78rem', marginTop: '6px', marginBottom: 0 }}>Author royalty {r.basis}</p>
                </div>
              ))}
            </div>
            <p style={{ ...note, maxWidth: '680px' }}>
              Book sales depend on market response. Publication and package fees do not guarantee any minimum sales or royalty income.
            </p>
          </div>
        </section>

        {/* ══ 07 — DISTRIBUTION ══ */}
        <section className="dark-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div className="dot-ov" /><div className="rad-ov" />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <SectionHeader num="07" hindi="वितरण नेटवर्क" english="Wide Distribution Network" dark ink={ink} ruleLine={ruleLine} />
            <p style={{ color: 'rgba(240,232,220,0.75)', fontSize: '1.02rem', lineHeight: '1.9', marginBottom: '2.5rem', maxWidth: '680px' }}>
              After publication, the book is made available through multiple distribution channels, ensuring that it reaches both physical and digital readers.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.2rem' }}>
              {distributionChannels.map((ch, i) => (
                <div key={i} className="proc-card" style={{ padding: '1.75rem' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg,${ACCENT},${SAFFRON},transparent)` }} />
                  <h3 style={{ fontFamily: "'Playfair Display',serif", color: '#f0e8dc', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>{ch.heading}</h3>
                  <div>
                    {ch.items.map((item, j) => (
                      <div key={j} className="feat-item" style={{ borderBottomColor: 'rgba(192,57,43,0.15)', color: 'rgba(240,232,220,0.7)' }}>
                        <span aria-hidden="true" style={{ color: ACCENT, fontSize: '0.6rem', flexShrink: 0 }}>✦</span>
                        <span style={{ fontSize: '0.9rem' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 08 — AUTHOR COLLABORATION & RIGHTS ══ */}
        <section className="light-section" style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <SectionHeader num="08" hindi="लेखक सहयोग एवं अधिकार" english="Author Collaboration & Rights" ink={ink} ruleLine={ruleLine} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="ps-two-col">

              <div className="ps-card" style={{ padding: '2rem' }}>
                <TopBar />
                <IconBox><Users style={{ width: '1rem', height: '1rem' }} /></IconBox>
                <p lang="hi" style={{ fontFamily: "'Yatra One',serif", color: `${ACCENT}cc`, fontSize: '0.76rem', letterSpacing: '0.1em', margin: 0, marginBottom: '4px' }}>पाठक सक्रियता</p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: ink, fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem' }}>Early Reader Activation</h3>
                <p style={{ color: mutedText, fontSize: '0.92rem', lineHeight: '1.85', marginBottom: '1rem' }}>
                  The early stage of publishing focuses on building initial readership. Authors are encouraged to introduce the book within their personal and professional networks and to direct readers to our website or Amazon listing.
                </p>
                <div className="ink-bar" style={{ margin: '1rem 0' }} />
                {['Reader awareness', 'Early feedback', 'Initial reviews', 'Market momentum'].map((item, i) => (
                  <div key={i} className="feat-item">
                    <CheckCircle style={{ width: '0.8rem', height: '0.8rem', color: ACCENT, flexShrink: 0 }} />
                    <span style={{ color: mutedText, fontSize: '0.88rem' }}>{item}</span>
                  </div>
                ))}
                <p style={{ color: mutedText, fontSize: '0.82rem', paddingLeft: '1rem',
                  borderLeft: `2px solid ${ACCENT}40`, margin: '1rem 0 0' }}>
                  Once 50 copies have been sold through our channels, the book transitions into regular market distribution and author royalties begin.
                </p>
              </div>

              <div className="ps-card" style={{ padding: '2rem' }}>
                <TopBar />
                <IconBox><Shield style={{ width: '1rem', height: '1rem' }} /></IconBox>
                <p lang="hi" style={{ fontFamily: "'Yatra One',serif", color: `${ACCENT}cc`, fontSize: '0.76rem', letterSpacing: '0.1em', margin: 0, marginBottom: '4px' }}>अधिकार</p>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: ink, fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Rights &amp; Ownership</h3>
                {[
                  { label: 'Copyright',         detail: 'Remains with the author' },
                  { label: 'Publishing Rights', detail: 'Granted to the publisher for the contract period only' },
                  { label: 'Contract Terms',    detail: 'Contract period, renewal, and reversion of rights are set out in the publishing agreement' },
                ].map((r, i) => (
                  <div key={i} style={{ padding: '16px 0', borderBottom: `1px solid ${ruleLine}` }}>
                    <p style={{ fontFamily: "'Playfair Display',serif", color: ink, fontWeight: 700, fontSize: '0.95rem', margin: 0, marginBottom: '4px' }}>{r.label}</p>
                    <p style={{ color: mutedText, fontSize: '0.9rem', margin: 0 }}>{r.detail}</p>
                  </div>
                ))}
                <div className="ink-bar" style={{ margin: '1.5rem 0 1rem' }} />
                <p style={{ color: mutedText, fontSize: '0.88rem', lineHeight: '1.8', margin: 0 }}>
                  Authors are encouraged to actively participate in reader engagement, book discussions, events, and online visibility. When author energy and publishing structure work together, books reach readers faster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem', background: '#130a04', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 34px,rgba(192,57,43,0.04) 35px,rgba(192,57,43,0.04) 36px)' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(192,57,43,0.22) 0%,rgba(212,69,12,0.08) 50%,transparent 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: `linear-gradient(90deg,transparent,${ACCENT},${SAFFRON},transparent)` }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <p lang="hi" style={{ fontFamily: "'Yatra One',serif", color: `${ACCENT}dd`, fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              — प्रकाशन —
            </p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900,
              color: '#f0e8dc', lineHeight: 1.1, marginBottom: '1rem' }}>
              Your Pen.<br />
              <em style={{ color: ACCENT }}>Our Partnership.</em>
            </h2>
            <div className="ink-bar" style={{ margin: '1.2rem auto', maxWidth: '180px' }} />
            <p style={{ color: 'rgba(240,232,220,0.7)', fontSize: '1rem', lineHeight: '1.9',
              maxWidth: '440px', margin: '0 auto 2.5rem' }}>
              Publishing is not just about producing books. It is about bringing ideas into the reader's world with dignity and professional quality.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginBottom: '2rem' }}>
              <a href={waLink("I'd like to discuss publishing my book")}
                target="_blank" rel="noopener noreferrer" className="pulse-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '13px 28px',
                  textDecoration: 'none', background: `linear-gradient(135deg,${ACCENT},${SAFFRON})`,
                  color: '#fff', fontFamily: "'Playfair Display',serif", fontWeight: 700,
                  fontSize: '0.95rem', letterSpacing: '0.04em', boxShadow: '0 10px 40px rgba(192,57,43,0.45)',
                }}>
                Discuss Your Book
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </a>
              <a href={PHONE}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '13px 28px',
                  textDecoration: 'none', border: '1.5px solid rgba(240,232,220,0.25)',
                  color: '#f0e8dc', fontFamily: "'Playfair Display',serif", fontWeight: 700,
                  fontSize: '0.95rem', letterSpacing: '0.04em', transition: 'border-color .22s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(240,232,220,0.25)')}>
                Call Us
              </a>
            </div>
            <div style={{ borderTop: '1px solid rgba(192,57,43,0.25)', paddingTop: '1.5rem' }}>
              <p style={{ color: 'rgba(240,232,220,0.45)', fontSize: '0.78rem', letterSpacing: '0.06em', margin: 0 }}>
                support@cosmoindiaprakashan.in &nbsp;·&nbsp; cosmoindiaprakashan.in
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default PublishingServices;