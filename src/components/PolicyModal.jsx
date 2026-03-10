import { useContext, useEffect } from 'react';
import { X } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const PolicyModal = ({ open, onClose, children }) => {
  const { darkMode } = useContext(DarkModeContext);

  const accent  = '#c0392b';
  const saffron = '#d4450c';

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else      document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        @keyframes pm-backdropIn { from{opacity:0} to{opacity:1} }
        @keyframes pm-slideUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        .pm-backdrop {
          animation: pm-backdropIn .25s ease both;
        }
        .pm-card {
          animation: pm-slideUp .35s cubic-bezier(.22,1,.36,1) both;
        }

        /* Scrollbar styling */
        .pm-body::-webkit-scrollbar { width: 4px; }
        .pm-body::-webkit-scrollbar-track { background: transparent; }
        .pm-body::-webkit-scrollbar-thumb {
          background: ${accent}60;
          border-radius: 2px;
        }
        .pm-body::-webkit-scrollbar-thumb:hover {
          background: ${accent};
        }

        /* Close button */
        .pm-close {
          background: none; border: none; cursor: pointer; padding: 0;
          display: flex; align-items: center; justify-content: center;
          width: 2rem; height: 2rem;
          color: ${darkMode ? 'rgba(240,232,220,0.6)' : 'rgba(26,18,9,0.5)'};
          border: 1px solid ${darkMode ? 'rgba(192,57,43,0.25)' : 'rgba(192,57,43,0.2)'};
          transition: color .2s, border-color .2s, background .2s, transform .2s;
          flex-shrink: 0;
        }
        .pm-close:hover {
          color: #fff;
          background: linear-gradient(135deg, ${accent}, ${saffron});
          border-color: transparent;
          transform: rotate(90deg);
        }

        /* Children prose styles */
        .pm-body h1, .pm-body h2, .pm-body h3 {
          font-family: 'Playfair Display', Georgia, serif;
          color: ${darkMode ? '#f0e8dc' : '#1a1209'};
        }
        .pm-body h1 { font-size: 1.5rem; font-weight: 900; margin-bottom: 0.5rem; }
        .pm-body h2 { font-size: 1.15rem; font-weight: 700; margin: 1.4rem 0 0.4rem;
          padding-bottom: 6px;
          border-bottom: 1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.14)'};
        }
        .pm-body h3 { font-size: 1rem; font-weight: 700; margin: 1rem 0 0.3rem; }
        .pm-body p  {
          color: ${darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.68)'};
          font-size: 0.93rem; line-height: 1.82; margin-bottom: 0.75rem;
        }
        .pm-body a  { color: ${accent}; text-decoration: none; }
        .pm-body a:hover { text-decoration: underline; }
        .pm-body ul, .pm-body ol {
          padding-left: 1.25rem; margin-bottom: 0.75rem;
          color: ${darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.68)'};
          font-size: 0.93rem; line-height: 1.82;
        }
        .pm-body li { margin-bottom: 0.25rem; }
        .pm-body strong { color: ${darkMode ? '#f0e8dc' : '#1a1209'}; font-weight: 600; }
      `}</style>

      {/* Backdrop */}
      <div
        className="pm-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Card — stop propagation so clicking inside doesn't close */}
        <div
          className="pm-card"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%', maxWidth: '720px',
            maxHeight: '88vh',
            display: 'flex', flexDirection: 'column',
            background: darkMode
              ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
              : 'linear-gradient(145deg, #ffffff, #fdf6ee)',
            border: `1px solid ${darkMode ? 'rgba(192,57,43,0.25)' : 'rgba(192,57,43,0.18)'}`,
            boxShadow: darkMode
              ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(192,57,43,0.1)'
              : '0 20px 60px rgba(192,57,43,0.15)',
          }}
        >
          {/* Top gradient line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, ${accent}, ${saffron}, transparent)`,
            flexShrink: 0,
          }} />

          {/* Corner brackets */}
          <div style={{ position:'absolute', top:0, left:0, width:'1.4rem', height:'1.4rem',
            borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:'1.4rem', height:'1.4rem',
            borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.4rem 1.6rem 1rem',
            borderBottom: `1px solid ${darkMode ? 'rgba(192,57,43,0.18)' : 'rgba(192,57,43,0.12)'}`,
            flexShrink: 0,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <div style={{ width:'1.6rem', height:'2px', background:accent, flexShrink:0 }} />
              <span style={{
                fontFamily:'Yatra One, serif',
                color: darkMode ? '#f0c8a0' : '#8b2010',
                fontSize: '0.82rem', letterSpacing: '0.1em',
              }}>
                Cosmo India Prakashan
              </span>
            </div>
            <button className="pm-close" onClick={onClose} aria-label="Close">
              <X style={{ width:'0.9rem', height:'0.9rem' }} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="pm-body" style={{
            overflowY: 'auto',
            padding: '1.6rem',
            flexGrow: 1,
            fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
            color: darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.68)',
          }}>
            {children}
          </div>

          {/* Footer */}
          <div style={{
            padding: '0.9rem 1.6rem',
            borderTop: `1px solid ${darkMode ? 'rgba(192,57,43,0.18)' : 'rgba(192,57,43,0.12)'}`,
            display: 'flex', justifyContent: 'flex-end',
            flexShrink: 0,
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '9px 24px',
                background: `linear-gradient(135deg, ${accent}, ${saffron})`,
                border: 'none', cursor: 'pointer',
                color: '#fff',
                fontFamily: 'Playfair Display, Georgia, serif',
                fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: `0 6px 20px ${accent}35`,
                transition: 'opacity .2s, box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyModal;