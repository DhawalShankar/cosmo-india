import { DarkModeContext } from '../context/DarkModeContext';
import { useState, useContext } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  const { darkMode } = useContext(DarkModeContext);
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const benefits = [
    'Exclusive access to premium books',
    'Personalized recommendations',
    'Order tracking & history',
    'Special member discounts',
    'Early access to new releases'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setLoading(true);
    setDebugInfo(null);
    
    try {

      const endpoint = isLogin
  ? '/api/user?action=login'
  : '/api/user?action=register';

const payload = isLogin
  ? { email: formData.email, password: formData.password }
  : formData;

setDebugInfo({ status: 'sending', payload });

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify(payload)
});

      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('✅ Response data:', data);
      } else {
        const text = await response.text();
        console.log('⚠️ Non-JSON response:', text);
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }
      
      setDebugInfo({ status: 'received', data, responseStatus: response.status });
      
    if (!response.ok) {
        setErrors({ submit: data.error || `Server error: ${response.status}` });
        setLoading(false);
        return;
      }

      await checkAuth();
      setSuccess(true);
      setLoading(false);

   
      setTimeout(() => navigate('/login'), 1200);
      
    } catch (error) {
      console.error('❌ Network error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      setDebugInfo({ status: 'error', error: error.message });
      
      let errorMessage = 'Network error. ';
      if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Cannot connect to server. Is it running?';
      } else if (error.message.includes('non-JSON')) {
        errorMessage += 'Server returned invalid response. Check API logs.';
      } else {
        errorMessage += error.message;
      }
      
      setErrors({ submit: errorMessage });
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setErrors({});
    setSuccess(false);
    setDebugInfo(null);
  };

  return (
    <div className={`min-h-screen pt-32 pb-16 transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={` ${darkMode ? 'bg-linear-to-br from-black via-red-950 to-black' : 'bg-linear-to-br from-gray-100 via-red-100 to-gray-100'}`}>
          <div className={` ${darkMode ? 'bg-black/50' : 'bg-white/30'}`}></div>
        </div>
        
        {[...Array(12)].map((_, i) => (
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

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Branding & Benefits */}
          <div className="hidden lg:flex flex-col justify-center space-y-6">
            <div>
              <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Welcome to Your
                <span className="block bg-linear-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                  Literary Journey
                </span>
              </h2>
              
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Join thousands of readers discovering their next favorite book
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'bg-linear-to-r from-red-950/30 to-black/30 border border-red-900/30' 
                      : 'bg-white/50 border border-red-200'
                  }`}
                >
                  <div className="shrink-0">
                    <CheckCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Debug Info Panel */}
            {debugInfo && (
              <div className={`p-4 rounded-xl text-xs font-mono ${darkMode ? 'bg-black/50 border border-red-900/30 text-gray-300' : 'bg-white/50 border border-red-200 text-gray-700'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-bold">Debug Info:</span>
                </div>
                <pre className="overflow-auto max-h-40">{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}

            {/* Decorative Element */}
            <div className="relative">
              <div className={`absolute -inset-1 bg-linear-to-r from-red-600 to-red-400 rounded-2xl blur-xl opacity-20 animate-pulse`}></div>
              <div className={`relative p-5 rounded-2xl ${darkMode ? 'bg-black/50 border border-red-900/30' : 'bg-white/50 border border-red-200'}`}>
                <Sparkles className={`w-7 h-7 mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  "Books are a uniquely portable magic" - Stephen King
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex items-center justify-center">
            <div className={`w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${
              darkMode 
                ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20' 
                : 'bg-white border border-gray-200'
            }`}>
              
              {/* Success State */}
              {success && (
                <div className="p-8 text-center">
                  <div className="mb-6 animate-bounce">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {isLogin ? 'Welcome Back!' : 'Account Created!'}
                  </h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Redirecting you to the marketplace...
                  </p>
                </div>
              )}

              {/* Form */}
              {!success && (
                <div>
                  {/* Header */}
                  <div className="p-8 pb-6">
                    <div className="text-center mb-6">
                      <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                      </h2>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isLogin 
                          ? 'Enter your credentials to continue' 
                          : 'Start your reading journey today'}
                      </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className={`flex rounded-xl p-1 mb-6 ${
                      darkMode ? 'bg-black/50 border border-red-900/30' : 'bg-gray-100'
                    }`}>
                      <button
                        type="button"
                        onClick={() => !isLogin && toggleMode()}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 ${
                          isLogin
                            ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                            : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => isLogin && toggleMode()}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 ${
                          !isLogin
                            ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                            : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Register
                      </button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      
                      {/* Name Field (Register Only) */}
                      {!isLogin && (
                        <div className="space-y-1.5">
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Full Name
                          </label>
                          <div className="relative">
                            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                              darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onKeyPress={handleKeyPress}
                              placeholder="Enter your full name"
                              className={`w-full pl-11 pr-4 py-2.5 rounded-xl transition-all duration-300 outline-none ${
                                darkMode 
                                  ? 'bg-black/50 border border-red-900/30 text-white placeholder-gray-500 focus:border-red-500 focus:bg-black/70' 
                                  : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:bg-white'
                              } ${errors.name ? 'border-red-500' : ''}`}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>
                      )}

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your email"
                            className={`w-full pl-11 pr-4 py-2.5 rounded-xl transition-all duration-300 outline-none ${
                              darkMode 
                                ? 'bg-black/50 border border-red-900/30 text-white placeholder-gray-500 focus:border-red-500 focus:bg-black/70' 
                                : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:bg-white'
                            } ${errors.email ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Password Field */}
                      <div className="space-y-1.5">
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Password
                        </label>
                        <div className="relative">
                          <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your password"
                            className={`w-full pl-11 pr-11 py-2.5 rounded-xl transition-all duration-300 outline-none ${
                              darkMode 
                                ? 'bg-black/50 border border-red-900/30 text-white placeholder-gray-500 focus:border-red-500 focus:bg-black/70' 
                                : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:bg-white'
                            } ${errors.password ? 'border-red-500' : ''}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                              darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                            } transition-colors`}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                      </div>

                      {/* Forgot Password (Login Only) */}
                      {isLogin && (
                        <div className="text-right">
                          <a href="#" className="text-xs text-red-500 hover:text-red-400 transition-colors font-medium">
                            Forgot Password?
                          </a>
                        </div>
                      )}

                      {/* Submit Error */}
                      {errors.submit && (
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-950/30 border border-red-900/50' : 'bg-red-50 border border-red-200'}`}>
                          <p className="text-red-500 text-xs text-center">{String(errors.submit)}</p>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2 ${
                          loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-linear-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40'
                        }`}
                      >
                        <span>{loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                        {!loading && <ArrowRight className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;