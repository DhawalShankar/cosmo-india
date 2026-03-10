import { useState, useEffect, useContext } from 'react';
import { Menu, X, ShoppingBag, User as UserIcon, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';
import { useCart } from "../context/CartContext";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('');
  const [showUserMenu, setShowUserMenu]     = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { user, logout }          = useContext(AuthContext);
  const navigate  = useNavigate();
  const location  = useLocation();
  const { cart }  = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  const accent  = '#c0392b';
  const saffron = '#d4450c';
  const ink     = darkMode ? '#f0e8dc' : '#1a1209';
  const paper   = darkMode ? '#141210' : '#fdf6ee';

  useEffect(() => {
    const existing = document.querySelector('link[data-cip-fonts]');
    if (existing) return;
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Yatra+One&family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap';
    link.rel  = 'stylesheet';
    link.setAttribute('data-cip-fonts', 'true');
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') { setActiveSection(''); return; }
    const spy = () => {
      const sections = ['home', 'books', 'about', 'contact'];
      const pos = window.scrollY + 150;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id); return;
        }
      }
    };
    window.addEventListener('scroll', spy);
    spy();
    return () => window.removeEventListener('scroll', spy);
  }, [location.pathname]);

  const isActive = (itemId, path = null) => {
    if (path) return location.pathname === path;
    return location.pathname === '/' && activeSection === itemId;
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigation = (path) => { setMobileMenuOpen(false); navigate(path); };

  const handleLogout = async () => {
    setShowUserMenu(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const linkColor = (active) => {
    if (active) return accent;
    if (scrolled) return darkMode ? 'rgba(240,232,220,0.78)' : 'rgba(26,18,9,0.72)';
    return darkMode ? 'rgba(240,232,220,0.85)' : 'rgba(26,18,9,0.8)';
  };

  const navLinks = [
    { label: 'Home',          action: () => scrollToSection('home'),          id: 'home' },
    { label: 'Books',         action: () => scrollToSection('books'),         id: 'books' },
    { label: 'About',         action: () => scrollToSection('about'),         id: 'about' },
    { label: 'Contact',       action: () => scrollToSection('contact'),       id: 'contact' },
    { label: 'Blog',          action: () => handleNavigation('/blog'),        path: '/blog' },
    { label: 'Marketplace',   action: () => handleNavigation('/marketplace'), path: '/marketplace' },
    { label: 'New Releases',  action: () => handleNavigation('/releases'),    path: '/releases' },
    { label: 'Legacy',        action: () => handleNavigation('/legacy'),      path: '/legacy' },
    { label: 'CIP Exclusive', action: () => handleNavigation('/exclusive'),   path: '/exclusive', italic: true },
  ];

  const navBg = scrolled
    ? darkMode ? 'rgba(20,18,16,0.97)' : 'rgba(253,246,238,0.97)'
    : 'transparent';

  const navBorder = scrolled
    ? darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.15)'
    : 'transparent';

  return (
    <>
      <style>{`
        .nb-root {
          font-family: 'DM Sans', 'Segoe UI', system-ui, sans-serif;
        }
        .nb-brand {
          font-family: 'Yatra One', serif;
        }

        /* ── nav link ── */
        .nb-link {
          position: relative;
          font-size: 0.93rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px 0;
          transition: color 0.22s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          height: 1.5px; width: 0;
          background: ${accent};
          transition: width 0.25s ease;
        }
        .nb-link:hover::after,
        .nb-link.active::after { width: 100%; }
        .nb-link:hover { color: ${accent} !important; }

        /* ── icon buttons ── */
        .nb-icon-btn {
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          padding: 7px; border-radius: 4px;
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .nb-icon-btn:hover {
          background: ${darkMode ? 'rgba(192,57,43,0.14)' : 'rgba(192,57,43,0.08)'};
        }

        /* ── cart badge ── */
        .nb-cart-badge {
          position: absolute; top: -4px; right: -4px;
          background: linear-gradient(135deg, ${accent}, ${saffron});
          color: #fff; font-size: 0.62rem; font-weight: 700;
          border-radius: 999px; height: 18px; width: 18px;
          display: flex; align-items: center; justify-content: center;
        }

        /* ── user dropdown ── */
        .nb-user-menu {
          position: absolute; right: 0; top: calc(100% + 8px);
          min-width: 172px; z-index: 999;
          background: ${darkMode ? '#1c1916' : '#ffffff'};
          border: 1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.15)'};
          box-shadow: 0 8px 32px ${darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(26,18,9,0.12)'};
          overflow: hidden;
        }
        .nb-user-menu button {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 11px 16px;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          color: ${darkMode ? 'rgba(240,232,220,0.78)' : 'rgba(26,18,9,0.72)'};
          transition: background 0.18s, color 0.18s;
          text-align: left;
        }
        .nb-user-menu button:hover {
          background: ${darkMode ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.06)'};
          color: ${accent};
        }
        .nb-user-divider {
          height: 1px;
          background: ${darkMode ? 'rgba(192,57,43,0.18)' : 'rgba(192,57,43,0.1)'};
        }

        /* ── mobile menu ── */
        .nb-mobile-menu {
          background: ${darkMode ? '#141210' : '#fdf6ee'};
          border-top: 1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.15)'};
        }
        .nb-mobile-link {
          display: block; width: 100%; text-align: left;
          background: none; border: none; cursor: pointer;
          padding: 11px 0;
          font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
          border-bottom: 1px solid ${darkMode ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.08)'};
          color: ${darkMode ? 'rgba(240,232,220,0.78)' : 'rgba(26,18,9,0.72)'};
          transition: color 0.2s;
        }
        .nb-mobile-link:hover { color: ${accent}; }
        .nb-mobile-link.active { color: ${accent}; font-weight: 600; }
        .nb-mobile-link:last-child { border-bottom: none; }

        /* ── login pill button ── */
        .nb-login-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px;
          border: 1.5px solid ${accent}55;
          background: ${darkMode ? 'rgba(192,57,43,0.08)' : 'rgba(192,57,43,0.06)'};
          color: ${accent};
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem; font-weight: 600;
          cursor: pointer;
          transition: background 0.22s, border-color 0.22s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nb-login-pill:hover {
          background: ${accent};
          color: #fff;
          border-color: ${accent};
        }
      `}</style>

      <nav className="nb-root fixed w-full z-50 transition-all duration-400"
        style={{
          background: navBg,
          borderBottom: `1px solid ${navBorder}`,
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled
            ? darkMode ? '0 4px 24px rgba(0,0,0,0.45)' : '0 4px 24px rgba(26,18,9,0.08)'
            : 'none',
        }}>

        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between gap-4" style={{ height: '88px' }}>

            {/* ── Brand ── */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 shrink-0"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}>

              {/* Logo — bigger */}
              <div style={{
                background: darkMode ? '#ffffff' : 'transparent',
                borderRadius: '10px',
                padding: darkMode ? '4px' : '0',
                display: 'flex', alignItems: 'center',
                transition: 'background 0.3s',
              }}>
                <img
                  src="/cosmo-logo.png"
                  alt="CIP Logo"
                  style={{ height: '72px', width: 'auto', display: 'block' }}
                />
              </div>

              <div className="hidden sm:block">
                <p className="nb-brand font-bold leading-tight"
                  style={{ color: ink, fontSize: '1.45rem' }}>
                  Cosmo India Prakashan
                </p>
                <p style={{
                  fontFamily: 'Yatra One, serif',
                  fontSize: '0.85rem',
                  color: accent,
                  letterSpacing: '0.06em',
                  lineHeight: 1.4,
                }}>
                  कॉस्मो इंडिया प्रकाशन
                </p>
              </div>
            </button>

            {/* ── Desktop nav links — scrollable if needed ── */}
            <div
              className="hidden lg:flex items-center flex-1 justify-center"
              style={{ gap: '1.4rem', minWidth: 0, overflow: 'hidden' }}>
              {navLinks.map((item) => {
                const active = item.path ? isActive(null, item.path) : isActive(item.id);
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`nb-link${active ? ' active' : ''}${item.italic ? ' italic' : ''}`}
                    style={{ color: linkColor(active) }}>
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-1 shrink-0">

              {/* Login / User — desktop */}
              <div className="hidden lg:block relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="nb-icon-btn gap-2"
                      style={{
                        color: linkColor(false),
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        padding: '6px 10px',
                      }}>
                      <UserIcon style={{ width: '1rem', height: '1rem' }} />
                      <span>{user.name}</span>
                    </button>
                    {showUserMenu && (
                      <div className="nb-user-menu">
                        <button onClick={() => { setShowUserMenu(false); handleNavigation('/profile'); }}>
                          <UserIcon style={{ width: '0.9rem', height: '0.9rem' }} />
                          Profile
                        </button>
                        <div className="nb-user-divider" />
                        <button onClick={handleLogout}>
                          <LogOut style={{ width: '0.9rem', height: '0.9rem' }} />
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    className="nb-login-pill"
                    onClick={() => handleNavigation('/login')}>
                    <UserIcon style={{ width: '0.85rem', height: '0.85rem' }} />
                    Login
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-5 mx-1"
                style={{ background: darkMode ? 'rgba(192,57,43,0.25)' : 'rgba(192,57,43,0.18)' }} />

              {/* Dark mode toggle */}
              <button
                className="nb-icon-btn"
                onClick={() => setDarkMode(!darkMode)}
                style={{ color: linkColor(false) }}
                aria-label="Toggle theme">
                {darkMode ? (
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Cart */}
              <button
                className="nb-icon-btn relative"
                onClick={() => handleNavigation('/cart')}
                style={{ color: isActive(null, '/cart') ? accent : linkColor(false) }}>
                <ShoppingBag style={{ width: '1.1rem', height: '1.1rem' }} />
                {cartItemCount > 0 && (
                  <span className="nb-cart-badge">{cartItemCount}</span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="nb-icon-btn lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: linkColor(false) }}
                aria-label="Toggle menu">
                {mobileMenuOpen
                  ? <X style={{ width: '1.2rem', height: '1.2rem' }} />
                  : <Menu style={{ width: '1.2rem', height: '1.2rem' }} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileMenuOpen && (
          <div className="nb-mobile-menu lg:hidden">
            <div style={{ padding: '8px 24px 20px' }}>
              {navLinks.map((item) => {
                const active = item.path ? isActive(null, item.path) : isActive(item.id);
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`nb-mobile-link${active ? ' active' : ''}${item.italic ? ' italic' : ''}`}>
                    {item.label}
                  </button>
                );
              })}

              {/* User — mobile */}
              {user ? (
                <>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 12px', margin: '8px 0',
                    background: darkMode ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.06)',
                    border: `1px solid ${darkMode ? 'rgba(192,57,43,0.22)' : 'rgba(192,57,43,0.14)'}`,
                  }}>
                    <UserIcon style={{ width: '1rem', height: '1rem', color: accent }} />
                    <span style={{ fontWeight: 600, color: ink, fontSize: '0.93rem' }}>{user.name}</span>
                  </div>
                  <button className="nb-mobile-link" onClick={() => handleNavigation('/profile')}>
                    Profile
                  </button>
                  <button className="nb-mobile-link" onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <LogOut style={{ width: '0.9rem', height: '0.9rem' }} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className={`nb-mobile-link${isActive(null, '/login') ? ' active' : ''}`}
                  onClick={() => handleNavigation('/login')}>
                  Login
                </button>
              )}

              {/* Dark mode — mobile */}
              <button
                className="nb-mobile-link"
                onClick={() => setDarkMode(!darkMode)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: 'none' }}>
                {darkMode ? (
                  <>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Light Mode
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;