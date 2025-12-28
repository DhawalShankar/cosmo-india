import React, { useState, useEffect, useContext } from 'react';
import { BookOpen, Heart, Star, Calendar, Search, Menu, X, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';
const LegacyAuthors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const { darkMode } = useContext(DarkModeContext);
  const [scrolled, setScrolled] = useState(false);
  

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
      image: 'saketi.jpeg',
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
    </div>
  );
};

export default LegacyAuthors;