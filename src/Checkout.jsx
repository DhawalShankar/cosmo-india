import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Trash2, CreditCard, Package, Shield, Check, Sparkles, TrendingUp, Crown } from 'lucide-react';

const CheckoutPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // ============================================================
  // MOCK DATA - REPLACE WITH REAL DATA FROM NAVIGATION STATE
  // ============================================================
  // In your main app, pass package data via navigation:
  // navigate('/checkout', { state: { package: selectedPackage } })
  // Then use: const location = useLocation(); 
  // const package = location.state?.package;
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Professional',
      subtitle: 'Our most popular choice',
      category: 'Publishing Package',
      price: '₹59,999',
      icon: TrendingUp,
      badge: 'Most Popular',
      features: [
        'Comprehensive Editing',
        'Proofreading (4 rounds)',
        'Premium Interior Design',
        'Custom Cover Design',
        'ISBN & Barcode',
        'Print(200 copies) & Digital Distribution',
        'Basic Marketing Package',
        'Author Digital Cards'
      ],
      quantity: 1
    }
  ]);
  
  const [step, setStep] = useState(1); // 1: Cart, 2: Details, 3: Payment
  const [orderComplete, setOrderComplete] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [publishingInfo, setPublishingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    manuscriptTitle: '',
    genre: '',
    wordCount: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
  };

  const processingFee = 500;
  const tax = Math.round(calculateSubtotal() * 0.18); // 18% GST
  const total = calculateSubtotal() + processingFee + tax;

  const validatePublishingInfo = () => {
    const newErrors = {};
    if (!publishingInfo.fullName) newErrors.fullName = 'Name is required';
    if (!publishingInfo.email) newErrors.email = 'Email is required';
    if (!publishingInfo.phone || publishingInfo.phone.length !== 10) newErrors.phone = 'Valid phone number required';
    if (!publishingInfo.manuscriptTitle) newErrors.manuscriptTitle = 'Manuscript title is required';
    if (!publishingInfo.genre) newErrors.genre = 'Genre is required';
    if (!publishingInfo.wordCount) newErrors.wordCount = 'Word count is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (validatePublishingInfo()) {
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
          publishingInfo: publishingInfo
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
        description: 'Publishing Package Purchase',
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
              publishingInfo: publishingInfo,
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
          name: publishingInfo.fullName,
          email: publishingInfo.email,
          contact: publishingInfo.phone
        },
        notes: {
          manuscriptTitle: publishingInfo.manuscriptTitle,
          genre: publishingInfo.genre
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

  const getBadgeColor = (title) => {
    if (title === 'Essential') return 'from-blue-600 to-blue-700';
    if (title === 'Professional') return 'from-amber-600 to-amber-700';
    if (title === 'Premium') return 'from-purple-600 to-purple-700';
    return 'from-red-600 to-red-700';
  };

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
            Package Purchased!
          </h2>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you! Our publishing team will contact you within 24 hours to begin your journey.
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
            <span>Back to Packages</span>
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
            { num: 2, label: 'Details', icon: Package },
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
                  Selected Package
                </h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No packages selected</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => {
                      const IconComponent = item.icon || Package;
                      return (
                        <div key={item.id} className={`p-6 rounded-2xl border-2 ${
                          darkMode ? 'bg-black/30 border-red-900/30' : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${getBadgeColor(item.title)}`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {item.title}
                                  </h3>
                                  {item.badge && (
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${getBadgeColor(item.title)} text-white`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.subtitle}
                              </p>
                              <div className="grid md:grid-cols-2 gap-2">
                                {item.features.map((feature, idx) => (
                                  <div key={idx} className={`flex items-start text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="text-right ml-6">
                              <p className="text-3xl font-bold text-red-500 mb-2">{item.price}</p>
                              <p className={`text-xs mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>One-time payment</p>
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
                        </div>
                      );
                    })}
                    
                    <button
                      onClick={() => setStep(2)}
                      className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300"
                    >
                      Continue to Details
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
                  Author & Manuscript Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={publishingInfo.fullName}
                      onChange={(e) => setPublishingInfo({...publishingInfo, fullName: e.target.value})}
                      className={inputClass}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={publishingInfo.email}
                        onChange={(e) => setPublishingInfo({...publishingInfo, email: e.target.value})}
                        className={inputClass}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone (10 digits)"
                        value={publishingInfo.phone}
                        onChange={(e) => setPublishingInfo({...publishingInfo, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                        className={inputClass}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Manuscript Title"
                      value={publishingInfo.manuscriptTitle}
                      onChange={(e) => setPublishingInfo({...publishingInfo, manuscriptTitle: e.target.value})}
                      className={inputClass}
                    />
                    {errors.manuscriptTitle && <p className="text-red-500 text-sm mt-1">{errors.manuscriptTitle}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <select
                        value={publishingInfo.genre}
                        onChange={(e) => setPublishingInfo({...publishingInfo, genre: e.target.value})}
                        className={inputClass}
                      >
                        <option value="">Select Genre</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="poetry">Poetry</option>
                        <option value="biography">Biography</option>
                        <option value="self-help">Self-Help</option>
                        <option value="astrology">Astrology</option>
                        <option value="spirituality">Spirituality</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Approximate Word Count"
                        value={publishingInfo.wordCount}
                        onChange={(e) => setPublishingInfo({...publishingInfo, wordCount: e.target.value})}
                        className={inputClass}
                      />
                      {errors.wordCount && <p className="text-red-500 text-sm mt-1">{errors.wordCount}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea
                      placeholder="Additional Notes (Optional - Tell us about your manuscript)"
                      value={publishingInfo.additionalNotes}
                      onChange={(e) => setPublishingInfo({...publishingInfo, additionalNotes: e.target.value})}
                      className={`${inputClass} resize-none`}
                      rows={4}
                    />
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
                      onClick={handleDetailsSubmit}
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
                    <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Package Summary
                    </h3>
                    <div className="space-y-3">
                      {cartItems.map(item => {
                        const IconComponent = item.icon || Package;
                        return (
                          <div key={item.id}>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${getBadgeColor(item.title)}`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className={`flex justify-between font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  <span>{item.title} Package</span>
                                  <span>{item.price}</span>
                                </div>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{item.subtitle}</p>
                              </div>
                            </div>
                            <div className={`text-sm mt-2 pl-14 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {item.features.slice(0, 4).map((f, i) => (
                                <div key={i}>• {f}</div>
                              ))}
                              {item.features.length > 4 && <div>+ {item.features.length - 4} more features</div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Manuscript Details
                    </h3>
                    <div className={`space-y-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <p><span className="font-medium">Title:</span> {publishingInfo.manuscriptTitle}</p>
                      <p><span className="font-medium">Genre:</span> {publishingInfo.genre}</p>
                      <p><span className="font-medium">Word Count:</span> {publishingInfo.wordCount}</p>
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
                      {processingPayment ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
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
                <span>Package Total</span>
                <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
              </div>
              <div className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>Processing Fee</span>
                <span>₹{processingFee}</span>
              </div>
              <div className={`flex justify-between ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className={`pt-3 border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
                <div className="flex justify-between text-xl font-bold">
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>Total</span>
                  <span className="text-red-500">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="w-5 h-5 text-red-500" />
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    What's Included
                  </span>
                </div>
                <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                  {item.features.length > 5 && (
                    <li className="font-semibold">+ {item.features.length - 5} more features</li>
                  )}
                </ul>
              </div>
            ))}

            <div className={`p-4 rounded-xl ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-red-500" />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  100% Secure Payment
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;