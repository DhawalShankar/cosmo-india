import { useState, useContext, useEffect } from 'react';
import { BookOpen, Calendar, Download, Heart, Share2, Star, ArrowRight } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Release = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink     = darkMode ? '#f0e8dc'               : '#1a1209';
  const paper   = darkMode ? '#141210'               : '#fdf6ee';
  const ruleLine= darkMode ? 'rgba(192,57,43,0.28)'  : 'rgba(160,40,20,0.18)';
  const mutedText=darkMode ? 'rgba(240,232,220,0.72)': 'rgba(26,18,9,0.62)';

  const book = {
    title: 'Sacred Dwelling',
    subtitle: 'The Eastern Secret to Prosperous Homes and Happy Lives',
    author: 'Mr. Dhawal Shukla',
    coverImage: 'sd.png',
    releaseDate: 'January 23, 2026',
    price: '₹299',
    pages: 130,
    isbn: '978-81-943640-6-1',
    language: 'English',
    rating: 4.8,
    description: `Sacred Dwelling explores the timeless Eastern understanding that a home is not merely a structure, but a living field of energy that shapes thought, emotion, and destiny. Drawing from traditional Vāstu and astrological philosophy, this book presents a thoughtful and accessible guide to aligning one's living space with natural order.\n\nRather than superstition or rigid rules, it offers principles of balance, direction, and proportion that can be adapted to modern homes and real-world constraints. Written with clarity and restraint, Sacred Dwelling encourages readers to see their homes as partners in their inner and outer well-being — places that support peace, prosperity, and purposeful living.\n\nThis is not a book of prediction, but of understanding. Not a manual of fear, but a guide to awareness. It invites the reader to reflect, adjust, and dwell with intention.`,
    highlights: [
      'A clear, modern interpretation of Vāstu wisdom rooted in Eastern tradition',
      'Explains how space, direction, and energy influence daily life',
      'Bridges ancient principles with contemporary homes and lifestyles',
    ],
    authorBio: `Dhawal Shukla is an author, engineer, and seeker of ancient wisdom. With a deep passion for Sanatan philosophy and its practical application in modern life, he brings a fresh voice that bridges traditional Eastern understanding with today's lived experience.\n\nIn Sacred Dwelling, Dhawal explores how our living spaces — their orientation, harmony, and subtle energies — influence our peace, prosperity, and well-being. Drawing on classical Vāstu and astrological insights, he presents age-tested principles in clear, accessible language, making timeless knowledge relevant for contemporary readers.`,
    downloadLink: 'https://www.amazon.in/dp/B0GH18HND3/ref=sr_1_2?crid=296GKENKNAHMW&dib=eyJ2IjoiMSJ9.z52D0UYCAq9XRRrvzjAV80eS4ZKedTCORKFRyihAbdsfUzuBZzWN4XcHDLL816AxxRntOdwvTdfssOCPDxuQopnn0MgNMqLAk8q2FhfYQsx2HZh-jSYH3HhR4yqzDj65gOEjVGnJ1BttaDL4X8QmFSa5smPUO5Rcs2CXRzxM5ZRpUalFJ3x8l6WgdRQztTsr5JHXFnKQIuGDUy_QAilFpizG4MKh844bgqOm7hwDf7w.baP4_c-y8ShYCsRmFkEi0E93mwNdUT1oZC_VfBf9gkM&dib_tag=se&keywords=sacred+dwelling&qid=1768556616&sprefix=sacred+dwelli%2Caps%2C606&sr=8-2',
  };

  const handlePurchase = () => {
    setMessage('Releasing on Basant Panchami!');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      if (user) navigate('/marketplace');
    }, 2500);
  };

  const handleEbook = () => { window.location.href = book.downloadLink; };

  const pills = [
    { icon: Calendar, label: book.releaseDate },
    { label: `${book.pages} Pages` },
    { label: book.language },
    { label: `ISBN: ${book.isbn}` },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');

        :root {
          --rl-ink:     ${ink};
          --rl-paper:   ${paper};
          --rl-accent:  ${accent};
          --rl-saffron: ${saffron};
          --rl-rule:    ${ruleLine};
          --rl-muted:   ${mutedText};
        }

        .rl * { box-sizing: border-box; }
        .rl {
          background: var(--rl-paper);
          color: var(--rl-ink);
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          font-size: 15.5px; min-height: 100vh;
        }
        .rl .yatra { font-family: 'Yatra One', serif; }
        .rl .h1f   { font-family: 'Playfair Display', Georgia, serif; }
        .rl .hindi { font-family: 'Tiro Devanagari Hindi', 'Mangal', serif; line-height: 2.0; }

        /* Ink lines */
        @keyframes rl-inkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.55; } 85% { opacity:.55; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .rl .ink-line { animation: rl-inkRise linear infinite; }

        /* Fade up */
        @keyframes rl-fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .rl .fu { animation: rl-fadeUp .8s cubic-bezier(.22,1,.36,1) both; }
        .rl .d1 { animation-delay:.1s; }
        .rl .d2 { animation-delay:.22s; }
        .rl .d3 { animation-delay:.36s; }
        .rl .d4 { animation-delay:.50s; }

        /* Ink bar */
        .rl .ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, ${accent} 30%, ${saffron} 70%, transparent);
        }

        /* Pulse btn */
        @keyframes rl-pulse { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .rl .pulse-btn:hover { animation: rl-pulse 1s ease-out; }

        /* Flicker */
        @keyframes rl-flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.5} 53%{opacity:.95} }
        .rl .flicker { animation: rl-flicker 8s ease-in-out infinite; }

        /* Ghost num */
        .rl .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--rl-rule);
          user-select: none; pointer-events: none; line-height: 1;
        }

        /* Cards */
        .rl .rl-card {
          background: ${darkMode
            ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
            : 'linear-gradient(145deg, #ffffff, #fdf6ee)'};
          border: 1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.15)'};
          box-shadow: ${darkMode ? 'none' : '0 6px 36px rgba(192,57,43,0.08)'};
          position: relative;
        }

        /* Dark section */
        .rl .dark-section {
          background: ${darkMode
            ? 'linear-gradient(135deg, #0e0a07 0%, #1a0d08 40%, #120c08 100%)'
            : 'linear-gradient(135deg, #1a0d06 0%, #2a1008 40%, #1a0905 100%)'};
        }

        /* Light section */
        .rl .light-section {
          background: ${darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #160e08 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #ffe8cc 100%)'};
        }

        /* Highlight row */
        .rl .hl-row {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid var(--rl-rule);
          transition: padding-left .22s;
        }
        .rl .hl-row:last-child { border-bottom: none; }
        .rl .hl-row:hover { padding-left: 6px; }

        /* Pill */
        .rl .pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px;
          border: 1px solid var(--rl-rule);
          font-size: 0.82rem; letter-spacing: 0.04em;
          color: var(--rl-muted);
          background: ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)'};
          transition: border-color .22s;
        }
        .rl .pill:hover { border-color: ${accent}; color: ${accent}; }

        /* Icon btn */
        .rl .icon-btn {
          width: 2.6rem; height: 2.6rem;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--rl-rule);
          background: transparent; cursor: pointer;
          transition: border-color .22s, background .22s;
          color: var(--rl-muted);
        }
        .rl .icon-btn:hover { border-color: ${accent}; color: ${accent}; }
        .rl .icon-btn.liked  { border-color: ${accent}; color: ${accent}; background: ${accent}15; }

        /* Book glow */
        @keyframes rl-glow { 0%,100%{opacity:.35} 50%{opacity:.55} }
        .rl .book-glow { animation: rl-glow 4s ease-in-out infinite; }

        /* Val card hover */
        .rl .val-card { transition: transform .28s, box-shadow .28s, border-color .28s; }
        .rl .val-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(192,57,43,0.25);
          border-color: rgba(192,57,43,0.6) !important;
        }

        /* Toast */
        @keyframes rl-toast { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:none} }
        .rl .toast { animation: rl-toast .35s cubic-bezier(.22,1,.36,1) both; }

        /* Badge bounce */
        @keyframes rl-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .rl .badge-bounce { animation: rl-bounce 2.2s ease-in-out infinite; }
      `}</style>

      <div className="rl">

        {/* ── Background ── */}
        <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
          <div style={{
            position:'absolute', inset:0,
            background: darkMode
              ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
              : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)',
          }} />
          {[
            { left:'8%',  h:'35vh', delay:'0s',  dur:'15s' },
            { left:'25%', h:'28vh', delay:'5s',  dur:'19s' },
            { left:'55%', h:'42vh', delay:'9s',  dur:'13s' },
            { left:'74%', h:'30vh', delay:'2s',  dur:'17s' },
            { left:'91%', h:'38vh', delay:'7s',  dur:'21s' },
          ].map((l,i) => (
            <div key={i} className="ink-line" style={{
              position:'absolute', bottom:0, left:l.left, width:'1px', height:l.h,
              background:`linear-gradient(to top,transparent,${accent}65,transparent)`,
              animationDuration:l.dur, animationDelay:l.delay,
            }} />
          ))}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`radial-gradient(circle, ${darkMode?'rgba(192,57,43,0.13)':'rgba(192,57,43,0.09)'} 1px, transparent 1px)`,
            backgroundSize:'38px 38px', opacity:0.55,
          }} />
        </div>

        {/* ── HERO ── */}
        <section style={{ position:'relative', zIndex:1, minHeight:'100vh', display:'flex', alignItems:'center',
          paddingTop:'6rem', paddingBottom:'4rem' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', width:'100%', padding:'0 1.5rem' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}
              className="rl-hero-grid">

              {/* LEFT — book cover */}
              <div className="fu" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2rem' }}>
                {/* Badge */}
                <span className="badge-bounce yatra" style={{
                  padding:'6px 20px', background:`linear-gradient(135deg,${accent},${saffron})`,
                  color:'#fff', fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase',
                }}>
                  ✦ New Release ✦
                </span>

                {/* Book image with glow */}
                <div style={{ position:'relative' }}>
                  <div className="book-glow" style={{
                    position:'absolute', inset:'-20px',
                    background:`radial-gradient(ellipse, ${accent}55 0%, transparent 70%)`,
                    pointerEvents:'none',
                  }} />
                  <img src={book.coverImage} alt={book.title}
                    style={{
                      width:'clamp(220px,35vw,320px)', height:'auto', position:'relative', zIndex:1,
                      filter:`drop-shadow(0 30px 60px ${accent}55)`,
                      transition:'transform .5s cubic-bezier(.22,1,.36,1)',
                    }}
                    onMouseEnter={e => e.target.style.transform='scale(1.04) translateY(-6px)'}
                    onMouseLeave={e => e.target.style.transform='none'}
                  />
                </div>

                {/* Rating */}
                <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                  {[...Array(5)].map((_,i) => (
                    <Star key={i} style={{ width:'1rem', height:'1rem', color:saffron, fill:saffron }} />
                  ))}
                  <span style={{ color:mutedText, fontSize:'0.82rem', marginLeft:'6px' }}>by {book.author}</span>
                </div>
              </div>

              {/* RIGHT — info */}
              <div style={{ display:'flex', flexDirection:'column', gap:'1.6rem' }}>
                {/* Eyebrow */}
                <div className="fu d1" style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                  <div style={{ width:'2rem', height:'2px', background:accent, flexShrink:0 }} />
                  <span className="yatra" style={{ color: darkMode?'#f0c8a0':'#8b2010', fontSize:'0.95rem', letterSpacing:'0.06em' }}>
                    कॉस्मो इंडिया प्रकाशन
                  </span>
                </div>

                {/* Title */}
                <div className="fu d1">
                  <h1 className="h1f" style={{ fontSize:'clamp(2.4rem,5vw,3.8rem)', fontWeight:900, lineHeight:1.06,
                    margin:0, color:ink }}>
                    {book.title}.
                  </h1>
                  <p className="flicker" style={{ color:mutedText, fontSize:'1.02rem', marginTop:'10px', fontStyle:'italic' }}>
                    {book.subtitle}
                  </p>
                </div>

                {/* Pull quote */}
                <div className="fu d2" style={{ paddingLeft:'1.1rem', borderLeft:`3px solid ${accent}`, maxWidth:'400px' }}>
                  <p className="hindi" style={{ color:mutedText, fontSize:'0.92rem', fontStyle:'italic' }}>
                    "घर केवल एक संरचना नहीं, यह ऊर्जा का जीवित क्षेत्र है।"
                  </p>
                  <p style={{ color:accent, fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:'6px' }}>
                    — Sacred Dwelling
                  </p>
                </div>

                {/* Pills */}
                <div className="fu d2" style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {pills.map((p, i) => (
                    <span key={i} className="pill">
                      {p.icon && <p.icon style={{ width:'0.85rem', height:'0.85rem' }} />}
                      {p.label}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="fu d3" style={{ display:'flex', flexWrap:'wrap', gap:'12px', alignItems:'center' }}>
                  <button onClick={handleEbook} className="pulse-btn"
                    style={{
                      display:'flex', alignItems:'center', gap:'8px',
                      padding:'12px 28px',
                      background:`linear-gradient(135deg,${accent},${saffron})`,
                      border:'none', cursor:'pointer', color:'#fff',
                      fontFamily:"'Playfair Display',serif", fontWeight:700,
                      fontSize:'0.95rem', letterSpacing:'0.04em',
                      boxShadow:`0 8px 28px ${accent}40`,
                    }}>
                    <Download style={{ width:'1rem', height:'1rem' }} />
                    Buy Ebook
                    <ArrowRight style={{ width:'0.9rem', height:'0.9rem' }} />
                  </button>

                  <button onClick={() => setIsLiked(!isLiked)}
                    className={`icon-btn${isLiked?' liked':''}`}>
                    <Heart style={{ width:'1rem', height:'1rem', fill: isLiked ? accent : 'none' }} />
                  </button>

                  <button className="icon-btn">
                    <Share2 style={{ width:'1rem', height:'1rem' }} />
                  </button>
                </div>

                {/* Release message toast */}
                {showMessage && (
                  <div className="toast yatra" style={{
                    padding:'10px 20px', border:`1px solid ${accent}`,
                    background: darkMode ? 'rgba(192,57,43,0.15)' : 'rgba(192,57,43,0.08)',
                    color:accent, fontSize:'0.9rem', letterSpacing:'0.05em',
                  }}>
                    ✦ &nbsp;{message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Responsive */}
          <style>{`
            @media (max-width: 768px) {
              .rl-hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            }
          `}</style>
        </section>

        {/* ── ABOUT THE BOOK ── */}
        <section className="dark-section" style={{ position:'relative', zIndex:1, padding:'5rem 1.5rem' }}>
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage:`radial-gradient(circle, rgba(192,57,43,0.18) 1px, transparent 1px)`,
            backgroundSize:'36px 36px', opacity:0.5,
          }} />
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none',
            background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,57,43,0.12) 0%, transparent 70%)',
          }} />

          <div style={{ maxWidth:'900px', margin:'0 auto', position:'relative', zIndex:1 }}>
            {/* Section header */}
            <div style={{ display:'flex', alignItems:'center', gap:'1.2rem', marginBottom:'3rem',
              paddingBottom:'1.5rem', borderBottom:'1px solid rgba(192,57,43,0.3)' }}>
              <span className="h1f" style={{ fontSize:'3rem', fontWeight:900, color:'transparent',
                WebkitTextStroke:'1px rgba(240,232,220,0.18)', lineHeight:1, flexShrink:0 }}>01</span>
              <div>
                <p className="yatra" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:`${accent}dd`, marginBottom:'3px' }}>पुस्तक के बारे में</p>
                <h2 className="h1f" style={{ color:'#f0e8dc', fontSize:'1.9rem', fontWeight:700, margin:0 }}>About the Book</h2>
              </div>
            </div>

            {/* Description */}
            {book.description.split('\n\n').map((para, i) => (
              <p key={i} style={{ color:'rgba(240,232,220,0.75)', fontSize:'1.02rem', lineHeight:'1.9', marginBottom:'1.2rem' }}>
                {para}
              </p>
            ))}

            <div className="ink-bar" style={{ margin:'2rem 0' }} />

            {/* Key highlights */}
            <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.82rem', letterSpacing:'0.12em', marginBottom:'1rem' }}>
              मुख्य बिंदु
            </p>
            <h3 className="h1f" style={{ color:'#f0e8dc', fontSize:'1.2rem', fontWeight:700, marginBottom:'1.2rem' }}>
              Key Highlights
            </h3>
            <div>
              {book.highlights.map((hl, i) => (
                <div key={i} className="hl-row" style={{ borderBottomColor:'rgba(192,57,43,0.2)' }}>
                  <div style={{ width:'1.5rem', height:'1.5rem', display:'flex', alignItems:'center', justifyContent:'center',
                    background:'rgba(192,57,43,0.12)', border:'1px solid rgba(192,57,43,0.35)', flexShrink:0, marginTop:'2px' }}>
                    <span style={{ color:'#e8a090', fontSize:'0.65rem' }}>✦</span>
                  </div>
                  <p style={{ color:'rgba(240,232,220,0.72)', fontSize:'0.98rem', lineHeight:'1.75', margin:0 }}>{hl}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT THE AUTHOR ── */}
        <section className="light-section" style={{ position:'relative', zIndex:1, padding:'5rem 1.5rem' }}>
          <div style={{ maxWidth:'900px', margin:'0 auto' }}>
            {/* Section header */}
            <div style={{ display:'flex', alignItems:'center', gap:'1.2rem', marginBottom:'3rem',
              paddingBottom:'1.5rem', borderBottom:`1px solid ${ruleLine}` }}>
              <span className="ghost-num">02</span>
              <div>
                <p className="yatra" style={{ fontSize:'0.82rem', letterSpacing:'0.12em', color:accent, marginBottom:'3px' }}>लेखक के बारे में</p>
                <h2 className="h1f" style={{ color:ink, fontSize:'1.9rem', fontWeight:700, margin:0 }}>About the Author</h2>
              </div>
            </div>

            <div className="rl-card" style={{ padding:'2.2rem', overflow:'hidden' }}>
              {/* Corner brackets */}
              <div style={{ position:'absolute', top:0, left:0, width:'1.4rem', height:'1.4rem',
                borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
              <div style={{ position:'absolute', bottom:0, right:0, width:'1.4rem', height:'1.4rem',
                borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px',
                background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />

              <div className="h1f" style={{ fontSize:'4rem', color:`${accent}18`, lineHeight:0.8, marginBottom:'8px',
                fontWeight:900, userSelect:'none' }}>"</div>

              {book.authorBio.split('\n\n').map((para, i) => (
                <p key={i} style={{ color:mutedText, fontSize:'1rem', lineHeight:'1.9', marginBottom:'1rem' }}>{para}</p>
              ))}

              <div className="ink-bar" style={{ margin:'1.5rem 0 1rem' }} />
              <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.82rem', letterSpacing:'0.08em' }}>
                — Dhawal Shukla, Co-Founder &amp; CEO, Cosmo India Prakashan
              </p>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ position:'relative', zIndex:1, padding:'5rem 1.5rem', background:'#130a04', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage:`repeating-linear-gradient(45deg, transparent, transparent 34px, rgba(192,57,43,0.04) 35px, rgba(192,57,43,0.04) 36px)` }} />
          <div style={{ position:'absolute', inset:0, pointerEvents:'none',
            background:`radial-gradient(ellipse 70% 60% at 50% 50%, rgba(192,57,43,0.22) 0%, rgba(212,69,12,0.08) 50%, transparent 100%)` }} />
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px',
            background:`linear-gradient(90deg, transparent, ${accent}, ${saffron}, transparent)` }} />

          <div style={{ position:'relative', zIndex:1, maxWidth:'560px', margin:'0 auto', textAlign:'center' }}>
            <p className="yatra" style={{ color:`${accent}dd`, fontSize:'1.1rem', letterSpacing:'0.1em', marginBottom:'1rem' }}>
              — Sacred Dwelling —
            </p>
            <h2 className="h1f" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', fontWeight:900, color:'#f0e8dc',
              lineHeight:1.1, marginBottom:'1rem' }}>
              Dwell with<br />
              <em style={{ color:accent }}>Intention.</em>
            </h2>
            <p style={{ color:'rgba(240,232,220,0.7)', fontSize:'1rem', lineHeight:'1.85', marginBottom:'2.5rem', maxWidth:'400px', margin:'0 auto 2.5rem' }}>
              Begin your journey into the Eastern understanding of sacred spaces — where your home becomes a living partner in your well-being.
            </p>
            <button onClick={handleEbook} className="pulse-btn"
              style={{
                display:'inline-flex', alignItems:'center', gap:'12px',
                padding:'14px 36px',
                background:`linear-gradient(135deg,${accent},${saffron})`,
                border:'none', cursor:'pointer', color:'#fff',
                fontFamily:"'Playfair Display',serif", fontWeight:700,
                fontSize:'1rem', letterSpacing:'0.05em',
                boxShadow:`0 10px 40px rgba(192,57,43,0.45)`,
              }}>
              <Download style={{ width:'1.1rem', height:'1.1rem' }} />
              Get the Book
              <ArrowRight style={{ width:'1rem', height:'1rem' }} />
            </button>
          </div>
        </section>

      </div>
    </>
  );
};

export default Release;