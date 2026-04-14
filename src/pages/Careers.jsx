import { useState, useEffect, useContext } from 'react';
import { ArrowRight, BookOpen, Feather, Users, Star, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

/* ─────────────────────────────────────────────────────────────
   MOCK DATA — remove once backend GET /careers is wired up.
   Expected API response shape:
   { jobs: [ { id, title, type, location, department, summary,
               description, responsibilities: string[], skills: string[] } ] }
───────────────────────────────────────────────────────────── */
const MOCK_JOBS = [
  {
    id: 'content-editor-001',
    title: 'Content Editor',
    type: 'Full-time',
    location: 'Kanpur, UP',
    department: 'Editorial',
    summary: 'Shape manuscripts into meaningful books rooted in Bharatiya thought and tradition.',
    description:
      'We are looking for a meticulous and passionate Content Editor who shares our love for Indian literature, astrology, and philosophy. You will work closely with authors to refine manuscripts, ensure editorial consistency, and uphold the distinctive voice of Cosmo India Prakashan.',
    responsibilities: [
      'Review and edit manuscripts for grammar, clarity, and stylistic consistency',
      'Collaborate with authors to strengthen their narrative voice',
      'Coordinate with design and production teams for timely releases',
      'Research topics across astrology, culture, and Bharatiya literature',
    ],
    skills: ['Strong Hindi & English writing', 'Eye for detail', 'Familiarity with Indian cultural texts', '2+ years editing experience'],
  },
  {
    id: 'digital-marketing-002',
    title: 'Digital Marketing Executive',
    type: 'Hybrid',
    location: 'Kanpur, UP',
    department: 'Marketing',
    summary: 'Amplify our voice across digital platforms and connect our books with readers who need them.',
    description:
      'We need a creative and data-driven Digital Marketing Executive to grow our online presence. You will manage social media, plan campaigns, and ensure our publications reach readers across India and beyond.',
    responsibilities: [
      'Plan and execute social media campaigns (Instagram, Facebook, YouTube)',
      'Write engaging content in Hindi and English for digital platforms',
      'Manage SEO and website content updates',
      'Analyse campaign metrics and optimise for growth',
    ],
    skills: ['Social media management', 'Basic design skills (Canva/Figma)', 'Hindi copywriting', 'Google Analytics'],
  },
  {
    id: 'author-relations-003',
    title: 'Author Relations Coordinator',
    type: 'Remote',
    location: 'Remote',
    department: 'Publishing',
    summary: 'Be the bridge between our publishing house and the writers whose words we bring to the world.',
    description:
      'This role is ideal for someone who loves literature and people in equal measure. You will be the first point of contact for incoming manuscripts and support authors from proposal to print.',
    responsibilities: [
      'Respond to author inquiries and manuscript submissions',
      'Coordinate review timelines and communicate editorial feedback',
      'Maintain author records and correspondence logs',
      'Support authors during launch and promotional activities',
    ],
    skills: ['Excellent communication', 'Organised and self-driven', 'Passion for Indian literature', 'Google Workspace'],
  },
];

const deptIcon = (dept) => ({ Editorial: BookOpen, Marketing: Star, Publishing: Feather }[dept] || Users);

const typeColor = (type) =>
  type === 'Remote' ? '#2563eb' : type === 'Hybrid' ? '#d97706' : '#16a34a';

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const CareersPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const [jobs,       setJobs]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [form,       setForm]       = useState({ name: '', email: '', role: '', message: '' });
  const [errors,     setErrors]     = useState({});
  const [submitted,  setSubmitted]  = useState(false);

  /* ── Fetch jobs from backend; gracefully fall back to mock ── */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/careers`);
        if (!res.ok) throw new Error('not_ok');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch {
        // Backend route not yet added — use mock data in the meantime
        setJobs(MOCK_JOBS);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  /* ── Colour tokens (mirror main site) ── */
  const accent   = '#c0392b';
  const saffron  = '#d4450c';
  const ink      = darkMode ? '#f0e8dc' : '#1a1209';
  const paper    = darkMode ? '#141210' : '#fdf6ee';
  const ruleLine = darkMode ? 'rgba(192,57,43,0.28)' : 'rgba(160,40,20,0.18)';
  const mutedTxt = darkMode ? 'rgba(240,232,220,0.72)' : 'rgba(26,18,9,0.65)';
  const cardBg   = darkMode
    ? 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(145deg, #ffffff 0%, #fdf6ee 100%)';

  /* ── Form ── */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name)    errs.name    = 'Name is required';
    if (!form.email)   errs.email   = 'Email is required';
    if (!form.role)    errs.role    = 'Please mention the role';
    if (!form.message) errs.message = 'Cover note is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const subject = encodeURIComponent(`CIP Careers Application — ${form.role}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nRole Applied: ${form.role}\n\nCover Note:\n${form.message}`);
    window.open(`mailto:cosmoindiaprakashan@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setForm({ name: '', email: '', role: '', message: '' });
    setErrors({});
    setSubmitted(true);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        :root{--ink:${ink};--paper:${paper};--accent:${accent};--saffron:${saffron};--rule:${ruleLine};--muted:${mutedTxt}}
        .cr*{box-sizing:border-box}
        .cr{background:var(--paper);color:var(--ink);font-family:'DM Sans',system-ui,sans-serif;font-size:15.5px}
        .yatra{font-family:'Yatra One',serif}
        .h1{font-family:'Playfair Display',Georgia,serif}
        .rule-b{border-bottom:1px solid var(--rule)}
        .ghost-num{font-family:'Playfair Display',serif;font-size:3rem;font-weight:900;color:transparent;-webkit-text-stroke:1px var(--rule);user-select:none;pointer-events:none;line-height:1}
        .ci-input{width:100%;padding:12px 16px;border:1px solid var(--rule);border-radius:3px;background:${darkMode?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.75)'};color:var(--ink);font-family:'DM Sans',sans-serif;font-size:1rem;outline:none;transition:border-color .22s,box-shadow .22s}
        .ci-input::placeholder{color:var(--muted)}
        .ci-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(192,57,43,.12)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
        .fu{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) both}
        .d1{animation-delay:.1s}.d2{animation-delay:.24s}.d3{animation-delay:.40s}
        @keyframes pulseBtn{0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)}70%{box-shadow:0 0 0 14px rgba(192,57,43,0)}100%{box-shadow:0 0 0 0 rgba(192,57,43,0)}}
        .pulse-btn:hover{animation:pulseBtn 1s ease-out}
        @keyframes inkRise{0%{transform:translateY(110%);opacity:0}15%{opacity:.6}85%{opacity:.6}100%{transform:translateY(-110%);opacity:0}}
        .ink-line{animation:inkRise linear infinite}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .job-card{transition:transform .28s cubic-bezier(.22,1,.36,1),border-color .25s,box-shadow .25s}
        .job-card:hover{transform:translateY(-4px)}
        .expand-body{overflow:hidden;transition:max-height .42s cubic-bezier(.22,1,.36,1),opacity .3s}
        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .skeleton{border-radius:2px;background:linear-gradient(90deg,var(--rule) 25%,rgba(192,57,43,0.06) 50%,var(--rule) 75%);background-size:400px 100%;animation:shimmer 1.4s ease infinite}
      `}</style>

      <div className="cr min-h-screen">

        {/* ══════════ HERO ══════════ */}
        <section className="relative overflow-hidden py-28"
          style={{
            background: darkMode
              ? 'radial-gradient(ellipse 90% 70% at 48% 38%, #2e0c07 0%, #141210 55%, #0e0c0a 100%)'
              : 'radial-gradient(ellipse 110% 85% at 46% 35%, #fdd8a8 0%, #f9c88a 18%, #fde8c8 45%, #fdf6ee 100%)',
          }}>

          {/* decorative ink lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[{l:'10%',h:'32vh',d:'0s',du:'16s'},{l:'45%',h:'22vh',d:'5s',du:'19s'},{l:'78%',h:'36vh',d:'2s',du:'13s'}].map((l,i)=>(
              <div key={i} className="ink-line absolute bottom-0"
                style={{left:l.l,width:'1px',height:l.h,
                  background:`linear-gradient(to top,transparent,${accent}75,transparent)`,
                  animationDuration:l.du,animationDelay:l.d}}/>
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-16">
            <div className="fu flex items-center gap-4 mb-6">
              <div style={{width:'2.2rem',height:'2px',background:accent,flexShrink:0}}/>
              <span className="yatra" style={{color:darkMode?'#f0c8a0':'#8b2010',fontSize:'1.05rem',letterSpacing:'0.06em'}}>
                कॉस्मो इंडिया प्रकाशन
              </span>
            </div>

            <h1 className="h1 fu d1 font-black leading-tight mb-6"
              style={{fontSize:'clamp(2.6rem,5.5vw,4.4rem)',color:'var(--ink)'}}>
              Join the<br/>
              <em style={{color:accent}}>Pen that</em><br/>
              Never Stops.
            </h1>

            <p className="fu d2 max-w-xl leading-relaxed mb-8"
              style={{color:'var(--muted)',fontSize:'1.05rem'}}>
              At Cosmo India Prakashan, every role is a contribution to something larger —
              the preservation of Bharatiya thought, one word at a time.
            </p>

            <button onClick={()=>scrollTo('openings')}
              className="fu d3 pulse-btn flex items-center gap-2.5 px-7 py-3.5 font-semibold text-white"
              style={{background:`linear-gradient(135deg,${accent},${saffron})`,fontSize:'0.92rem',
                letterSpacing:'0.04em',boxShadow:`0 8px 30px ${accent}40`}}>
              <span className="h1">See Open Roles</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </section>

        {/* ══════════ TICKER ══════════ */}
        <div style={{background:accent,padding:'10px 0',overflow:'hidden'}}>
          <div style={{display:'flex',width:'max-content',animation:'ticker 90s linear infinite'}}>
            {[0,1].map(half=>(
              <div key={half} style={{display:'flex',flexShrink:0}}>
                {[...Array(8)].map((_,i)=>(
                  <span key={i} className="yatra text-white"
                    style={{fontSize:'0.75rem',paddingRight:'2.5rem',whiteSpace:'nowrap',flexShrink:0,letterSpacing:'0.12em'}}>
                    ✦ &nbsp; कलम की आग &nbsp; ✦ &nbsp; Careers at CIP &nbsp; ✦ &nbsp; Fearless Stories of Bharat &nbsp; ✦ &nbsp; Join Our Team
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ VALUES STRIP ══════════ */}
        <section className="py-16" style={{background:darkMode?'#1a1108':'#fff8f0'}}>
          <div className="max-w-5xl mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {label:'Mission-Driven Work',   desc:"Every publication carries a purpose — to preserve India's intellectual heritage."},
                {label:'Creative Freedom',       desc:"Your voice matters. We believe in writers, editors, and creators who think independently."},
                {label:'Legacy & Growth',        desc:"Be part of a 40+ year legacy while building skills for the future of Indian publishing."},
              ].map((v,i)=>(
                <div key={i} className="p-6"
                  style={{border:`1px solid ${darkMode?'rgba(192,57,43,0.22)':'rgba(192,57,43,0.14)'}`,
                    background:cardBg,transition:'transform .28s,border-color .25s'}}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.borderColor='rgba(192,57,43,0.5)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.borderColor=darkMode?'rgba(192,57,43,0.22)':'rgba(192,57,43,0.14)'}}>
                  <div className="w-1.5 h-8 mb-4" style={{background:`linear-gradient(to bottom,${accent},${saffron})`}}/>
                  <h3 className="h1 font-bold mb-2" style={{color:'var(--ink)',fontSize:'1.1rem'}}>{v.label}</h3>
                  <p style={{color:'var(--muted)',fontSize:'0.93rem',lineHeight:'1.75'}}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ JOB LISTINGS ══════════ */}
        <section id="openings" className="py-24"
          style={{background:darkMode?'linear-gradient(180deg,#141210 0%,#160e08 100%)':'linear-gradient(180deg,#fff3e8 0%,#ffe8cc 100%)'}}>
          <div className="max-w-5xl mx-auto px-8 lg:px-16">

            <div className="flex items-center gap-5 mb-14 pb-6 rule-b">
              <span className="ghost-num">01</span>
              <div>
                <p className="yatra mb-1" style={{fontSize:'0.82rem',letterSpacing:'0.12em',color:accent}}>रिक्तियां</p>
                <h2 className="h1 font-bold" style={{color:'var(--ink)',fontSize:'2rem'}}>Open Positions</h2>
              </div>
            </div>

            {/* Loading skeletons */}
            {loading && (
              <div className="space-y-4">
                {[1,2,3].map(i=>(
                  <div key={i} className="skeleton" style={{height:'88px',opacity:0.5}}/>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && jobs.length === 0 && (
              <div className="text-center py-20">
                <p className="yatra mb-3" style={{color:accent,fontSize:'1.3rem',letterSpacing:'0.08em'}}>अभी कोई रिक्ति नहीं</p>
                <p style={{color:'var(--muted)',fontSize:'1rem',maxWidth:'26rem',margin:'0 auto 1.5rem'}}>
                  No openings right now — but we're always looking for passionate people. Send us your profile below.
                </p>
                <button onClick={()=>scrollTo('apply')}
                  className="pulse-btn inline-flex items-center gap-2 px-7 py-3 font-semibold text-white"
                  style={{background:`linear-gradient(135deg,${accent},${saffron})`,fontSize:'0.92rem'}}>
                  <span className="h1">Express Interest</span>
                  <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            )}

            {/* Job cards */}
            {!loading && jobs.length > 0 && (
              <div className="space-y-4">
                {jobs.map((job) => {
                  const Icon   = deptIcon(job.department);
                  const isOpen = expandedId === job.id;
                  const tColor = typeColor(job.type);

                  return (
                    <div key={job.id} className="job-card"
                      style={{
                        border:`1px solid ${darkMode?'rgba(192,57,43,0.22)':'rgba(192,57,43,0.15)'}`,
                        background:cardBg,
                        boxShadow:isOpen?`0 12px 40px rgba(192,57,43,0.12)`:'none',
                      }}>

                      {/* top colour rule */}
                      <div style={{height:'2px',background:`linear-gradient(90deg,${accent},${saffron},transparent)`}}/>

                      {/* clickable header */}
                      <button onClick={()=>setExpandedId(isOpen?null:job.id)}
                        className="w-full text-left px-6 py-5 flex items-center gap-5"
                        style={{background:'transparent',border:'none',cursor:'pointer',color:'var(--ink)'}}>

                        <div className="shrink-0 w-10 h-10 flex items-center justify-center"
                          style={{background:`${accent}12`,border:`1px solid ${accent}30`,color:accent}}>
                          <Icon style={{width:'1.1rem',height:'1.1rem'}}/>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h3 className="h1 font-bold" style={{color:'var(--ink)',fontSize:'1.12rem'}}>{job.title}</h3>
                            <span className="px-2.5 py-0.5 text-white"
                              style={{background:tColor,fontSize:'0.68rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase'}}>
                              {job.type}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-5 gap-y-1" style={{color:'var(--muted)',fontSize:'0.83rem'}}>
                            <span className="flex items-center gap-1.5">
                              <MapPin style={{width:'0.8rem',height:'0.8rem',color:accent}}/>{job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock style={{width:'0.8rem',height:'0.8rem',color:accent}}/>{job.department}
                            </span>
                          </div>
                        </div>

                        <div style={{color:accent,flexShrink:0}}>
                          {isOpen ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                        </div>
                      </button>

                      {/* expandable body */}
                      <div className="expand-body" style={{maxHeight:isOpen?'900px':'0',opacity:isOpen?1:0}}>
                        <div className="px-6 pb-8" style={{borderTop:`1px solid ${ruleLine}`}}>
                          <p style={{color:'var(--muted)',fontSize:'0.98rem',lineHeight:'1.85',marginTop:'1.25rem',marginBottom:'1.25rem'}}>
                            {job.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <p className="yatra mb-3" style={{color:accent,fontSize:'0.82rem',letterSpacing:'0.1em'}}>Responsibilities</p>
                              <ul className="space-y-2">
                                {job.responsibilities.map((r,i)=>(
                                  <li key={i} className="flex items-start gap-2.5"
                                    style={{color:'var(--muted)',fontSize:'0.93rem',lineHeight:'1.65'}}>
                                    <span style={{color:accent,marginTop:'0.2rem',flexShrink:0}}>✦</span>{r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="yatra mb-3" style={{color:accent,fontSize:'0.82rem',letterSpacing:'0.1em'}}>Skills & Requirements</p>
                              <div className="flex flex-wrap gap-2">
                                {job.skills.map((s,i)=>(
                                  <span key={i} className="px-3 py-1.5"
                                    style={{border:`1px solid ${darkMode?'rgba(192,57,43,0.3)':'rgba(192,57,43,0.2)'}`,
                                      background:`${accent}0d`,color:'var(--ink)',fontSize:'0.83rem'}}>
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={()=>{setForm(f=>({...f,role:job.title}));scrollTo('apply');}}
                            className="pulse-btn mt-7 flex items-center gap-2 px-6 py-3 font-semibold text-white"
                            style={{background:`linear-gradient(135deg,${accent},${saffron})`,fontSize:'0.9rem',letterSpacing:'0.04em'}}>
                            <span className="h1">Apply for this Role</span>
                            <ArrowRight className="w-4 h-4"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══════════ APPLICATION FORM ══════════ */}
        <section id="apply" className="py-24"
          style={{background:darkMode?'linear-gradient(160deg,#1a1108 0%,#141210 100%)':'linear-gradient(160deg,#fdf6ee 0%,#fff8f2 100%)'}}>
          <div className="max-w-3xl mx-auto px-8 lg:px-16">

            <div className="flex items-center gap-5 mb-12 pb-6 rule-b">
              <span className="ghost-num">02</span>
              <div>
                <p className="yatra mb-1" style={{fontSize:'0.82rem',letterSpacing:'0.12em',color:accent}}>आवेदन करें</p>
                <h2 className="h1 font-bold" style={{color:'var(--ink)',fontSize:'2rem'}}>Apply Now</h2>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                  style={{background:`${accent}15`,border:`2px solid ${accent}40`}}>
                  <span style={{fontSize:'2rem',color:accent}}>✦</span>
                </div>
                <h3 className="h1 font-bold mb-3" style={{color:'var(--ink)',fontSize:'1.6rem'}}>Application Sent!</h3>
                <p style={{color:'var(--muted)',fontSize:'1rem',maxWidth:'24rem',margin:'0 auto 2rem'}}>
                  Your email client has been opened with your application. Our team will get back to you soon.
                </p>
                <button onClick={()=>setSubmitted(false)}
                  style={{border:`1.5px solid ${accent}`,color:accent,background:'transparent',
                    fontSize:'0.9rem',cursor:'pointer',padding:'10px 24px',fontFamily:'inherit',fontWeight:600}}>
                  Apply for Another Role
                </button>
              </div>
            ) : (
              <div className="relative p-9"
                style={{
                  background:darkMode?'linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))':'linear-gradient(145deg,#ffffff,#fdf6ee)',
                  border:`1px solid ${darkMode?'rgba(192,57,43,0.22)':'rgba(192,57,43,0.16)'}`,
                  boxShadow:darkMode?'none':'0 4px 30px rgba(192,57,43,0.07)',
                }}>
                {/* corner brackets */}
                <div className="absolute top-0 left-0 w-7 h-7"
                  style={{borderTop:`2px solid ${accent}`,borderLeft:`2px solid ${accent}`}}/>
                <div className="absolute bottom-0 right-0 w-7 h-7"
                  style={{borderBottom:`2px solid ${accent}`,borderRight:`2px solid ${accent}`}}/>

                <p className="yatra mb-7 flex items-center gap-3" style={{color:accent,fontSize:'0.92rem'}}>
                  <span style={{display:'inline-block',width:'1.5rem',height:'2px',background:accent}}/>
                  Send your application to cosmoindiaprakashan@gmail.com
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <input name="name" placeholder="Your Full Name" value={form.name} onChange={handleChange} className="ci-input"/>
                      {errors.name && <p style={{color:accent,fontSize:'0.8rem',marginTop:'4px'}}>{errors.name}</p>}
                    </div>
                    <div>
                      <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="ci-input"/>
                      {errors.email && <p style={{color:accent,fontSize:'0.8rem',marginTop:'4px'}}>{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <input name="role" placeholder="Role you're applying for" value={form.role} onChange={handleChange} className="ci-input"/>
                    {errors.role && <p style={{color:accent,fontSize:'0.8rem',marginTop:'4px'}}>{errors.role}</p>}
                  </div>

                  <div>
                    <textarea name="message" rows={5}
                      placeholder="Tell us about yourself and why you want to join CIP..."
                      value={form.message} onChange={handleChange} className="ci-input" style={{resize:'none'}}/>
                    {errors.message && <p style={{color:accent,fontSize:'0.8rem',marginTop:'4px'}}>{errors.message}</p>}
                  </div>

                  <button type="submit"
                    className="pulse-btn w-full py-4 font-semibold text-white flex items-center justify-center gap-2.5 group"
                    style={{background:`linear-gradient(135deg,${accent},${saffron})`,letterSpacing:'0.04em',
                      fontSize:'0.95rem',boxShadow:`0 6px 24px ${accent}40`}}>
                    <span className="h1">Send Application via Email</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
};

export default CareersPage;