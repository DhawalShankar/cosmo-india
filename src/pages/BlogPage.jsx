import { useContext } from 'react';
import {
  PenTool, BookOpen, Users, TrendingUp, Sparkles, ArrowRight,
  Mail, Phone, FileText, Award, Globe, Lightbulb, Heart, Brain, MapPin
} from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import Posts from './Posts';

const BlogPage = () => {
  const { darkMode } = useContext(DarkModeContext);

  /* ── Colour tokens (mirror homepage) ── */
  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink       = darkMode ? '#f0e8dc'                       : '#1a1209';
  const paper     = darkMode ? '#141210'                       : '#fdf6ee';
  const ruleLine  = darkMode ? 'rgba(192,57,43,0.28)'          : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.82)'        : 'rgba(26,18,9,0.72)';

  const writerBenefits = [
    { icon: Globe,      num:'01', title:'Global Reach',  desc:'Your words will reach thousands of readers across India and beyond.' },
    { icon: Award,      num:'02', title:'Recognition',   desc:'Build your personal brand and establish yourself as a thought leader.' },
    { icon: Users,      num:'03', title:'Community',     desc:'Join a vibrant community of writers, educators, and change-makers.' },
    { icon: TrendingUp, num:'04', title:'Growth',        desc:'Receive feedback and grow your writing skills with expert guidance.' },
  ];

  const topics = [
    'Literature & Arts', 'Self-Help & Growth', 'Education & Learning',
    'Youth Development', 'Indian Culture', 'Philosophy & Ethics',
    'Social Impact', 'Innovation & Technology', 'Health & Wellness',
    'Career & Success', 'History & Heritage', 'Environmental Awareness',
  ];

  const mission = [
    { icon: Heart,    title:'Enrich the Nation', desc:'Share knowledge that uplifts and empowers our country.' },
    { icon: Brain,    title:'Educate the Youth', desc:'Inspire and guide the next generation of leaders.' },
    { icon: Lightbulb,title:'Spark Innovation',  desc:'Foster critical thinking and creative expression.' },
  ];

  /* ── Ticker content — two identical halves for seamless loop ── */
  const tickerHalf = [...Array(10)].map((_, i) => (
    <span key={i} className="yatra text-white tracking-widest"
      style={{ fontSize: '0.75rem', paddingRight: '2.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
      ✦ &nbsp; मंथन की कलम &nbsp; ✦ &nbsp; Write for CIP Manthan &nbsp; ✦ &nbsp; Cosmo India Prakashan &nbsp; ✦ &nbsp; Ideas Before They Absolve &nbsp; ✦ &nbsp; भारतीय विचार &nbsp;
    </span>
  ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');

        :root {
          --bp-ink:     ${ink};
          --bp-paper:   ${paper};
          --bp-accent:  ${accent};
          --bp-saffron: ${saffron};
          --bp-rule:    ${ruleLine};
          --bp-muted:   ${mutedText};
        }

        .bp * { box-sizing: border-box; }
        .bp {
          background: var(--bp-paper);
          color: var(--bp-ink);
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          font-size: 15.5px;
        }
        .bp .yatra { font-family: 'Yatra One', serif; }
        .bp .h1f   { font-family: 'Playfair Display', Georgia, serif; }
        .bp .hindi { font-family: 'Tiro Devanagari Hindi', 'Mangal', serif; line-height: 2.0; }

        .bp .rule-b { border-bottom: 1px solid var(--bp-rule); }
        .bp .ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--bp-accent) 30%, var(--bp-saffron) 70%, transparent);
        }
        .bp .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--bp-rule);
          user-select: none; pointer-events: none; line-height: 1;
        }

        /* Noise */
        .bp .noise::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; mix-blend-mode: multiply;
        }

        /* Ink lines */
        @keyframes bp-inkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.7; }
          85%  { opacity:.7; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .bp .ink-line { animation: bp-inkRise linear infinite; }

        /* Fade up */
        @keyframes bp-fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .bp .fu  { animation: bp-fadeUp .85s cubic-bezier(.22,1,.36,1) both; }
        .bp .d1  { animation-delay:.12s; }
        .bp .d2  { animation-delay:.26s; }
        .bp .d3  { animation-delay:.40s; }
        .bp .d4  { animation-delay:.55s; }

        /* Flicker */
        @keyframes bp-flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.55} 53%{opacity:.95} }
        .bp .flicker { animation: bp-flicker 7s ease-in-out infinite; }

        /* Seamless ticker — mirrors homepage pattern */
        @keyframes bp-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .bp .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: bp-ticker 140s linear infinite;
        }
        .bp .ticker-half { display: flex; flex-shrink: 0; }

        /* Lift */
        .bp .lift { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
        .bp .lift:hover { transform: translateY(-5px); }

        /* Stripe hover */
        .bp .stripe-h { position:relative; overflow:hidden; }
        .bp .stripe-h::after { content:''; position:absolute; bottom:0; left:0; height:2px; width:0;
          background:linear-gradient(90deg,var(--bp-accent),var(--bp-saffron)); transition:width .42s ease; }
        .bp .stripe-h:hover::after { width:100%; }

        /* Pulse btn */
        @keyframes bp-pulse { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .bp .pulse-btn:hover { animation: bp-pulse 1s ease-out; }

        /* Val card hover */
        .bp .val-card { transition: transform .28s, box-shadow .28s, border-color .28s; }

        /* Deva stripe */
        .bp .deva-stripe {
          writing-mode: vertical-rl;
          font-family: 'Yatra One', serif;
          font-size: 0.82rem; letter-spacing: 0.12em;
          color: ${darkMode ? 'rgba(240,200,160,0.7)' : 'rgba(139,32,16,0.55)'};
          user-select: none;
        }

        /* Topic pill hover */
        .bp .topic-pill {
          transition: background .22s, color .22s, transform .22s, border-color .22s;
          cursor: pointer;
        }
        .bp .topic-pill:hover {
          background: ${accent} !important;
          color: #fff !important;
          border-color: ${accent} !important;
          transform: translateY(-2px);
        }

        /* ci-input (contact form fields) */
        .bp .ci-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--bp-rule);
          border-radius: 3px;
          background: ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.75)'};
          color: var(--bp-ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: border-color .22s, box-shadow .22s;
        }
        .bp .ci-input::placeholder { color: var(--bp-muted); }
        .bp .ci-input:focus { border-color: var(--bp-accent); box-shadow: 0 0 0 3px rgba(192,57,43,.12); }
      `}</style>

      <div className="bp min-h-screen">

        {/* ═══════════ HERO ═══════════ */}
        <section className="relative flex items-center noise overflow-hidden"
          style={{
            minHeight: '92vh',
            background: darkMode
              ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
              : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)',
          }}>

          {/* Ink lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { left:'10%', h:'38vh', delay:'0s',  dur:'15s' },
              { left:'28%', h:'28vh', delay:'4s',  dur:'19s' },
              { left:'54%', h:'46vh', delay:'8s',  dur:'13s' },
              { left:'73%', h:'33vh', delay:'2s',  dur:'17s' },
              { left:'89%', h:'40vh', delay:'6s',  dur:'21s' },
            ].map((l,i) => (
              <div key={i} className="absolute bottom-0 ink-line"
                style={{ left:l.left, width:'1px', height:l.h,
                  background:`linear-gradient(to top,transparent,${accent}75,transparent)`,
                  animationDuration:l.dur, animationDelay:l.delay }} />
            ))}
          </div>

          {/* Devanagari stripe */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
            <div className="w-px h-14" style={{ background:'var(--bp-rule)' }} />
            <span className="deva-stripe">मंथन की कलम</span>
            <div className="w-px h-14" style={{ background:'var(--bp-rule)' }} />
          </div>

          {/* Two-column layout */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16
            flex flex-col lg:flex-row items-center gap-12 lg:gap-16 h-full pt-24 pb-10">

            {/* LEFT */}
            <div className="flex-1">
              {/* Eyebrow */}
              <div className="fu flex items-center gap-4 mb-6">
                <div style={{ width:'2.2rem', height:'2px', background:accent, flexShrink:0 }} />
                <span className="yatra font-medium"
                  style={{ color: darkMode ? '#f0c8a0' : '#8b2010', fontSize:'1.05rem', letterSpacing:'0.06em',
                    textShadow: darkMode ? '0 0 18px rgba(240,160,80,0.35)' : 'none' }}>
                  CIP मंथन
                </span>
                <span style={{ color: darkMode ? 'rgba(240,232,220,0.5)' : 'rgba(26,18,9,0.4)',
                  fontSize:'0.7rem', letterSpacing:'0.22em', fontFamily:'DM Sans, sans-serif' }}>
                  — WRITE FOR US
                </span>
              </div>

              {/* Headline */}
              <h1 className="h1f fu d1 font-black leading-[1.06] mb-8"
                style={{ fontSize:'clamp(2.6rem, 5.5vw, 4.8rem)', color:'var(--bp-ink)' }}>
                Write for<br />
                <em style={{ color:accent }}>CIP</em><br />
                Manthan.
              </h1>

              {/* Pull quote */}
              <div className="fu d2 pl-5 max-w-lg" style={{ borderLeft:`3px solid ${accent}` }}>
                <p className="flicker hindi italic" style={{ color:'var(--bp-muted)', fontSize:'0.98rem' }}>
                  "मंथन — गहन विचार करके सार से सत्य को निकालने की प्रक्रिया"
                </p>
                <p className="mt-2 tracking-widest uppercase" style={{ color:accent, fontSize:'0.72rem' }}>
                  — Cosmo India Prakashan
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 flex flex-col justify-center gap-7">

              {/* Description */}
              <p className="fu d1 leading-relaxed" style={{ color:'var(--bp-muted)', fontSize:'1.02rem' }}>
                CIP Manthan is a blog initiative of Cosmo India Prakashan, created to churn ideas before they become absolute. It aims to awaken the intellect of India's youth through literature and knowledge.
              </p>

              {/* CTAs */}
              <div className="fu d2 flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior:'smooth' })}
                  className="pulse-btn group flex items-center gap-2.5 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:gap-4"
                  style={{ background:`linear-gradient(135deg,${accent},${saffron})`, letterSpacing:'0.04em', fontSize:'0.92rem' }}>
                  <PenTool className="w-4 h-4" />
                  <span className="h1f">Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.getElementById('blog-posts')?.scrollIntoView({ behavior:'smooth' })}
                  className="px-7 py-3.5 font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  style={{ border:`1.5px solid ${darkMode ? 'rgba(240,232,220,0.25)' : 'rgba(26,18,9,0.25)'}`,
                    color:'var(--bp-ink)', background:'transparent', letterSpacing:'0.04em', fontSize:'0.92rem' }}>
                  <BookOpen className="w-4 h-4" />
                  <span className="h1f">Read Latest Posts</span>
                </button>
              </div>

              {/* Trust line */}
              <p className="fu d3" style={{ color:'var(--bp-muted)', fontSize:'0.78rem', letterSpacing:'0.04em' }}>
                Literature &nbsp;•&nbsp; Culture &nbsp;•&nbsp; Philosophy &nbsp;•&nbsp; Youth &nbsp;•&nbsp; Knowledge
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-5 right-10 hidden md:flex flex-col items-center gap-1.5">
            <span style={{ fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--bp-muted)' }}>Scroll</span>
            <div style={{ width:'1px', height:'1.8rem', background:`linear-gradient(to bottom,${accent},transparent)` }} />
          </div>
        </section>

        {/* ═══════════ MARQUEE ═══════════ */}
        <div style={{ background: accent, overflow: 'hidden', padding: '10px 0' }}>
          <div className="ticker-track">
            <div className="ticker-half">{tickerHalf}</div>
            <div className="ticker-half">{tickerHalf}</div>
          </div>
        </div>

        {/* ═══════════ MISSION ═══════════ */}
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
                01
              </span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:`${accent}dd` }}>हमारा उद्देश्य</p>
                <h2 className="h1f font-bold" style={{ color:'#f0e8dc', fontSize:'2rem' }}>Our Mission</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {mission.map((m, i) => (
                <div key={i} className="val-card relative group overflow-hidden"
                  style={{
                    background:'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border:'1px solid rgba(192,57,43,0.25)',
                    padding:'1.75rem',
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
                    <m.icon style={{ width:'1.15rem', height:'1.15rem' }} />
                  </div>
                  <h3 className="h1f font-bold mb-3" style={{ color:'#f0e8dc', fontSize:'1.08rem' }}>{m.title}</h3>
                  <p style={{ color:'rgba(240,232,220,0.65)', fontSize:'0.93rem', lineHeight:'1.75' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY WRITE FOR US ═══════════ */}
        <section className="py-24 relative" style={{
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #160e08 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #ffe8cc 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="flex items-center gap-5 mb-14 rule-b pb-6">
              <span className="ghost-num">02</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>क्यों लिखें</p>
                <h2 className="h1f font-bold" style={{ color:'var(--bp-ink)', fontSize:'2rem' }}>Why Write for Us?</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {writerBenefits.map((b, i) => (
                <div key={i} className="lift stripe-h relative group p-8"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                      : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
                    border:`1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`,
                    boxShadow: darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />
                  <span className="h1f absolute bottom-3 right-4 font-black select-none pointer-events-none"
                    style={{ fontSize:'4.5rem', color:'transparent',
                      WebkitTextStroke:`1px ${darkMode ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.08)'}`, lineHeight:1 }}>
                    {b.num}
                  </span>
                  <div className="w-10 h-10 mb-5 flex items-center justify-center"
                    style={{ background:`${accent}15`, border:`1px solid ${accent}35`, color:accent }}>
                    <b.icon style={{ width:'1.1rem', height:'1.1rem' }} />
                  </div>
                  <h3 className="h1f font-bold mb-2" style={{ color:'var(--bp-ink)', fontSize:'1.08rem' }}>{b.title}</h3>
                  <p style={{ color:'var(--bp-muted)', fontSize:'0.93rem', lineHeight:'1.75' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ BLOG POSTS ═══════════ */}
        <section id="blog-posts" className="py-24 relative overflow-hidden" style={{
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
                <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:`${accent}dd` }}>ताज़े विचार</p>
                <h2 className="h1f font-bold" style={{ color:'#f0e8dc', fontSize:'2rem' }}>Latest from Our Blog</h2>
              </div>
            </div>
            <Posts darkMode={darkMode} />
          </div>
        </section>

        {/* ═══════════ TOPICS ═══════════ */}
        <section className="py-24 relative" style={{
          background: darkMode
            ? 'linear-gradient(180deg, #160e08 0%, #0e0c09 100%)'
            : 'linear-gradient(180deg, #ffe8cc 0%, #fff3e8 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="flex items-center gap-5 mb-14 rule-b pb-6">
              <span className="ghost-num">04</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>विषय</p>
                <h2 className="h1f font-bold" style={{ color:'var(--bp-ink)', fontSize:'2rem' }}>Topics We Love</h2>
              </div>
            </div>

            <p className="mb-10" style={{ color:'var(--bp-muted)', fontSize:'1.02rem' }}>
              Share your expertise on these subjects — and more. If your words arise from reflection, inquiry, or lived experience, there's a place for them here.
            </p>

            <div className="flex flex-wrap gap-3">
              {topics.map((topic, i) => (
                <span key={i} className="topic-pill px-5 py-2.5 font-medium"
                  style={{
                    background: darkMode ? 'rgba(192,57,43,0.08)' : 'rgba(192,57,43,0.06)',
                    border:`1px solid ${darkMode ? 'rgba(192,57,43,0.3)' : 'rgba(192,57,43,0.2)'}`,
                    color: darkMode ? '#e8a090' : accent,
                    fontSize:'0.88rem', letterSpacing:'0.03em',
                  }}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section id="contact-info" className="py-24 relative overflow-hidden" style={{
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
                05
              </span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:`${accent}dd` }}>संपर्क करें</p>
                <h2 className="h1f font-bold" style={{ color:'#f0e8dc', fontSize:'2rem' }}>Ready to Share Your Story?</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-14">

              {/* Contact cards */}
              <div className="space-y-0">
                {[
                  {
                    icon: Mail, title:'Email Us',
                    href:'mailto:cosmoindiaprakashan@gmail.com',
                    content: <p style={{ color:'rgba(240,232,220,0.65)', fontSize:'0.95rem' }}>cosmoindiaprakashan@gmail.com</p>
                  },
                  {
                    icon: Phone, title:'Call Us',
                    href:'tel:+917388270331',
                    content: <p style={{ color:'rgba(240,232,220,0.65)', fontSize:'0.95rem' }}>+91 738 827 0331</p>
                  },
                  {
                    icon: MapPin, title:'Visit Us',
                    href: null,
                    content: <p style={{ color:'rgba(240,232,220,0.65)', fontSize:'0.95rem', lineHeight:'1.7' }}>Cosmo India Prakashan<br />Kanpur Nagar, UP (India)</p>
                  },
                ].map((item, i) => {
                  const inner = (
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background:'rgba(192,57,43,0.12)', border:'1px solid rgba(192,57,43,0.35)', color:'#e8a090' }}>
                        <item.icon style={{ width:'1.1rem', height:'1.1rem' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="h1f font-bold mb-2" style={{ color:'#f0e8dc', fontSize:'1.05rem' }}>{item.title}</h3>
                        {item.content}
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={i} href={item.href}
                      className="lift block py-7"
                      style={{
                        borderTop: i===0 ? '1px solid rgba(192,57,43,0.18)' : 'none',
                        borderBottom:'1px solid rgba(192,57,43,0.18)',
                        textDecoration:'none',
                      }}>
                      {inner}
                    </a>
                  ) : (
                    <div key={i} className="py-7"
                      style={{
                        borderTop: i===0 ? '1px solid rgba(192,57,43,0.18)' : 'none',
                        borderBottom:'1px solid rgba(192,57,43,0.18)',
                      }}>
                      {inner}
                    </div>
                  );
                })}
              </div>

              {/* Note panel */}
              <div className="relative p-9"
                style={{
                  background:'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                  border:'1px solid rgba(192,57,43,0.22)',
                }}>
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-7 h-7" style={{ borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
                <div className="absolute bottom-0 right-0 w-7 h-7" style={{ borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />

                <p className="yatra mb-6 flex items-center gap-3" style={{ color:accent, fontSize:'0.92rem' }}>
                  <span style={{ display:'inline-block', width:'1.5rem', height:'2px', background:accent }} />
                  लेखकों के लिए एक सन्देश 
                </p>

                <div className="mb-8">
                  <div className="h1f font-black leading-none mb-3 select-none"
                    style={{ fontSize:'4rem', color:`${accent}20`, lineHeight:0.8 }}>"</div>
                  <p style={{ color:'rgba(240,232,220,0.75)', fontSize:'1rem', lineHeight:'1.9' }}>
                    CIP Manthan welcomes writing that is honest, thoughtful, and rooted in depth. If your words arise from reflection, inquiry, or lived experience — and seek to awaken minds rather than chase noise — you already belong here.
                  </p>
                  <div className="ink-bar mt-6 mb-6" />
                  <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.85rem', letterSpacing:'0.08em' }}>
                    — Cosmo India Prakashan
                  </p>
                </div>

                <a href="mailto:cosmoindiaprakashan@gmail.com"
                  className="pulse-btn inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:gap-4"
                  style={{ background:`linear-gradient(135deg,${accent},${saffron})`,
                    letterSpacing:'0.04em', fontSize:'0.92rem',
                    boxShadow:`0 8px 30px ${accent}40`, textDecoration:'none' }}>
                  <span className="h1f">Send Your Submission</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
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
            <p className="yatra mb-4" style={{ color:`${accent}dd`, fontSize:'1.15rem', letterSpacing:'0.1em' }}>— CIP मंथन —</p>
            <h2 className="h1f font-black leading-tight mb-5"
              style={{ fontSize:'clamp(2rem, 4.5vw, 3.4rem)', color:'#f0e8dc' }}>
              Your Pen.<br />
              <em style={{ color:accent }}>Bharat's Voice.</em>
            </h2>
            <p className="mb-10 leading-relaxed mx-auto"
              style={{ color:'rgba(240,232,220,0.72)', fontSize:'1.05rem', maxWidth:'36rem' }}>
              Ideas must be churned before they become absolute. Join the writers who believe the written word still has the power to awaken minds.
            </p>
            <button
              onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior:'smooth' })}
              className="pulse-btn inline-flex items-center gap-3 px-10 py-4 font-semibold text-white transition-all duration-300 hover:gap-5"
              style={{ background:`linear-gradient(135deg,${accent},${saffron})`, letterSpacing:'0.05em', fontSize:'0.95rem',
                boxShadow:`0 10px 40px rgba(192,57,43,0.45)` }}>
              <PenTool className="w-4 h-4" />
              <span className="h1f">Start Writing Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
    </>
  );
};

export default BlogPage;