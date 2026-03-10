import { useState, useEffect, useContext } from 'react';
import { Search, Menu, X, ChevronRight, BookOpen, Users, Award, Mail, MapPin, Phone, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Posts from "./Posts";
import { DarkModeContext } from '../context/DarkModeContext';

const CosmoPublicationSite = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const featuredBooks = [
    { id: 1, title: 'रत्न रहस्य (Ratna Rahasya)', author: 'Hindi', category: 'academic', price: '₹299', image: 'Ratn Rahasy.jpeg', badge: 'Bestseller', rating: 5 },
    { id: 2, title: 'सौरमंडल और आप (Saurmandal aur Aap)', author: 'Hindi', category: 'academic', price: '₹249', image: 'saur.png', badge: 'Most Loved', rating: 5 },
    { id: 3, title: 'हिन्दू दैनिक चर्या (Hindu Dainik Charya)', author: 'Hindi', category: 'academic', price: '₹99', image: 'hindu.jpeg', badge: "Reader's Choice", rating: 5 },
  ];

  const filteredBooks = activeCategory === 'all'
    ? featuredBooks
    : featuredBooks.filter(book => book.category === activeCategory);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.email) tempErrors.email = "Email is required";
    if (!form.message) tempErrors.message = "Message is required";
    if (Object.keys(tempErrors).length > 0) { setErrors(tempErrors); return; }
    const text = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(`https://wa.me/7388270331?text=${encodeURIComponent(text)}`, "_blank");
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  /* ── Colour tokens ── */
  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink       = darkMode ? '#f0e8dc'                       : '#1a1209';
  const paper     = darkMode ? '#141210'                       : '#fdf6ee';
  const ruleLine  = darkMode ? 'rgba(192,57,43,0.28)'          : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.82)'        : 'rgba(26,18,9,0.72)';
  const heroBg = darkMode
    ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
    : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)';

  /* Ticker items — 2 identical halves for seamless loop */
  const tickerContent = [...Array(10)].map((_, i) => (
    <span key={i} className="yatra text-white tracking-widest"
      style={{ fontSize: '0.75rem', paddingRight: '2.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
      ✦ &nbsp; कलम की आग &nbsp; ✦ &nbsp; Fearless Pens of Bharat &nbsp; ✦ &nbsp; Cosmo India Prakashan &nbsp; ✦ &nbsp; भारतीय विचार &nbsp; ✦ &nbsp; Since 1980s
    </span>
  ));

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

        .cr * { box-sizing: border-box; }
        .cr {
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          font-size: 15.5px;
        }

        .yatra { font-family: 'Yatra One', serif; }
        .h1    { font-family: 'Playfair Display', Georgia, serif; }
        .hindi { font-family: 'Tiro Devanagari Hindi', 'Mangal', serif; line-height: 2.0; }

        .rule-t { border-top:    1px solid var(--rule); }
        .rule-b { border-bottom: 1px solid var(--rule); }
        .rule-l { border-left:   1px solid var(--rule); }
        .ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent) 30%, var(--saffron) 70%, transparent);
        }

        .hero-bg { background: ${heroBg}; }

        .noise::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; mix-blend-mode: multiply;
        }

        @keyframes inkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.7; } 85% { opacity:.7; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .ink-line { animation: inkRise linear infinite; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .fu  { animation: fadeUp .85s cubic-bezier(.22,1,.36,1) both; }
        .d1  { animation-delay:.12s; } .d2 { animation-delay:.26s; }
        .d3  { animation-delay:.40s; } .d4 { animation-delay:.55s; }
        .d5  { animation-delay:.70s; }

        @keyframes flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.55} 53%{opacity:.95} }
        .flicker { animation: flicker 7s ease-in-out infinite; }

        .lift { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
        .lift:hover { transform: translateY(-5px); }

        @keyframes pulseBtn { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .pulse-btn:hover { animation: pulseBtn 1s ease-out; }

        @keyframes bob { 0%,100%{transform:translate(-50%,0)} 50%{transform:translate(-50%,8px)} }
        .bob { animation: bob 2.4s ease-in-out infinite; }

        /* ── Seamless ticker ── */
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: ticker 140s linear infinite;
        }
        .ticker-half { display: flex; flex-shrink: 0; }

        .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--rule);
          user-select: none; pointer-events: none; line-height: 1;
        }

        .ci-input {
          width: 100%; padding: 12px 16px;
          border: 1px solid var(--rule); border-radius: 3px;
          background: ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.75)'};
          color: var(--ink);
          font-family: 'EB Garamond', serif; font-size: 1rem;
          outline: none; transition: border-color .22s, box-shadow .22s;
        }
        .ci-input::placeholder { color: var(--muted); }
        .ci-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(192,57,43,.12); }

        .deva-stripe {
          writing-mode: vertical-rl;
          font-family: 'Yatra One', serif; font-size: 0.82rem; letter-spacing: 0.12em;
          color: ${darkMode ? 'rgba(240,200,160,0.7)' : 'rgba(139,32,16,0.55)'};
          user-select: none;
        }

        .val-card { transition: background .28s, border-color .28s, transform .28s; }
        .val-card:hover {
          background: ${darkMode ? 'rgba(192,57,43,0.07)' : 'rgba(212,69,12,0.06)'} !important;
          border-color: var(--accent) !important;
          transform: translateY(-4px);
        }

        .stripe-h { position:relative; overflow:hidden; }
        .stripe-h::after {
          content:''; position:absolute; bottom:0; left:0;
          height:2px; width:0;
          background: linear-gradient(90deg, var(--accent), var(--saffron));
          transition: width .42s ease;
        }
        .stripe-h:hover::after { width:100%; }

        .fi { transition: transform .6s ease; }
        .fw:hover .fi { transform: scale(1.04); }
      `}</style>

      <div className="cr min-h-screen">

        {/* ════════════════════════════
            HERO
        ════════════════════════════ */}
<section
  id="home"
  className=" py-15 relative flex items-center lg:items-start hero-bg noise overflow-hidden"
  style={{
    minHeight: "calc(100svh - 44px - var(--navbar-h, 84px))",
    height: "auto",
  }}
>

  {/* Ink lines */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[
      { left: "10%", h: "38vh", delay: "0s", dur: "15s" },
      { left: "28%", h: "28vh", delay: "4s", dur: "19s" },
      { left: "54%", h: "46vh", delay: "8s", dur: "13s" },
      { left: "73%", h: "33vh", delay: "2s", dur: "17s" },
      { left: "89%", h: "40vh", delay: "6s", dur: "21s" },
    ].map((l, i) => (
      <div
        key={i}
        className="absolute bottom-0 ink-line"
        style={{
          left: l.left,
          width: "1px",
          height: l.h,
          background: `linear-gradient(to top,transparent,${accent}75,transparent)`,
          animationDuration: l.dur,
          animationDelay: l.delay,
        }}
      />
    ))}
  </div>

  {/* Devanagari stripe */}
  <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
    <div className="w-px h-14" style={{ background: "var(--rule)" }} />
    <span className="deva-stripe">कलम की आग</span>
    <div className="w-px h-14" style={{ background: "var(--rule)" }} />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-start lg:items-start gap-12 lg:gap-16 pt-16 lg:pt-20 pb-16">

    {/* LEFT */}
    <div className="flex-1">
      <div className="fu flex items-center gap-4 mb-6">
        <div style={{ width: "2.2rem", height: "2px", background: accent, flexShrink: 0 }} />

        <span
          className="yatra font-medium"
          style={{
            color: darkMode ? "#f0c8a0" : "#8b2010",
            fontSize: "1.05rem",
            letterSpacing: "0.06em",
            lineHeight: "1.4",
            textShadow: darkMode ? "0 0 18px rgba(240,160,80,0.35)" : "none",
          }}
        >
          कॉस्मो इंडिया प्रकाशन
        </span>

        <span
          style={{
            color: darkMode
              ? "rgba(240,232,220,0.5)"
              : "rgba(26,18,9,0.4)",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          — SINCE 1980S
        </span>
      </div>

      <h1
        className="h1 fu d1 font-black leading-[1.06] mb-8"
        style={{
          fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
          color: "var(--ink)",
        }}
      >
        Fearless<br />
        <em style={{ color: accent }}>Pens of</em><br />
        Bharat.
      </h1>

      <div className="fu d2 pl-5 max-w-lg" style={{ borderLeft: `3px solid ${accent}` }}>
        <p
          className="flicker hindi italic"
          style={{ color: "var(--muted)", fontSize: "1rem" }}
        >
          "रोकने से कलम रुकती नहीं है। सत्ता भी इसे रोक सकती नहीं है ।<br />
          <span style={{ color: "var(--ink)", fontStyle: "normal" }}>
            ये कलम है आग से आगे, इसकी लगाई आग बुझती नहीं है।
          </span>"
        </p>

        <p
          className="mt-2 tracking-widest uppercase"
          style={{ color: accent, fontSize: "0.72rem" }}
        >
          — Shri Rajkumar Ratnapriya
        </p>
      </div>
    </div>

    {/* RIGHT */}
    <div className="flex-1 flex flex-col justify-center gap-7">
      <div
        className="fu d1 grid grid-cols-2 gap-0"
        style={{
          border: "1px solid var(--rule)",
          borderRight: "none",
        }}
      >
        {[
          { num: "40+", label: "Years of Legacy" },
          { num: "1980s", label: "Founded in" },
        ].map((s, i) => (
          <div
            key={i}
            className="px-6 py-5"
            style={{
              borderRight: "1px solid var(--rule)",
              background: darkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.5)",
            }}
          >
            <p
              className="h1 font-black mb-1"
              style={{
                color: accent,
                fontSize: "2rem",
                lineHeight: 1,
              }}
            >
              {s.num}
            </p>

            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.78rem",
                letterSpacing: "0.04em",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <p
        className="fu d2 leading-relaxed"
        style={{ color: "var(--muted)", fontSize: "1.02rem" }}
      >
        India's premier publishing house — preserving Bharatiya thought,
        astrology, culture, and the written fire that outlasts every silence.
      </p>

      <div className="fu d3 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/discuss")}
          className="pulse-btn group flex items-center gap-2.5 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:gap-4"
          style={{
            background: `linear-gradient(135deg,${accent},${saffron})`,
            letterSpacing: "0.04em",
            fontSize: "0.92rem",
          }}
        >
          <span className="h1">Let's Discuss your Book</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-7 py-3.5 font-semibold transition-all duration-300 hover:scale-105"
          style={{
            border: `1.5px solid ${
              darkMode
                ? "rgba(240,232,220,0.25)"
                : "rgba(26,18,9,0.25)"
            }`,
            color: "var(--ink)",
            background: "transparent",
            letterSpacing: "0.04em",
            fontSize: "0.92rem",
          }}
        >
          <span className="h1">Create CIP Account</span>
        </button>
      </div>

      <p
        className="fu d4"
        style={{
          color: "var(--muted)",
          fontSize: "0.78rem",
          letterSpacing: "0.04em",
        }}
      >
        Astrology • Philosophy • Culture • Bharatiya Literature
      </p>
    </div>
  </div>

  <div className="absolute bottom-5 right-10 hidden md:flex flex-col items-center gap-1.5">
    <span
      style={{
        fontSize: "0.58rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      Scroll
    </span>

    <div
      style={{
        width: "1px",
        height: "1.8rem",
        background: `linear-gradient(to bottom,${accent},transparent)`,
      }}
    />
  </div>
</section>

        {/* ════════════════════════════
            MARQUEE — seamless
        ════════════════════════════ */}
        <div style={{ background: accent, overflow: 'hidden', padding: '10px 0' }}>
          <div className="ticker-track">
            <div className="ticker-half">{tickerContent}</div>
            <div className="ticker-half">{tickerContent}</div>
          </div>
        </div>

        {/* ════════════════════════════
            WHY CHOOSE US
        ════════════════════════════ */}
        <section className="py-24 relative overflow-hidden" style={{
          background: darkMode
            ? 'linear-gradient(135deg, #0e0a07 0%, #1a0d08 40%, #120c08 100%)'
            : 'linear-gradient(135deg, #1a0d06 0%, #2a1008 40%, #1a0905 100%)'
        }}>
          <div className="absolute top-0 right-0 pointer-events-none select-none" style={{ width:'420px', height:'420px', opacity: darkMode ? 0.07 : 0.06 }}>
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200 380 C120 340 60 260 80 180 C100 100 160 80 140 20 C180 60 220 40 200 120 C240 80 280 100 260 160 C300 120 340 160 320 220 C340 200 380 220 360 280 C340 340 280 380 200 380Z" fill="#c0392b"/>
              <path d="M200 350 C140 320 100 260 115 200 C130 140 170 125 155 75 C185 105 210 90 195 155 C225 120 255 140 240 190 C268 158 298 185 282 235 C298 218 328 235 312 280 C296 325 250 355 200 350Z" fill="#d4450c"/>
              <path d="M200 310 C155 288 125 240 138 195 C151 150 180 138 168 100 C193 124 213 112 202 163 C226 136 248 153 236 196 C258 170 282 193 268 235 C280 220 303 234 290 268 C277 302 238 322 200 310Z" fill="#e8540a" opacity="0.6"/>
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 pointer-events-none select-none" style={{ width:'360px', height:'360px', opacity: darkMode ? 0.06 : 0.05 }}>
            <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="130" y="20" width="40" height="180" rx="6" fill="#c0392b"/>
              <polygon points="130,200 170,200 150,270" fill="#c0392b"/>
              <rect x="125" y="15" width="50" height="20" rx="4" fill="#d4450c"/>
              <ellipse cx="150" cy="272" rx="6" ry="10" fill="#f0e8dc" opacity="0.5"/>
              <circle cx="150" cy="285" r="4" fill="#c0392b" opacity="0.5"/>
              <ellipse cx="135" cy="290" rx="5" ry="2" fill="#c0392b" opacity="0.35" transform="rotate(-20 135 290)"/>
              <ellipse cx="166" cy="288" rx="4" ry="2" fill="#c0392b" opacity="0.35" transform="rotate(15 166 288)"/>
              <circle cx="128" cy="295" r="2.5" fill="#c0392b" opacity="0.3"/>
              <circle cx="172" cy="294" r="2" fill="#c0392b" opacity="0.3"/>
            </svg>
          </div>

          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle, rgba(192,57,43,0.18) 1px, transparent 1px)`,
            backgroundSize: '36px 36px', opacity: 0.5,
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,57,43,0.12) 0%, transparent 70%)'
          }} />

          <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
            <div className="flex items-center gap-5 mb-14 pb-6"
              style={{ borderBottom:'1px solid rgba(192,57,43,0.3)' }}>
              <span className="h1 font-black shrink-0"
                style={{ fontSize:'3rem', color:'transparent', WebkitTextStroke:'1px rgba(240,232,220,0.18)', lineHeight:1 }}>
                01
              </span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:`${accent}dd` }}>हमारी प्रतिबद्धता</p>
                <h2 className="h1 font-bold" style={{ color:'#f0e8dc', fontSize:'2rem' }}>Why Choose Us</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon:BookOpen,   num:'01', title:'Quality Content',  desc:'Carefully curated and expertly edited publications that honour the depth of Indian thought.' },
                { icon:Users,      num:'02', title:'Author Support',   desc:'Dedicated guidance from manuscript to market — we walk beside every writer, every step.' },
                { icon:Award,      num:'03', title:'Recognition',      desc:'Highly recognised publications and authors celebrated across India and beyond.' },
                { icon:TrendingUp, num:'04', title:'Wide Reach',       desc:'Pan-India distribution ensuring your words find the readers they deserve.' },
              ].map((v,i) => (
                <div key={i} className="val-card relative group overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(192,57,43,0.25)', padding: '1.75rem',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(192,57,43,0.25)';
                    e.currentTarget.style.borderColor = 'rgba(192,57,43,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(192,57,43,0.25)';
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background:`linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />
                  <span className="h1 absolute bottom-3 right-4 font-black select-none pointer-events-none"
                    style={{ fontSize:'5rem', color:'transparent', WebkitTextStroke:'1px rgba(192,57,43,0.12)', lineHeight:1 }}>
                    {v.num}
                  </span>
                  <div className="w-11 h-11 mb-5 flex items-center justify-center"
                    style={{ background:'rgba(192,57,43,0.12)', border:'1px solid rgba(192,57,43,0.3)', color:'#e8a090' }}>
                    <v.icon style={{ width:'1.15rem', height:'1.15rem' }} />
                  </div>
                  <h3 className="h1 font-bold mb-3" style={{ color:'#f0e8dc', fontSize:'1.08rem' }}>{v.title}</h3>
                  <p style={{ color:'rgba(240,232,220,0.65)', fontSize:'0.93rem', lineHeight:'1.75' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            FEATURED BOOKS
        ════════════════════════════ */}
        <section id="books" className="py-24 relative" style={{
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #160e08 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #ffe8cc 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="flex items-center gap-5 mb-14 rule-b pb-6">
              <span className="ghost-num">02</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>हमारी किताबें</p>
                <h2 className="h1 font-bold" style={{ color:'var(--ink)', fontSize:'2rem' }}>Featured Publications</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="lift stripe-h relative group p-8"
                  style={{
                    background: darkMode
                      ? 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      : 'linear-gradient(145deg, #ffffff 0%, #fdf6ee 100%)',
                    border: `1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`,
                    boxShadow: darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background:`linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />
                  <span className="inline-block mb-4 px-3 py-1"
                    style={{ background:`${accent}15`, color:accent, border:`1px solid ${accent}30`,
                      fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:600 }}>
                    {book.badge}
                  </span>
                  <h3 className="h1 font-bold mb-1 leading-snug hindi" style={{ color:'var(--ink)', fontSize:'1.1rem', lineHeight:'1.45' }}>
                    {book.title}
                  </h3>
                  <p className="mb-5 font-medium" style={{ color:'var(--muted)', fontSize:'0.82rem', letterSpacing:'0.04em', textTransform:'uppercase' }}>
                    {book.author}
                  </p>
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_,s) => (
                      <Star key={s} className="fill-current" style={{ color:saffron, width:'0.88rem', height:'0.88rem' }} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-5"
                    style={{ borderTop:`1px solid ${darkMode ? 'rgba(192,57,43,0.15)' : 'rgba(192,57,43,0.12)'}` }}>
                    <span className="h1 font-black" style={{ color:accent, fontSize:'1.4rem' }}>{book.price}</span>
                    <button onClick={() => navigate("/marketplace")}
                      className="flex items-center gap-1.5 font-semibold transition-all duration-300 hover:gap-3"
                      style={{ color:accent, fontSize:'0.88rem' }}>
                      View Book
                      <ArrowRight style={{ width:'0.9rem', height:'0.9rem' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-14">
              <button onClick={() => navigate("/marketplace")}
                className="pulse-btn flex items-center gap-3 px-10 py-4 font-semibold text-white transition-all duration-300 hover:gap-5"
                style={{ background:`linear-gradient(135deg,${accent},${saffron})`, letterSpacing:'0.04em', fontSize:'0.95rem',
                  boxShadow:`0 8px 30px ${accent}40` }}>
                <span className="h1">Explore Our Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            ABOUT
        ════════════════════════════ */}
        <section id="about" className="py-16 relative overflow-hidden" style={{
          background: darkMode
            ? 'linear-gradient(150deg, #1c1410 0%, #141210 100%)'
            : 'linear-gradient(150deg, #fff8f0 0%, #fdf6ee 60%, #fef3e6 100%)'
        }}>
          <div className="absolute top-0 right-0 pointer-events-none select-none" style={{ width:'340px', height:'340px', opacity: darkMode ? 0.04 : 0.07 }}>
            <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="150" cy="150" r="130" stroke={accent} strokeWidth="1.5"/>
              <circle cx="150" cy="150" r="100" stroke={accent} strokeWidth="1"/>
              <circle cx="150" cy="150" r="70"  stroke={accent} strokeWidth="1"/>
              <circle cx="150" cy="150" r="40"  stroke={accent} strokeWidth="1.5"/>
              <circle cx="150" cy="150" r="12"  fill={accent}/>
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => (
                <g key={i} transform={`rotate(${deg} 150 150)`}>
                  <line x1="150" y1="20" x2="150" y2="50" stroke={accent} strokeWidth="1.5"/>
                  <line x1="150" y1="80" x2="150" y2="110" stroke={accent} strokeWidth="0.8"/>
                  <path d={`M150 55 L145 68 L150 62 L155 68 Z`} fill={accent} opacity="0.6"/>
                </g>
              ))}
              {[0,45,90,135,180,225,270,315].map((deg,i) => (
                <ellipse key={i} cx="150" cy="50" rx="8" ry="18" fill={accent} opacity="0.25"
                  transform={`rotate(${deg} 150 150)`}/>
              ))}
            </svg>
          </div>

          <div className="absolute bottom-4 left-0 pointer-events-none select-none" style={{ width:'280px', height:'200px', opacity: darkMode ? 0.04 : 0.06 }}>
            <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M140 30 C100 30 40 45 20 70 L20 160 C40 138 100 125 140 130Z" fill={accent}/>
              <path d="M140 30 C180 30 240 45 260 70 L260 160 C240 138 180 125 140 130Z" fill={saffron}/>
              <line x1="140" y1="30" x2="140" y2="130" stroke={darkMode?'#f0e8dc':'#1a1209'} strokeWidth="2"/>
              {[50,70,90,110].map((y,i) => (
                <g key={i}>
                  <line x1="45" y1={y} x2="125" y2={y+4} stroke={darkMode?'#f0e8dc':accent} strokeWidth="0.8" opacity="0.5"/>
                  <line x1="155" y1={y} x2="235" y2={y+4} stroke={darkMode?'#f0e8dc':accent} strokeWidth="0.8" opacity="0.5"/>
                </g>
              ))}
            </svg>
          </div>

          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(192,57,43,0.03) 41px)`,
          }}/>

          <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
            <div className="flex items-center gap-5 mb-10 pb-5 rule-b">
              <span className="ghost-num">03</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:accent }}>हमारी कहानी</p>
                <h2 className="h1 font-bold" style={{ color:'var(--ink)', fontSize:'2rem' }}>About Us</h2>
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-10 items-center mb-10">
              <div className="lg:col-span-3 space-y-4">
                <div className="h1 font-black leading-none mb-1 select-none" style={{ fontSize:'4rem', color:`${accent}25`, lineHeight:0.8 }}>"</div>
                <p style={{ color:'var(--muted)', fontSize:'1.05rem', lineHeight:'1.88' }}>
                  Cosmo India Prakashan was born from a belief older than the institution itself — that the strength of a civilization lives in its ideas, and ideas survive through the written word.
                </p>
                <p style={{ color:'var(--muted)', fontSize:'1.05rem', lineHeight:'1.88' }}>
                  In the decades when India was rediscovering its own intellectual voice, a small but determined effort began to preserve and publish works rooted in Bharatiya thought. Even during the Emergency, when many voices fell silent, our founder continued writing — because for him, writing was not merely expression. It was duty.
                </p>
                <p style={{ color:'var(--muted)', fontSize:'1.05rem', lineHeight:'1.88' }}>
                  Today, Cosmo India Prakashan stands for writers who believe the written word still has the power to awaken minds and preserve the memory of a civilisation.
                </p>
              </div>
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative">
                  <div className="absolute" style={{ inset:0, background:`linear-gradient(135deg,${accent}28,${saffron}18)`, transform:'translate(10px,10px)' }}/>
                  <div className="absolute top-0 left-0 w-5 h-5 z-10" style={{ borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}`, transform:'translate(-4px,-4px)' }}/>
                  <div className="absolute bottom-0 right-0 w-5 h-5 z-10" style={{ borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}`, transform:'translate(4px,4px)' }}/>
                  <div className="relative p-7" style={{ background:'#ffffff', border:`1px solid ${darkMode?'rgba(192,57,43,0.3)':'rgba(192,57,43,0.18)'}` }}>
                    <img src="/cosmo-logo.png" alt="Cosmo India Prakashan" className="w-44 h-44 object-contain"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="ink-bar mb-10"/>

            <div className="mb-8">
              <p className="yatra mb-1" style={{ fontSize:'0.85rem', letterSpacing:'0.12em', color:accent }}>संस्थापक</p>
              <h2 className="h1 font-bold" style={{ color:'var(--ink)', fontSize:'2rem' }}>Meet Our Founders</h2>
            </div>

            {/* ── Dhawal Shukla ── */}
            <div className="grid md:grid-cols-2 fw group relative overflow-hidden mb-0"
              style={{
                border:`1px solid ${darkMode?'rgba(192,57,43,0.2)':'rgba(192,57,43,0.14)'}`,
                background: darkMode ? 'linear-gradient(120deg,#1c1410 0%,#141210 100%)' : 'linear-gradient(120deg,#ffffff 0%,#fff8f2 100%)',
              }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: darkMode
                  ? `radial-gradient(ellipse 60% 80% at 20% 50%, rgba(192,57,43,0.07) 0%, transparent 70%)`
                  : `radial-gradient(ellipse 60% 80% at 20% 50%, rgba(192,57,43,0.05) 0%, transparent 70%)`
              }}/>
              <div className="absolute bottom-0 right-0 pointer-events-none select-none yatra"
                style={{ fontSize:'8rem', lineHeight:1, color:'transparent',
                  WebkitTextStroke:`1px ${darkMode?'rgba(192,57,43,0.07)':'rgba(192,57,43,0.06)'}`,
                  transform:'translate(10%,15%)' }}>ध</div>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:`linear-gradient(90deg,${accent},${saffron},transparent)` }}/>
              <div className="p-8 lg:p-12 flex flex-col justify-center order-2 md:order-1 relative z-10">
                <p className="yatra mb-2" style={{ color:accent, fontSize:'0.85rem', letterSpacing:'0.1em' }}>Co-Founder &amp; CEO</p>
                <h3 className="h1 font-bold mb-4" style={{ color:'var(--ink)', fontSize:'1.75rem', lineHeight:'1.15' }}>Dhawal Shukla</h3>
                <p style={{ color:'var(--muted)', fontSize:'0.98rem', lineHeight:'1.85', marginBottom:'1rem' }}>
                  Born in the restless city of Kanpur, Dhawal Shukla stands at the crossroads of technology and literature. An electronics engineer by discipline but a writer by instinct, he has made his voice heard through essays and poetry published in Amar Ujala, while his book Sacred Dwelling has found readers on Amazon Kindle. A debater, public speaker, and poet, Dhawal brings both intellect and fire to the stage and the page alike. Today, as Co-Founder and CEO, he is steering Cosmo India Prakashan into a bold new chapter—blending the legacy of fearless writing with the possibilities of the digital age.
                </p>
                <div className="flex items-center gap-2.5" style={{ color:'var(--muted)', fontSize:'0.85rem' }}>
                  <Award style={{ width:'0.9rem', height:'0.9rem', color:accent, flexShrink:0 }}/>
                  <span>Innovator &amp; Face of the Brand</span>
                </div>
              </div>
              <div className="fw relative overflow-hidden order-1 md:order-2" style={{ minHeight:'340px' }}>
                <img src="dhawal.png" alt="Dhawal Shukla" className="fi w-full h-full object-cover object-top" style={{ position:'absolute', inset:0 }}/>
                <div className="absolute inset-0" style={{ background:`linear-gradient(to left, transparent 55%, ${darkMode?'#1c1410':'#ffffff'}40)` }}/>
              </div>
            </div>

            <div style={{ height:'2px', background:`linear-gradient(90deg,${accent}70,${saffron}50,transparent)` }}/>

            {/* ── Rajkumar Ratnapriya ── */}
            <div className="grid md:grid-cols-2 fw group relative overflow-hidden"
              style={{
                border:`1px solid ${darkMode?'rgba(192,57,43,0.2)':'rgba(192,57,43,0.14)'}`,
                borderTop:'none',
                background: darkMode ? 'linear-gradient(120deg,#141210 0%,#1c1410 100%)' : 'linear-gradient(120deg,#fdf6ee 0%,#fff8f2 100%)',
              }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: darkMode
                  ? `radial-gradient(ellipse 60% 80% at 80% 50%, rgba(192,57,43,0.07) 0%, transparent 70%)`
                  : `radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,69,12,0.05) 0%, transparent 70%)`
              }}/>
              <div className="absolute bottom-0 left-0 pointer-events-none select-none yatra"
                style={{ fontSize:'8rem', lineHeight:1, color:'transparent',
                  WebkitTextStroke:`1px ${darkMode?'rgba(192,57,43,0.07)':'rgba(192,57,43,0.06)'}`,
                  transform:'translate(-10%,15%)' }}>र</div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background:`linear-gradient(90deg,transparent,${saffron},${accent}70)` }}/>
              <div className="fw relative overflow-hidden" style={{ minHeight:'340px' }}>
                <img src="nana.jpeg" alt="Shri Rajkumar Ratnapriya" className="fi w-full h-full object-cover object-top" style={{ position:'absolute', inset:0 }}/>
                <div className="absolute inset-0" style={{ background:`linear-gradient(to right, transparent 55%, ${darkMode?'#141210':'#fdf6ee'}40)` }}/>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
                <p className="yatra mb-2" style={{ color:accent, fontSize:'0.85rem', letterSpacing:'0.1em' }}>Founder &amp; Visionary</p>
                <h3 className="h1 font-bold mb-4" style={{ color:'var(--ink)', fontSize:'1.75rem', lineHeight:'1.15' }}>Shri Rajkumar Ratnapriya</h3>
                <p style={{ color:'var(--muted)', fontSize:'0.98rem', lineHeight:'1.85', marginBottom:'1rem' }}>
                  Shri Rajkumar Ratnapriya devoted his life to astrology, writing, and community service. A trusted astrologer with more than five decades of experience, his work has appeared in publications such as Sarita and Dainik Jagran, along with numerous magazines. In the 1990s, readers widely followed his signature column "Swami Sansari" on the last page of the Cosmo India Prakashan magazine, where he reflected on life, destiny, and spiritual thought. Alongside his astrological writings, he also expressed his literary side through poetry under the pen name "Viyogi."

                  During the years of the Emergency under Indira Gandhi, when freedom of expression across the country came under strain, he refused to silence his pen, continuing to write with conviction and courage.

                  Beyond writing, he served society as the head of Lok Seva Sangh, dedicating himself to community work. His contributions to astrology are further reflected in his notable book Ratna Rahasya, which continues to guide readers and practitioners and remains available through Cosmo India Prakashan.
                </p>
                <div className="flex items-center gap-2.5" style={{ color:'var(--muted)', fontSize:'0.85rem' }}>
                  <Award style={{ width:'0.9rem', height:'0.9rem', color:accent, flexShrink:0 }}/>
                  <span>Visionary Astrologer — 50+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            CTA MEMBERSHIP
        ════════════════════════════ */}
        <section className="relative py-28 overflow-hidden" style={{ background:'#130a04' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:`repeating-linear-gradient(45deg, transparent, transparent 34px, rgba(192,57,43,0.04) 35px, rgba(192,57,43,0.04) 36px)`
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background:`radial-gradient(ellipse 70% 60% at 50% 50%, rgba(192,57,43,0.22) 0%, rgba(212,69,12,0.08) 50%, transparent 100%)`
          }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg, transparent, ${accent}, ${saffron}, transparent)` }} />

          <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">
            <p className="yatra mb-4" style={{ color:`${accent}dd`, fontSize:'1.15rem', letterSpacing:'0.1em' }}>— सदस्यता —</p>
            <h2 className="h1 font-black leading-tight mb-5" style={{ fontSize:'clamp(2rem, 4.5vw, 3.4rem)', color:'#f0e8dc' }}>
              Become a<br /><em style={{ color:accent }}>CIP Member</em>
            </h2>
            <p className="mb-10 leading-relaxed mx-auto" style={{ color:'rgba(240,232,220,0.72)', fontSize:'1.05rem', maxWidth:'36rem' }}>
              Get exclusive updates on new releases, author interviews, and special offers — join the community of India's most passionate readers.
            </p>
            <button onClick={() => navigate("/login")}
              className="pulse-btn inline-flex items-center gap-3 px-10 py-4 font-semibold text-white transition-all duration-300 hover:gap-5"
              style={{ background:`linear-gradient(135deg,${accent},${saffron})`, letterSpacing:'0.05em', fontSize:'0.95rem',
                boxShadow:`0 10px 40px rgba(192,57,43,0.45)` }}>
              <span className="h1 text-base">Join Us Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ════════════════════════════
            CONTACT
        ════════════════════════════ */}
        <section id="contact" className="py-24" style={{
          background: darkMode
            ? 'linear-gradient(160deg, #1a1108 0%, #141210 100%)'
            : 'linear-gradient(160deg, #fdf6ee 0%, #fff8f2 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="flex items-center gap-5 mb-14 rule-b pb-6">
              <span className="ghost-num">04</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent }}>संपर्क करें</p>
                <h2 className="h1 font-bold" style={{ color:'var(--ink)', fontSize:'2rem' }}>Have Something to Share?</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-14">
              <div className="space-y-0">
                {[
                  {
                    icon:MapPin, title:'Address',
                    content:(
                      <>
                        <p style={{ color:'var(--muted)', fontSize:'1rem', lineHeight:'1.7', marginBottom:'1rem' }}>
                          Sector A 24 Gujaini Chanakyapuri<br />UP India
                        </p>
                        <div className="overflow-hidden" style={{ border:`1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`, height:'155px' }}>
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.4657149549403!2d80.28101877520723!3d26.440713076931743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c49d294914d83%3A0xa2640eaeceae550c!2sCosmo%20India%20Prakashan!5e0!3m2!1sen!2sin!4v1767088195065!5m2!1sen!2sin"
                            className="w-full h-full" style={{ border:0 }} allowFullScreen loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade" title="Cosmo India Prakashan" />
                        </div>
                      </>
                    )
                  },
                  { icon:Phone, title:'Phone', content:<p style={{ color:'var(--muted)', fontSize:'1rem' }}>+91 7388270331</p> },
                  { icon:Mail,  title:'Email', content:<p style={{ color:'var(--muted)', fontSize:'1rem' }}>cosmoindiaprakashan@gmail.com</p> },
                ].map((item,i) => (
                  <div key={i} className="lift py-7 group"
                    style={{ borderTop:i===0?`1px solid ${darkMode?'rgba(192,57,43,0.18)':'rgba(192,57,43,0.12)'}`:' none',
                      borderBottom:`1px solid ${darkMode?'rgba(192,57,43,0.18)':'rgba(192,57,43,0.12)'}` }}>
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background:`${accent}10`, border:`1px solid ${accent}35`, color:accent }}>
                        <item.icon style={{ width:'1.1rem', height:'1.1rem' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="h1 font-bold mb-2" style={{ color:'var(--ink)', fontSize:'1.05rem' }}>{item.title}</h3>
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative p-9"
                style={{
                  background: darkMode
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))'
                    : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
                  border:`1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)'}`,
                  boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
                }}>
                <div className="absolute top-0 left-0 w-7 h-7" style={{ borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
                <div className="absolute bottom-0 right-0 w-7 h-7" style={{ borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />

                <p className="yatra mb-7 flex items-center gap-3" style={{ color:accent, fontSize:'0.92rem' }}>
                  <span style={{ display:'inline-block', width:'1.5rem', height:'2px', background:accent }} />
                  संदेश भेजें
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="ci-input" />
                    {errors.name && <p className="mt-1" style={{ color:accent, fontSize:'0.8rem' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="ci-input" />
                    {errors.email && <p className="mt-1" style={{ color:accent, fontSize:'0.8rem' }}>{errors.email}</p>}
                  </div>
                  <div>
                    <textarea rows="5" name="message" placeholder="Your Message" value={form.message} onChange={handleChange}
                      className="ci-input" style={{ resize:'none' }} />
                    {errors.message && <p className="mt-1" style={{ color:accent, fontSize:'0.8rem' }}>{errors.message}</p>}
                  </div>
                  <button type="submit"
                    className="pulse-btn w-full py-4 font-semibold text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:gap-4 group"
                    style={{ background:'linear-gradient(135deg,#1db954,#128c7e)', letterSpacing:'0.04em', fontSize:'0.95rem',
                      boxShadow:'0 6px 24px rgba(29,185,84,0.3)' }}>
                    <span className="h1">Send via WhatsApp</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default CosmoPublicationSite;