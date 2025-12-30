import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, User, Mail, Phone, MapPin, CreditCard, Lock } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isGuest = params.get("guest") === "1";

  // Guest user details
  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  // Redirect if cart empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/marketplace');
    }
  }, [cart, navigate]);

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!guestDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!guestDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(guestDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!guestDetails.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(guestDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (!guestDetails.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePayment = async () => {
    // Validate form for guest users
    if (isGuest && !validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        amount: total,
        email: isGuest ? guestDetails.email : user?.email,
        name: isGuest ? guestDetails.name : user?.name,
        phone: isGuest ? guestDetails.phone : user?.phone,
        address: isGuest ? guestDetails.address : user?.address,
        product: cart.map(item => `${item.title} (x${item.qty})`).join(', '),
        orderType: isGuest ? 'guest' : 'logged-in'
      };

      // Create Razorpay order
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const { order } = await res.json();

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: 'INR',
        name: 'Cosmo India Prakashan',
        description: 'Book Purchase',
        order_id: order.id,
        handler: async function (response) {
          // Verify payment
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                notes: order.notes
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              clearCart();
              alert('Payment successful! Order confirmation sent to your email.');
              navigate('/marketplace');
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: orderData.name,
          email: orderData.email,
          contact: orderData.phone
        },
        theme: {
          color: '#dc2626',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description);
        setIsProcessing(false);
      });
      rzp.open();
      setIsProcessing(false);
    } catch (err) {
      console.error(err);
      alert('Payment failed. Try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className={`min-h-screen pt-32 pb-12 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Guest Details Form */}
          {isGuest && (
            <div className={`rounded-2xl p-6 h-fit ${
              darkMode ? 'bg-red-950/20 border border-red-900/30' : 'bg-white border border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <User className="w-5 h-5 text-red-500" />
                Your Details
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="text"
                      name="name"
                      value={guestDetails.name}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.name 
                          ? 'border-red-500' 
                          : darkMode 
                            ? 'border-red-900/30 bg-black/50 text-white' 
                            : 'border-gray-300 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={guestDetails.email}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.email 
                          ? 'border-red-500' 
                          : darkMode 
                            ? 'border-red-900/30 bg-black/50 text-white' 
                            : 'border-gray-300 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="tel"
                      name="phone"
                      value={guestDetails.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.phone 
                          ? 'border-red-500' 
                          : darkMode 
                            ? 'border-red-900/30 bg-black/50 text-white' 
                            : 'border-gray-300 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                      placeholder="10-digit phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute left-3 top-3 w-5 h-5 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <textarea
                      name="address"
                      value={guestDetails.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                        errors.address 
                          ? 'border-red-500' 
                          : darkMode 
                            ? 'border-red-900/30 bg-black/50 text-white' 
                            : 'border-gray-300 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none`}
                      placeholder="Enter your complete delivery address"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right Column - Order Summary */}
          <div className={`rounded-2xl p-6 h-fit ${
            darkMode ? 'bg-red-950/20 border border-red-900/30' : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <ShoppingBag className="w-5 h-5 text-red-500" />
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className={`flex gap-3 p-3 rounded-lg ${
                  darkMode ? 'bg-black/30' : 'bg-gray-50'
                }`}>
                  <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Qty: {item.qty}
                    </p>
                    <p className="text-red-500 font-bold text-sm">₹{item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items)
                </span>
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ₹{subtotal}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                <span className={`font-semibold ${
                  shipping === 0 ? 'text-green-500' : (darkMode ? 'text-white' : 'text-gray-900')
                }`}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              
              <div className={`pt-4 border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Total
                  </span>
                  <span className="text-2xl font-bold text-red-500">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-green-600/30'
              }`}
            >
              <Lock className="w-5 h-5" />
              {isProcessing ? 'Processing...' : `Pay ₹${total} Securely`}
            </button>

            {/* Security Badge */}
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              darkMode ? 'bg-green-950/30 border border-green-900/30' : 'bg-green-50 border border-green-200'
            }`}>
              <CreditCard className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;