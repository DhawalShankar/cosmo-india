import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb, Edit, Check, BookOpen, Heart, Users, Award, TrendingUp,
  MessageCircle, Target, FileText, Rocket, ArrowRight, Star, Sparkles, Coffee
} from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const DiscussYourBook = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [selectedStage, setSelectedStage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', bookTitle: '', genre: '', stage: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  /* ── Colour tokens (mirrors home page) ── */
  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink       = darkMode ? '#f0e8dc'                  : '#1a1209';
  const paper     = darkMode ? '#141210'                  : '#fdf6ee';
  const ruleLine  = darkMode ? 'rgba(192,57,43,0.28)'     : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.82)'   : 'rgba(26,18,9,0.72)';
  const heroBg = darkMode
    ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
    : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)';

  const bookStages = [
    { id: 'idea',      title: 'Just an Idea',         description: "I have a concept but haven't started writing yet", icon: Lightbulb, num: '01' },
    { id: 'writing',   title: 'Writing in Progress',  description: "I'm currently working on my manuscript",           icon: Edit,      num: '02' },
    { id: 'completed', title: 'Manuscript Complete',   description: 'My book is written and ready for the next step',   icon: Check,     num: '03' },
    { id: 'published', title: 'Previously Published',  description: 'Looking for a new publisher or re-release',        icon: BookOpen,  num: '04' },
  ];

  const genres = [
    'Fiction','Non-Fiction','Biography/Memoir','Self-Help','Business','Academic',
    'Poetry',"Children's Book",'Young Adult','Mystery/Thriller','Romance',
    'Science Fiction/Fantasy','History','Religion/Spirituality','Astrology','Other',
  ];

  const authorJourney = [
    { icon: MessageCircle, title: 'Initial Consultation',  description: 'We start with a friendly conversation about your book, your vision, and your goals as an author.' },
    { icon: Target,        title: 'Understanding Your Vision', description: 'We dive deep into your manuscript, target audience, and what makes your story unique.' },
    { icon: FileText,      title: 'Custom Publishing Plan', description: 'Based on your needs, we create a personalised publishing roadmap just for you.' },
    { icon: Rocket,        title: 'Bring Your Book to Life', description: 'From editing to design to marketing, we handle everything while you stay involved.' },
  ];

  const whyUs = [
    { icon: Heart,      title: 'Personal Attention', description: 'Every author and every book is unique. We treat your work with the care it deserves.' },
    { icon: Users,      title: 'Experienced Team',   description: 'Our editors, designers, and marketers have decades of combined industry experience.' },
    { icon: Award,      title: 'Quality First',      description: "We never compromise on quality. Your book will meet professional publishing standards." },
    { icon: TrendingUp, title: 'Author Success',     description: 'We measure our success by yours. Your satisfaction and book quality are our top priorities.' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!form.name)      tempErrors.name      = 'Name is required';

    if (!form.email) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!form.phone) {
      tempErrors.phone = 'Phone is required';
    } else if (!/^\+?[0-9\s\-().]{7,15}$/.test(form.phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number';
    }

    if (!form.bookTitle) tempErrors.bookTitle = 'Book title is required';
    if (!form.genre)     tempErrors.genre     = 'Please select a genre';
    if (!form.stage)     tempErrors.stage     = 'Please select your current stage';
    if (Object.keys(tempErrors).length) { setErrors(tempErrors); return; }

    const text = `New Book Discussion Request!\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBook Title: ${form.bookTitle}\nGenre: ${form.genre}\nStage: ${form.stage}\nMessage: ${form.message || 'N/A'}`;
    window.open(`https://wa.me/7388270331?text=${encodeURIComponent(text)}`, '_blank');

    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', bookTitle: '', genre: '', stage: '', message: '' });
    setErrors({});
    setSelectedStage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

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

        .dyb * { box-sizing: border-box; }
        .dyb {
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          font-size: 15.5px;
        }

        .dyb .yatra { font-family: 'Yatra One', serif; }
        .dyb .h1    { font-family: 'Playfair Display', Georgia, serif; }
        .dyb .hindi { font-family: 'Tiro Devanagari Hindi', 'Mangal', serif; line-height: 2.0; }

        .dyb .rule-b { border-bottom: 1px solid var(--rule); }
        .dyb .ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent) 30%, var(--saffron) 70%, transparent);
        }

        .dyb .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--rule);
          user-select: none; pointer-events: none; line-height: 1;
        }

        .dyb .hero-bg { background: ${heroBg}; }

        .dyb .noise::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; mix-blend-mode: multiply;
        }

        @keyframes dybInkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.7; } 85% { opacity:.7; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .dyb .ink-line { animation: dybInkRise linear infinite; }

        @keyframes dybFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .dyb .fu  { animation: dybFadeUp .85s cubic-bezier(.22,1,.36,1) both; }
        .dyb .d1  { animation-delay:.12s; } .dyb .d2 { animation-delay:.26s; }
        .dyb .d3  { animation-delay:.40s; } .dyb .d4 { animation-delay:.55s; }

        @keyframes dybFlicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.55} 53%{opacity:.95} }
        .dyb .flicker { animation: dybFlicker 7s ease-in-out infinite; }

        .dyb .lift { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
        .dyb .lift:hover { transform: translateY(-5px); }

        @keyframes dybPulseBtn { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .dyb .pulse-btn:hover { animation: dybPulseBtn 1s ease-out; }

        .dyb .ci-input {
          width: 100%; padding: 12px 16px;
          border: 1px solid var(--rule); border-radius: 3px;
          background: ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.75)'};
          color: var(--ink);
          font-family: 'DM Sans', sans-serif; font-size: 1rem;
          outline: none; transition: border-color .22s, box-shadow .22s;
        }
        .dyb .ci-input::placeholder { color: var(--muted); }
        .dyb .ci-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(192,57,43,.12); }

        .dyb .val-card {
          transition: transform .28s, box-shadow .28s, border-color .28s;
        }
        .dyb .val-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(192,57,43,0.22);
          border-color: rgba(192,57,43,0.55) !important;
        }

        .dyb .stage-card {
          cursor: pointer;
          transition: transform .28s, box-shadow .28s, border-color .28s;
          position: relative;
        }
        .dyb .stage-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(192,57,43,0.2);
          border-color: rgba(192,57,43,0.55) !important;
        }
        .dyb .stage-card.active {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 1px var(--accent), 0 16px 40px rgba(192,57,43,0.28) !important;
        }
        .dyb .stage-card .top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--saffron), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .dyb .stage-card:hover .top-bar,
        .dyb .stage-card.active .top-bar { opacity: 1; }

        .dyb .deva-stripe {
          writing-mode: vertical-rl;
          font-family: 'Yatra One', serif; font-size: 0.82rem; letter-spacing: 0.12em;
          color: ${darkMode ? 'rgba(240,200,160,0.7)' : 'rgba(139,32,16,0.55)'};
          user-select: none;
        }
      `}</style>

      <div className="dyb min-h-screen">

        {/* ── Floating CTA ── */}
        <button
          onClick={() => navigate('/publish')}
          className="pulse-btn"
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.9rem 1.5rem', borderRadius: '9999px',
            background: `linear-gradient(135deg,${accent},${saffron})`,
            color: '#fff', fontWeight: 600, fontSize: '0.9rem',
            boxShadow: `0 8px 30px rgba(192,57,43,0.45)`,
            border: 'none', cursor: 'pointer', letterSpacing: '0.04em',
          }}
        >
          <Rocket style={{ width: '1rem', height: '1rem' }} />
          <span className="h1">View Services</span>
          <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
        </button>

        {/* ════════════════════════════
            HERO
        ════════════════════════════ */}
        <section className="relative hero-bg noise overflow-hidden"
          style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* ink lines */}
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
                background: `linear-gradient(to top,transparent,${accent}75,transparent)`,
                animationDuration: l.dur, animationDelay: l.delay,
              }} />
            ))}
          </div>

          {/* Devanagari stripe */}
          <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', display: 'none' }}
            className="xl:flex flex-col items-center gap-3">
            <div style={{ width: '1px', height: '3.5rem', background: 'var(--rule)' }} />
            <span className="deva-stripe">कलम की आग</span>
            <div style={{ width: '1px', height: '3.5rem', background: 'var(--rule)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '72rem', margin: '0 auto', padding: '8rem 2rem 4rem', textAlign: 'center' }}>
            <div className="fu" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Sparkles style={{ width: '2.5rem', height: '2.5rem', color: accent }} />
            </div>

            <div className="fu d1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '2.2rem', height: '2px', background: accent, flexShrink: 0 }} />
              <span className="yatra" style={{ color: darkMode ? '#f0c8a0' : '#8b2010', fontSize: '1.05rem', letterSpacing: '0.06em',
                textShadow: darkMode ? '0 0 18px rgba(240,160,80,0.35)' : 'none' }}>
                कॉस्मो इंडिया प्रकाशन
              </span>
              <div style={{ width: '2.2rem', height: '2px', background: accent, flexShrink: 0 }} />
            </div>

            <h1 className="h1 fu d2" style={{ fontSize: 'clamp(2.8rem,6vw,5.2rem)', fontWeight: 900, lineHeight: 1.06, marginBottom: '1.5rem', color: 'var(--ink)' }}>
              Let's Discuss<br />
              <em style={{ color: accent }}>Your Book</em>
            </h1>

            <div className="fu d3" style={{ display: 'inline-block', borderLeft: `3px solid ${accent}`, paddingLeft: '1.25rem', maxWidth: '40rem', textAlign: 'left', marginBottom: '2.5rem' }}>
              <p className="flicker" style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.85' }}>
                Every great book starts with a conversation. Share your vision with us,<br />
                <span style={{ color: 'var(--ink)' }}>and let's create something extraordinary together.</span>
              </p>
            </div>

            <div className="fu d4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
              <Coffee style={{ width: '1.1rem', height: '1.1rem', color: accent }} />
              <span style={{ color: 'var(--muted)', fontSize: '0.9rem', letterSpacing: '0.04em' }}>
                Grab a coffee and let's chat about your masterpiece
              </span>
            </div>

            <div className="fu d4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="pulse-btn"
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.9rem 2rem',
                  background: `linear-gradient(135deg,${accent},${saffron})`, color: '#fff',
                  fontWeight: 600, fontSize: '0.92rem', letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
                  boxShadow: `0 8px 30px rgba(192,57,43,0.4)`, transition: 'gap .3s' }}>
                <span className="h1">Tell Us About Your Book</span>
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            WHERE ARE YOU — book stages
        ════════════════════════════ */}
        <section style={{
          padding: '6rem 0',
          background: darkMode
            ? 'linear-gradient(135deg, #0e0a07 0%, #1a0d08 40%, #120c08 100%)'
            : 'linear-gradient(135deg, #1a0d06 0%, #2a1008 40%, #1a0905 100%)',
        }}>
          {/* dot grid */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `radial-gradient(circle, rgba(192,57,43,0.18) 1px, transparent 1px)`,
            backgroundSize: '36px 36px', opacity: 0.5 }} />

          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3.5rem',
              paddingBottom: '1.5rem', borderBottom: '1px solid rgba(192,57,43,0.3)' }}>
              <span className="h1" style={{ fontSize: '3rem', fontWeight: 900, color: 'transparent',
                WebkitTextStroke: '1px rgba(240,232,220,0.18)', lineHeight: 1 }}>01</span>
              <div>
                <p className="yatra" style={{ fontSize: '0.85rem', letterSpacing: '0.12em', color: `${accent}dd`, marginBottom: '0.25rem' }}>आपकी यात्रा</p>
                <h2 className="h1" style={{ color: '#f0e8dc', fontSize: '2rem', fontWeight: 700 }}>Where Are You in Your Journey?</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {bookStages.map((stage) => (
                <button
                  key={stage.id}
                  className={`stage-card${selectedStage === stage.title ? ' active' : ''}`}
                  onClick={() => {
                    setSelectedStage(stage.title);
                    setForm(f => ({ ...f, stage: stage.title }));
                    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border: `1px solid ${selectedStage === stage.title ? accent : 'rgba(192,57,43,0.25)'}`,
                    padding: '1.75rem', textAlign: 'left', cursor: 'pointer',
                  }}
                >
                  <div className="top-bar" />
                  <span className="h1" style={{
                    position: 'absolute', bottom: '0.5rem', right: '1rem',
                    fontSize: '5rem', color: 'transparent', WebkitTextStroke: '1px rgba(192,57,43,0.12)',
                    lineHeight: 1, userSelect: 'none',
                  }}>{stage.num}</span>
                  <div style={{ width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', marginBottom: '1.25rem' }}>
                    <stage.icon style={{ width: '1.15rem', height: '1.15rem', color: '#e8a090' }} />
                  </div>
                  <h3 className="h1" style={{ color: '#f0e8dc', fontSize: '1.08rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {stage.title}
                  </h3>
                  <p style={{ color: 'rgba(240,232,220,0.65)', fontSize: '0.88rem', lineHeight: '1.7' }}>
                    {stage.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            WHY WORK WITH US
        ════════════════════════════ */}
        <section style={{
          padding: '6rem 0',
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #160e08 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #ffe8cc 100%)',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3.5rem',
              paddingBottom: '1.5rem', borderBottom: `1px solid var(--rule)` }}>
              <span className="ghost-num">02</span>
              <div>
                <p className="yatra" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: accent, marginBottom: '0.25rem' }}>हमारी प्रतिबद्धता</p>
                <h2 className="h1" style={{ color: 'var(--ink)', fontSize: '2rem', fontWeight: 700 }}>Why Work With Us</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {whyUs.map((item, i) => (
                <div key={i} className="lift val-card" style={{
                  background: darkMode
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(145deg, #ffffff 0%, #fdf6ee 100%)',
                  border: `1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`,
                  padding: '2rem', position: 'relative', overflow: 'hidden',
                  boxShadow: darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />
                  <div style={{ width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${accent}12`, border: `1px solid ${accent}35`,
                    color: accent, marginBottom: '1.25rem' }}>
                    <item.icon style={{ width: '1.15rem', height: '1.15rem' }} />
                  </div>
                  <h3 className="h1" style={{ color: 'var(--ink)', fontSize: '1.08rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: '1.75' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            YOUR PUBLISHING JOURNEY
        ════════════════════════════ */}
        <section style={{
          padding: '6rem 0',
          background: darkMode
            ? 'linear-gradient(150deg, #1c1410 0%, #141210 100%)'
            : 'linear-gradient(150deg, #fff8f0 0%, #fdf6ee 60%, #fef3e6 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* diagonal stripe */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(192,57,43,0.03) 41px)` }} />

          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3.5rem',
              paddingBottom: '1.5rem', borderBottom: `1px solid var(--rule)` }}>
              <span className="ghost-num">03</span>
              <div>
                <p className="yatra" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: accent, marginBottom: '0.25rem' }}>प्रकाशन यात्रा</p>
                <h2 className="h1" style={{ color: 'var(--ink)', fontSize: '2rem', fontWeight: 700 }}>Your Publishing Journey With Us</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {authorJourney.map((step, i) => (
                <div key={i} className="lift val-card" style={{
                  background: darkMode
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(145deg, #ffffff 0%, #fdf6ee 100%)',
                  border: `1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`,
                  padding: '2rem', position: 'relative',
                  boxShadow: darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />
                  <p className="yatra" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', color: accent, marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                    Step {i + 1}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '2.75rem', height: '2.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${accent}12`, border: `1px solid ${accent}35`, color: accent, flexShrink: 0 }}>
                      <step.icon style={{ width: '1.15rem', height: '1.15rem' }} />
                    </div>
                    <div>
                      <h3 className="h1" style={{ color: 'var(--ink)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem' }}>
                        {step.title}
                      </h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: '1.75' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            CONTACT FORM
        ════════════════════════════ */}
        <section id="contact-form" style={{
          padding: '6rem 0',
          background: darkMode
            ? 'linear-gradient(160deg, #1a1108 0%, #141210 100%)'
            : 'linear-gradient(160deg, #fdf6ee 0%, #fff8f2 100%)',
        }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3.5rem',
              paddingBottom: '1.5rem', borderBottom: `1px solid var(--rule)` }}>
              <span className="ghost-num">04</span>
              <div>
                <p className="yatra" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: accent, marginBottom: '0.25rem' }}>संपर्क करें</p>
                <h2 className="h1" style={{ color: 'var(--ink)', fontSize: '2rem', fontWeight: 700 }}>Tell Us About Your Book</h2>
              </div>
            </div>

            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: '1.75' }}>
              Fill out the form below and we'll schedule a call to discuss your project.
            </p>

            {submitted && (
              <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem',
                background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.4)', borderRadius: '3px' }}>
                <p style={{ color: '#1db954', fontWeight: 600 }}>✓ Thank you! We'll be in touch soon via WhatsApp.</p>
              </div>
            )}

            {/* form card */}
            <div style={{ position: 'relative', padding: '2.5rem 2.5rem 3rem',
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

              <p className="yatra" style={{ color: accent, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: accent }} />
                अपनी किताब के बारे में बताएं
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
                  className="responsive-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Your Name *
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Ramdhari Singh Dinkar" className="ci-input" />
                    {errors.name && <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: accent }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Email Address *
                    </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="dinkar@bharat.com" className="ci-input" />
                    {errors.email && <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: accent }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Phone + Book Title */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
                  className="responsive-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Phone Number *
                    </label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+91 98765 43210" className="ci-input" />
                    {errors.phone && <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: accent }}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Book Title *
                    </label>
                    <input type="text" name="bookTitle" value={form.bookTitle} onChange={handleChange}
                      placeholder="Rashmirathi" className="ci-input" />
                    {errors.bookTitle && <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: accent }}>{errors.bookTitle}</p>}
                  </div>
                </div>

                {/* Genre */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Book Genre *
                  </label>
                  <select name="genre" value={form.genre} onChange={handleChange} className="ci-input">
                    <option value="">Select a genre</option>
                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.genre && <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: accent }}>{errors.genre}</p>}
                </div>

                {/* Stage */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Current Stage *
                  </label>
                  <select name="stage" value={form.stage} onChange={handleChange} className="ci-input">
                    <option value="">Select your current stage</option>
                    {bookStages.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                  {errors.stage && <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: accent }}>{errors.stage}</p>}
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Tell Us More <span style={{ fontWeight: 400, opacity: 0.7 }}>(Optional)</span>
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows="5"
                    placeholder="Share any additional details about your book, your goals, or questions you have..."
                    className="ci-input" style={{ resize: 'none' }} />
                </div>

                <div style={{ height: '2px', background: `linear-gradient(90deg, ${accent}70, ${saffron}50, transparent)`, margin: '0.25rem 0' }} />

                <button type="submit" className="pulse-btn"
                  style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                    background: 'linear-gradient(135deg,#1db954,#128c7e)', color: '#fff',
                    fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em',
                    border: 'none', cursor: 'pointer',
                    boxShadow: '0 6px 24px rgba(29,185,84,0.3)', transition: 'gap .3s' }}>
                  <MessageCircle style={{ width: '1.1rem', height: '1.1rem' }} />
                  <span className="h1">Start the Conversation via WhatsApp</span>
                  <ArrowRight style={{ width: '0.9rem', height: '0.9rem' }} />
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .dyb .responsive-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default DiscussYourBook;