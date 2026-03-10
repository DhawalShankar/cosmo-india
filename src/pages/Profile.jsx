import { useState, useContext, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Lock, Edit2, Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user, loading: authLoading, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editData, setEditData] = useState({ name: '', email: '', phone: '', address: '' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  /* ── Colour tokens ── */
  const accent   = '#c0392b';
  const saffron  = '#d4450c';
  const ink      = darkMode ? '#f0e8dc'               : '#1a1209';
  const paper    = darkMode ? '#141210'               : '#fdf6ee';
  const ruleLine = darkMode ? 'rgba(192,57,43,0.28)'  : 'rgba(160,40,20,0.18)';
  const mutedText= darkMode ? 'rgba(240,232,220,0.72)': 'rgba(26,18,9,0.62)';

  useEffect(() => {
    if (!authLoading && !user) { navigate('/login', { replace: true }); return; }
    if (user) setEditData({ name: user.name || '', email: user.email || '', phone: user.phone || '', address: user.address || '' });
  }, [authLoading, user, navigate]);

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user?action=update', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ name: editData.name, phone: editData.phone, address: editData.address }),
      });
      const data = await res.json();
      if (res.ok) { await checkAuth(); setIsEditing(false); showMsg('success', 'Profile updated successfully!'); }
      else showMsg('error', data.message || 'Failed to update profile');
    } catch { showMsg('error', 'An error occurred'); }
    finally { setLoading(false); }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) { showMsg('error', 'Passwords do not match'); return; }
    if (passwordData.newPassword.length < 6) { showMsg('error', 'Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/user?action=change-password', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }),
      });
      const data = await res.json();
      if (res.ok) { setShowPasswordModal(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); showMsg('success', 'Password changed successfully!'); }
      else showMsg('error', data.message || 'Failed to change password');
    } catch { showMsg('error', 'An error occurred'); }
    finally { setLoading(false); }
  };

  /* ── Shared input style ── */
  const inputStyle = (disabled) => ({
    width: '100%', padding: '11px 14px 11px 42px',
    border: `1px solid ${disabled ? ruleLine : accent}`,
    background: disabled
      ? (darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(26,18,9,0.04)')
      : (darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)'),
    color: disabled ? mutedText : ink,
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem',
    outline: 'none', borderRadius: '2px',
    transition: 'border-color .22s, box-shadow .22s',
  });

  const modalInputStyle = {
    width: '100%', padding: '11px 14px',
    border: `1px solid ${ruleLine}`,
    background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
    color: ink, fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem',
    outline: 'none', borderRadius: '2px', transition: 'border-color .22s, box-shadow .22s',
  };

  /* ── Loading state ── */
  if (authLoading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background: paper }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500@display=swap');`}</style>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:'3rem', height:'3rem', border:`2px solid ${accent}`, borderTopColor:'transparent',
          borderRadius:'50%', margin:'0 auto 1rem', animation:'spin 0.8s linear infinite' }} />
        <p style={{ color: mutedText, fontFamily:"'DM Sans',sans-serif" }}>Loading your profile…</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  if (!user) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background: paper }}>
      <p style={{ color: mutedText, fontFamily:"'DM Sans',sans-serif" }}>Redirecting to login…</p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');

        :root {
          --pf-ink:     ${ink};
          --pf-paper:   ${paper};
          --pf-accent:  ${accent};
          --pf-saffron: ${saffron};
          --pf-rule:    ${ruleLine};
          --pf-muted:   ${mutedText};
        }

        .pf * { box-sizing: border-box; }
        .pf {
          background: var(--pf-paper);
          color: var(--pf-ink);
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
          font-size: 15.5px;
          min-height: 100vh;
        }
        .pf .yatra { font-family: 'Yatra One', serif; }
        .pf .h1f   { font-family: 'Playfair Display', Georgia, serif; }

        /* Ink lines */
        @keyframes pf-inkRise {
          0%   { transform:translateY(110%); opacity:0; }
          15%  { opacity:.5; } 85% { opacity:.5; }
          100% { transform:translateY(-110%); opacity:0; }
        }
        .pf .ink-line { animation: pf-inkRise linear infinite; }

        /* Fade up */
        @keyframes pf-fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .pf .fu { animation: pf-fadeUp .75s cubic-bezier(.22,1,.36,1) both; }
        .pf .d1 { animation-delay:.08s; }
        .pf .d2 { animation-delay:.18s; }
        .pf .d3 { animation-delay:.30s; }

        /* Ink bar */
        .pf .ink-bar {
          height: 2px;
          background: linear-gradient(90deg, transparent, ${accent} 30%, ${saffron} 70%, transparent);
        }

        /* Pulse btn */
        @keyframes pf-pulse { 0%{box-shadow:0 0 0 0 rgba(192,57,43,.45)} 70%{box-shadow:0 0 0 14px rgba(192,57,43,0)} 100%{box-shadow:0 0 0 0 rgba(192,57,43,0)} }
        .pf .pulse-btn:hover { animation: pf-pulse 1s ease-out; }

        /* Card */
        .pf .pf-card {
          background: ${darkMode
            ? 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
            : 'linear-gradient(145deg, #ffffff, #fdf6ee)'};
          border: 1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.16)'};
          box-shadow: ${darkMode ? '0 24px 60px rgba(0,0,0,0.5)' : '0 8px 40px rgba(192,57,43,0.09)'};
          position: relative;
        }

        /* Input focus */
        .pf .cip-input:focus {
          border-color: ${accent} !important;
          box-shadow: 0 0 0 3px rgba(192,57,43,.12) !important;
        }

        /* Field row hover */
        .pf .field-row { transition: border-color .2s; }

        /* Lift */
        .pf .lift { transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s; }
        .pf .lift:hover { transform: translateY(-3px); }

        /* Ghost num */
        .pf .ghost-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px var(--pf-rule);
          user-select: none; pointer-events: none; line-height: 1;
        }

        /* Toast slide in */
        @keyframes pf-toast { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
        .pf .toast { animation: pf-toast .35s cubic-bezier(.22,1,.36,1) both; }

        /* Modal backdrop */
        .pf .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 1rem;
        }

        /* Spin */
        @keyframes pf-spin { to { transform: rotate(360deg); } }
        .pf .spinner {
          width: 1.1rem; height: 1.1rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: pf-spin 0.7s linear infinite;
          display: inline-block;
        }
      `}</style>

      <div className="pf">
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
            { left:'90%', h:'38vh', delay:'7s',  dur:'21s' },
          ].map((l,i) => (
            <div key={i} className="ink-line" style={{
              position:'absolute', bottom:0, left:l.left,
              width:'1px', height:l.h,
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

        {/* ── Toast ── */}
        {message.text && (
          <div className="toast" style={{
            position:'fixed', top:'6rem', right:'1.5rem', zIndex:200,
            padding:'12px 20px', display:'flex', alignItems:'center', gap:'10px',
            background: message.type === 'success'
              ? `linear-gradient(135deg, #1a6b3a, #1a8a4a)`
              : `linear-gradient(135deg, ${accent}, ${saffron})`,
            color:'#fff',
            border:`1px solid ${message.type === 'success' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.2)'}`,
            boxShadow:'0 8px 30px rgba(0,0,0,0.3)',
          }}>
            {message.type === 'success'
              ? <CheckCircle style={{ width:'1rem', height:'1rem' }} />
              : <AlertCircle style={{ width:'1rem', height:'1rem' }} />}
            <span className="h1f" style={{ fontSize:'0.9rem', fontWeight:700 }}>{message.text}</span>
          </div>
        )}

        {/* ── Main ── */}
        <div style={{ position:'relative', zIndex:1, maxWidth:'780px', margin:'0 auto', padding:'7rem 1.5rem 4rem' }}>

          {/* Page header */}
          <div className="fu" style={{ marginBottom:'2.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
              <div style={{ width:'2rem', height:'2px', background:accent, flexShrink:0 }} />
              <span className="yatra" style={{ color: darkMode ? '#f0c8a0' : '#8b2010', fontSize:'0.95rem', letterSpacing:'0.06em' }}>
                मेरा खाता
              </span>
            </div>
            <h1 className="h1f" style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:900, lineHeight:1.06, margin:0, color:ink }}>
              My <em style={{ color:accent }}>Profile.</em>
            </h1>
            <p style={{ color:mutedText, fontSize:'0.98rem', marginTop:'8px' }}>Manage your account information</p>
            <div className="ink-bar" style={{ marginTop:'1.2rem', maxWidth:'220px' }} />
          </div>

          {/* ── Profile card ── */}
          <div className="fu d1 pf-card" style={{ padding:'2.5rem', marginBottom:'1.5rem' }}>
            {/* Corner brackets */}
            <div style={{ position:'absolute', top:0, left:0, width:'1.4rem', height:'1.4rem',
              borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
            <div style={{ position:'absolute', bottom:0, right:0, width:'1.4rem', height:'1.4rem',
              borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />
            {/* Top line */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px',
              background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />

            {/* Card header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem' }}>
              <div>
                <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.78rem', letterSpacing:'0.12em', marginBottom:'4px' }}>
                  व्यक्तिगत जानकारी
                </p>
                <h2 className="h1f" style={{ color:ink, fontSize:'1.45rem', fontWeight:900, margin:0 }}>
                  Profile Information
                </h2>
              </div>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="pulse-btn"
                  style={{
                    display:'flex', alignItems:'center', gap:'8px',
                    padding:'9px 18px',
                    background:`linear-gradient(135deg,${accent},${saffron})`,
                    border:'none', cursor:'pointer', color:'#fff',
                    fontFamily:"'Playfair Display',serif", fontWeight:700,
                    fontSize:'0.88rem', letterSpacing:'0.04em',
                    boxShadow:`0 6px 20px ${accent}35`,
                  }}>
                  <Edit2 style={{ width:'0.85rem', height:'0.85rem' }} />
                  Edit
                </button>
              )}
            </div>

            {/* Fields */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>

              {/* Name */}
              {[
                { label:'Full Name',     labelHi:'नाम',      icon:User,  key:'name',    type:'text',  disabled:false },
                { label:'Email Address', labelHi:'ईमेल',     icon:Mail,  key:'email',   type:'email', disabled:true  },
                { label:'Phone',         labelHi:'फ़ोन',      icon:Phone, key:'phone',   type:'tel',   disabled:false },
              ].map(({ label, labelHi, icon: Icon, key, type, disabled }) => (
                <div key={key}>
                  <label className="h1f" style={{ display:'block', color:ink, fontSize:'0.8rem', fontWeight:700,
                    letterSpacing:'0.05em', marginBottom:'6px' }}>
                    {label}
                    {key === 'email' && <span style={{ color:mutedText, fontWeight:400, marginLeft:'8px', fontSize:'0.72rem' }}>— cannot be changed</span>}
                  </label>
                  <div style={{ position:'relative' }}>
                    <Icon style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)',
                      width:'1rem', height:'1rem', color:mutedText }} />
                    <input
                      type={type}
                      value={editData[key]}
                      onChange={e => setEditData({ ...editData, [key]: e.target.value })}
                      disabled={disabled || !isEditing}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="cip-input"
                      style={inputStyle(disabled || !isEditing)}
                    />
                  </div>
                </div>
              ))}

              {/* Address */}
              <div>
                <label className="h1f" style={{ display:'block', color:ink, fontSize:'0.8rem', fontWeight:700,
                  letterSpacing:'0.05em', marginBottom:'6px' }}>Address</label>
                <div style={{ position:'relative' }}>
                  <MapPin style={{ position:'absolute', left:'12px', top:'13px',
                    width:'1rem', height:'1rem', color:mutedText }} />
                  <textarea
                    value={editData.address}
                    onChange={e => setEditData({ ...editData, address: e.target.value })}
                    disabled={!isEditing}
                    rows="3"
                    placeholder="Enter your address"
                    className="cip-input"
                    style={{ ...inputStyle(!isEditing), paddingTop:'11px', resize:'none' }}
                  />
                </div>
              </div>

              {/* Password row */}
              <div>
                <label className="h1f" style={{ display:'block', color:ink, fontSize:'0.8rem', fontWeight:700,
                  letterSpacing:'0.05em', marginBottom:'6px' }}>Password</label>
                <div style={{ position:'relative' }}>
                  <Lock style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)',
                    width:'1rem', height:'1rem', color:mutedText }} />
                  <input type="password" value="••••••••" disabled className="cip-input" style={inputStyle(true)} />
                </div>
                {!isEditing && (
                  <button onClick={() => setShowPasswordModal(true)}
                    style={{ marginTop:'6px', background:'none', border:'none', cursor:'pointer',
                      color:accent, fontFamily:"'Playfair Display',serif", fontWeight:700,
                      fontSize:'0.82rem', padding:0, letterSpacing:'0.03em' }}>
                    Change Password →
                  </button>
                )}
              </div>

              {/* Edit actions */}
              {isEditing && (
                <>
                  <div className="ink-bar" style={{ margin:'4px 0' }} />
                  <div style={{ display:'flex', gap:'12px' }}>
                    <button onClick={handleSave} disabled={loading} className="pulse-btn"
                      style={{
                        flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                        padding:'12px 24px',
                        background: loading ? 'rgba(192,57,43,0.4)' : `linear-gradient(135deg,${accent},${saffron})`,
                        border:'none', cursor: loading ? 'not-allowed' : 'pointer', color:'#fff',
                        fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'0.92rem',
                        letterSpacing:'0.04em', boxShadow:`0 6px 22px ${accent}35`,
                      }}>
                      {loading ? <><span className="spinner" /> Saving…</> : <><Save style={{ width:'0.9rem', height:'0.9rem' }} /> Save Changes</>}
                    </button>
                    <button
                      onClick={() => { setIsEditing(false); setEditData({ name:user.name||'', email:user.email||'', phone:user.phone||'', address:user.address||'' }); }}
                      style={{
                        padding:'12px 20px', background:'transparent', cursor:'pointer',
                        border:`1px solid ${ruleLine}`, color:mutedText,
                        fontFamily:"'DM Sans',sans-serif", fontSize:'0.92rem',
                        transition:'border-color .22s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = accent}
                      onMouseLeave={e => e.currentTarget.style.borderColor = ruleLine}>
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ══ Password Modal ══ */}
        {showPasswordModal && (
          <div className="modal-backdrop">
            <div className="fu pf-card" style={{ width:'100%', maxWidth:'440px', padding:'2.2rem', position:'relative' }}>
              {/* Corner brackets */}
              <div style={{ position:'absolute', top:0, left:0, width:'1.4rem', height:'1.4rem',
                borderTop:`2px solid ${accent}`, borderLeft:`2px solid ${accent}` }} />
              <div style={{ position:'absolute', bottom:0, right:0, width:'1.4rem', height:'1.4rem',
                borderBottom:`2px solid ${accent}`, borderRight:`2px solid ${accent}` }} />
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px',
                background:`linear-gradient(90deg,${accent},${saffron},transparent)` }} />

              {/* Header */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.6rem' }}>
                <div>
                  <p className="yatra" style={{ color:`${accent}cc`, fontSize:'0.75rem', letterSpacing:'0.12em', marginBottom:'3px' }}>
                    सुरक्षा
                  </p>
                  <h3 className="h1f" style={{ color:ink, fontSize:'1.3rem', fontWeight:900, margin:0 }}>
                    Change Password
                  </h3>
                </div>
                <button
                  onClick={() => { setShowPasswordModal(false); setPasswordData({ currentPassword:'', newPassword:'', confirmPassword:'' }); }}
                  style={{ background:'none', border:`1px solid ${ruleLine}`, cursor:'pointer', color:mutedText,
                    width:'2rem', height:'2rem', display:'flex', alignItems:'center', justifyContent:'center',
                    transition:'border-color .2s', padding:0 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = ruleLine}>
                  <X style={{ width:'0.9rem', height:'0.9rem' }} />
                </button>
              </div>

              <div className="ink-bar" style={{ marginBottom:'1.6rem' }} />

              {/* Fields */}
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'1.4rem' }}>
                {[
                  { label:'Current Password', key:'currentPassword' },
                  { label:'New Password',     key:'newPassword'     },
                  { label:'Confirm Password', key:'confirmPassword' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="h1f" style={{ display:'block', color:ink, fontSize:'0.78rem', fontWeight:700,
                      letterSpacing:'0.05em', marginBottom:'5px' }}>{label}</label>
                    <input
                      type="password"
                      value={passwordData[key]}
                      onChange={e => setPasswordData({ ...passwordData, [key]: e.target.value })}
                      className="cip-input"
                      style={modalInputStyle}
                      onFocus={e => { e.target.style.borderColor=accent; e.target.style.boxShadow='0 0 0 3px rgba(192,57,43,.12)'; }}
                      onBlur={e  => { e.target.style.borderColor=ruleLine; e.target.style.boxShadow='none'; }}
                    />
                  </div>
                ))}
              </div>

              <button onClick={handlePasswordChange} disabled={loading} className="pulse-btn"
                style={{
                  width:'100%', padding:'12px 24px',
                  background: loading ? 'rgba(192,57,43,0.4)' : `linear-gradient(135deg,${accent},${saffron})`,
                  border:'none', cursor: loading ? 'not-allowed' : 'pointer', color:'#fff',
                  fontFamily:"'Playfair Display',serif", fontWeight:700,
                  fontSize:'0.92rem', letterSpacing:'0.04em',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                  boxShadow: loading ? 'none' : `0 6px 22px ${accent}35`,
                }}>
                {loading ? <><span className="spinner" /> Changing…</> : 'Change Password'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;