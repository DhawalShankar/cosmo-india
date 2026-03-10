import React, { useState, useEffect, useContext } from 'react';
import {
  BookOpen, Heart, Star, Calendar, Award, Users, Globe,
  TrendingUp, Pen, BookMarked, Sparkles, Quote, Clock,
  Building2, Scroll, Flame, ArrowRight, ChevronDown
} from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const LegacyAuthors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [activeTimeline, setActiveTimeline] = useState(null);
  const [visibleStats, setVisibleStats] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setVisibleStats(true);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Colour tokens (mirror homepage exactly) ── */
  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink       = darkMode ? '#f0e8dc'                       : '#1a1209';
  const paper     = darkMode ? '#141210'                       : '#fdf6ee';
  const ruleLine  = darkMode ? 'rgba(192,57,43,0.28)'          : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.82)'        : 'rgba(26,18,9,0.72)';

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

  const timelineEvents = [
    { year: '1982',   icon: Building2,  highlight: true,  title: 'The Beginning',              description: 'Cosmo India Prakashan was born in an era when publishing was driven by purpose, patience, and intellectual commitment — a small initiative centred around periodicals on astrology and Indian thought.' },
    { year: '1990s',  icon: Scroll,     highlight: true,  title: 'The Magazine Era',            description: 'Reached over 300 regular subscribers across India with monthly periodicals focusing on Indian cultural, spiritual and astrological wisdom. Publications travelled from Kashmir to Kanyakumari, creating a community of knowledge seekers.' },
    { year: '2000s',  icon: TrendingUp, highlight: false, title: 'Evolution & Expansion',       description: 'Evolved from periodicals to a broader platform for literature, reflection, and cultural dialogue — engaging with diverse subjects while maintaining roots in India\'s knowledge traditions.' },
    { year: '2010s',  icon: BookOpen,   highlight: false, title: 'Adhyayan & Silent Preservation', description: 'Active operations were consciously paused. The founder withdrew from outward expansion and devoted himself to continuous study, astrological practice, advising, and preservation of intellectual lineage.' },
    { year: '2020s',  icon: Award,      highlight: false, title: 'MSME Recognition',             description: 'Officially registered under Udyam as an MSME, marking four decades of commitment to meaningful publishing — now supporting new authors seeking substance over visibility.' },
    { year: 'Today',  icon: Flame,      highlight: true,  title: 'Punar-Utthāna — A Living Legacy', description: 'Established in 1982 and revived for the present era, the publishing house now carries forward a lineage of study, books, and knowledge stewardship — guided by Dhawal, combining traditional wisdom with modern systems and ethical publishing practices.' },
  ];

  const focusAreas = [
    { icon: BookMarked, title: 'Literature',                   desc: 'Fiction, non-fiction, essays, and reflective works that engage with human experience and cultural realities.' },
    { icon: Star,       title: 'Astrology & Indian Knowledge', desc: 'Interpretative and contemporary engagements with traditional wisdom and Vedic sciences.' },
    { icon: Pen,        title: 'Thought & Discourse',          desc: 'Long-form writing, opinion, and dialogue that encourage reflection rather than reaction.' },
    { icon: Sparkles,   title: 'Emerging Writers & Ideas',     desc: 'Editorial support and platforms for new authors seeking substance over visibility.' },
  ];

  const stats = [
    { number: '1982',     label: 'Founded',                 icon: Calendar },
    { number: '40+',      label: 'Years of Experience',     icon: Award    },
    { number: '300+',     label: 'Peak Subscribers (1990s)',icon: Users    },
    { number: 'All India',label: 'Reach & Distribution',   icon: Globe    },
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
        .la .yatra  { font-family: 'Yatra One', serif; }
        .la .h1f    { font-family: 'Playfair Display', Georgia, serif; }
        .la .hindi  { font-family: 'Tiro Devanagari Hindi', 'Mangal', serif; line-height: 2.0; }

        .la .rule-b { border-bottom: 1px solid var(--rule); }
        .la .ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent) 30%, var(--saffron) 70%, transparent);
        }
        .la .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--rule);
          user-select: none;
          pointer-events: none;
          line-height: 1;
        }

        /* Noise overlay */
        .la .noise::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: multiply;
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
        .la .fu   { animation: la-fadeUp .85s cubic-bezier(.22,1,.36,1) both; }
        .la .d1   { animation-delay:.12s; }
        .la .d2   { animation-delay:.26s; }
        .la .d3   { animation-delay:.40s; }
        .la .d4   { animation-delay:.55s; }

        /* Flicker */
        @keyframes la-flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.55} 53%{opacity:.95} }
        .la .flicker { animation: la-flicker 7s ease-in-out infinite; }

        /* Marquee */
        @keyframes la-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .la .mq { animation: la-marquee 30s linear infinite; }

        /* Lift */
        .la .lift { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
        .la .lift:hover { transform: translateY(-5px); }

        /* Stripe hover */
        .la .stripe-h { position:relative; overflow:hidden; }
        .la .stripe-h::after { content:''; position:absolute; bottom:0; left:0; height:2px; width:0; background:linear-gradient(90deg,var(--accent),var(--saffron)); transition:width .42s ease; }
        .la .stripe-h:hover::after { width:100%; }

        /* CTA pulse */
        @keyframes la-pulse { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .la .pulse-btn:hover { animation: la-pulse 1s ease-out; }

        /* Timeline dot pulse */
        @keyframes la-dotPulse { 0%,100%{box-shadow:0 0 0 0 rgba(192,57,43,.5)} 50%{box-shadow:0 0 0 8px rgba(192,57,43,0)} }
        .la .tl-dot-active { animation: la-dotPulse 1.6s ease-in-out infinite; }

        /* Val card hover */
        .la .val-card { transition: background .28s, border-color .28s, transform .28s; }
        .la .val-card:hover { transform: translateY(-4px); }

        /* Stat counter fade */
        .la .stat-card { transition: opacity .5s ease, transform .5s ease; }
        .la .stat-card.hidden-stat { opacity:0; transform:translateY(20px); }
        .la .stat-card.shown-stat  { opacity:1; transform:translateY(0); }

        /* Author image zoom */
        .la .author-img { transition: transform .6s ease; }
        .la .author-wrap:hover .author-img { transform: scale(1.05); }

        /* Deva stripe */
        .la .deva-stripe {
          writing-mode: vertical-rl;
          font-family: 'Yatra One', serif;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          color: ${darkMode ? 'rgba(240,200,160,0.7)' : 'rgba(139,32,16,0.55)'};
          user-select: none;
        }
      `}</style>

      <div className="la min-h-screen">

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative flex flex-col items-center justify-center noise overflow-hidden"
          style={{
            minHeight: '92vh',
            background: darkMode
              ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
              : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)',
          }}>

          {/* Ink lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { left:'8%',  h:'40vh', delay:'0s',  dur:'16s' },
              { left:'25%', h:'30vh', delay:'5s',  dur:'20s' },
              { left:'52%', h:'48vh', delay:'9s',  dur:'14s' },
              { left:'74%', h:'35vh', delay:'3s',  dur:'18s' },
              { left:'91%', h:'42vh', delay:'7s',  dur:'22s' },
            ].map((l,i) => (
              <div key={i} className="absolute bottom-0 ink-line"
                style={{ left:l.left, width:'1px', height:l.h,
                  background:`linear-gradient(to top,transparent,${accent}75,transparent)`,
                  animationDuration:l.dur, animationDelay:l.delay }} />
            ))}
          </div>

          {/* Devanagari side stripe */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
            <div className="w-px h-14" style={{ background:'var(--rule)' }} />
            <span className="deva-stripe">विरासत की कलम</span>
            <div className="w-px h-14" style={{ background:'var(--rule)' }} />
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto px-8 lg:px-16 text-center py-20 pt-28">

            {/* Eyebrow */}
            <div className="fu flex items-center justify-center gap-4 mb-8">
              <div style={{ width:'2.2rem', height:'2px', background:accent, flexShrink:0 }} />
              <span className="yatra font-medium"
                style={{ color: darkMode ? '#f0c8a0' : '#8b2010', fontSize:'1.05rem', letterSpacing:'0.06em',
                  textShadow: darkMode ? '0 0 18px rgba(240,160,80,0.35)' : 'none' }}>
                कॉस्मो इंडिया प्रकाशन
              </span>
              <div style={{ width:'2.2rem', height:'2px', background:accent, flexShrink:0 }} />
            </div>

            {/* Headline */}
            <h1 className="h1f fu d1 font-black leading-[1.06] mb-8"
              style={{ fontSize:'clamp(2.8rem, 6vw, 5rem)', color:'var(--ink)' }}>
              Our <em style={{ color:accent }}>Legacy</em> &amp;<br />Living History.
            </h1>

            {/* Pull quote */}
            <div className="fu d2 max-w-2xl mx-auto px-5 py-6 mb-10"
              style={{ borderLeft:`3px solid ${accent}`, borderRight:`3px solid ${accent}`,
                background: darkMode ? 'rgba(192,57,43,0.06)' : 'rgba(192,57,43,0.04)' }}>
              <p className="flicker hindi italic" style={{ color:'var(--muted)', fontSize:'1.05rem' }}>
                "लेखन केवल सूचना नहीं, अपितु आत्मा, समाज और जगत की समझ का माध्यम है।"
              </p>
              <p className="mt-3 tracking-widest uppercase" style={{ color:accent, fontSize:'0.72rem' }}>
                — Cosmo India Prakashan
              </p>
            </div>

            {/* Trust line */}
            <p className="fu d3" style={{ color:'var(--muted)', fontSize:'0.78rem', letterSpacing:'0.08em' }}>
              Astrology &nbsp;•&nbsp; Philosophy &nbsp;•&nbsp; Culture &nbsp;•&nbsp; Bharatiya Literature &nbsp;•&nbsp; Since 1982
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span style={{ fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--muted)' }}>Scroll</span>
            <div style={{ width:'1px', height:'1.8rem', background:`linear-gradient(to bottom,${accent},transparent)` }} />
          </div>
        </section>

        {/* ═══════════ MARQUEE ═══════════ */}
        <div className="overflow-hidden py-2.5" style={{ background:accent }}>
          <div className="mq flex whitespace-nowrap gap-12">
            {[...Array(10)].map((_,i) => (
              <span key={i} className="yatra text-white tracking-widest" style={{ fontSize:'0.75rem' }}>
                ✦ &nbsp; विरासत की कलम &nbsp; ✦ &nbsp; A Living Legacy &nbsp; ✦ &nbsp; Cosmo India Prakashan &nbsp; ✦ &nbsp; Since 1982 &nbsp; ✦ &nbsp; भारतीय विचार &nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════ STATS ═══════════ */}
        <section className="py-24 relative overflow-hidden" style={{
          background: darkMode
            ? 'linear-gradient(135deg, #0e0a07 0%, #1a0d08 40%, #120c08 100%)'
            : 'linear-gradient(135deg, #1a0d06 0%, #2a1008 40%, #1a0905 100%)'
        }}>
          {/* Grid dot pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`radial-gradient(circle, rgba(192,57,43,0.18) 1px, transparent 1px)`,
            backgroundSize:'36px 36px', opacity:0.5
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,57,43,0.12) 0%, transparent 70%)'
          }} />

          <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
            <div className="flex items-center gap-5 mb-14 pb-6"
              style={{ borderBottom:'1px solid rgba(192,57,43,0.3)' }}>
              <span className="h1f font-black shrink-0"
                style={{ fontSize:'3rem', color:'transparent', WebkitTextStroke:'1px rgba(240,232,220,0.18)', lineHeight:1 }}>
                01
              </span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:`${accent}dd` }}>हमारी यात्रा</p>
                <h2 className="h1f font-bold" style={{ color:'#f0e8dc', fontSize:'2rem' }}>Four Decades at a Glance</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0"
              style={{ border:'1px solid rgba(192,57,43,0.25)', borderRight:'none' }}>
              {stats.map((s, i) => (
                <div key={i}
                  className={`stat-card px-6 py-8 ${visibleStats ? 'shown-stat' : 'hidden-stat'}`}
                  style={{
                    borderRight:'1px solid rgba(192,57,43,0.25)',
                    background:'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    transitionDelay:`${i*120}ms`,
                  }}>
                  <s.icon style={{ width:'1.2rem', height:'1.2rem', color:accent, marginBottom:'0.75rem' }} />
                  <p className="h1f font-black mb-1" style={{ color:accent, fontSize:'2rem', lineHeight:1 }}>{s.number}</p>
                  <p style={{ color:'rgba(240,232,220,0.65)', fontSize:'0.78rem', letterSpacing:'0.04em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TIMELINE ═══════════ */}
        <section className="py-24 relative" style={{
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #160e08 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #ffe8cc 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">

            <div className="flex items-center gap-5 mb-16 rule-b pb-6">
              <span className="ghost-num">02</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>इतिहास</p>
                <h2 className="h1f font-bold" style={{ color:'var(--ink)', fontSize:'2rem' }}>A Journey Through Time</h2>
              </div>
            </div>

            {/* Desktop timeline (center line) */}
            <div className="hidden md:block relative">
              {/* Centre line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                style={{ background:`linear-gradient(to bottom, transparent, ${accent}, ${saffron}, transparent)` }} />

              <div className="space-y-16">
                {timelineEvents.map((ev, i) => (
                  <div key={i}
                    className={`flex items-center gap-0 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    onMouseEnter={() => setActiveTimeline(i)}
                    onMouseLeave={() => setActiveTimeline(null)}>

                    {/* Card */}
                    <div className={`w-5/12 lift stripe-h ${i % 2 === 0 ? 'pr-10' : 'pl-10'}`}>
                      <div className="relative p-7"
                        style={{
                          background: darkMode
                            ? 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                            : 'linear-gradient(145deg, #ffffff 0%, #fdf6ee 100%)',
                          border:`1px solid ${ev.highlight
                            ? (darkMode ? 'rgba(192,57,43,0.5)' : 'rgba(192,57,43,0.4)')
                            : (darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)')}`,
                          boxShadow: ev.highlight
                            ? (darkMode ? '0 8px 40px rgba(192,57,43,0.2)' : '0 8px 40px rgba(192,57,43,0.12)')
                            : 'none',
                        }}>
                        {/* Accent top strip on highlight */}
                        {ev.highlight && (
                          <div className="absolute top-0 left-0 right-0 h-0.5"
                            style={{ background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />
                        )}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 flex items-center justify-center"
                            style={{ background:`${accent}15`, border:`1px solid ${accent}35`, color:accent }}>
                            <ev.icon style={{ width:'0.9rem', height:'0.9rem' }} />
                          </div>
                          <span className="h1f font-black"
                            style={{ color:accent, fontSize:'1.5rem', lineHeight:1 }}>
                            {ev.year}
                          </span>
                        </div>
                        <h3 className="h1f font-bold mb-2"
                          style={{ color:'var(--ink)', fontSize:'1.1rem' }}>
                          {ev.title}
                        </h3>
                        <p style={{ color:'var(--muted)', fontSize:'0.93rem', lineHeight:'1.78' }}>
                          {ev.description}
                        </p>
                      </div>
                    </div>

                    {/* Centre dot */}
                    <div className="w-2/12 flex justify-center">
                      <div className={`rounded-full ${activeTimeline === i ? 'tl-dot-active' : ''}`}
                        style={{
                          width: ev.highlight ? '18px' : '12px',
                          height: ev.highlight ? '18px' : '12px',
                          background: activeTimeline === i ? accent : (ev.highlight ? accent : `${accent}70`),
                          border:`2px solid ${accent}`,
                          transition:'all .3s ease',
                        }} />
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline (left line) */}
            <div className="md:hidden relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-px"
                style={{ background:`linear-gradient(to bottom, transparent, ${accent}, ${saffron}, transparent)` }} />
              <div className="space-y-8">
                {timelineEvents.map((ev, i) => (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-5 top-5"
                      style={{
                        width:ev.highlight?'14px':'10px', height:ev.highlight?'14px':'10px',
                        borderRadius:'50%', background:ev.highlight ? accent : `${accent}70`,
                        border:`2px solid ${accent}`, transform:'translateX(-50%)',
                      }} />
                    <div className="stripe-h lift p-5"
                      style={{
                        background: darkMode
                          ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                          : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
                        border:`1px solid ${ev.highlight ? `${accent}50` : (darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)')}`,
                      }}>
                      <div className="flex items-center gap-2 mb-2">
                        <ev.icon style={{ width:'0.85rem', height:'0.85rem', color:accent }} />
                        <span className="h1f font-black" style={{ color:accent, fontSize:'1.25rem' }}>{ev.year}</span>
                      </div>
                      <h3 className="h1f font-bold mb-2" style={{ color:'var(--ink)', fontSize:'1rem' }}>{ev.title}</h3>
                      <p style={{ color:'var(--muted)', fontSize:'0.88rem', lineHeight:'1.75' }}>{ev.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FOCUS AREAS ═══════════ */}
        <section className="py-24 relative overflow-hidden" style={{
          background: darkMode
            ? 'linear-gradient(135deg, #0e0a07 0%, #1a0d08 40%, #120c08 100%)'
            : 'linear-gradient(135deg, #1a0d06 0%, #2a1008 40%, #1a0905 100%)'
        }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`radial-gradient(circle, rgba(192,57,43,0.18) 1px, transparent 1px)`,
            backgroundSize:'36px 36px', opacity:0.5
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,57,43,0.12) 0%, transparent 70%)'
          }} />

          <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
            <div className="flex items-center gap-5 mb-14 pb-6"
              style={{ borderBottom:'1px solid rgba(192,57,43,0.3)' }}>
              <span className="h1f font-black shrink-0"
                style={{ fontSize:'3rem', color:'transparent', WebkitTextStroke:'1px rgba(240,232,220,0.18)', lineHeight:1 }}>
                03
              </span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:`${accent}dd` }}>हमारा ध्यान</p>
                <h2 className="h1f font-bold" style={{ color:'#f0e8dc', fontSize:'2rem' }}>Our Focus Areas</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {focusAreas.map((area, i) => (
                <div key={i} className="val-card relative group overflow-hidden"
                  style={{
                    background:'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border:'1px solid rgba(192,57,43,0.25)',
                    padding:'1.75rem',
                    transition:'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform='translateY(-6px)';
                    e.currentTarget.style.boxShadow='0 20px 50px rgba(192,57,43,0.25)';
                    e.currentTarget.style.borderColor='rgba(192,57,43,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform='translateY(0)';
                    e.currentTarget.style.boxShadow='none';
                    e.currentTarget.style.borderColor='rgba(192,57,43,0.25)';
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />
                  <span className="h1f absolute bottom-3 right-4 font-black select-none pointer-events-none"
                    style={{ fontSize:'5rem', color:'transparent', WebkitTextStroke:'1px rgba(192,57,43,0.12)', lineHeight:1 }}>
                    0{i+1}
                  </span>
                  <div className="w-11 h-11 mb-5 flex items-center justify-center"
                    style={{ background:'rgba(192,57,43,0.12)', border:'1px solid rgba(192,57,43,0.3)', color:'#e8a090' }}>
                    <area.icon style={{ width:'1.15rem', height:'1.15rem' }} />
                  </div>
                  <h3 className="h1f font-bold mb-3" style={{ color:'#f0e8dc', fontSize:'1.08rem' }}>{area.title}</h3>
                  <p style={{ color:'rgba(240,232,220,0.65)', fontSize:'0.93rem', lineHeight:'1.75' }}>{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ LEGACY AUTHORS ═══════════ */}
        <section className="py-24 relative" style={{
          background: darkMode
            ? 'linear-gradient(180deg, #160e08 0%, #0e0c09 100%)'
            : 'linear-gradient(180deg, #ffe8cc 0%, #fff3e8 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">

            <div className="flex items-center gap-5 mb-14 rule-b pb-6">
              <span className="ghost-num">04</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>विरासत के लेखक</p>
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
                  {/* Top accent strip */}
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />

                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height:'280px' }}>
                    <div className="absolute inset-0 z-10"
                      style={{ background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                    <img src={author.image} alt={author.name}
                      className="author-img w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase"
                        style={{ background:'rgba(0,0,0,0.75)', color:'rgba(240,232,220,0.85)',
                          border:'1px solid rgba(240,232,220,0.2)' }}>
                        In Memoriam
                      </span>
                    </div>

                    {/* Name overlay */}
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

                  {/* Body */}
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
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-7 h-7" style={{ borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
                <div className="absolute bottom-0 right-0 w-7 h-7" style={{ borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <p className="yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>विरासत</p>
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
                    <p className="yatra mb-4" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>उल्लेखनीय कार्य</p>
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

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section className="relative py-28 overflow-hidden" style={{ background:'#130a04' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`repeating-linear-gradient(45deg, transparent, transparent 34px, rgba(192,57,43,0.04) 35px, rgba(192,57,43,0.04) 36px)`
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background:`radial-gradient(ellipse 70% 60% at 50% 50%, rgba(192,57,43,0.22) 0%, rgba(212,69,12,0.08) 50%, transparent 100%)`
          }} />
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background:`linear-gradient(90deg, transparent, ${accent}, ${saffron}, transparent)` }} />

          <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">
            <p className="yatra mb-4" style={{ color:`${accent}dd`, fontSize:'1.15rem', letterSpacing:'0.1em' }}>— MSME Registered —</p>
            <h2 className="h1f font-black leading-tight mb-5"
              style={{ fontSize:'clamp(2rem, 4.5vw, 3.4rem)', color:'#f0e8dc' }}>
              Where Thoughtful Writing<br />
              <em style={{ color:accent }}>Finds Its Home</em>
            </h2>
            <p className="mb-10 leading-relaxed mx-auto"
              style={{ color:'rgba(240,232,220,0.72)', fontSize:'1.05rem', maxWidth:'36rem' }}>
              Guided by editors and authors with over 40 years of experience — always emphasising depth, clarity, and sincerity over trend-driven content.
            </p>
            <div className="inline-block px-8 py-4"
              style={{ background:`${accent}22`, border:`1px solid ${accent}66` }}>
              <p className="yatra" style={{ color:`${accent}dd`, fontSize:'1rem', letterSpacing:'0.08em' }}>
                Since 1982 &nbsp;•&nbsp; Purpose-Driven Publishing
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default LegacyAuthors;