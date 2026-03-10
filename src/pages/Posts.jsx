import { useState, useEffect } from "react";
import { BookOpen, X, User, ArrowRight } from "lucide-react";

export default function Posts({ darkMode }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const accent   = '#c0392b';
  const saffron  = '#d4450c';
  const ink      = darkMode ? '#f0e8dc' : '#1a1209';
  const muted    = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.62)';
  const ruleLine = darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)';

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await fetch(
          "https://docs.google.com/document/d/1TePVBMqTDCCwm9bO8f7AMvhoYU_sSUnGVMKzlweBZL0/export?format=txt"
        );
        const text = await res.text();
        const regex = /Author:\s*(.*?)\s*Content:\s*([\s\S]*?)(?=Author:|$)/gi;
        const matches = [...text.matchAll(regex)];

        const parsedPosts = matches
          .map((m) => {
            const raw     = m[1].trim();
            const content = m[2].trim();
            /* "Title - Author" split on last " - " */
            const dashIdx = raw.lastIndexOf(' - ');
            const title   = dashIdx !== -1 ? raw.slice(0, dashIdx).trim() : raw;
            const author  = dashIdx !== -1 ? raw.slice(dashIdx + 3).trim() : 'अज्ञात';
            return { title, author, content };
          })
          .filter((p) => p.content);

        setPosts(parsedPosts);
      } catch (err) {
        console.error("Error fetching Google Doc:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
    const interval = setInterval(fetchDoc, 60000);
    return () => clearInterval(interval);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = modal !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="relative overflow-hidden p-8"
            style={{
              background: darkMode
                ? 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))'
                : 'linear-gradient(145deg,#ffffff,#fdf6ee)',
              border: `1px solid ${ruleLine}`,
            }}>
            <div className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg,${accent},${saffron},transparent)` }} />
            <div className="animate-pulse space-y-3">
              <div className="h-3 rounded w-3/4"
                style={{ background: darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.12)' }} />
              <div className="h-2 rounded w-1/2"
                style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />
              {[...Array(3)].map((_,j) => (
                <div key={j} className="h-2 rounded"
                  style={{ width:`${[100,85,70][j]}%`, background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Empty state ── */
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <BookOpen style={{ width:'2.5rem', height:'2.5rem', color:accent, margin:'0 auto 1rem' }} />
        <p style={{ fontFamily:'Playfair Display,Georgia,serif', color:ink, fontSize:'1.2rem', fontWeight:700, marginBottom:'0.5rem' }}>
          No posts yet
        </p>
        <p style={{ color:muted, fontSize:'0.9rem' }}>Check back soon — ideas are brewing.</p>
      </div>
    );
  }

  const selectedPost = modal !== null ? posts[modal] : null;

  return (
    <>
      <style>{`
        @keyframes pfu { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .pc { animation: pfu .7s cubic-bezier(.22,1,.36,1) both;
              transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
              cursor: pointer; position: relative; overflow: hidden; }
        .pc:hover { transform: translateY(-5px); }
        .pc::after { content:''; position:absolute; bottom:0; left:0; height:2px; width:0;
          background:linear-gradient(90deg,${accent},${saffron}); transition:width .42s ease; }
        .pc:hover::after { width:100%; }

        @keyframes mdin  { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:none} }
        @keyframes bdin  { from{opacity:0} to{opacity:1} }
        .modal-bd { animation: bdin .25s ease both; }
        .modal-pn { animation: mdin .35s cubic-bezier(.22,1,.36,1) both; }

        .modal-pn::-webkit-scrollbar { width: 4px; }
        .modal-pn::-webkit-scrollbar-track { background: transparent; }
        .modal-pn::-webkit-scrollbar-thumb { background: ${accent}50; border-radius: 2px; }
      `}</style>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="pc flex flex-col"
            style={{
              animationDelay: `${idx * 0.08}s`,
              background: darkMode
                ? 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))'
                : 'linear-gradient(145deg,#ffffff,#fdf6ee)',
              border: `1px solid ${darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.15)'}`,
              boxShadow: darkMode ? 'none' : '0 4px 24px rgba(192,57,43,0.07)',
            }}
            onClick={() => setModal(idx)}
          >
            {/* Top accent strip */}
            <div className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />

            {/* Ghost number */}
            <span style={{
              position:'absolute', bottom:'0.5rem', right:'1rem',
              fontFamily:'Playfair Display,serif', fontSize:'5rem', fontWeight:900,
              color:'transparent',
              WebkitTextStroke:`1px ${darkMode ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.08)'}`,
              lineHeight:1, userSelect:'none', pointerEvents:'none',
            }}>
              {String(idx + 1).padStart(2, '0')}
            </span>

            <div style={{ padding:'1.75rem', display:'flex', flexDirection:'column', flex:1 }}>

              {/* ── TITLE ── */}
              <h3 style={{
                fontFamily:'Playfair Display,Georgia,serif', fontWeight:700,
                color:ink, fontSize:'1.1rem', lineHeight:'1.35',
                marginBottom:'0.6rem',
              }}>
                {post.title}
              </h3>

              {/* ── Author ── */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.1rem' }}>
                <div style={{
                  width:'1.5rem', height:'1.5rem', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:`${accent}15`, border:`1px solid ${accent}35`, color:accent,
                }}>
                  <User style={{ width:'0.7rem', height:'0.7rem' }} />
                </div>
                <span style={{
                  fontFamily:'Yatra One,serif', color:accent,
                  fontSize:'0.78rem', letterSpacing:'0.06em',
                }}>
                  {post.author}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height:'1px', background:`linear-gradient(90deg,${accent}40,transparent)`, marginBottom:'1rem' }} />

              {/* Preview — 4 lines */}
              <p style={{
                color:muted, fontSize:'0.9rem', lineHeight:'1.82',
                fontFamily:'DM Sans,sans-serif', whiteSpace:'pre-line',
                display:'-webkit-box', WebkitLineClamp:4,
                WebkitBoxOrient:'vertical', overflow:'hidden', flex:1,
              }}>
                {post.content}
              </p>

              {/* Read more */}
              <button
                style={{
                  marginTop:'1.1rem', display:'flex', alignItems:'center', gap:'0.4rem',
                  fontFamily:'Playfair Display,serif', fontWeight:700,
                  color:accent, fontSize:'0.88rem',
                  background:'none', border:'none', cursor:'pointer', padding:0,
                  transition:'gap .3s ease',
                }}
                onClick={(e) => { e.stopPropagation(); setModal(idx); }}
                onMouseEnter={e => e.currentTarget.style.gap = '0.75rem'}
                onMouseLeave={e => e.currentTarget.style.gap = '0.4rem'}
              >
                Read More
                <ArrowRight style={{ width:'0.85rem', height:'0.85rem' }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      {selectedPost && (
        <div
          className="modal-bd"
          style={{
            position:'fixed', inset:0, zIndex:9999,
            background:'rgba(8,4,2,0.85)',
            backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            padding:'1.25rem',
            paddingTop:'6rem',
          }}
          onClick={() => setModal(null)}
        >
          <div
            className="modal-pn"
            style={{
              position:'relative',
              width:'100%', maxWidth:'680px', maxHeight:'88vh',
              overflowY:'auto',
              background: darkMode
                ? 'linear-gradient(150deg,#1e1410,#141210)'
                : 'linear-gradient(150deg,#ffffff,#fdf6ee)',
              border:`1px solid ${darkMode ? 'rgba(192,57,43,0.4)' : 'rgba(192,57,43,0.28)'}`,
              boxShadow:`0 50px 120px rgba(192,57,43,0.35), 0 0 0 1px ${accent}18`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top strip */}
            <div style={{
              position:'sticky', top:0, left:0, right:0, height:'3px', zIndex:10,
              background:`linear-gradient(90deg,${accent},${saffron},transparent)`,
            }} />

            <div style={{ padding:'2.25rem 2.5rem 2.5rem' }}>

              {/* Close */}
              <button
                onClick={() => setModal(null)}
                style={{
                  position:'absolute', top:'1rem', right:'1rem',
                  width:'2rem', height:'2rem',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:`${accent}15`, border:`1px solid ${accent}35`,
                  color:accent, cursor:'pointer', transition:'background .2s',
                  flexShrink:0,
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${accent}30`}
                onMouseLeave={e => e.currentTarget.style.background = `${accent}15`}
              >
                <X style={{ width:'1rem', height:'1rem' }} />
              </button>

              {/* Title */}
              <h2 style={{
                fontFamily:'Playfair Display,Georgia,serif', fontWeight:900,
                color:ink, fontSize:'clamp(1.4rem,3vw,1.9rem)',
                lineHeight:'1.2', marginBottom:'0.9rem', paddingRight:'3rem',
              }}>
                {selectedPost.title}
              </h2>

              {/* Author */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1.5rem' }}>
                <div style={{
                  width:'2rem', height:'2rem', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:`${accent}15`, border:`1px solid ${accent}35`, color:accent,
                }}>
                  <User style={{ width:'0.85rem', height:'0.85rem' }} />
                </div>
                <div>
                  <span style={{
                    fontFamily:'Yatra One,serif', color:accent,
                    fontSize:'0.7rem', letterSpacing:'0.1em',
                    display:'block', lineHeight:1.3,
                  }}>
                    लेखक
                  </span>
                  <span style={{
                    fontFamily:'Playfair Display,serif', fontWeight:700,
                    color:ink, fontSize:'0.95rem',
                  }}>
                    {selectedPost.author}
                  </span>
                </div>
              </div>

              {/* Ink divider */}
              <div style={{
                height:'2px',
                background:`linear-gradient(90deg,transparent,${accent} 30%,${saffron} 70%,transparent)`,
                marginBottom:'1.75rem',
              }} />

              {/* Full content */}
              <p style={{
                color:muted, fontSize:'1rem', lineHeight:'2',
                fontFamily:'Tiro Devanagari Hindi,DM Sans,sans-serif',
                whiteSpace:'pre-line',
              }}>
                {selectedPost.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}