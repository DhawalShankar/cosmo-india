import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, CreditCard, Truck, Shield, Check } from 'lucide-react';

const CheckoutPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // ============================================================
  // MOCK DATA - REPLACE WITH REAL DATA FROM NAVIGATION STATE
  // ============================================================
  // In your main app, pass book data via navigation:
  // navigate('/checkout', { state: { book: selectedBook } })
  // Then use: const location = useLocation(); 
  // const book = location.state?.book;
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'रत्न रहस्य - 1',
      author: 'Shri Rajkumar Ratnapriya',
      category: 'Astrology',
      price: '₹199',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      quantity: 1
    }
  ]);
  
  const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment
  const [orderComplete, setOrderComplete] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return sum + (price * item.quantity);
    }, 0);
  };

  const shippingCost = 50;
  const tax = Math.round(calculateSubtotal() * 0.18); // 18% GST
  const total = calculateSubtotal() + shippingCost + tax;

  const validateShipping = () => {
    const newErrors = {};
    if (!shippingInfo.fullName) newErrors.fullName = 'Name is required';
    if (!shippingInfo.email) newErrors.email = 'Email is required';
    if (!shippingInfo.phone || shippingInfo.phone.length !== 10) newErrors.phone = 'Valid phone number required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.state) newErrors.state = 'State is required';
    if (!shippingInfo.pincode || shippingInfo.pincode.length !== 6) newErrors.pincode = 'Valid pincode required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(3);
    }
  };

  // ============================================================
  // RAZORPAY PAYMENT INTEGRATION
  // ============================================================
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    try {
      // --------------------------------------------------------
      // STEP 1: Create order on your backend
      // --------------------------------------------------------
      // UNCOMMENT AND CONFIGURE THIS FOR REAL IMPLEMENTATION:
      /*
      const orderResponse = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          cartItems: cartItems,
          shippingInfo: shippingInfo
        })
      });
      
      const orderData = await orderResponse.json();
      
      if (!orderResponse.ok) {
        throw new Error(orderData.message || 'Failed to create order');
      }
      */

      // MOCK ORDER DATA - REPLACE WITH REAL orderData FROM BACKEND
      const orderData = {
        id: 'order_mock_' + Date.now(),
        amount: total * 100, // Razorpay amount in paise
        currency: 'INR'
      };

      // --------------------------------------------------------
      // STEP 2: Initialize Razorpay
      // --------------------------------------------------------
      // IMPORTANT: Add Razorpay script to your index.html:
      // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      
      const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // REPLACE: Get from Razorpay Dashboard
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Cosmo India Prakashan',
        description: 'Book Purchase',
        image: '/cosmo-logo.png', // Your logo
        order_id: orderData.id,
        handler: async function (response) {
          // --------------------------------------------------------
          // STEP 3: Verify payment on backend
          // --------------------------------------------------------
          // UNCOMMENT AND CONFIGURE THIS FOR REAL IMPLEMENTATION:
          /*
          const verifyResponse = await fetch('http://localhost:5000/api/orders/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              shippingInfo: shippingInfo,
              cartItems: cartItems
            })
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok) {
            setOrderComplete(true);
            setProcessingPayment(false);
            // Optionally: Clear cart, send confirmation email, etc.
          } else {
            alert('Payment verification failed: ' + verifyData.message);
            setProcessingPayment(false);
          }
          */

          // MOCK SUCCESS - REPLACE WITH REAL VERIFICATION
          console.log('Payment Success:', response);
          setOrderComplete(true);
          setProcessingPayment(false);
        },
        prefill: {
          name: shippingInfo.fullName,
          email: shippingInfo.email,
          contact: shippingInfo.phone
        },
        notes: {
          address: shippingInfo.address
        },
        theme: {
          color: '#DC2626' // Red color matching your theme
        },
        modal: {
          ondismiss: function() {
            setProcessingPayment(false);
            alert('Payment cancelled');
          }
        }
      };

      // MOCK RAZORPAY - REPLACE WITH REAL RAZORPAY INSTANCE
      // const rzp = new window.Razorpay(options);
      // rzp.open();
      
      // MOCK: Simulate payment success after 2 seconds
      setTimeout(() => {
        setOrderComplete(true);
        setProcessingPayment(false);
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
      setProcessingPayment(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
    darkMode
      ? 'bg-black/50 border-red-900/30 text-white placeholder-gray-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  if (orderComplete) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'} flex items-center justify-center p-4`}>
        <div className={`max-w-md w-full text-center p-8 rounded-3xl ${
          darkMode 
            ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30'
            : 'bg-white border border-red-200 shadow-xl'
        }`}>
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Order Confirmed!
          </h2>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you for your purchase. We'll send a confirmation email shortly.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'} py-12 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-600'} transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </button>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-red-950/30 text-red-500' : 'bg-red-100 text-red-600'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[
            { num: 1, label: 'Cart', icon: ShoppingCart },
            { num: 2, label: 'Shipping', icon: Truck },
            { num: 3, label: 'Payment', icon: CreditCard }
          ].map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  step >= s.num
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                    : darkMode
                    ? 'bg-red-950/30 text-gray-500'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <span className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {s.label}
                </span>
              </div>
              {idx < 2 && (
                <div className={`w-24 h-1 mx-4 mt-0 ${
                  step > s.num
                    ? 'bg-gradient-to-r from-red-600 to-red-700'
                    : darkMode
                    ? 'bg-red-950/30'
                    : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className={`rounded-3xl p-6 ${
                darkMode
                  ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30'
                  : 'bg-white border border-red-200 shadow-xl'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Shopping Cart
                </h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className={`flex gap-4 p-4 rounded-xl ${
                        darkMode ? 'bg-black/30' : 'bg-gray-50'
                      }`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.title}
                          </h3>
                          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            by {item.author}
                          </p>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className={`p-1 rounded ${darkMode ? 'bg-red-950/30 text-red-500' : 'bg-red-100 text-red-600'}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={darkMode ? 'text-white' : 'text-gray-900'}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className={`p-1 rounded ${darkMode ? 'bg-red-950/30 text-red-500' : 'bg-red-100 text-red-600'}`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-red-500 mb-2">{item.price}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              darkMode
                                ? 'hover:bg-red-950/30 text-red-500'
                                : 'hover:bg-red-100 text-red-600'
                            }`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => setStep(2)}
                      className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300"
                    >
                      Proceed to Shipping
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className={`rounded-3xl p-6 ${
                darkMode
                  ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30'
                  : 'bg-white border border-red-200 shadow-xl'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Shipping Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                      className={inputClass}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className={inputClass}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone (10 digits)"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                        className={inputClass}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Complete Address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className={`${inputClass} resize-none`}
                      rows={3}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className={inputClass}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="State"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className={inputClass}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                        className={inputClass}
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`flex-1 px-8 py-4 rounded-xl font-semibold transition-all ${
                        darkMode
                          ? 'bg-red-950/30 text-red-500 hover:bg-red-950/50'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      Back to Cart
                    </button>
                    <button
                      type="button"
                      onClick={handleShippingSubmit}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={`rounded-3xl p-6 ${
                darkMode
                  ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30'
                  : 'bg-white border border-red-200 shadow-xl'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Payment
                </h2>
                
                <div className="space-y-6">
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      {cartItems.map(item => (
                        <div key={item.id} className={`flex justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>{item.title} x{item.quantity}</span>
                          <span>₹{parseInt(item.price.replace('₹', '')) * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`flex items-center space-x-2 p-4 rounded-xl ${
                    darkMode ? 'bg-green-950/20 border border-green-900/30' : 'bg-green-50 border border-green-200'
                  }`}>
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Secure payment powered by Razorpay
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={processingPayment}
                      className={`flex-1 px-8 py-4 rounded-xl font-semibold transition-all ${
                        darkMode
                          ? 'bg-red-950/30 text-red-500 hover:bg-red-950/50 disabled:opacity-50'
                          : 'bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePaymentSubmit}
                      disabled={processingPayment}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingPayment ? 'Processing...' : 'Pay ₹' + total}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className={`lg:col-span-1 h-fit rounded-3xl p-6 sticky top-4 ${
            darkMode
              ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30'
              : 'bg-white border border-red-200 shadow-xl'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Order Summary
            </h3>
            
            <div className="space-y-3 mb-4">
              <div className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>Subtotal</span>
                <span>₹{calculateSubtotal()}</span>
              </div>
              <div className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>Shipping</span>
                <span>₹{shippingCost}</span>
              </div>
              <div className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>GST (18%)</span>
                <span>₹{tax}</span>
              </div>
              <div className={`pt-3 border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
                <div className="flex justify-between text-xl font-bold">
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                  <span className="text-red-500">₹{total}</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-5 h-5 text-red-500" />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Free Returns
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                30-day return policy on all books
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;