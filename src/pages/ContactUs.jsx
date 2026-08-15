import { useState, useContext } from 'react';
import { Mail, MapPin, Phone, ArrowRight, PenTool, Handshake, Package, Megaphone, Quote } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const ContactUs = () => {
  const { darkMode } = useContext(DarkModeContext);

  /* ── Colour tokens — same system as Cosmo.jsx ── */
  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink       = darkMode ? '#f0e8dc'                : '#1a1209';
  const paper     = darkMode ? '#141210'                : '#fdf6ee';
  const ruleLine  = darkMode ? 'rgba(192,57,43,0.28)'   : 'rgba(160,40,20,0.18)';
  const mutedText = darkMode ? 'rgba(240,232,220,0.82)' : 'rgba(26,18,9,0.72)';
  const heroBg = darkMode
    ? 'radial-gradient(ellipse 90% 70% at 48% 30%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
    : 'radial-gradient(ellipse 110% 85% at 46% 30%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)';

  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    if (!form.name) tempErrors.name = 'Name is required';
    if (!form.email) tempErrors.email = 'Email is required';
    if (!form.message) tempErrors.message = 'Message is required';
    if (Object.keys(tempErrors).length > 0) { setErrors(tempErrors); return; }
    const text = `Name: ${form.name}\nEmail: ${form.email}\nReason: ${form.reason || 'General'}\nMessage: ${form.message}`;
    window.open(`https://wa.me/7388270331?text=${encodeURIComponent(text)}`, '_blank');
    setForm({ name: '', email: '', reason: '', message: '' });
    setErrors({});
  };

  const reasons = [
    {
      icon: PenTool,
      num: '01',
      title: 'Submit a Manuscript',
      desc: 'Writing something rooted in Bharatiya thought, astrology, or culture? Send us your draft and our editors will read it with care.',
    },
    {
      icon: Handshake,
      num: '02',
      title: 'Author Partnership',
      desc: "Already published elsewhere and looking for a publisher who'll walk with you from manuscript to market? Let's talk.",
    },
    {
      icon: Package,
      num: '03',
      title: 'Bulk & Institutional Orders',
      desc: 'Libraries, schools, temples, and organisations can order our titles in bulk at special rates — write in for a quote.',
    },
    {
      icon: Megaphone,
      num: '04',
      title: 'Press & Media',
      desc: 'Working on a story about Indian publishing, astrology, or our founders? We are happy to speak with journalists and researchers.',
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

        .rule-b { border-bottom: 1px solid var(--rule); }
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

        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        .fu  { animation: fadeUp .85s cubic-bezier(.22,1,.36,1) both; }
        .d1  { animation-delay:.12s; } .d2 { animation-delay:.26s; }
        .d3  { animation-delay:.40s; }

        @keyframes flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.55} 53%{opacity:.95} }
        .flicker { animation: flicker 7s ease-in-out infinite; }

        @keyframes floatPen {
          0%,100% { transform: translateY(0) rotate(-8deg); }
          50%     { transform: translateY(-14px) rotate(-6deg); }
        }
        .float-pen { animation: floatPen 6s ease-in-out infinite; transform-origin: center; }

        @keyframes drip {
          0%   { transform: translateY(0);   opacity: .9; }
          85%  { transform: translateY(46px); opacity: 0; }
          100% { transform: translateY(46px); opacity: 0; }
        }
        .ink-drip { animation: drip 3.2s ease-in infinite; }

        .lift { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
        .lift:hover { transform: translateY(-5px); }

        @keyframes pulseBtn { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .pulse-btn:hover { animation: pulseBtn 1s ease-out; }

        .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--rule);
          user-select: none; pointer-events: none; line-height: 1;
        }

        .val-card { transition: background .28s, border-color .28s, transform .28s; }
        .val-card:hover {
          background: ${darkMode ? 'rgba(192,57,43,0.07)' : 'rgba(212,69,12,0.06)'} !important;
          border-color: var(--accent) !important;
          transform: translateY(-4px);
        }

        .ci-input {
          width: 100%; padding: 12px 16px;
          border: 1px solid var(--rule); border-radius: 3px;
          background: ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.75)'};
          color: var(--ink);
          font-family: 'DM Sans', sans-serif; font-size: 0.98rem;
          outline: none; transition: border-color .22s, box-shadow .22s;
        }
        .ci-input::placeholder { color: var(--muted); }
        .ci-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(192,57,43,.12); }
        select.ci-input { appearance: none; cursor: pointer; }
      `}</style>

      <div className="cr min-h-screen">

        {/* ════════════════════════════
            HERO
        ════════════════════════════ */}
        <section className="relative overflow-hidden hero-bg noise" style={{ padding: '6.5rem 0 5rem' }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10 grid lg:grid-cols-5 gap-12 items-center">

            <div className="lg:col-span-3">
              <div className="fu flex items-center gap-4 mb-6">
                <div style={{ width: '2.2rem', height: '2px', background: accent, flexShrink: 0 }} />
                <span className="yatra font-medium" style={{
                  color: darkMode ? '#f0c8a0' : '#8b2010', fontSize: '1.05rem', letterSpacing: '0.06em',
                  textShadow: darkMode ? '0 0 18px rgba(240,160,80,0.35)' : 'none',
                }}>
                  संपर्क करें
                </span>
              </div>

              <h1 className="h1 fu d1 font-black leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--ink)' }}>
                Let's Talk<br /><em style={{ color: accent }}>About Your Story.</em>
              </h1>

              <p className="fu d2 leading-relaxed mb-6" style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '34rem' }}>
                Whether you're a writer with an unfinished draft, a reader with a question, or an institution
                looking to stock our titles — every message reaches a person, not a queue. We read everything ourselves.
              </p>

              <div className="fu d3 pl-5 max-w-md" style={{ borderLeft: `3px solid ${accent}` }}>
                <p className="flicker hindi italic" style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
                  "बात करने से रास्ता खुलता है, चुप्पी से कुछ नहीं बनता।"
                </p>
              </div>
            </div>

            {/* Decorative feather / ink graphic */}
            <div className="lg:col-span-2 hidden lg:flex justify-center items-center relative" style={{ height: '280px' }}>
              <svg className="float-pen" width="180" height="240" viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 10 C60 40 40 90 45 140 C48 168 60 195 80 215"
                  stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M100 10 C130 20 150 45 152 75 C154 100 140 118 118 122 C96 126 82 112 84 92 C86 76 100 66 112 72"
                  fill={darkMode ? 'rgba(192,57,43,0.18)' : 'rgba(192,57,43,0.14)'} stroke={accent} strokeWidth="1.5" />
                <path d="M78 210 L84 216 L92 208" stroke={saffron} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="24" height="60" viewBox="0 0 24 60" style={{ position: 'absolute', bottom: '18px', left: '48%' }}>
                <circle className="ink-drip" cx="12" cy="6" r="3" fill={accent} />
              </svg>
              <div style={{
                position: 'absolute', bottom: '10px', width: '90px', height: '10px', borderRadius: '50%',
                background: darkMode ? 'rgba(192,57,43,0.15)' : 'rgba(192,57,43,0.12)', filter: 'blur(3px)',
              }} />
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            WHY REACH OUT
        ════════════════════════════ */}
        <section className="py-20 relative" style={{
          background: darkMode
            ? 'linear-gradient(180deg, #0e0c09 0%, #160e08 100%)'
            : 'linear-gradient(180deg, #fff3e8 0%, #ffe8cc 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="flex items-center gap-5 mb-12 rule-b pb-6">
              <span className="ghost-num">01</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: accent }}>क्यों लिखें हमें</p>
                <h2 className="h1 font-bold" style={{ color: 'var(--ink)', fontSize: '2rem' }}>Why Reach Out</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {reasons.map((r, i) => (
                <div key={i} className="val-card relative group overflow-hidden" style={{
                  background: darkMode
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'linear-gradient(145deg, #ffffff 0%, #fdf6ee 100%)',
                  border: `1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)'}`,
                  padding: '1.75rem',
                }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)` }} />
                  <span className="h1 absolute bottom-3 right-4 font-black select-none pointer-events-none"
                    style={{ fontSize: '4.5rem', color: 'transparent', WebkitTextStroke: `1px ${darkMode ? 'rgba(192,57,43,0.14)' : 'rgba(192,57,43,0.1)'}`, lineHeight: 1 }}>
                    {r.num}
                  </span>
                  <div className="w-11 h-11 mb-5 flex items-center justify-center"
                    style={{ background: `${accent}12`, border: `1px solid ${accent}35`, color: accent }}>
                    <r.icon style={{ width: '1.15rem', height: '1.15rem' }} />
                  </div>
                  <h3 className="h1 font-bold mb-3" style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>{r.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            CONTACT INFO + FORM
        ════════════════════════════ */}
        <section className="py-24" style={{
          background: darkMode
            ? 'linear-gradient(160deg, #1a1108 0%, #141210 100%)'
            : 'linear-gradient(160deg, #fdf6ee 0%, #fff8f2 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8 lg:px-16">
            <div className="flex items-center gap-5 mb-14 rule-b pb-6">
              <span className="ghost-num">02</span>
              <div>
                <p className="yatra mb-1" style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: accent }}>विवरण</p>
                <h2 className="h1 font-bold" style={{ color: 'var(--ink)', fontSize: '2rem' }}>Get in Touch</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-14">
              <div className="space-y-0">
                {[
                  {
                    icon: MapPin, title: 'Address',
                    content: (
                      <>
                        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                          Sector A 24 Gujaini Chanakyapuri<br />UP India
                        </p>
                        <div className="overflow-hidden" style={{ border: `1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`, height: '155px' }}>
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.4657149549403!2d80.28101877520723!3d26.440713076931743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c49d294914d83%3A0xa2640eaeceae550c!2sCosmo%20India%20Prakashan!5e0!3m2!1sen!2sin!4v1767088195065!5m2!1sen!2sin"
                            className="w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade" title="Cosmo India Prakashan" />
                        </div>
                      </>
                    )
                  },
                  { icon: Phone, title: 'Phone', content: <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>+91 7388270331</p> },
                  { icon: Mail, title: 'Email', content: <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>cosmoindiaprakashan@gmail.com</p> },
                ].map((item, i) => (
                  <div key={i} className="lift py-7 group"
                    style={{
                      borderTop: i === 0 ? `1px solid ${darkMode ? 'rgba(192,57,43,0.18)' : 'rgba(192,57,43,0.12)'}` : 'none',
                      borderBottom: `1px solid ${darkMode ? 'rgba(192,57,43,0.18)' : 'rgba(192,57,43,0.12)'}`
                    }}>
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${accent}10`, border: `1px solid ${accent}35`, color: accent }}>
                        <item.icon style={{ width: '1.1rem', height: '1.1rem' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="h1 font-bold mb-2" style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>{item.title}</h3>
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}

                <p className="pt-6" style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.7' }}>
                  We typically reply within 1–2 business days. For manuscript submissions, please allow up to two weeks for an initial read.
                </p>
              </div>

              <div className="relative p-9"
                style={{
                  background: darkMode
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))'
                    : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
                  border: `1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)'}`,
                  boxShadow: darkMode ? 'none' : '0 4px 30px rgba(192,57,43,0.07)',
                }}>
                <div className="absolute top-0 left-0 w-7 h-7" style={{ borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }} />
                <div className="absolute bottom-0 right-0 w-7 h-7" style={{ borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }} />

                <p className="yatra mb-7 flex items-center gap-3" style={{ color: accent, fontSize: '0.92rem' }}>
                  <span style={{ display: 'inline-block', width: '1.5rem', height: '2px', background: accent }} />
                  संदेश भेजें
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className="ci-input" />
                    {errors.name && <p className="mt-1" style={{ color: accent, fontSize: '0.8rem' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="ci-input" />
                    {errors.email && <p className="mt-1" style={{ color: accent, fontSize: '0.8rem' }}>{errors.email}</p>}
                  </div>
                  <div>
                    <select name="reason" value={form.reason} onChange={handleChange} className="ci-input">
                      <option value="">What's this about? (optional)</option>
                      <option value="Manuscript Submission">Manuscript Submission</option>
                      <option value="Author Partnership">Author Partnership</option>
                      <option value="Bulk / Institutional Order">Bulk / Institutional Order</option>
                      <option value="Press & Media">Press &amp; Media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <textarea rows="5" name="message" placeholder="Your Message" value={form.message} onChange={handleChange}
                      className="ci-input" style={{ resize: 'none' }} />
                    {errors.message && <p className="mt-1" style={{ color: accent, fontSize: '0.8rem' }}>{errors.message}</p>}
                  </div>
                  <button type="submit"
                    className="pulse-btn w-full py-4 font-semibold text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:gap-4 group"
                    style={{
                      background: 'linear-gradient(135deg,#1db954,#128c7e)', letterSpacing: '0.04em', fontSize: '0.95rem',
                      boxShadow: '0 6px 24px rgba(29,185,84,0.3)'
                    }}>
                    <span className="h1">Send via WhatsApp</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════
            CLOSING QUOTE STRIP
        ════════════════════════════ */}
        <section className="relative py-16 overflow-hidden" style={{ background: '#130a04' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(192,57,43,0.18) 0%, transparent 70%)`
          }} />
          <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">
            <Quote style={{ width: '1.6rem', height: '1.6rem', color: `${accent}aa`, margin: '0 auto 1rem' }} />
            <p className="hindi italic mb-2" style={{ color: 'rgba(240,232,220,0.85)', fontSize: '1.05rem' }}>
              हर पत्र एक नई बातचीत का आरंभ है।
            </p>
            <p style={{ color: 'rgba(240,232,220,0.5)', fontSize: '0.8rem', letterSpacing: '0.06em' }}>
              Every letter is the beginning of a new conversation.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default ContactUs;