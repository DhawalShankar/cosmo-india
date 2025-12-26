import { useState, useEffect } from 'react';
import { Search, Menu, X, ShoppingCart, Star, Heart, ArrowRight, Filter } from 'lucide-react';

const Marketplace = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      title: 'रत्न रहस्य',
      author: 'Rajkumar Ratnapriya',
      category: 'Astrology',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      bestseller: true,
      description: 'A comprehensive guide to gemstones and their mystical properties'
    },
    {
      id: 2,
      title: 'सौरमंडल और आप',
      author: 'Rajkumar Ratnapriya',
      category: 'Astrology',
      price: 249,
      originalPrice: 349,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      bestseller: false,
      description: 'Understanding the solar system through astrological lens'
    },
    {
      id: 3,
      title: 'सिद्धिसूत्रम',
      author: 'Rajkumar Ratnapriya',
      category: 'Spirituality',
      price: 349,
      originalPrice: 449,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      bestseller: true,
      description: 'Ancient sutras for spiritual enlightenment'
    },
    {
      id: 4,
      title: 'Vedic Wisdom',
      author: 'Ancient Sages',
      category: 'Philosophy',
      price: 399,
      originalPrice: 499,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      rating: 4.7,
      reviews: 178,
      inStock: true,
      bestseller: false,
      description: 'Timeless wisdom from ancient Vedic scriptures'
    },
    {
      id: 5,
      title: 'Jyotish Shastra',
      author: 'Rajkumar Ratnapriya',
      category: 'Astrology',
      price: 449,
      originalPrice: 599,
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
      rating: 4.8,
      reviews: 203,
      inStock: true,
      bestseller: true,
      description: 'The complete science of Vedic astrology'
    },
    {
      id: 6,
      title: 'Mantra Vidya',
      author: 'Spiritual Masters',
      category: 'Spirituality',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
      rating: 4.5,
      reviews: 142,
      inStock: true,
      bestseller: false,
      description: 'The science and practice of sacred mantras'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Books', count: products.length },
    { id: 'Astrology', name: 'Astrology', count: products.filter(p => p.category === 'Astrology').length },
    { id: 'Spirituality', name: 'Spirituality', count: products.filter(p => p.category === 'Spirituality').length },
    { id: 'Philosophy', name: 'Philosophy', count: products.filter(p => p.category === 'Philosophy').length }
  ];

  const filteredProducts = products.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? (darkMode ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-900/20' : 'bg-white/95 backdrop-blur-lg shadow-lg') : 'bg-transparent'}`}>
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-25">
            <a href="/" className="flex items-center space-x-2">
                               <div
          className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5   flex items-center justify-center rounded-2xl transition-colors duration-300`}
        >
          <img
            src="/cosmo-logo.png"
            alt="Logo"
            className="w-20 h-20 transition-all duration-300"
          />
        </div>
              
              <span className={`text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text ${scrolled ? 'text-transparent' : (darkMode ? 'text-white' : 'text-gray-900')}`}>
                Cosmo India Prakashan
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}>
                Home
              </a>
              <a href="/marketplace" className={`font-medium transition-all duration-300 hover:scale-105 text-red-500`}>
                Marketplace
              </a>
              <a href="/legacy" className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}>
                Legacy
              </a>
              
              <button className={`p-2 rounded-full transition-all duration-300 relative ${scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'}`}>
                <ShoppingCart className={`w-5 h-5 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
              
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-all duration-300 ${scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'}`}>
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

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className={`w-6 h-6 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} /> : <Menu className={`w-6 h-6 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-black/95' : 'bg-white/95'} border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
            <div className="px-4 pt-2 pb-4 space-y-3">
              <a href="/" className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors`}>
                Home
              </a>
              <a href="/marketplace" className="block w-full text-left py-2 text-red-500">
                Marketplace
              </a>
              <a href="/legacy" className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors`}>
                Legacy
              </a>
              <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center space-x-2 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-black via-red-950 to-black' : 'bg-gradient-to-br from-gray-100 via-red-100 to-gray-100'}`}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-black/50' : 'bg-white/30'}`}></div>
        </div>
        
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`absolute ${darkMode ? 'bg-red-600/10' : 'bg-red-600/20'} rounded-full animate-pulse`} style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Book <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">Marketplace</span>
          </h1>
          <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
            Discover timeless wisdom and knowledge from our curated collection
          </p>
          <div className={`inline-block px-6 py-3 rounded-full font-semibold ${darkMode ? 'bg-red-950/30 text-red-400 border border-red-900/50' : 'bg-red-100 text-red-600 border border-red-200'}`}>
            {sortedProducts.length} books available
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className={`py-12 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === cat.id 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30' 
                    : darkMode 
                      ? 'bg-red-950/30 text-gray-300 hover:bg-red-950/50 border border-red-900/30' 
                      : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                }`}>
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
            
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-600 font-medium ${
              darkMode ? 'bg-black/50 border-red-900/30 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}>
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map(product => (
              <div key={product.id} className={`group rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                darkMode 
                  ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20'
                  : 'bg-white border border-gray-200 hover:border-red-400 hover:shadow-2xl hover:shadow-red-300/30'
              }`}>
                {/* Product Image */}
                <div className="relative overflow-hidden h-80">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    {product.bestseller && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1">
                        <span>⭐</span>
                        <span>Bestseller</span>
                      </span>
                    )}
                    <button onClick={() => toggleWishlist(product.id)} className={`ml-auto p-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
                      wishlist.includes(product.id) 
                        ? 'bg-red-600 text-white scale-110' 
                        : darkMode 
                          ? 'bg-black/50 text-white hover:bg-red-600' 
                          : 'bg-white/90 text-gray-700 hover:bg-red-600 hover:text-white'
                    }`}>
                      <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : (darkMode ? 'text-gray-600' : 'text-gray-300')}`} />
                    ))}
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Title and Author */}
                  <h3 className={`text-xl font-bold mb-1 group-hover:text-red-500 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.title}
                  </h3>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {product.author}
                  </p>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      darkMode ? 'bg-red-950/50 text-red-400' : 'bg-red-100 text-red-600'
                    }`}>
                      {product.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-red-500">₹{product.price}</span>
                    <span className={`text-lg line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      ₹{product.originalPrice}
                    </span>
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button onClick={() => addToCart(product)} className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gradient-to-b from-black to-red-950' : 'bg-gradient-to-b from-white to-red-100'} border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
             <div
            className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5  w-34 flex items-center justify-center rounded-2xl transition-colors duration-300`}
          >
            <img
              src="/cosmo-logo.png"
              alt="Logo"
              className="w-22 h-22 transition-all duration-300"
            />
          </div>
                
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Cosmo India Prakashan
                </span>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Publishing excellence since decades
              </p>
            </div>

            <div>
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}>Home</a></li>
                <li><a href="/marketplace" className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}>Books</a></li>
                <li><a href="/legacy" className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}>Legacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Contact</h4>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>+91 7388270331</li>
                <li>cosmoindiaprakashan@gmail.com</li>
              </ul>
            </div>

            <div>
              <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61562467420068', icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              ) },
                  { name: 'Instagram', link: 'https://www.instagram.com/cosmoindiaprakashan/', icon:  (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.25a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
              ) },
                  { name: 'LinkedIn', link: 'https://www.linkedin.com/company/cosmoindiaprakashan/', icon:(
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              ) }
                ].map(({ name, link, icon }) => (
                  <a key={name} href={link} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 ${
                    darkMode ? 'bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white' : 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white'
                  }`}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={`pt-8 border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'} text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>&copy; 2026 Cosmo India Prakashan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;