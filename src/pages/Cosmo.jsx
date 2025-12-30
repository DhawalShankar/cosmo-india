import { useState, useEffect, useContext } from 'react';
import { Search, Menu, X, ChevronRight, BookOpen, Users, Award, Mail, MapPin, Phone, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Posts from "./Posts";
import { DarkModeContext } from '../context/DarkModeContext';
const CosmoPublicationSite = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  

  const featuredBooks = [
    {
      id: 1,
      title: 'रत्न रहस्य (Ratna Rahasya)',
      author: 'Hindi',
      category: 'academic',
      price: '₹299',
      image: 'Ratn Rahasy.jpeg',
      badge: 'Bestseller',
      rating: 5
    },
    {
      id: 2,
      title: 'सौरमंडल और आप (Saurmandal aur Aap)',
      author: 'Hindi',
      category: 'academic',
      price: '₹249',
      image: 'saur.png',
      badge: 'Most Loved',
      rating: 5
    },
    {
      id: 3,
      title: 'हिन्दू दैनिक चर्या (Hindu Dainik Charya)',
      author: 'Hindi',
      category: 'academic',
      price: '₹99',
      image: 'hindu.jpeg',
      badge: 'Reader\'s choice',
      rating: 5
    },
  ];

  const filteredBooks = activeCategory === 'all' 
    ? featuredBooks 
    : featuredBooks.filter(book => book.category === activeCategory);

  const authors = [
    { name: '', books: '', image: '' },
    { name: '', books: '', image: '' },
    { name: '', books: '', image: '' },
  ];
   const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.email) tempErrors.email = "Email is required";
    if (!form.message) tempErrors.message = "Message is required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const text = `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/7388270331?text=${encodedText}`, "_blank");

    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  const inputClass = `w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all`;

 
  return (
<div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
     {/* Hero Section */}
      <section id='home' className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-linear-to-br from-black via-red-950 to-black' : 'bg-linear-to-br from-gray-100 via-red-100 to-gray-100'}`}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-black/50' : 'bg-white/30'}`}></div>
        </div>
        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${darkMode ? 'bg-red-600/10' : 'bg-red-600/20'} rounded-full animate-pulse`}
              style={{
                width: Math.random() * 100 + 50 + 'px',
                height: Math.random() * 100 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 10 + 10 + 's'
              }}
            ></div>
          ))}
        </div>

        {/* Animated red lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-1 h-96 bg-linear-to-b from-transparent via-red-600 to-transparent animate-float-vertical" style={{left: '20%', animationDelay: '0s'}}></div>
          <div className="absolute w-1 h-64 bg-linear-to-b from-transparent via-red-600 to-transparent animate-float-vertical" style={{left: '50%', animationDelay: '2s'}}></div>
          <div className="absolute w-1 h-80 bg-linear-to-b from-transparent via-red-600 to-transparent animate-float-vertical" style={{left: '80%', animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className={`text-4xl md:text-7xl mt-27 font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
              Discover Stories That
              <span className="block bg-linear-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                Ignite Imagination
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              India's premier publishing house bringing you the finest literature, academic excellence, and inspiring narratives
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/discuss")}
                className="group px-8 py-4 bg-linear-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 flex items-center space-x-2"
              >
                <span>Let's Discuss your Book!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate("/marketplace")}
                className={`px-8 py-4 border-2 border-red-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${darkMode ? 'text-white hover:bg-red-600' : 'text-red-600 hover:bg-red-600 hover:text-white'}`}>
                What's New!
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-red-500 rotate-90" />
        </div>
      </section>

   
      {/* Our Values Section */}
