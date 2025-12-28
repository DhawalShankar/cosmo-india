import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package, Truck, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PolicyModal from "../components/PolicyModal";
import PrivacyPolicy from "../policies/PrivacyPolicy";
import Terms from "../policies/Terms";
import Shipping from "../policies/Shipping";
import Refund from "../policies/Refund";
import Contact from "../policies/Contact";

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

    </div>
  );
};

export default Cart;