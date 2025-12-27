import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package, Truck, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./context/CartContext";
import PolicyModal from "./components/PolicyModal";
import PrivacyPolicy from "./policies/PrivacyPolicy";
import Terms from "./policies/Terms";
import Shipping from "./policies/Shipping";
import Refund from "./policies/Refund";
import Contact from "./policies/Contact";

const Cart = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // BACKEND CONNECTION: Using CartContext that manages cart state
  // CartContext should handle API calls to backend
  // Example CartContext methods:
  // - cart: array of cart items from backend (GET /api/cart)
  // - increaseQty: PUT /api/cart/increase/:productId
  // - decreaseQty: PUT /api/cart/decrease/:productId
  // - removeItem: DELETE /api/cart/remove/:productId
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const policy = query.get("policy");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const savings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.qty), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? (darkMode ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-900/20' : 'bg-white/95 backdrop-blur-lg shadow-lg') : 'bg-transparent'}`}>
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-25">
            <a href="/" className="flex items-center space-x-2">
              <div className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5 flex items-center justify-center rounded-2xl transition-colors duration-300`}>
                <img src="/cosmo-logo.png" alt="Logo" className="w-20 h-20 transition-all duration-300" />
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text ${scrolled ? 'text-transparent' : (darkMode ? 'text-white' : 'text-gray-900')}`}>
                Cosmo India Prakashan
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}>
                Home
              </a>
              <a href="/marketplace" className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}>
                Marketplace
              </a>
              <a href="/legacy" className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}>
                Legacy
              </a>
              
              <a href="/cart" className={`p-2 rounded-full transition-all duration-300 relative text-red-500 ${scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'}`}>
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </a>
              
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
              <a href="/marketplace" className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors`}>
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
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden pt-32">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-black via-red-950 to-black' : 'bg-gradient-to-br from-gray-100 via-red-100 to-gray-100'}`}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-black/50' : 'bg-white/30'}`}></div>
        </div>
        
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`absolute ${darkMode ? 'bg-red-600/10' : 'bg-red-600/20'} rounded-full animate-pulse`} style={{
              width: Math.random() * 80 + 40 + 'px',
              height: Math.random() * 80 + 40 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Shopping <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">Cart</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className={`py-12 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/marketplace" className={`inline-flex items-center space-x-2 mb-8 group ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-600'} transition-colors`}>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Continue Shopping</span>
          </a>

          {cart.length === 0 ? (
            <div className={`text-center py-20 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <ShoppingCart className={`w-24 h-24 mx-auto mb-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your cart is empty</h2>
              <p className="mb-8">Add some books to get started!</p>
              <a href="/marketplace" className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-600/30">
                Browse Books
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items - LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className="p-6 flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full sm:w-32 h-40 object-cover rounded-xl" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              by {item.author}
                            </p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              darkMode ? 'bg-red-950/50 text-red-400' : 'bg-red-100 text-red-600'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                              darkMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-950/30' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-red-500">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className={`text-lg line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className={`flex items-center space-x-3 rounded-lg px-2 ${
                            darkMode ? 'bg-black/50 border border-red-900/30' : 'bg-gray-50 border border-gray-200'
                          }`}>
                            <button 
                              onClick={() => decreaseQty(item.id)} 
                              className={`p-2 transition-colors ${
                                darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-600'
                              } ${item.qty === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              disabled={item.qty === 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={`w-12 text-center font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {item.qty}
                            </span>
                            <button 
                              onClick={() => increaseQty(item.id)} 
                              className={`p-2 transition-colors ${
                                darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-600'
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Item Subtotal */}
                        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
                          <div className="flex justify-between items-center">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Item Subtotal:</span>
                            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              ₹{item.price * item.qty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - RIGHT COLUMN */}
              <div className="lg:col-span-1">
                <div className={`rounded-2xl shadow-lg overflow-hidden sticky top-32 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="p-6">
                    <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Order Summary
                    </h2>

                    {/* Summary Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items)
                        </span>
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{subtotal}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                        <span className={`font-semibold ${shipping === 0 ? 'text-green-500' : (darkMode ? 'text-white' : 'text-gray-900')}`}>
                          {shipping === 0 ? 'FREE' : `₹${shipping}`}
                        </span>
                      </div>
                      
                      {savings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span className="font-medium">Total Savings</span>
                          <span className="font-bold">-₹{savings}</span>
                        </div>
                      )}
                      
                      <div className={`pt-4 border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center">
                          <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
                          <span className="text-2xl font-bold text-red-500">₹{total}</span>
                        </div>
                      </div>
                    </div>

                    {/* Free Shipping Banner */}
                    {shipping > 0 && (
                      <div className={`mb-6 p-4 rounded-xl ${darkMode ? 'bg-amber-950/30 border border-amber-900/30' : 'bg-amber-50 border border-amber-200'}`}>
                        <p className={`text-sm ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                          Add ₹{500 - subtotal} more to get FREE shipping! 🎉
                        </p>
                      </div>
                    )}

                    {/* Checkout Button - Navigates to /checkout page */}
                    {/* BACKEND CONNECTION: The /checkout page will handle:
                        - User authentication check
                        - Address selection/addition
                        - Payment gateway integration
                        - Order creation: POST /api/orders/create
                        - Cart clearing after successful order */}
                    <button 
                      disabled={cart.length === 0}
                      onClick={() => navigate("/checkout")}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 mb-4 ${
                        cart.length === 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40'
                      }`}
                    >
                      Proceed to Checkout
                    </button>

                    {/* Trust Badges */}
                    <div className={`space-y-3 pt-6 border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
                      {[
                        { icon: ShieldCheck, text: 'Secure Payment' },
                        { icon: Truck, text: 'Fast Delivery' },
                        { icon: Package, text: 'Easy Returns' }
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gradient-to-b from-black to-red-950' : 'bg-gradient-to-b from-white to-red-100'} border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5 w-34 flex items-center justify-center rounded-2xl transition-colors duration-300`}>
                  <img src="/cosmo-logo.png" alt="Logo" className="w-22 h-22 transition-all duration-300" />
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
                <li>
                  <button
                    onClick={() => navigate("/cart?policy=privacy")}
                    className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/cart?policy=terms")}
                    className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/cart?policy=shipping")}
                    className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                  >
                    Shipping Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/cart?policy=refund")}
                    className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                  >
                    Cancellation & Refunds
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/cart?policy=contact")}
                    className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                  >
                    Contact Us
                  </button>
                </li>
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
      <PolicyModal
  open={!!policy}
  onClose={() => navigate("/marketplace")}
>
  {policy === "privacy" && <PrivacyPolicy />}
  {policy === "terms" && <Terms />}
  {policy === "shipping" && <Shipping />}
  {policy === "refund" && <Refund />}
  {policy === "contact" && <Contact />}
</PolicyModal>

    </div>
  );
};

export default Cart;