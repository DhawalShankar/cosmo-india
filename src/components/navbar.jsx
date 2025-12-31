import { useState, useEffect, useContext } from 'react';
import { Menu, X, ShoppingBag, User as UserIcon, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';
import { useCart } from "../context/CartContext";
import { AuthContext } from '../context/AuthContext';
import Profile from '../pages/Profile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { user, logout } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on home page
  useEffect(() => {
    if (location.pathname === '/') {
      const handleScrollSpy = () => {
        const sections = ['home', 'books', 'about', 'blog', 'contact'];
        const scrollPosition = window.scrollY + 150;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(sectionId);
              return;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScrollSpy);
      handleScrollSpy();
      return () => window.removeEventListener('scroll', handleScrollSpy);
    } else {
      setActiveSection('');
    }
  }, [location.pathname]);

  // Check if a nav item is active
  const isActive = (itemId, path = null) => {
    if (path) {
      return location.pathname === path;
    }
    return location.pathname === '/' && activeSection === itemId;
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNavigation = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setShowUserMenu(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? (darkMode ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-900/20' : 'bg-white/95 backdrop-blur-lg shadow-lg') 
        : 'bg-transparent'
    }`}>
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-25">
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2"
          >
            <div className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-2 h-20 w-25 flex items-center justify-center rounded-2xl transition-colors duration-300`}>
              <img
                src="/cosmo-logo.png"
                alt="Logo"
                className="w-35 transition-all duration-300"
              />
            </div>

            <span className={`text-2xl font-bold bg-linear-to-r from-red-600 to-red-400 bg-clip-text ${
              scrolled ? 'text-transparent' : (darkMode ? 'text-white hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'text-gray-900')
            }`}>
              Cosmo India Prakashan
            </span>
          </button>
           
          <div className="hidden md:flex items-center space-x-8">
            {[
                { name: 'Home', id: 'home' },
                { name: 'Books', id: 'books' },
                { name: 'About', id: 'about' },
                { name: 'Blog', id: 'blog' },
                { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                  isActive(item.id)
                    ? 'text-red-500'
                    : scrolled 
                      ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') 
                      : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')
                }`}
              >
                {item.name}
                {isActive(item.id) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>
                )}
              </button>
            ))}
            
            <button
              onClick={() => handleNavigation('/marketplace')}
              className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                isActive(null, '/marketplace')
                  ? 'text-red-500'
                  : scrolled 
                    ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') 
                    : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')
              }`}
            >
              Marketplace
              {isActive(null, '/marketplace') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => handleNavigation('/legacy')}
              className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                isActive(null, '/legacy')
                  ? 'text-red-500'
                  : scrolled 
                    ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') 
                    : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')
              }`}
            >
              Legacy
              {isActive(null, '/legacy') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => handleNavigation('/exclusive')}
              className={`font-medium italic transition-all duration-300 hover:scale-105 relative ${
                isActive(null, '/legacy')
                  ? 'text-red-500'
                  : scrolled 
                    ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') 
                    : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')
              }`}
            >
              CIP Exclusive
              {isActive(null, '/exclusive') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>
              )}
            </button>

            {user ? (
  <div className="relative">
    <button
      onClick={() => setShowUserMenu(!showUserMenu)}
      className={`flex items-center space-x-2 font-medium transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg ${
        scrolled 
          ? (darkMode ? 'text-gray-300 hover:text-red-500 hover:bg-red-900/20' : 'text-gray-700 hover:text-red-500 hover:bg-red-50') 
          : (darkMode ? 'text-white hover:text-red-400 hover:bg-white/10' : 'text-gray-900 hover:text-red-500 hover:bg-red-50')
      }`}
    > 
    {/* User Menu */}
                <UserIcon className="w-5 h-5" />
                <span>{user.name}</span>
              </button>

              {showUserMenu && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden ${
                    darkMode
                      ? 'bg-black/95 border border-red-900/30'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Profile */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleNavigation('/profile');
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-3 transition-colors ${
                      darkMode
                        ? 'text-gray-300 hover:bg-red-900/20 hover:text-red-400'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </button>

                  {/* Divider */}
                  <div className={`h-px ${darkMode ? 'bg-red-900/30' : 'bg-gray-200'}`} />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-2 px-4 py-3 transition-colors ${
                      darkMode
                        ? 'text-gray-300 hover:bg-red-900/20 hover:text-red-400'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavigation('/login')}
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isActive(null, '/login')
                  ? 'text-red-500 font-semibold'
                  : scrolled 
                    ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') 
                    : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')
              }`}
            >
              Login
            </button>
          )}

            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${
                scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className={`w-5 h-5 ${scrolled ? 'text-gray-300' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <button 
            onClick={() => handleNavigation('/cart')}
            className={`relative m-2 p-2 rounded-full transition-all duration-300 ${
              scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'
            } ${isActive(null, '/cart') ? 'bg-red-900/30' : ''}`}
          >
            <ShoppingBag className={`w-5 h-5 ${
              isActive(null, '/cart')
                ? 'text-red-500'
                : scrolled 
                  ? (darkMode ? 'text-gray-300' : 'text-gray-700') 
                  : (darkMode ? 'text-white' : 'text-gray-900')
            }`} />
            
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-linear-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-red-600/50">
                {cartItemCount}
              </span>
            )}
          </button>
         
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${
                scrolled 
                  ? (darkMode ? 'text-gray-300' : 'text-gray-700') 
                  : (darkMode ? 'text-white' : 'text-gray-900')
              }`} />
            ) : (
              <Menu className={`w-6 h-6 ${
                scrolled 
                  ? (darkMode ? 'text-gray-300' : 'text-gray-700') 
                  : (darkMode ? 'text-white' : 'text-gray-900')
              }`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${
          darkMode ? 'bg-black/95' : 'bg-white/95'
        } border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
          <div className="px-4 pt-2 pb-4 space-y-3">
            {[
                { name: 'Home', id: 'home' },
                { name: 'Books', id: 'books' },
                { name: 'About', id: 'about' },
                { name: 'Blog', id: 'blog' },
                { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-2 ${
                  isActive(item.id)
                    ? 'text-red-500 font-semibold'
                    : darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'
                } transition-colors`}
              >
                {item.name}
              </button>
            ))}
            
            <button
              onClick={() => handleNavigation('/legacy')}
              className={`block w-full text-left py-2 ${
                isActive(null, '/legacy')
                  ? 'text-red-500 font-semibold'
                  : darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'
              } transition-colors`}
            >
              Legacy
            </button>

            <button
              onClick={() => handleNavigation('/marketplace')}
              className={`block w-full text-left py-2 ${
                isActive(null, '/marketplace')
                  ? 'text-red-500 font-semibold'
                  : darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'
              } transition-colors`}
            >
              Marketplace
            </button>

            {/* User Menu - Mobile */}
            {user ? (
              <>
                <div className={`py-2 px-3 rounded-lg flex items-center space-x-2 ${
                  darkMode ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-200'
                }`}>
                  <UserIcon className="w-5 h-5 text-red-500" />
                  <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 w-full text-left py-2 ${
                    darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'
                  } transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className={`block w-full text-left py-2 ${
                  isActive(null, '/login')
                    ? 'text-red-500 font-semibold'
                    : darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'
                } transition-colors`}
              >
                Signup/Login
              </button>
            )}
             
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center space-x-2 py-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {darkMode ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;