<section className={`py-16 ${darkMode ? 'bg-linear-to-b from-black to-red-950/20' : 'bg-linear-to-b from-gray-50 to-red-50'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        Why Choose Us
      </h2>
      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Committed to excellence in every page we publish
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        { 
          icon: BookOpen, 
          title: 'Quality Content', 
          description: 'Carefully curated and expertly edited publications'
        },
        { 
          icon: Users, 
          title: 'Author Support', 
          description: 'Dedicated guidance from manuscript to market'
        },
        { 
          icon: Award, 
          title: 'Recognition', 
          description: 'Highly recognized publications and authors'
        },
        { 
          icon: TrendingUp, 
          title: 'Wide Reach', 
          description: 'Distribution across India'
        }
      ].map((value, index) => (
        <div 
          key={index} 
          className={`text-center group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20 hover:border-red-600/50'
              : 'bg-white border border-red-200 hover:border-red-400 hover:shadow-lg'
          }`}
        >
          <value.icon className="w-12 h-12 mx-auto text-red-600 mb-4 group-hover:text-red-500 transition-colors" />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {value.title}
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            {value.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Featured Books */}
      <section id="books" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Featured Publications
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Curated collection of our most celebrated works
            </p>
          </div>

         
          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                className={`group relative rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  darkMode 
                    ? 'bg-linear-to-br from-red-950/20 to-black shadow-red-900/10 border border-red-900/20 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20'
                    : 'bg-white shadow-gray-200 border border-gray-200 hover:border-red-400 hover:shadow-2xl hover:shadow-red-300/30'
                }`}
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-full shadow-lg">
                      {book.badge}
                    </span>
                  </div>
                  <div className={`absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${hoveredBook === book.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-4 left-4 right-4">
                      
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-red-500 fill-red-500' : (darkMode ? 'text-gray-600' : 'text-gray-300')}`}
                      />
                    ))}
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} ml-2`}>{book.rating}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-red-500 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {book.title}
                  </h3>
                  <p className={darkMode ? 'text-gray-400 mb-3' : 'text-gray-600 mb-3'}> {book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">{book.price}</span>
                    <button className={`p-2 rounded-full transition-all duration-300 ${
                      darkMode 
                        ? 'bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white'
                        : 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white'
                    }`}>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
     {/* About Section */}
<section id="about" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        About Cosmo India Prakashan
      </h2>
      <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
        Since 1980s, we have been committed to publishing excellence, bringing Indian voices and stories to readers worldwide. Our diverse catalog spans fiction, non-fiction, academic works, and more.
      </p>
    </div>

    {/* Logo Holder */}
    <div className="flex justify-center mb-16">
      
  <div
  className={`${darkMode ? 'bg-white' : 'bg-transparent'} w-80 h-80 flex items-center justify-center rounded-2xl transition-colors duration-300`}
>
  <img
    src="/cosmo-logo.png"
    alt="Logo"
    className="w-70 h-70 transition-all duration-300"
  />
</div>


        
    </div> 

    {/* Founders Section */}
<div className="max-w-4xl mx-auto space-y-16">
  
  {/* Co-Founder 2 */}
  <div
    className={`rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
      darkMode
        ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/30 hover:shadow-red-900/30'
        : 'bg-linear-to-br from-red-50 to-white border border-red-200 hover:shadow-red-300/30'
    }`}
  >
    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
      <div className="flex items-center justify-center md:order-2">
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-900 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <img
            src="dhawal.png"
            alt="Co-Founder"
            className="relative w-64 h-64 object-cover rounded-2xl border-4 border-red-900/50 group-hover:border-red-600 shadow-2xl transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center md:order-1">
        <div className="mb-4">
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
              darkMode
                ? 'bg-red-950/50 text-red-400 border border-red-900/50'
                : 'bg-red-100 text-red-600 border border-red-200'
            }`}
          >
            Co-Founder & CEO
          </div>
        </div>
        <h3
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Dhawal Shukla
        </h3>
        <p
          className={`text-lg leading-relaxed mb-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          A Founding Engineer and the current face of Cosmo India
          Prakashan, Dhawal represents the brand’s new era — blending youthful energy with
          the publishing house’s rich heritage. Passionate about technology, design, and
          storytelling, he is driving the revival of the company with a forward-looking
          vision that honors its enduring legacy.
        </p>
        <div
          className={`flex items-center space-x-2 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          <Award className="w-5 h-5 text-red-600" />
          <span className="text-sm">Innovator & Face of the Brand</span>
        </div>
      </div>
    </div>
  </div>
  {/* Founder 1 */}
  <div
    className={`rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
      darkMode
        ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/30 hover:shadow-red-900/30'
        : 'bg-linear-to-br from-red-50 to-white border border-red-200 hover:shadow-red-300/30'
    }`}
  >
    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
      <div className="flex items-center justify-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-900 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <img
            src="nana.jpeg"
            alt="Co-Founder"
            className="relative w-64 h-64 object-cover rounded-2xl border-4 border-red-900/50 group-hover:border-red-600 shadow-2xl transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-4">
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
              darkMode
                ? 'bg-red-950/50 text-red-400 border border-red-900/50'
                : 'bg-red-100 text-red-600 border border-red-200'
            }`}
          >
            Co-Founder
          </div>
        </div>
        <h3
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Shri Rajkumar Ratnapriya
        </h3>
        <p
          className={`text-lg leading-relaxed mb-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          With over four decades of dedication to literary excellence, Mr. Ratnapriya
          founded Cosmo India Prakashan in 1970s with a vision to bridge the gap between
          traditional Indian literature and contemporary readers. His passion for
          storytelling and commitment to nurturing new voices has made our publishing
          house a beacon of quality and innovation.
        </p>
        <div
          className={`flex items-center space-x-2 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          <Award className="w-5 h-5 text-red-600" />
          <span className="text-sm">Visionary Astrologer (50+ Years Experience) </span>
        </div>
      </div>
    </div>
  </div>

</div>

  </div>
</section>

      {/* Blog Section */}
      <section id="blog" className={`py-20 ${darkMode ? 'bg-linear-to-b from-black to-red-950/20' : 'bg-linear-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Latest from Our Blog
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Insights, stories, and updates from the world of publishing
          </p>

          <div className="mt-8">
            <Posts darkMode={darkMode} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-linear-to-br from-red-950 via-black to-red-950' : 'bg-linear-to-br from-red-100 via-white to-red-100'}`}>
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${darkMode ? 'bg-red-600/5' : 'bg-red-600/10'}`}
              style={{
                width: Math.random() * 200 + 100 + 'px',
                height: Math.random() * 200 + 100 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
              }}
            ></div>
          ))}
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Subscribe to Our Newsletter
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
            Get exclusive updates on new releases, author interviews, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-6 py-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                darkMode 
                  ? 'bg-black/50 border-red-900/30 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
            <a
              href="https://www.linkedin.com/company/cosmoindiaprakashan/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-linear-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30 whitespace-nowrap inline-block text-center"
            >Subscribe
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Wanna Write for Periodicals?
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We'd love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
                  : 'bg-linear-to-br from-red-50 to-white border border-red-200'
              }`}>
                <MapPin className="w-8 h-8 text-red-600 mb-4" />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Address</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Sector A 24 Gujaini Chanakyapuri
                <br /> 
                UP India 
                </p>
              </div>

              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
                  : 'bg-linear-to-br from-red-50 to-white border border-red-200'
              }`}>
                <Phone className="w-8 h-8 text-red-600 mb-4" />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Phone</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  +91 7388270331<br />
                  
                </p>
              </div>

              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
                  : 'bg-linear-to-br from-red-50 to-white border border-red-200'
              }`}>
                <Mail className="w-8 h-8 text-red-600 mb-4" />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Email</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  cosmoindiaprakashan@gmail.com<br />
                 
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`p-8 rounded-2xl ${
                darkMode
                  ? "bg-linear-to-br from-red-950/20 to-black border border-red-900/20"
                  : "bg-linear-to-br from-red-50 to-white border border-red-200"
              }`}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      darkMode
                        ? "bg-black/50 border-red-900/30 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {errors.name && (
                    <p
                      className={`mt-1 text-sm ${
                        darkMode ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      darkMode
                        ? "bg-black/50 border-red-900/30 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  {errors.email && (
                    <p
                      className={`mt-1 text-sm ${
                        darkMode ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none ${
                      darkMode
                        ? "bg-black/50 border-red-900/30 text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p
                      className={`mt-1 text-sm ${
                        darkMode ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full px-8 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/30
                  ${
                        darkMode ? "from-green-800 to-green-900 " : "from-green-700 to-green-800 "
                      }
                  `}
                
                >
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    
     

    </div>
  );
};

export default CosmoPublicationSite;