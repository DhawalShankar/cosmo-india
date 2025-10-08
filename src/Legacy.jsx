import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Star, Calendar, Search, Menu, X, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegacyAuthors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const legacyAuthors = [
    {
      id: 1,
      name: 'Shri Kewal Anand Joshi',
      yearsActive: '1980-2015',
      image: 'keval.jpg',
      bio: 'Renowned author and scholar who contributed extensively to Vedic literature and spiritual studies of Astrology.',
      notableWorks: [
        { title: 'सौरमंडल और आप', year: '' },
      ],
      legacy: 'Pioneer in bringing Eastern philosophy to Western readers',
      status: 'departed'
    },
    {
      id: 2,
      name: 'Shri Shyamlal Saketi',
      yearsActive: '',
      image: 'book.jpeg',
      bio: 'Legendary astrologer and author whose works shaped modern Vedic astrology.',
      notableWorks: [
        { title: 'अपराध ज्योतिष', year: '' },
      ],
      legacy: 'Father of modern Indian astrology',
      status: 'departed'
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? (darkMode ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-900/20' : 'bg-white/95 backdrop-blur-lg shadow-lg') : (darkMode ? 'bg-black/80' : 'bg-white/80')}`}>
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-30 p-10">
            <Link to="/" className="flex items-center space-x-3">

              <div
          className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5 pt-10 pb-10 w-24 h-24 flex items-center justify-center rounded-2xl transition-colors duration-300`}
        >
          <img
            src="/cosmo-logo.png"
            alt="Logo"
            className="w-20 h-20 transition-all duration-300"
          />
        </div>

              <span className={` pt-10 pb-10 text-xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                Cosmo India Prakashan
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-all duration-300 hover:scale-105 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'}`}
              >
                Home
              </Link>
              
              <Link
                to="/legacy"
                className={`font-medium transition-all duration-300 hover:scale-105 ${darkMode ? 'text-red-500' : 'text-red-600'}`}
              >
                Legacy
              </Link>
            
              <button className={`p-2 rounded-full transition-all duration-300 hover:bg-red-900/20`}>
                <Search className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-red-900/20`}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-black/95' : 'bg-white/95'} border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
            <div className="px-4 pt-2 pb-4 space-y-3">
              <Link
                to="/"
                className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link
                to="/legacy"
                className={`block w-full text-left py-2 ${darkMode ? 'text-red-500' : 'text-red-600'} transition-colors font-semibold`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Legacy
              </Link>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center space-x-2 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
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

      {/* Legacy Content Section */}
      <section id="legacy" className={`pt-32 pb-20 ${darkMode ? 'bg-gradient-to-b from-black to-red-950/20' : 'bg-gradient-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-red-600 animate-pulse" />
              <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Legacy Authors
              </h2>
              <Heart className="w-8 h-8 text-red-600 animate-pulse" />
            </div>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Honoring the literary giants who shaped our publishing house and enriched countless lives through their words
            </p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {legacyAuthors.map((author) => (
              <div
                key={author.id}
                onClick={() => setSelectedAuthor(selectedAuthor?.id === author.id ? null : author)}
                className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  selectedAuthor?.id === author.id 
                    ? (darkMode ? 'ring-2 ring-red-600 shadow-2xl shadow-red-600/30' : 'ring-2 ring-red-500 shadow-2xl shadow-red-300/50')
                    : ''
                } ${
                  darkMode 
                    ? 'bg-gradient-to-br from-red-950/30 to-black border border-red-900/30 hover:border-red-600/50'
                    : 'bg-gradient-to-br from-white to-red-50 border border-red-200 hover:border-red-400'
                }`}
              >
                {/* Author Image */}
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                      author.status === 'departed' 
                        ? 'bg-gray-900/80 text-gray-300'
                        : 'bg-amber-900/80 text-amber-300'
                    }`}>
                      {author.status === 'departed' ? 'In Memoriam' : 'Retired'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1">{author.name}</h3>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{author.yearsActive}</span>
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="p-6">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                    {author.bio}
                  </p>
                  <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'}`}>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-red-600" />
                      <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {author.notableWorks.length} Notable Works
                      </span>
                    </div>
                    <button className={`text-sm font-semibold transition-colors ${
                      darkMode ? 'text-red-500 hover:text-red-400' : 'text-red-600 hover:text-red-700'
                    }`}>
                      {selectedAuthor?.id === author.id ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed View */}
          {selectedAuthor && (
            <div className={`rounded-3xl overflow-hidden transition-all duration-500 ${
              darkMode 
                ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30'
                : 'bg-gradient-to-br from-red-50 to-white border border-red-200'
            }`}>
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                <div>
                  <div className="mb-6">
                    <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                      {selectedAuthor.name}
                    </h3>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedAuthor.yearsActive}
                    </p>
                  </div>
                  <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedAuthor.bio}
                  </p>
                  <div className={`p-6 rounded-xl ${
                    darkMode ? 'bg-red-950/30 border border-red-900/30' : 'bg-red-100 border border-red-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <Star className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Literary Legacy
                        </h4>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                          {selectedAuthor.legacy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                    Notable Works
                  </h4>
                  <div className="space-y-4">
                    {selectedAuthor.notableWorks.map((work, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                          darkMode 
                            ? 'bg-black/30 border border-red-900/20 hover:border-red-600/50'
                            : 'bg-white border border-red-200 hover:border-red-400 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {work.title}
                            </h5>
                            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              Published {work.year}
                            </p>
                          </div>
                          <BookOpen className="w-5 h-5 text-red-600 flex-shrink-0 ml-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tribute Message */}
          <div className={`mt-16 text-center p-8 rounded-2xl ${
            darkMode 
              ? 'bg-gradient-to-r from-red-950/20 via-black to-red-950/20 border border-red-900/30'
              : 'bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-200'
          }`}>
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Their Words Live On
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Though they may have left us or retired from active writing, their contributions continue to inspire and enlighten readers around the world. Their legacy remains eternal in the pages they've gifted to humanity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gradient-to-b from-black to-red-950' : 'bg-gradient-to-b from-white to-red-100'} border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-16 h-16 flex items-center justify-center rounded-xl transition-colors duration-300 ${darkMode ? 'bg-white' : 'bg-transparent'}`}>
                  <img
                    src="/cosmo-logo.png"
                    alt="Logo"
                    className="w-14 h-14 transition-all duration-300"
                  />
                </div>
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Cosmo India 
                </span>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Publishing excellence since 1982
              </p>
            </div>

            <div>
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Legacy</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/legacy"
                    className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                  >
                    Legacy Authors
                  </Link>
                </li>
              </ul>
            </div>

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
                    icon: <Instagram className="w-5 h-5" />
                  },
                  { 
                    name: 'LinkedIn',
                    link: 'https://www.linkedin.com/company/cosmo-india-prakashan/',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )
                  }
                ].map(({ name, link, icon }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                      darkMode
                        ? 'bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white'
                        : 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white'
                    }`}
                    aria-label={name}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={`pt-8 border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'} text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>&copy; 2025 Cosmo India Prakashan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegacyAuthors;