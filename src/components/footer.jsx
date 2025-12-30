import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Smart navigation - scrolls to section on home page, or navigates to home first
  const scrollToSection = (sectionId) => {
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

  // Handle Books link - goes to marketplace or scrolls to books section
  const handleBooksClick = () => {
    if (location.pathname === '/') {
      scrollToSection('books');
    } else if (location.pathname === '/marketplace') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/marketplace');
    }
  };

  return (
    <footer className={`py-12 ${darkMode ? 'bg-linear-to-b from-black to-red-950' : 'bg-linear-to-b from-white to-red-100'} border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Brand */}
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 mb-4"
            >
              <div className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5 w-40  flex items-center justify-center rounded-2xl transition-colors duration-300`}>
                <img
                  src="/cosmo-logo.png"
                  alt="Logo"
                  className="w-40 transition-all duration-300"
                />
              </div>
              
            </button>
            <p className={  darkMode ? 'text-xl font-semibold text-gray-400' : 'text-xl font-semibold text-gray-600'}>
              Publishing excellence since decades
            </p>
          </div>

          {/* Quick Links - Different for Home vs Other Pages */}
          <div>
            <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {location.pathname === '/' ? (
                // On home page - show section links
                <>
                  {['Books', 'About', 'Blog', 'Contact'].map((link) => (
                    <li key={link}>
                      <button 
                        onClick={() => scrollToSection(link.toLowerCase())}
                        className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </>
              ) : (
                // On other pages - show navigation links
                <>
                  <li>
                    <button 
                      onClick={() => navigate('/')}
                      className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={handleBooksClick}
                      className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                    >
                      Books
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('about')}
                      className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                    >
                      Contact
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Legacy & Policies */}
          <div>
            <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              More
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/legacy')}
                  className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                >
                  Legacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/marketplace?policy=privacy')}
                  className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/marketplace?policy=terms')}
                  className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/marketplace?policy=shipping')}
                  className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/marketplace?policy=refund')}
                  className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                >
                  Cancellation & Refunds
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/marketplace?policy=contact')}
                  className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { 
                  name: 'Facebook',
                  link: 'https://www.facebook.com/profile.php?id=61562467420068',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Twitter',
                  link: 'https://x.com/IndiaCosmo',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Instagram',
                  link: 'https://www.instagram.com/cosmoindiaprakashan/',
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.25a1 1 0 110 2 1 1 0 010-2z"/>
                    </svg>
                  )
                },
                { 
                  name: 'LinkedIn',
                  link: 'https://www.linkedin.com/company/cosmoindiaprakashan/',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                }
              ].map(({ name, link, icon }) => (
                <a 
                  key={name} 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    darkMode ? 'bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white' : 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white'
                  }`}
                  aria-label={name}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'} text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>&copy; 2026 Cosmo India Prakashan. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;