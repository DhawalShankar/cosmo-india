import React, { useState, useEffect, useContext } from 'react';
import { BookOpen, Heart, Star, Calendar, Search, Menu, X, Instagram, Award, Users, Globe, TrendingUp, Pen, BookMarked, Sparkles, Quote, Clock, Building2, Scroll, Flame } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const LegacyAuthors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [activeTimeline, setActiveTimeline] = useState(null);
  const { darkMode } = useContext(DarkModeContext);
  const [scrolled, setScrolled] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 300) {
        setVisibleStats(true);
      }
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

  const timelineEvents = [
    {
      year: '1982',
      title: 'The Beginning',
      description: 'Cosmo India Prakashan was born in an era when publishing was driven by purpose, patience, and intellectual commitment. A small initiative centered around periodicals on astrology and Indian thought.',
      icon: Building2,
      highlight: true
    },
    {
      year: '1990s',
      title: 'The Magazine Era',
      description: 'Reached over 300 regular subscribers across India with monthly periodicals focusing on Indian Cultural, Spiritual and Astrological wisdom. Publications traveled from Kashmir to Kanyakumari, creating a community of knowledge seekers.',
      icon: Scroll,
      highlight: true
    },
    {
      year: '2000s',
      title: 'Evolution & Expansion',
      description: 'Evolved from periodicals to a broader platform for literature, reflection, and cultural dialogue. Began engaging with diverse subjects while maintaining roots in India\'s knowledge traditions.',
      icon: TrendingUp,
      highlight: false
    },
    {
      year: '2010s',
      title: 'Adhyayan & Silent Preservation',
      description: 'Following two decades of publishing work, active operations were consciously paused. The founder withdrew from outward expansion and devoted himself to continuous study, astrological practice, advising, and preservation of intellectual lineage, allowing the work of books and knowledge to endure without public-facing activity.',
      icon: BookOpen,
      highlight: false
    },

    {
      year: '2020s',
      title: 'MSME Recognition',
      description: 'Officially registered under Udyam as an MSME, marking four decades of commitment to meaningful publishing. Now supporting new authors seeking substance over visibility.',
      icon: Award,
      highlight: false
    },
    {
      year: 'Today',
      title: 'Punar-Utthāna — A Living Legacy',
      description: 'Established in 1982 and revived for the present era, the publishing house now carries forward a lineage of study, books, and knowledge stewardship. Guided by Dhawal—an engineer by training, writer by vocation, and practitioner of Vastu with grounding in astrology—the platform combines traditional wisdom with modern systems, ethical publishing practices, and disciplined execution. Publishing here is not a transaction, but a responsibility to ideas, authors, and readers.',
      icon: Flame,
      highlight: true
    }

  ];

  const focusAreas = [
    {
      icon: BookMarked,
      title: 'Literature',
      description: 'Fiction, non-fiction, essays, and reflective works that engage with human experience and cultural realities.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Star,
      title: 'Astrology & Indian Knowledge',
      description: 'Interpretative and contemporary engagements with traditional wisdom and Vedic sciences.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Pen,
      title: 'Thought & Discourse',
      description: 'Long-form writing, opinion, and dialogue that encourage reflection rather than reaction.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Sparkles,
      title: 'Emerging Writers & Ideas',
      description: 'Editorial support and platforms for new authors seeking substance over visibility.',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const stats = [
    { number: '1982', label: 'Founded', icon: Calendar },
    { number: '40+', label: 'Years of Experience', icon: Award },
    { number: '300+', label: 'Peak Subscribers (1990s)', icon: Users },
    { number: 'All India', label: 'Reach & Distribution', icon: Globe }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      
      {/* Hero Section - Legacy of Cosmo India Prakashan */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        darkMode ? 'bg-linear-to-b from-black via-red-950/20 to-black' : 'bg-linear-to-b from-white via-red-50 to-white'
      }`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? 'rgba(220, 38, 38, 0.3)' : 'rgba(220, 38, 38, 0.2)'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-2  w-200 flex items-center justify-center justify-self-center rounded-2xl transition-colors duration-300`}>
              <img
                src="/cosmo-logo.png"
                alt="Logo"
                className="w-60 transition-all duration-300"
              />
            </div>
          
          
          
          <div className={`inline-block px-6 py-3 rounded-full mb-8 ${
            darkMode ? 'bg-red-950/50 border border-red-800' : 'bg-red-100 border border-red-300'
          }`}>
            <span className={`text-xl font-semibold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
              Since 1982 • Four Decades of Purpose-Driven Publishing
            </span>
          </div>

        

          <div className={`max-w-5xl mx-auto p-8 rounded-2xl ${
            darkMode ? 'bg-red-950/30 border border-red-900/50' : 'bg-white border border-red-200 shadow-xl'
          }`}>
            <Quote className="w-12 h-12 text-red-600 mx-auto mb-6" />
            <p className={`text-xl md:text-xl italic leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              "Writing is not merely information, but a medium of understanding — of the self, society, and the world. Publishing is not a transaction, but a responsibility."
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 rounded-full border-2 ${
            darkMode ? 'border-red-600' : 'border-red-500'
          } flex items-start justify-center p-2`}>
            <div className={`w-1 h-3 rounded-full ${
              darkMode ? 'bg-red-600' : 'bg-red-500'
            } animate-pulse`}></div>
          </div>
        </div> */}
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl transition-all duration-500 ${
                  visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${
                  darkMode 
                    ? 'bg-linear-to-br from-red-950/30 to-black border border-red-900/30 hover:border-red-600/50'
                    : 'bg-linear-to-br from-red-50 to-white border border-red-200 hover:border-red-400 hover:shadow-lg'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-10 h-10 text-red-600 mx-auto mb-4" />
                <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-32 ${darkMode ? 'bg-linear-to-b from-black via-red-950/10 to-black' : 'bg-linear-to-b from-gray-50 via-red-50 to-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Clock className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              A Journey Through Time
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              From humble beginnings to a legacy spanning over four decades
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${
              darkMode ? 'bg-linear-to-b from-red-900 via-red-600 to-red-900' : 'bg-linear-to-b from-red-300 via-red-500 to-red-300'
            }`}></div>

            {/* Timeline Events */}
            <div className="space-y-24">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  onMouseEnter={() => setActiveTimeline(index)}
                  onMouseLeave={() => setActiveTimeline(null)}
                >
                  {/* Content */}
                  <div className="w-5/12">
                    <div className={`p-8 rounded-2xl transition-all duration-500 ${
                      activeTimeline === index ? 'scale-105' : 'scale-100'
                    } ${
                      event.highlight
                        ? (darkMode 
                            ? 'bg-linear-to-br from-red-950/50 to-black border-2 border-red-600/50 shadow-2xl shadow-red-600/20'
                            : 'bg-linear-to-br from-red-100 to-white border-2 border-red-400 shadow-2xl shadow-red-300/30')
                        : (darkMode 
                            ? 'bg-red-950/20 border border-red-900/30'
                            : 'bg-white border border-red-200')
                    }`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <event.icon className="w-6 h-6 text-red-600" />
                        <span className={`text-3xl font-bold ${darkMode ? 'text-red-500' : 'text-red-600'}`}>
                          {event.year}
                        </span>
                      </div>
                      <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {event.title}
                      </h3>
                      <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className={`w-6 h-6 rounded-full transition-all duration-300 ${
                      activeTimeline === index
                        ? (darkMode ? 'bg-red-500 ring-8 ring-red-500/30 scale-150' : 'bg-red-600 ring-8 ring-red-300 scale-150')
                        : (event.highlight
                            ? (darkMode ? 'bg-red-600 ring-4 ring-red-600/30' : 'bg-red-500 ring-4 ring-red-200')
                            : (darkMode ? 'bg-red-800' : 'bg-red-400'))
                    }`}></div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className={`py-32 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Sparkles className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Focus Areas
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Creating space for writing that lasts beyond the moment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                  darkMode 
                    ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/30 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20'
                    : 'bg-linear-to-br from-white to-red-50 border border-red-200 hover:border-red-400 hover:shadow-2xl'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${area.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {area.title}
                </h3>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Authors Section */}
      <section className={`py-32 ${darkMode ? 'bg-linear-to-b from-black to-red-950/20' : 'bg-linear-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    ? 'bg-linear-to-br from-red-950/30 to-black border border-red-900/30 hover:border-red-600/50'
                    : 'bg-linear-to-br from-white to-red-50 border border-red-200 hover:border-red-400'
                }`}
              >
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10"></div>
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

          {selectedAuthor && (
            <div className={`rounded-3xl overflow-hidden transition-all duration-500 ${
              darkMode 
                ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/30'
                : 'bg-linear-to-br from-red-50 to-white border border-red-200'
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
                      <Star className="w-6 h-6 text-red-600 shrink-0 mt-1" />
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
                          <BookOpen className="w-5 h-5 text-red-600 shrink-0 ml-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={`mt-16 text-center p-8 rounded-2xl ${
            darkMode 
              ? 'bg-linear-to-r from-red-950/20 via-black to-red-950/20 border border-red-900/30'
              : 'bg-linear-to-r from-red-50 via-white to-red-50 border border-red-200'
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

      {/* Final Statement Section */}
      <section className={`py-32 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-12 rounded-3xl text-center ${
            darkMode 
              ? 'bg-linear-to-br from-red-950/30 via-black to-red-950/30 border-2 border-red-600/50'
              : 'bg-linear-to-br from-white to-red-50 border-2 border-red-400 shadow-2xl'
          }`}>
            <Award className="w-20 h-20 text-red-600 mx-auto mb-8" />
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              MSME Registered Under Udyam
            </h2>
            <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Guided by editors and authors with over 40 years of experience, Cosmo India Prakashan has engaged with subjects ranging from astrology and philosophy to literature, essays, and reflective writing — always emphasizing depth, clarity, and sincerity over trend-driven content.
            </p>
            <div className={`inline-block px-8 py-4 rounded-full ${
              darkMode ? 'bg-red-950/50 border-2 border-red-600' : 'bg-red-100 border-2 border-red-500'
            }`}>
              <p className={`text-lg font-bold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                Where thoughtful writing finds the patience it deserves
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegacyAuthors;