import { useState, useContext } from 'react';
import { BookOpen, Newspaper, Code, Download, ExternalLink, Lock } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';

const CIPExclusive = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user, loading } = useContext(AuthContext);

  const handleDownload = (item) => {
    if (!user) {
      alert('Please login to download this content');
      window.location.href = '/login';
      return;
    }
    // Proceed with download
    window.location.href = item.link;
  };

  const handleExternalLink = (link) => {
    if (!user) {
      alert('Please login to access Vartalang');
      window.location.href = '/login';
      return;
    }
    window.open(link, '_blank');
  };

  if (loading) {
    return (
      <div className={`min-h-screen pt-32 flex items-center justify-center ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loading...</p>
        </div>
      </div>
    );
  }

  const exclusiveItems = [
    {
      id: 1,
      type: 'E-Books',
      icon: BookOpen,
      title: 'Premium E-Book Collection',
      description: 'Access our exclusive collection of digital books',
      items: [
        { name: 'Ratna Rahasya V1', size: '12 MB', link: '#' },
        { name: 'Hindu Dainik Charya', size: '8 MB', link: '#' },
        { name: 'Calendar 2026', size: '15 MB', link: '#' }
      ]
    },
    {
      id: 2,
      type: 'Magazines',
      icon: Newspaper,
      title: 'Digital Magazine Archive',
      description: 'Latest issues of educational magazines',
      items: [
        { name: 'CIP Jan Edition', size: '25 MB', link: '#' },
        { name: 'Celestial 2025 Edition', size: '18 MB', link: '#' },
        { name: 'Literacy and Life', size: '22 MB', link: '#' }
      ]
    },
    {
      id: 3,
      type: 'Software',
      icon: Code,
      title: 'Vartalang Software',
      description: 'Our exclusive language learning platform',
      link: 'https://vartalang.in',
      isExternal: true
    }
  ];

  return (
    <div className={`min-h-screen pt-32 pb-16 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            CIP <span className="bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Exclusive</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Premium digital content for our valued members
          </p>
          {!user && (
            <div className={`mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-xl ${
              darkMode ? 'bg-red-950/30 border border-red-900/30' : 'bg-red-50 border border-red-200'
            }`}>
              <Lock className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
              <span className={`text-sm font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                Login required to access content - Under Development
              </span>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exclusiveItems.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className={`rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {/* Icon & Title */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-linear-to-br from-red-600 to-red-700 rounded-xl">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {section.type}
                    </span>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {section.title}
                    </h3>
                  </div>
                </div>

                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {section.description}
                </p>

                {/* External Link (for Vartalang) */}
                {section.isExternal ? (
                  <button
                    onClick={() => handleExternalLink(section.link)}
                    className={`flex items-center justify-center space-x-2 w-full py-3 rounded-xl transition-all shadow-lg relative ${
                      user
                        ? 'bg-linear-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                        : 'bg-gray-400 text-white cursor-not-allowed'
                    }`}
                  >
                    {!user && <Lock className="w-4 h-4 absolute left-4" />}
                    <span className="font-semibold">Visit Vartalang</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                ) : (
                  /* Download Items */
                  <div className="space-y-3">
                    {section.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDownload(item)}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all w-full text-left relative ${
                          user
                            ? darkMode
                              ? 'bg-black/50 border border-red-900/30 hover:border-red-500 hover:scale-105'
                              : 'bg-gray-50 border border-gray-200 hover:border-red-500 hover:scale-105'
                            : darkMode
                              ? 'bg-black/30 border border-red-900/20 opacity-60 cursor-not-allowed'
                              : 'bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        {!user && <Lock className={`w-4 h-4 absolute left-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />}
                        <div className={`flex-1 ${!user ? 'ml-6' : ''}`}>
                          <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.size}</p>
                        </div>
                        <Download className={`w-5 h-5 ${user ? (darkMode ? 'text-red-400' : 'text-red-600') : 'text-gray-500'}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className={`mt-12 p-6 rounded-2xl text-center ${
          darkMode
            ? 'bg-linear-to-r from-red-950/30 to-black/30 border border-red-900/30'
            : 'bg-linear-to-r from-red-50 to-orange-50 border border-red-200'
        }`}>
          {user ? (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ✅ Welcome <span className="font-semibold text-red-500">{user.name}</span>! You have full access to all exclusive content.
            </p>
          ) : (
            <div>
              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                🔒 All content is exclusively for registered CIP members.
              </p>
              <a
                href="/login"
                className="inline-block px-6 py-2 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all"
              >
                Login to Access
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CIPExclusive;