import { useState, useEffect, useMemo } from "react";
import { BookOpen, X, User, ArrowRight, Clock, Tag, XCircle } from "lucide-react";

const DOC_ID = "1vTiUkhlhIKKtNWxqWz2aHMkwuY5GsjV5XPQ4E3LYyuI";

export default function Posts({ darkMode, selectedTags = [], onToggleTag, onClearTags }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const accent   = '#c0392b';
  const saffron  = '#d4450c';
  const ink      = darkMode ? '#f0e8dc' : '#1a1209';
  const muted    = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.62)';
  const ruleLine = darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)';

  const readMins = (text) => Math.max(1, Math.round(text.split(/\s+/).length / 200));

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        // IMPORTANT: must be the /export?format=txt endpoint, not /edit — the
        // editor URL returns an HTML shell, not the plain text the parser below needs.
        const res = await fetch(
          `https://docs.google.com/document/d/${DOC_ID}/export?format=txt`
        );
        const text = await res.text();

        // Split into one chunk per post, each starting at its "Author:" line.
        const chunks = text.split(/(?=Author:)/i).filter((c) => /^Author:/i.test(c.trim()));

        const parsedPosts = chunks
          .map((chunk) => {
            let working = chunk;

            // Tags: is a comma-separated list and can appear before or after
            // Content: — pull it out first (from wherever it is) so it never
            // leaks into the post body. "Category: X" (older, single-value
            // format) is still supported as a fallback for existing posts.
            let tags = [];
            const tagsMatch = working.match(/Tags:\s*(.*)/i);
            if (tagsMatch) {
              tags = tagsMatch[1].split('\n')[0].split(',').map((t) => t.trim()).filter(Boolean);
              working = working.replace(/Tags:\s*.*(\r?\n|$)/i, '');
            } else {
              const catMatch = working.match(/Category:\s*(.*)/i);
              if (catMatch) {
                const val = catMatch[1].split('\n')[0].trim();
                if (val) tags = [val];
                working = working.replace(/Category:\s*.*(\r?\n|$)/i, '');
              }
            }
            if (tags.length === 0) tags = ['General'];

            const contentMatch = working.match(/Content:\s*([\s\S]*)/i);
            const content = contentMatch ? contentMatch[1].trim() : '';

            const authorMatch = working.match(/Author:\s*([\s\S]*?)\s*(?:Content:|$)/i);
            const raw = authorMatch ? authorMatch[1].trim() : '';

            /* "Title - Author" split on last " - " */
            const dashIdx = raw.lastIndexOf(' - ');
            const title   = dashIdx !== -1 ? raw.slice(0, dashIdx).trim() : raw;
            const author  = dashIdx !== -1 ? raw.slice(dashIdx + 3).trim() : 'अज्ञात';
            return { title, author, tags, content };
          })
          .filter((p) => p.content)
          .reverse(); // newest post (last in doc) shown first

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

  /* Reset modal index when the filter changes so it can't point at a stale post */
  useEffect(() => { setModal(null); }, [selectedTags.join('|')]);

  // Every unique tag in use across all posts, in first-seen order — this is
  // what drives the filter bar, so it's never a fixed/hardcoded list.
  const allTags = useMemo(() => {
    const seen = new Set();
    const list = [];
    posts.forEach((p) => p.tags.forEach((t) => {
      const key = t.toLowerCase();
      if (!seen.has(key)) { seen.add(key); list.push(t); }
    }));
    return list;
  }, [posts]);

  // OR-match: a post shows if it has at least one of the selected tags.
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    const wanted = new Set(selectedTags.map((t) => t.toLowerCase()));
    return posts.filter((p) => p.tags.some((t) => wanted.has(t.toLowerCase())));
  }, [posts, selectedTags]);

  const isSelected = (tag) => selectedTags.some((t) => t.toLowerCase() === tag.toLowerCase());

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="relative overflow-hidden p-5"
            style={{
              background: darkMode
                ? 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))'
                : 'linear-gradient(145deg,#ffffff,#fdf6ee)',
              border: `1px solid ${ruleLine}`,
              minHeight: '13rem',
            }}>
            <div className="animate-pulse space-y-3">
              <div className="h-3 rounded w-3/4"
                style={{ background: darkMode ? 'rgba(192,57,43,0.2)' : 'rgba(192,57,43,0.12)' }} />
              <div className="h-2 rounded w-1/2"
                style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }} />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-2 rounded"
                  style={{ width: `${[100, 90, 60][j]}%`, background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Tag filter bar — every tag currently in use, always shown ── */
  const TagBar = allTags.length > 0 ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
      {allTags.map((tag) => {
        const active = isSelected(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag && onToggleTag(tag)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'DM Sans,sans-serif', fontSize: '0.78rem', fontWeight: 600,
              color: active ? '#fff' : accent,
              background: active ? `linear-gradient(135deg,${accent},${saffron})` : `${accent}12`,
              border: `1px solid ${active ? accent : `${accent}35`}`,
              padding: '0.4rem 0.8rem', cursor: 'pointer', transition: 'all .2s ease',
            }}
          >
            <Tag style={{ width: '0.68rem', height: '0.68rem' }} />
            {tag}
          </button>
        );
      })}
      {selectedTags.length > 0 && onClearTags && (
        <button
          onClick={onClearTags}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontFamily: 'DM Sans,sans-serif', fontSize: '0.78rem', fontWeight: 600,
            color: muted, background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem 0.3rem',
          }}
        >
          <XCircle style={{ width: '0.85rem', height: '0.85rem' }} />
          Clear
        </button>
      )}
    </div>
  ) : null;

  /* ── Empty state ── */
  if (filteredPosts.length === 0) {
    return (
      <div>
        {TagBar}
        <div className="text-center py-24">
          <BookOpen style={{ width: '2.5rem', height: '2.5rem', color: accent, margin: '0 auto 1rem' }} />
          <p style={{ fontFamily: 'Playfair Display,Georgia,serif', color: ink, fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {selectedTags.length > 0 ? 'No posts match those tags' : 'No posts yet'}
          </p>
          <p style={{ color: muted, fontSize: '0.9rem' }}>
            {selectedTags.length > 0 ? 'Try a different tag, or clear the filter.' : 'Check back soon — ideas are brewing.'}
          </p>
        </div>
      </div>
    );
  }

  const selectedPost = modal !== null ? filteredPosts[modal] : null;

  return (
    <>
      <style>{`
        @keyframes pfu { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .pc { animation: pfu .6s cubic-bezier(.22,1,.36,1) both;
              transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
              cursor: pointer; position: relative; overflow: hidden;
              display: flex; flex-direction: column; height: 100%; }
        .pc:hover { transform: translateY(-4px); }
        .pc::before { content:''; position:absolute; top:0; left:0; right:0; height:0;
          background:linear-gradient(90deg,${accent},${saffron}); transition:height .3s ease; }
        .pc:hover::before { height:3px; }

        @keyframes mdin  { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:none} }
        @keyframes bdin  { from{opacity:0} to{opacity:1} }
        .modal-bd { animation: bdin .25s ease both; }
        .modal-pn { animation: mdin .35s cubic-bezier(.22,1,.36,1) both; }

        .modal-pn::-webkit-scrollbar { width: 4px; }
        .modal-pn::-webkit-scrollbar-track { background: transparent; }
        .modal-pn::-webkit-scrollbar-thumb { background: ${accent}50; border-radius: 2px; }
      `}</style>

      {TagBar}

      {/* ── 4-column post grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPosts.map((post, idx) => (
          <div
            key={idx}
            className="pc"
            style={{
              animationDelay: `${Math.min(idx, 8) * 0.05}s`,
              background: darkMode
                ? 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))'
                : 'linear-gradient(145deg,#ffffff,#fdf6ee)',
              border: `1px solid ${darkMode ? 'rgba(192,57,43,0.18)' : 'rgba(192,57,43,0.14)'}`,
              padding: '1.5rem',
            }}
            onClick={() => setModal(idx)}
          >
            {idx === 0 && (
              <span style={{
                fontFamily: 'DM Sans,sans-serif', fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: accent,
                marginBottom: '0.5rem', display: 'block',
              }}>
                Latest
              </span>
            )}

            <h4 style={{
              fontFamily: 'Playfair Display,Georgia,serif', fontWeight: 700,
              color: ink, fontSize: '1.05rem', lineHeight: '1.35', marginBottom: '0.6rem',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {post.title}
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <User style={{ width: '0.68rem', height: '0.68rem', color: accent }} />
                <span style={{ fontFamily: 'Yatra One,serif', color: accent, fontSize: '0.75rem' }}>{post.author}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: muted, fontSize: '0.72rem' }}>
                <Clock style={{ width: '0.65rem', height: '0.65rem' }} />
                {readMins(post.content)} min
              </div>
            </div>

            <p style={{
              color: muted, fontSize: '0.85rem', lineHeight: '1.65', fontFamily: 'DM Sans,sans-serif',
              whiteSpace: 'pre-line', display: '-webkit-box', WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, marginBottom: '0.9rem',
            }}>
              {post.content}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.9rem' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={(e) => { e.stopPropagation(); onToggleTag && onToggleTag(tag); }}
                  style={{
                    fontFamily: 'DM Sans,sans-serif', fontSize: '0.65rem', fontWeight: 600,
                    letterSpacing: '0.03em', color: isSelected(tag) ? '#fff' : accent,
                    background: isSelected(tag) ? `linear-gradient(135deg,${accent},${saffron})` : `${accent}12`,
                    border: `1px solid ${isSelected(tag) ? accent : `${accent}30`}`,
                    padding: '0.15rem 0.5rem', cursor: 'pointer',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <span
              style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                fontFamily: 'Playfair Display,serif', fontWeight: 700, color: accent, fontSize: '0.85rem',
              }}
            >
              Read Full Story <ArrowRight style={{ width: '0.8rem', height: '0.8rem' }} />
            </span>
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
            <div style={{
              position:'sticky', top:0, left:0, right:0, height:'3px', zIndex:10,
              background:`linear-gradient(90deg,${accent},${saffron},transparent)`,
            }} />

            <div style={{ padding:'2.25rem 2.5rem 2.5rem' }}>
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

              <h2 style={{
                fontFamily:'Playfair Display,Georgia,serif', fontWeight:900,
                color:ink, fontSize:'clamp(1.4rem,3vw,1.9rem)',
                lineHeight:'1.2', marginBottom:'0.9rem', paddingRight:'3rem',
              }}>
                {selectedPost.title}
              </h2>

              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' }}>
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

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {selectedPost.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: 'DM Sans,sans-serif', fontSize: '0.7rem', fontWeight: 600,
                    color: accent, background: `${accent}12`, border: `1px solid ${accent}30`,
                    padding: '0.2rem 0.6rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{
                height:'2px',
                background:`linear-gradient(90deg,transparent,${accent} 30%,${saffron} 70%,transparent)`,
                marginBottom:'1.75rem',
              }} />

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