import { DarkModeContext } from '../context/DarkModeContext';
import { useState, useContext } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, KeyRound, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin]           = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '', password: '' });
  const [errors, setErrors]             = useState({});
  const [loading, setLoading]           = useState(false);
  const [success, setSuccess]           = useState(false);
  const [debugInfo, setDebugInfo]       = useState(null);

  // OTP state
  const [otpStep, setOtpStep]           = useState(false);
  const [otp, setOtp]                   = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

  // Forgot password state
  const [forgotStep, setForgotStep]         = useState(false);   // show forgot-password panel
  const [forgotEmail, setForgotEmail]       = useState('');
  const [forgotLoading, setForgotLoading]   = useState(false);
  const [forgotSuccess, setForgotSuccess]   = useState(false);

  const { darkMode }                              = useContext(DarkModeContext);
  const { checkAuth, sendOtp, verifyOtp }         = useContext(AuthContext);
  const navigate                                  = useNavigate();

  const benefits = [
    'Exclusive access to premium books',
    'Personalized recommendations',
    'Order tracking & history',
    'Special member discounts',
    'Early access to new releases',
  ];

  const accent   = '#c0392b';
  const saffron  = '#d4450c';
  const ink      = darkMode ? '#f0e8dc'               : '#1a1209';
  const paper    = darkMode ? '#141210'               : '#fdf6ee';
  const ruleLine = darkMode ? 'rgba(192,57,43,0.28)'  : 'rgba(160,40,20,0.18)';
  const mutedText= darkMode ? 'rgba(240,232,220,0.72)': 'rgba(26,18,9,0.62)';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim())            newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password)                newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── Forgot password submit ── */
  const handleForgotSubmit = async () => {
    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setErrors({ forgotEmail: 'Please enter a valid email address' });
      return;
    }
    setForgotLoading(true);
    setErrors({});
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ forgotEmail: data.error || 'Something went wrong. Please try again.' });
        setForgotLoading(false);
        return;
      }
      setForgotSuccess(true);
    } catch (err) {
      setErrors({ forgotEmail: 'Network error. Please try again.' });
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotBack = () => {
    setForgotStep(false);
    setForgotEmail('');
    setForgotSuccess(false);
    setErrors({});
  };

  /* ── Submit: login OR send OTP ── */
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setDebugInfo(null);
    try {
      if (isLogin) {
        /* LOGIN */
        const endpoint = '/api/user?action=login';
        const payload  = { email: formData.email, password: formData.password };
        setDebugInfo({ status: 'sending', payload });
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        let data;
        const ct = response.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          data = await response.json();
        } else {
          const text = await response.text();
          throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
        }
        setDebugInfo({ status: 'received', data, responseStatus: response.status });
        if (!response.ok) {
          setErrors({ submit: data.error || `Server error: ${response.status}` });
          setLoading(false);
          return;
        }
        await checkAuth();
        setSuccess(true);
        setLoading(false);
        setTimeout(() => navigate('/marketplace'), 1200);

      } else {
        /* REGISTER — send OTP */
        const result = await sendOtp(formData.name, formData.email, formData.password);
        if (!result.success) {
          setErrors({ submit: result.error || 'Failed to send OTP. Please try again.' });
          setLoading(false);
          return;
        }
        setPendingEmail(formData.email);
        setOtpStep(true);
        setLoading(false);
      }
    } catch (err) {
      setDebugInfo({ status: 'error', error: err.message });
      let msg = 'Network error. ';
      if (err.message.includes('Failed to fetch'))  msg += 'Cannot connect to server.';
      else if (err.message.includes('non-JSON'))     msg += 'Server returned invalid response.';
      else msg += err.message;
      setErrors({ submit: msg });
      setLoading(false);
    }
  };

  /* ── OTP verify ── */
  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.trim().length !== 6) {
      setErrors({ otp: 'Please enter the 6-digit code' });
      return;
    }
    setLoading(true);
    const result = await verifyOtp(pendingEmail, otp);
    if (!result.success) {
      setErrors({ otp: result.error || 'Invalid OTP. Please try again.' });
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate('/marketplace'), 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (forgotStep) handleForgotSubmit();
      else if (otpStep) handleVerifyOtp();
      else handleSubmit();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setSuccess(false);
    setDebugInfo(null);
    setOtpStep(false);
    setOtp('');
    setPendingEmail('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');
        :root {
          --lg-ink:     ${ink};
          --lg-paper:   ${paper};
          --lg-accent:  ${accent};
          --lg-saffron: ${saffron};
          --lg-rule:    ${ruleLine};
          --lg-muted:   ${mutedText};
        }
        .lg-wrap * { box-sizing: border-box; }
        .lg-wrap {
          background: var(--lg-paper); color: var(--lg-ink);
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          font-size: 15.5px; min-height: 100vh;
        }
        .lg-wrap .yatra { font-family: 'Yatra One', serif; }
        .lg-wrap .h1f   { font-family: 'Playfair Display', Georgia, serif; }
        .lg-wrap .hindi { font-family: 'Tiro Devanagari Hindi', 'Mangal', serif; line-height: 2.0; }
        @keyframes lg-inkRise {
          0%{transform:translateY(110%);opacity:0} 15%{opacity:.6} 85%{opacity:.6} 100%{transform:translateY(-110%);opacity:0}
        }
        .lg-wrap .ink-line { animation: lg-inkRise linear infinite; }
        @keyframes lg-fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
        .lg-wrap .fu  { animation: lg-fadeUp .8s cubic-bezier(.22,1,.36,1) both; }
        .lg-wrap .d1  { animation-delay:.08s; } .lg-wrap .d2 { animation-delay:.18s; }
        .lg-wrap .d3  { animation-delay:.30s; } .lg-wrap .d4 { animation-delay:.42s; }
        .lg-wrap .d5  { animation-delay:.56s; }
        @keyframes lg-flicker { 0%,100%{opacity:1} 47%{opacity:.9} 50%{opacity:.5} 53%{opacity:.95} }
        .lg-wrap .flicker { animation: lg-flicker 8s ease-in-out infinite; }
        @keyframes lg-pulse { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .lg-wrap .pulse-btn:hover { animation: lg-pulse 1s ease-out; }
        .lg-wrap .ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, ${accent} 30%, ${saffron} 70%, transparent);
        }
        .lg-wrap .cip-input {
          width:100%; padding:11px 14px 11px 42px;
          border:1px solid var(--lg-rule);
          background:${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)'};
          color:var(--lg-ink); font-family:'DM Sans',sans-serif; font-size:0.95rem;
          outline:none; transition:border-color .22s,box-shadow .22s,background .22s; border-radius:2px;
        }
        .lg-wrap .cip-input::placeholder { color: var(--lg-muted); }
        .lg-wrap .cip-input:focus {
          border-color:${accent}; box-shadow:0 0 0 3px rgba(192,57,43,.12);
          background:${darkMode ? 'rgba(255,255,255,0.07)' : '#fff'};
        }
        .lg-wrap .cip-input.err { border-color:${accent}; }
        .lg-wrap .tab-btn {
          flex:1; padding:9px 16px; font-family:'Playfair Display',serif;
          font-size:0.92rem; font-weight:700; letter-spacing:0.04em;
          border:none; cursor:pointer; transition:all .28s ease; background:transparent;
        }
        .lg-wrap .tab-btn.active  { background:linear-gradient(135deg,${accent},${saffron}); color:#fff; }
        .lg-wrap .tab-btn.inactive { color:var(--lg-muted); }
        .lg-wrap .tab-btn.inactive:hover { color:var(--lg-ink); }
        .lg-wrap .benefit-row {
          display:flex; align-items:center; gap:12px; padding:12px 16px;
          border:1px solid var(--lg-rule); transition:border-color .22s,transform .22s;
        }
        .lg-wrap .benefit-row:hover { border-color:${accent}60; transform:translateX(4px); }
        .lg-wrap .form-card {
          background:${darkMode
            ? 'linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))'
            : 'linear-gradient(145deg,#ffffff,#fdf6ee)'};
          border:1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)'};
          box-shadow:${darkMode ? '0 24px 60px rgba(0,0,0,0.6)' : '0 12px 50px rgba(192,57,43,0.1)'};
        }
        @keyframes lg-checkBounce { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
        .lg-wrap .check-bounce { animation: lg-checkBounce .5s cubic-bezier(.22,1,.36,1) both; }
        .otp-input-style { text-align:center; font-size:2rem !important; letter-spacing:0.5em !important; padding-left:14px !important; }
        .lg-wrap .back-btn {
          background:none; border:none; cursor:pointer; color:var(--lg-muted);
          font-family:'DM Sans',sans-serif; font-size:0.82rem; padding:0;
          display:flex; align-items:center; gap:6px; transition:color .2s;
        }
        .lg-wrap .back-btn:hover { color:var(--lg-ink); }
      `}</style>

      <div className="lg-wrap">
        {/* ── Background ── */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{
            position:'absolute', inset:0,
            background: darkMode
              ? 'radial-gradient(ellipse 90% 70% at 48% 38%,#2e0c07 0%,#141210 55%,#0e0c0a 100%)'
              : 'radial-gradient(ellipse 110% 85% at 46% 35%,#fdd8a8 0%,#f9c88a 18%,#fde8c8 45%,#fdf6ee 100%)',
          }} />
          {[
            { left:'8%',  h:'38vh', delay:'0s',  dur:'15s' },
            { left:'22%', h:'28vh', delay:'4s',  dur:'19s' },
            { left:'50%', h:'46vh', delay:'8s',  dur:'13s' },
            { left:'70%', h:'33vh', delay:'2s',  dur:'17s' },
            { left:'88%', h:'40vh', delay:'6s',  dur:'21s' },
          ].map((l, i) => (
            <div key={i} className="ink-line" style={{
              position:'absolute', bottom:0, left:l.left,
              width:'1px', height:l.h,
              background:`linear-gradient(to top,transparent,${accent}70,transparent)`,
              animationDuration:l.dur, animationDelay:l.delay,
            }} />
          ))}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`radial-gradient(circle,${darkMode ? 'rgba(192,57,43,0.14)' : 'rgba(192,57,43,0.10)'} 1px,transparent 1px)`,
            backgroundSize:'38px 38px', opacity:0.6,
          }} />
        </div>

        {/* ── Layout ── */}
        <div className="relative" style={{ zIndex:1, minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'6rem 1.5rem 3rem' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', width:'100%' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }} className="lg-two-col">

              {/* ══ LEFT — branding ══ */}
              <div className="fu" style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                  <div style={{ width:'2rem', height:'2px', background:accent, flexShrink:0 }} />
                  <span className="yatra" style={{ color: darkMode ? '#f0c8a0' : '#8b2010', fontSize:'1rem', letterSpacing:'0.06em' }}>
                    कॉस्मो इंडिया प्रकाशन
                  </span>
                </div>
                <div>
                  <h1 className="h1f fu d1" style={{ fontSize:'clamp(2.2rem,4vw,3.6rem)', fontWeight:900, lineHeight:1.06, color:'var(--lg-ink)', margin:0 }}>
                    {forgotStep ? 'Reset Your' : isLogin ? 'Welcome' : 'Join the'}<br />
                    <em style={{ color:accent }}>{forgotStep ? 'Password.' : isLogin ? 'Back.' : 'Community.'}</em>
                  </h1>
                </div>
                <div className="fu d2" style={{ paddingLeft:'1.1rem', borderLeft:`3px solid ${accent}`, maxWidth:'380px' }}>
                  <p className="flicker hindi" style={{ color:'var(--lg-muted)', fontSize:'0.92rem', fontStyle:'italic' }}>
                    "रोकने से कलम रुकती नहीं है।"
                  </p>
                  <p style={{ color:accent, fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:'6px' }}>
                    — Shri Rajkumar Ratnapriya
                  </p>
                </div>
                {!forgotStep && (
                  <div className="fu d3" style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                    <p className="yatra" style={{ color: darkMode ? `${accent}cc` : accent, fontSize:'0.78rem', letterSpacing:'0.12em', marginBottom:'4px' }}>
                      सदस्यता के लाभ
                    </p>
                    {benefits.map((b, i) => (
                      <div key={i} className="benefit-row">
                        <div style={{ width:'1.4rem', height:'1.4rem', display:'flex', alignItems:'center', justifyContent:'center',
                          background:`${accent}15`, border:`1px solid ${accent}35`, flexShrink:0 }}>
                          <CheckCircle style={{ width:'0.75rem', height:'0.75rem', color:accent }} />
                        </div>
                        <span style={{ color:'var(--lg-muted)', fontSize:'0.88rem' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
                {forgotStep && (
                  <div className="fu d3" style={{ paddingLeft:'1.1rem', borderLeft:`3px solid ${accent}40`, maxWidth:'380px' }}>
                    <p style={{ color:'var(--lg-muted)', fontSize:'0.88rem', lineHeight:1.7, margin:0 }}>
                      Enter the email associated with your account and we'll send a temporary password to get you back in.
                    </p>
                  </div>
                )}
                {debugInfo && (
                  <div className="fu" style={{
                    padding:'12px 16px',
                    border:`1px solid ${darkMode ? 'rgba(192,57,43,0.3)' : 'rgba(192,57,43,0.2)'}`,
                    background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                      <AlertCircle style={{ width:'0.85rem', height:'0.85rem', color:accent }} />
                      <span className="h1f" style={{ color:accent, fontSize:'0.75rem', fontWeight:700 }}>Debug Info</span>
                    </div>
                    <pre style={{ color:'var(--lg-muted)', fontSize:'0.7rem', overflow:'auto', maxHeight:'120px', margin:0 }}>
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* ══ RIGHT — form card ══ */}
              <div className="fu d2">
                <div className="form-card" style={{ position:'relative', padding:'2.5rem' }}>
                  {/* Corner brackets */}
                  <div style={{ position:'absolute', top:0, left:0, width:'1.6rem', height:'1.6rem', borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
                  <div style={{ position:'absolute', bottom:0, right:0, width:'1.6rem', height:'1.6rem', borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />

                  {/* ── Success (login/register) ── */}
                  {success && (
                    <div style={{ textAlign:'center', padding:'2rem 0' }}>
                      <div className="check-bounce" style={{ marginBottom:'1.2rem' }}>
                        <div style={{ width:'4rem', height:'4rem', borderRadius:'50%', margin:'0 auto',
                          background:`${accent}15`, border:`2px solid ${accent}`,
                          display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <CheckCircle style={{ width:'1.8rem', height:'1.8rem', color:accent }} />
                        </div>
                      </div>
                      <h3 className="h1f" style={{ color:'var(--lg-ink)', fontSize:'1.6rem', fontWeight:900, marginBottom:'8px' }}>
                        {isLogin ? 'Welcome Back!' : 'Account Created!'}
                      </h3>
                      <div className="ink-bar" style={{ margin:'1rem auto', maxWidth:'120px' }} />
                      <p style={{ color:'var(--lg-muted)', fontSize:'0.92rem' }}>Redirecting to the marketplace…</p>
                    </div>
                  )}

                  {/* ── Forgot Password Step ── */}
                  {!success && forgotStep && (
                    <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
                      {/* Back button */}
                      <button type="button" className="back-btn" onClick={handleForgotBack}>
                        <ArrowLeft style={{ width:'0.85rem', height:'0.85rem' }} />
                        <span>Back to Sign In</span>
                      </button>

                      {/* Header */}
                      <div style={{ marginBottom:'0.4rem' }}>
                        <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.78rem', letterSpacing:'0.12em', marginBottom:'4px' }}>
                          पासवर्ड रीसेट
                        </p>
                        <h2 className="h1f" style={{ color:'var(--lg-ink)', fontSize:'1.5rem', fontWeight:900, margin:0, lineHeight:1.1 }}>
                          Forgot Password
                        </h2>
                      </div>

                      {/* Success state */}
                      {forgotSuccess ? (
                        <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem', alignItems:'center', textAlign:'center', padding:'1rem 0' }}>
                          <div className="check-bounce">
                            <div style={{ width:'3.5rem', height:'3.5rem', borderRadius:'50%', margin:'0 auto',
                              background:`${accent}15`, border:`2px solid ${accent}`,
                              display:'flex', alignItems:'center', justifyContent:'center' }}>
                              <Mail style={{ width:'1.4rem', height:'1.4rem', color:accent }} />
                            </div>
                          </div>
                          <div>
                            <h3 className="h1f" style={{ color:'var(--lg-ink)', fontSize:'1.25rem', fontWeight:900, marginBottom:'8px' }}>
                              Check Your Inbox
                            </h3>
                            <p style={{ color:'var(--lg-muted)', fontSize:'0.88rem', lineHeight:1.7, margin:0 }}>
                              If an account exists for <strong style={{ color:'var(--lg-ink)' }}>{forgotEmail}</strong>, a temporary password has been sent. Please check your email and log in.
                            </p>
                          </div>
                          <div className="ink-bar" style={{ width:'100%' }} />
                          <button type="button"
                            onClick={handleForgotBack}
                            className="pulse-btn"
                            style={{
                              width:'100%', padding:'13px 24px',
                              background:`linear-gradient(135deg,${accent},${saffron})`,
                              border:'none', cursor:'pointer', color:'#fff',
                              fontFamily:'Playfair Display,Georgia,serif',
                              fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.05em',
                              display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                              boxShadow:`0 8px 28px ${accent}35`,
                            }}>
                            <span>Back to Sign In</span>
                            <ArrowRight style={{ width:'1rem', height:'1rem' }} />
                          </button>
                        </div>
                      ) : (
                        <>
                          {/* Info box */}
                          <div style={{
                            padding:'12px 16px',
                            background: darkMode ? 'rgba(192,57,43,0.08)' : 'rgba(192,57,43,0.05)',
                            border:`1px solid ${accent}30`,
                          }}>
                            <p style={{ color:'var(--lg-muted)', fontSize:'0.85rem', margin:0, lineHeight:1.6 }}>
                              We'll send a temporary password to your registered email address.
                            </p>
                          </div>

                          {/* Email input */}
                          <div>
                            <label className="h1f" style={{ display:'block', color:'var(--lg-ink)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'6px' }}>
                              Email Address
                            </label>
                            <div style={{ position:'relative' }}>
                              <Mail style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'1rem', height:'1rem', color:'var(--lg-muted)' }} />
                              <input
                                type="email"
                                value={forgotEmail}
                                onChange={e => { setForgotEmail(e.target.value); setErrors({}); }}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter your registered email"
                                className={`cip-input${errors.forgotEmail ? ' err' : ''}`}
                              />
                            </div>
                            {errors.forgotEmail && <p style={{ color:accent, fontSize:'0.75rem', marginTop:'4px' }}>{errors.forgotEmail}</p>}
                          </div>

                          <div className="ink-bar" style={{ margin:'0' }} />

                          {/* Send button */}
                          <button type="button" onClick={handleForgotSubmit} disabled={forgotLoading}
                            className="pulse-btn"
                            style={{
                              width:'100%', padding:'13px 24px',
                              background: forgotLoading ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,18,9,0.1)') : `linear-gradient(135deg,${accent},${saffron})`,
                              border:'none', cursor: forgotLoading ? 'not-allowed' : 'pointer',
                              color: forgotLoading ? 'var(--lg-muted)' : '#fff',
                              fontFamily:'Playfair Display,Georgia,serif',
                              fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.05em',
                              display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                              boxShadow: forgotLoading ? 'none' : `0 8px 28px ${accent}35`,
                            }}>
                            {forgotLoading
                              ? <span>Sending…</span>
                              : <><span>Send Temporary Password</span><ArrowRight style={{ width:'1rem', height:'1rem' }} /></>
                            }
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* ── OTP Step ── */}
                  {!success && !forgotStep && otpStep && (
                    <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
                      {/* Header */}
                      <div style={{ marginBottom:'0.4rem' }}>
                        <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.78rem', letterSpacing:'0.12em', marginBottom:'4px' }}>
                          ईमेल सत्यापन
                        </p>
                        <h2 className="h1f" style={{ color:'var(--lg-ink)', fontSize:'1.5rem', fontWeight:900, margin:0, lineHeight:1.1 }}>
                          Verify Email
                        </h2>
                      </div>

                      {/* Info box */}
                      <div style={{
                        padding:'12px 16px',
                        background: darkMode ? 'rgba(192,57,43,0.08)' : 'rgba(192,57,43,0.05)',
                        border:`1px solid ${accent}30`,
                      }}>
                        <p style={{ color:'var(--lg-muted)', fontSize:'0.85rem', margin:0, lineHeight:1.6 }}>
                          A 6-digit code was sent to{' '}
                          <strong style={{ color:'var(--lg-ink)' }}>{pendingEmail}</strong>.
                          Enter it below within 10 minutes.
                        </p>
                      </div>

                      {/* OTP input */}
                      <div>
                        <label className="h1f" style={{ display:'block', color:'var(--lg-ink)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'6px' }}>
                          Verification Code
                        </label>
                        <div style={{ position:'relative' }}>
                          <KeyRound style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'1rem', height:'1rem', color:'var(--lg-muted)' }} />
                          <input
                            type="text" maxLength={6} value={otp}
                            onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setErrors({}); }}
                            onKeyPress={handleKeyPress}
                            placeholder="• • • • • •"
                            className={`cip-input otp-input-style${errors.otp ? ' err' : ''}`}
                          />
                        </div>
                        {errors.otp && <p style={{ color:accent, fontSize:'0.75rem', marginTop:'4px' }}>{errors.otp}</p>}
                      </div>

                      <div className="ink-bar" style={{ margin:'0' }} />

                      {/* Verify button */}
                      <button type="button" onClick={handleVerifyOtp} disabled={loading}
                        className="pulse-btn"
                        style={{
                          width:'100%', padding:'13px 24px',
                          background: loading ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,18,9,0.1)') : `linear-gradient(135deg,${accent},${saffron})`,
                          border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                          color: loading ? 'var(--lg-muted)' : '#fff',
                          fontFamily:'Playfair Display,Georgia,serif',
                          fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.05em',
                          display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                          boxShadow: loading ? 'none' : `0 8px 28px ${accent}35`,
                        }}>
                        {loading
                          ? <span>Verifying…</span>
                          : <><span>Verify & Create Account</span><ArrowRight style={{ width:'1rem', height:'1rem' }} /></>
                        }
                      </button>

                      {/* Back link */}
                      <p style={{ textAlign:'center', color:'var(--lg-muted)', fontSize:'0.82rem', margin:0 }}>
                        Wrong email?{' '}
                        <button type="button"
                          onClick={() => { setOtpStep(false); setOtp(''); setErrors({}); }}
                          style={{ background:'none', border:'none', cursor:'pointer', color:accent,
                            fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'0.82rem', padding:0 }}>
                          Go back
                        </button>
                      </p>
                    </div>
                  )}

                  {/* ── Normal form (login / register fields) ── */}
                  {!success && !forgotStep && !otpStep && (
                    <>
                      <div style={{ marginBottom:'1.6rem' }}>
                        <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.78rem', letterSpacing:'0.12em', marginBottom:'4px' }}>
                          {isLogin ? 'खाते में प्रवेश करें' : 'नया खाता बनाएं'}
                        </p>
                        <h2 className="h1f" style={{ color:'var(--lg-ink)', fontSize:'1.65rem', fontWeight:900, margin:0, lineHeight:1.1 }}>
                          {isLogin ? 'Sign In' : 'Create Account'}
                        </h2>
                      </div>

                      {/* Tab switcher */}
                      <div style={{
                        display:'flex', border:`1px solid ${ruleLine}`,
                        background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
                        marginBottom:'1.8rem',
                      }}>
                        <button type="button" className={`tab-btn ${isLogin ? 'active' : 'inactive'}`}
                          onClick={() => !isLogin && toggleMode()}>Login</button>
                        <div style={{ width:'1px', background:ruleLine, flexShrink:0 }} />
                        <button type="button" className={`tab-btn ${!isLogin ? 'active' : 'inactive'}`}
                          onClick={() => isLogin && toggleMode()}>Register</button>
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                        {/* Name */}
                        {!isLogin && (
                          <div>
                            <label className="h1f" style={{ display:'block', color:'var(--lg-ink)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'6px' }}>Full Name</label>
                            <div style={{ position:'relative' }}>
                              <User style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'1rem', height:'1rem', color:'var(--lg-muted)' }} />
                              <input type="text" name="name" value={formData.name} onChange={handleChange}
                                onKeyPress={handleKeyPress} placeholder="Enter your full name"
                                className={`cip-input${errors.name ? ' err' : ''}`} />
                            </div>
                            {errors.name && <p style={{ color:accent, fontSize:'0.75rem', marginTop:'4px' }}>{errors.name}</p>}
                          </div>
                        )}

                        {/* Email */}
                        <div>
                          <label className="h1f" style={{ display:'block', color:'var(--lg-ink)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'6px' }}>Email Address</label>
                          <div style={{ position:'relative' }}>
                            <Mail style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'1rem', height:'1rem', color:'var(--lg-muted)' }} />
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                              onKeyPress={handleKeyPress} placeholder="Enter your email"
                              className={`cip-input${errors.email ? ' err' : ''}`} />
                          </div>
                          {errors.email && <p style={{ color:accent, fontSize:'0.75rem', marginTop:'4px' }}>{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                          <label className="h1f" style={{ display:'block', color:'var(--lg-ink)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.05em', marginBottom:'6px' }}>Password</label>
                          <div style={{ position:'relative' }}>
                            <Lock style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'1rem', height:'1rem', color:'var(--lg-muted)' }} />
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                              onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Enter your password"
                              className={`cip-input${errors.password ? ' err' : ''}`}
                              style={{ paddingRight:'42px' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                              style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
                                background:'none', border:'none', cursor:'pointer', color:'var(--lg-muted)', padding:0,
                                display:'flex', alignItems:'center' }}>
                              {showPassword ? <EyeOff style={{ width:'1rem', height:'1rem' }} /> : <Eye style={{ width:'1rem', height:'1rem' }} />}
                            </button>
                          </div>
                          {errors.password && <p style={{ color:accent, fontSize:'0.75rem', marginTop:'4px' }}>{errors.password}</p>}
                        </div>

                        {/* Forgot Password link */}
                        {isLogin && (
                          <div style={{ textAlign:'right', marginTop:'-4px' }}>
                            <button
                              type="button"
                              onClick={() => { setForgotStep(true); setForgotEmail(formData.email); setErrors({}); }}
                              style={{ background:'none', border:'none', cursor:'pointer', color:accent,
                                fontSize:'0.78rem', letterSpacing:'0.03em', padding:0, fontFamily:'inherit' }}
                              onMouseEnter={e => e.target.style.opacity='.75'}
                              onMouseLeave={e => e.target.style.opacity='1'}>
                              Forgot Password?
                            </button>
                          </div>
                        )}

                        {/* Submit error */}
                        {errors.submit && (
                          <div style={{ padding:'10px 14px', border:`1px solid ${accent}50`,
                            background: darkMode ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.06)' }}>
                            <p style={{ color:accent, fontSize:'0.8rem', margin:0 }}>{String(errors.submit)}</p>
                          </div>
                        )}

                        <div className="ink-bar" style={{ margin:'4px 0' }} />

                        {/* CTA */}
                        <button type="button" onClick={handleSubmit} disabled={loading}
                          className="pulse-btn"
                          style={{
                            width:'100%', padding:'13px 24px',
                            background: loading ? (darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(26,18,9,0.1)') : `linear-gradient(135deg,${accent},${saffron})`,
                            border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                            color: loading ? 'var(--lg-muted)' : '#fff',
                            fontFamily:'Playfair Display,Georgia,serif',
                            fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.05em',
                            display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                            transition:'all .3s ease',
                            boxShadow: loading ? 'none' : `0 8px 28px ${accent}35`,
                          }}>
                          {loading
                            ? <span>Please wait…</span>
                            : <><span>{isLogin ? 'Sign In' : 'Send Verification Code'}</span><ArrowRight style={{ width:'1rem', height:'1rem' }} /></>
                          }
                        </button>

                        {/* Toggle */}
                        <p style={{ textAlign:'center', color:'var(--lg-muted)', fontSize:'0.82rem', margin:0 }}>
                          {isLogin ? "Don't have an account? " : 'Already have an account? '}
                          <button type="button" onClick={toggleMode}
                            style={{ background:'none', border:'none', cursor:'pointer', color:accent,
                              fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'0.82rem', padding:0 }}>
                            {isLogin ? 'Register' : 'Sign In'}
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .lg-two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </div>
    </>
  );
};

export default Login;