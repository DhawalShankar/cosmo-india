import { useState, useContext, useEffect } from 'react';
import { BookOpen, Calendar, Download, Heart, Share2, Star, ShoppingCart, Lock } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Release = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  // Load Yatra One font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Yatra+One&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const book = {
    title: 'Sacred Dwelling',
    subtitle: 'The Eastern Secret to Prosperous Homes and Happy Lives',
    author: 'Mr. Dhawal Shukla',
    coverImage: 'sd.png',
    releaseDate: 'January 23, 2026',
    price: '₹299',
    pages: 130,
    isbn: '978-81-943640-6-1',
    language: 'English',
    rating: 4.8,
    reviews: 127,
    description: 'Sacred Dwelling explores the timeless Eastern understanding that a home is not merely a structure, but a living field of energy that shapes thought, emotion, and destiny. Drawing from traditional Vāstu and astrological philosophy, this book presents a thoughtful and accessible guide to aligning one’s living space with natural order. Rather than superstition or rigid rules, it offers principles of balance, direction, and proportion that can be adapted to modern homes and real-world constraints. Written with clarity and restraint, Sacred Dwelling encourages readers to see their homes as partners in their inner and outer well-being — places that support peace, prosperity, and purposeful living.This is not a book of prediction, but of understanding. Not a manual of fear, but a guide to awareness. It invites the reader to reflect, adjust, and dwell with intention.',
    highlights: [
      'A clear, modern interpretation of Vāstu wisdom rooted in Eastern tradition',
      'Explains how space, direction, and energy influence daily life',
      'Bridges ancient principles with contemporary homes and lifestyles'
    ],
    authorBio: 'Dhawal Shukla is an author, engineer, and seeker of ancient wisdom. With a deep passion for Sanatan philosophy and its practical application in modern life, he brings a fresh voice that bridges traditional Eastern understanding with today’s lived experience. In Sacred Dwelling, Dhawal explores how our living spaces — their orientation, harmony, and subtle energies — influence our peace, prosperity, and well-being. Drawing on classical Vāstu and astrological insights, he presents age-tested principles in clear, accessible language, making timeless knowledge relevant for contemporary readers. Dhawal lives in India and is dedicated to helping individuals create homes that are not merely structures, but sacred spaces that support happy and purposeful lives.',
    downloadLink: 'https://drive.google.com/uc?export=download&id=XXXXX'
  };

 const handlePurchase = () => {
  if (!user) {
    setMessage('Releasing on Basant Panchami!');
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // 3 seconds

    return;
  }

  setMessage('Releasing on Basant Panchami');
  setShowMessage(true);

  setTimeout(() => {
    setShowMessage(false);
    Navigate('/marketplace');
  }, 2000);
};



  const handleDownload = () => {
    if (!user) {
      alert('Please login to download');
      window.location.href = '/login';
      return;
    }
    window.location.href = book.downloadLink;
  };

  return (
    <div className={`min-h-screen pt-20 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      
      {/* Hero Section with 3D Book */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-linear-to-b from-red-950/20 via-black to-black' : 'bg-linear-to-b from-red-50 via-white to-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          {/* 3D Book Display */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-linear-to-br from-red-600 via-orange-500 to-red-600 blur-3xl opacity-30 animate-pulse"></div>
              
              {/* Book Image - Ready for PNG with transparent background */}
              <div className="relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-80 md:w-96 h-auto mx-auto transform hover:scale-105 transition-all duration-500"
                  style={{
                    filter: darkMode ? 'drop-shadow(0 25px 50px rgba(220, 38, 38, 0.4))' : 'drop-shadow(0 25px 50px rgba(220, 38, 38, 0.3))',
                  }}
                />
              </div>

              {/* New Release Badge */}
              <div className={`absolute -top-4 -right-4 px-6 py-3 rounded-full font-bold text-sm shadow-lg animate-bounce ${
                darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'
              }`}>
                NEW RELEASE
              </div>
            </div>

            {/* Book Title with Yatra One Font */}
            <div className="mt-16 mb-8">
              <h1 
                className={`text-7xl md:text-8xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Yatra One', cursive" }}
              >
                {book.title}
              </h1>
              <p 
                className={`text-2xl md:text-3xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                style={{ fontFamily: "'Yatra One', cursive", fontWeight: 400 }}
              >
                {book.subtitle}
              </p>
            </div>

            {/* Author & Stats */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <BookOpen className={`w-5 h-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  by <span className="font-semibold">{book.author}</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                {/* <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {book.rating}
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  ({book.reviews} reviews)
                </span> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 mb-8">
             {showMessage ? (
  <div className="px-8 py-4 rounded-xl text-lg font-semibold text-red-600 text-center">
    {message}
  </div>
) : (
  <button
    onClick={handlePurchase}
    className={`group relative px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
      user
        ? 'bg-linear-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105'
        : 'bg-gray-400 text-white cursor-not-allowed'
    }`}
  >
    {!user && (
      <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />
    )}
    <div className="flex items-center space-x-2">
      <ShoppingCart className="w-5 h-5" />
      <span>Buy Now - {book.price}</span>
    </div>
  </button>
)}

              {/* <button
                onClick={handleDownload}
                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                  user
                    ? darkMode
                      ? 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:scale-105'
                      : 'bg-gray-100 text-gray-900 border-2 border-gray-300 hover:bg-gray-200 hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {!user && <Lock className="w-5 h-5" />}
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </div>
              </button> */}

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 ${
                  darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>

              <button
                className={`p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 ${
                  darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Share2 className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className={`px-6 py-3 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                <Calendar className={`w-4 h-4 inline mr-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {book.releaseDate}
                </span>
              </div>
              <div className={`px-6 py-3 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {book.pages} Pages
                </span>
              </div>
              <div className={`px-6 py-3 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {book.language}
                </span>
              </div>
              <div className={`px-6 py-3 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ISBN: {book.isbn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Details Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* About the Book */}
        <div className={`mb-12 p-8 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About the Book
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {book.description}
          </p>
          
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Key Highlights
          </h3>
          <ul className="space-y-3">
            {book.highlights.map((highlight, idx) => (
              <li key={idx} className={`flex items-start space-x-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="text-red-600 text-xl">✦</span>
                <span className="text-lg">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* About the Author */}
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About the Author
          </h2>
          <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {book.authorBio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Release;