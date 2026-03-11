import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const accent      = '#c0392b';
  const saffron     = '#d4450c';
  const ink         = darkMode ? '#f0e8dc'                    : '#1a1209';
  const muted       = darkMode ? 'rgba(240,232,220,0.58)'     : 'rgba(26,18,9,0.60)';
  const rule        = darkMode ? 'rgba(192,57,43,0.25)'       : 'rgba(192,57,43,0.18)';
  const footerBg    = darkMode ? '#0e0c0a'                    : '#fdf6ee';
  const brandName   = darkMode ? '#f0e8dc'                    : '#1a1209';
  const logoBg      = darkMode ? '#ffffff'                    : 'transparent';
  const socialBorder= darkMode ? 'rgba(192,57,43,0.35)'       : 'rgba(192,57,43,0.30)';
  const socialBg    = darkMode ? 'rgba(192,57,43,0.07)'       : 'rgba(192,57,43,0.06)';
  const socialColor = darkMode ? 'rgba(240,232,220,0.55)'     : 'rgba(26,18,9,0.50)';
  const copyTxt     = darkMode ? 'rgba(240,232,220,0.35)'     : 'rgba(26,18,9,0.40)';
  const taglineTxt  = darkMode ? `${accent}88`                : `${accent}99`;
  const gridLine    = darkMode ? 'rgba(192,57,43,0.06)'       : 'rgba(192,57,43,0.05)';
  const glowColor   = darkMode ? 'rgba(192,57,43,0.12)'       : 'rgba(192,57,43,0.06)';
  const hindiQuote  = darkMode ? 'rgba(240,232,220,0.75)'     : 'rgba(26,18,9,0.72)';

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBooksClick = () => {
    if (location.pathname === '/') scrollToSection('books');
    else if (location.pathname === '/marketplace') window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/marketplace');
  };

  const quickLinks = location.pathname === '/'
    ? [
        { label: 'Home',         action: () => scrollToSection('home') },
        { label: 'Books',        action: handleBooksClick },
        { label: 'About',        action: () => scrollToSection('about') },
        { label: 'Contact',      action: () => scrollToSection('contact') },
        { label: 'Work with Us', action: () => window.open('https://careers.cosmoindiaprakashan.in/', '_blank') },
      ]
    : [
        { label: 'Home',         action: () => navigate('/') },
        { label: 'Books',        action: handleBooksClick },
        { label: 'About',        action: () => scrollToSection('about') },
        { label: 'Contact',      action: () => scrollToSection('contact') },
        { label: 'Work with Us', action: () => window.open('https://careers.cosmoindiaprakashan.in/', '_blank') },
      ];

  const moreLinks = [
    { label: 'Blog',                   action: () => navigate('/blog') },
    { label: 'Legacy',                 action: () => navigate('/legacy') },
    { label: 'Privacy Policy',         action: () => navigate('/marketplace?policy=privacy') },
    { label: 'Terms & Conditions',     action: () => navigate('/marketplace?policy=terms') },
    { label: 'Shipping Policy',        action: () => navigate('/marketplace?policy=shipping') },
    { label: 'Cancellation & Refunds', action: () => navigate('/marketplace?policy=refund') },
  ];

  const socials = [
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/profile.php?id=61562467420068',
      icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>,
    },
    {
      name: 'Twitter / X',
      link: 'https://x.com/IndiaCosmo',
      icon: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>,
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/cosmoindiaprakashan/',
      icon: <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.25a1 1 0 110 2 1 1 0 010-2z"/>,
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/company/cosmoindiaprakashan/',
      icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
    },
  ];

  /* One "track" of ticker text — repeated inside both halves */
  const tickerItems = [...Array(10)].map((_, i) => (
    <span
      key={i}
      style={{
        fontFamily: 'Yatra One, serif',
        color: '#ffffff',
        fontSize: '0.75rem',
        letterSpacing: '0.18em',
        paddingRight: '2.5rem',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      ✦ &nbsp; कलम की आग &nbsp; ✦ &nbsp; Fearless Stories of Bharat &nbsp; ✦ &nbsp; Cosmo India Prakashan &nbsp; ✦ &nbsp; Since 1980s
    </span>
  ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');

        .ft-root {
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          background: ${footerBg};
          color: ${ink};
          position: relative;
          overflow: hidden;
          border-top: 1px solid ${rule};
        }

        .ft-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 59px, ${gridLine} 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, ${gridLine} 60px);
          pointer-events: none;
          z-index: 0;
        }

        .ft-root::after {
          content: '';
          position: absolute;
          width: 500px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, ${glowColor} 0%, transparent 70%);
          bottom: -120px; right: -80px;
          pointer-events: none;
          z-index: 0;
        }

        .ft-inner { position: relative; z-index: 1; }

        .ft-ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, ${accent} 30%, ${saffron} 70%, transparent);
        }

        .ft-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${accent};
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ft-heading::before {
          content: '';
          display: inline-block;
          width: 1.2rem;
          height: 1px;
          background: ${accent};
          flex-shrink: 0;
        }

        .ft-link {
          display: block;
          background: none; border: none; cursor: pointer;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          color: ${muted};
          padding: 4px 0;
          transition: color 0.2s, padding-left 0.2s;
          width: 100%;
        }
        .ft-link:hover { color: ${accent}; padding-left: 6px; }

        .ft-social {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid ${socialBorder};
          color: ${socialColor};
          background: ${socialBg};
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s;
          cursor: pointer;
          text-decoration: none;
        }
        .ft-social:hover {
          background: linear-gradient(135deg, ${accent}, ${saffron});
          color: #fff;
          border-color: transparent;
          transform: translateY(-3px);
        }

        /* ── Seamless marquee ──
           The track contains 2 identical halves.
           We animate translateX(0) → translateX(-50%) so it loops perfectly
           regardless of screen width.                                        */
        .ft-ticker-track {
          display: flex;
          width: max-content;          /* shrink-wrap to content */
          will-change: transform;
          animation: ftTicker 140s linear infinite;
        }
        .ft-ticker-half {
          display: flex;
          flex-shrink: 0;
        }
        @keyframes ftTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ft-label {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${accent};
          margin-bottom: 4px;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <footer className="ft-root">

        {/* ── Seamless ticker ── */}
        <div style={{ background: '#c0392b', overflow: 'hidden', padding: '10px 0' }}>
          <div className="ft-ticker-track">
            {/* Half A */}
            <div className="ft-ticker-half">{tickerItems}</div>
            {/* Half B — identical, so the seam is invisible */}
            <div className="ft-ticker-half">{tickerItems}</div>
          </div>
        </div>

        <div className="ft-inner max-w-6xl mx-auto px-8 lg:px-16 py-16">

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 mb-14">

            {/* Brand — 4 cols */}
            <div className="md:col-span-4">
              <button
                onClick={() => navigate('/')}
                style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'14px', marginBottom:'1.5rem' }}>
                <div style={{ background: logoBg, borderRadius:'10px', padding: darkMode ? '6px' : '0', display:'flex', alignItems:'center', flexShrink:0 }}>
                  <img src="/cosmo-logo.png" alt="Cosmo India Prakashan" style={{ height:'64px', width:'auto', display:'block' }} />
                </div>
                <div style={{ textAlign:'left' }}>
                  <p style={{ fontFamily:'Yatra One, serif', fontSize:'1.15rem', color: brandName, lineHeight:'1.3' }}>
                    Cosmo India Prakashan
                  </p>
                  <p style={{ fontFamily:'Yatra One, serif', fontSize:'0.78rem', color: accent, letterSpacing:'0.06em', marginTop:'2px' }}>
                    कॉस्मो इंडिया प्रकाशन
                  </p>
                </div>
              </button>

              <p style={{ fontFamily:"'Tiro Devanagari Hindi', 'Mangal', serif", color: muted, fontSize:'0.97rem', lineHeight:'1.9', marginBottom:'1.4rem' }}>
                "रोकने से कलम रुकती नहीं है।<br />
                <span style={{ color: hindiQuote }}>ये कलम है आग से आगे।"</span>
              </p>

              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                {socials.map(({ name, link, icon }) => (
                  <a key={name} href={link} target="_blank" rel="noopener noreferrer"
                    className="ft-social" aria-label={name}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">{icon}</svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links — 2 cols */}
            <div className="md:col-span-2">
              <p className="ft-heading">Quick Links</p>
              {quickLinks.map(({ label, action }) => (
                <button key={label} className="ft-link" onClick={action}>{label}</button>
              ))}
            </div>

            {/* More — 3 cols */}
            <div className="md:col-span-3">
              <p className="ft-heading">More</p>
              {moreLinks.map(({ label, action }) => (
                <button key={label} className="ft-link" onClick={action}>{label}</button>
              ))}
            </div>

            {/* Contact — 3 cols */}
            <div className="md:col-span-3">
              <p className="ft-heading">Get In Touch</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <div>
                  <p className="ft-label">Address</p>
                  <p style={{ color: muted, fontSize:'0.9rem', lineHeight:'1.8' }}>
                    Sector A 24 Gujaini Chanakyapuri<br />UP, India
                  </p>
                </div>
                <div>
                  <p className="ft-label">Phone</p>
                  <p style={{ color: muted, fontSize:'0.9rem' }}>+91 7388270331</p>
                </div>
                <div>
                  <p className="ft-label">Email</p>
                  <p style={{ color: muted, fontSize:'0.9rem', wordBreak:'break-word' }}>
                    cosmoindiaprakashan@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Ink bar ── */}
          <div className="ft-ink-bar mb-8" />

          {/* ── Bottom row ── */}
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
            <p style={{ color: copyTxt, fontSize:'0.82rem', letterSpacing:'0.04em' }}>
              © 2026 Cosmo India Prakashan. All rights reserved.
            </p>
            <p style={{ fontFamily:'Yatra One, serif', color: taglineTxt, fontSize:'0.72rem', letterSpacing:'0.1em' }}>
              कलम की आग — Since 1980s
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;