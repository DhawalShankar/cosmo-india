import { useState, useEffect, useContext } from 'react';
import { Menu, X, ShoppingCart, Star, Heart } from 'lucide-react';
import PrivacyPolicy from "../policies/PrivacyPolicy";
import Terms from "../policies/Terms";
import Shipping from "../policies/Shipping";
import Refund from "../policies/Refund";
import Contact from "../policies/Contact";
import { useNavigate, useLocation } from "react-router-dom";
import { DarkModeContext } from '../context/DarkModeContext';
// import { useCart } from "./context/CartContext";
// const { addToCart } = useCart();
 
const Marketplace = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
const location = useLocation();
const navigate = useNavigate();

const query = new URLSearchParams(location.search);
const policy = query.get("policy");


const closeModal = () => {
  navigate("/marketplace"); // stable base page
};

const policyMap = {
  "/privacy-policy": <PrivacyPolicy />,
  "/terms": <Terms />,
  "/shipping-policy": <Shipping />,
  "/refund-policy": <Refund />,
  "/contact": <Contact />,
};

const policyContent = policyMap[location.pathname] || null;

  const products = [
    {
      id: 1,
      title: 'रत्न रहस्य (Ratna Rahasya)',
      author: 'Rajkumar Ratnapriya',
      category: 'Astrology',
      price: 299,
      originalPrice: 399,
      image: 'Ratn Rahasy.jpeg',
      rating: 4.8,
      // reviews: 156,
      inStock: true,
      bestseller: true,
      description: 'A comprehensive guide in hindi to gemstones and their mystical properties'
    },
    {
      id: 2,
      title: 'सौरमंडल और आप (Saurmandal aur Aap)',
      author: 'Keval Anand Joshi',
      category: 'Astrology',
      price: 249,
      originalPrice: 349,
      image: 'saur.png',
      rating: 4.6,
      // reviews: 89,
      inStock: true,
      bestseller: false,
      description: 'Understanding the solar system through an astrological lens'
    },
    {
      id: 3,
      title: 'हिन्दू दैनिक चर्या (Hindu Dainik Charya)',
      author: 'Rajkumar Ratnapriya',
      category: 'Spirituality',
      price: 99,
      originalPrice: 149,
      image: 'hindu.jpeg',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      bestseller: true,
      description: 'Ancient sutras for spiritual enlightenment'
    },
    
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


    </div>
  );
};

export default Marketplace;