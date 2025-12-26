import { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight, BookOpen, Users, Award, Mail, MapPin, Phone, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Posts from "./Posts";

const CosmoPublicationSite = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredBook, setHoveredBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
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
      title: 'रत्न रहस्य',
      author: '',
      category: 'academic',
      price: '',
      image: 'Ratn Rahasy.png',
     
    
    },
    {
      id: 2,
      title: 'सौरमंडल और आप',
      author: '',
      category: 'academic',
      price: '',
      image: 'saur.png',
      
   
    },
    {
      id: 3,
      title: 'सिद्धिसूत्रम',
      author: '',
      category: 'non-fiction',
      price: '',
      image: 'siddhi.png',
      badge: '',
  
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
 {/* Navigation */}
<nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? (darkMode ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-900/20' : 'bg-white/95 backdrop-blur-lg shadow-lg') : 'bg-transparent'}`}>
  <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-25">
      <div className="flex items-center space-x-2">
        <div
          className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5 w-24 h-24 flex items-center justify-center rounded-2xl transition-colors duration-300`}
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
      </div>

      <div className="hidden md:flex items-center space-x-8">
        {[
          { name: 'Books', id: 'books' },
          { name: 'About', id: 'about' },
          { name: 'Blog', id: 'blog' },
          { name: 'Contact', id: 'contact' }
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.id)}
            className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}
          >
            {item.name}
          </button>
        ))}
        
        {/* // Replace the button with Link: */}
<Link
  to="/legacy"
  className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}
>
  Legacy
</Link>
       
        <button className={`p-2 rounded-full transition-all duration-300 ${scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'}`}>
          <Search className={`w-5 h-5 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} />
        </button>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-all duration-300 ${scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'}`}
          aria-label="Toggle theme"
        >
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

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className={`w-6 h-6 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} />
        ) : (
          <Menu className={`w-6 h-6 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} />
        )}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className={`md:hidden ${darkMode ? 'bg-black/95' : 'bg-white/95'} border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
      <div className="px-4 pt-2 pb-4 space-y-3">
        {[
          { name: 'Books', id: 'books' },
          { name: 'About', id: 'about' },
          { name: 'Blog', id: 'blog' },
          { name: 'Contact', id: 'contact' }
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.id)}
            className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors`}
          >
            {item.name}
          </button>
        ))}
        
        <Link
          to="/legacy"
          className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Legacy
        </Link>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center space-x-2 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
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
</nav>     {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-black via-red-950 to-black' : 'bg-gradient-to-br from-gray-100 via-red-100 to-gray-100'}`}>
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
          <div className="absolute w-1 h-96 bg-gradient-to-b from-transparent via-red-600 to-transparent animate-float-vertical" style={{left: '20%', animationDelay: '0s'}}></div>
          <div className="absolute w-1 h-64 bg-gradient-to-b from-transparent via-red-600 to-transparent animate-float-vertical" style={{left: '50%', animationDelay: '2s'}}></div>
          <div className="absolute w-1 h-80 bg-gradient-to-b from-transparent via-red-600 to-transparent animate-float-vertical" style={{left: '80%', animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className={`text-5xl md:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
              Discover Stories That
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                Ignite Imagination
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              India's premier publishing house bringing you the finest literature, academic excellence, and inspiring narratives
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
  onClick={() => navigate("/discuss")}
  className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 flex items-center space-x-2"
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

      {/* Stats Section */}
      {/* Our Values Section */}
<section className={`py-16 ${darkMode ? 'bg-gradient-to-b from-black to-red-950/20' : 'bg-gradient-to-b from-gray-50 to-red-50'}`}>
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
              ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20 hover:border-red-600/50'
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
                    ? 'bg-gradient-to-br from-red-950/20 to-black shadow-red-900/10 border border-red-900/20 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20'
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
                    <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-full shadow-lg">
                      {book.badge}
                    </span>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${hoveredBook === book.id ? 'opacity-100' : 'opacity-0'}`}>
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

      {/* Authors Section */}
      {/* <section id="authors" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-black to-red-950/20' : 'bg-gradient-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Celebrated Authors and Their Books
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Meet the brilliant minds behind our publications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {authors.map((author, index) => (
              <div
                key={index}
                className="group text-center hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-4 mx-auto w-48 h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={author.image}
                    alt={author.name}
                    className="relative w-full h-full object-cover rounded-full border-4 border-red-900/50 group-hover:border-red-600 shadow-xl transition-all duration-300"
                  />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{author.name}</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{author.books}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

     {/* About Section */}
<section id="about" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        About Cosmo India Prakashan
      </h2>
      <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
        Since 1970s, we have been committed to publishing excellence, bringing Indian voices and stories to readers worldwide. Our diverse catalog spans fiction, non-fiction, academic works, and more.
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
        ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 hover:shadow-red-900/30'
        : 'bg-gradient-to-br from-red-50 to-white border border-red-200 hover:shadow-red-300/30'
    }`}
  >
    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
      <div className="flex items-center justify-center md:order-2">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
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
        ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 hover:shadow-red-900/30'
        : 'bg-gradient-to-br from-red-50 to-white border border-red-200 hover:shadow-red-300/30'
    }`}
  >
    <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
      <div className="flex items-center justify-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
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
          <span className="text-sm">Visionary Astrologer (40+ Years Experience) </span>
        </div>
      </div>
    </div>
  </div>

</div>

  </div>
</section>

      {/* Blog Section */}
      <section id="blog" className={`py-20 ${darkMode ? 'bg-gradient-to-b from-black to-red-950/20' : 'bg-gradient-to-b from-white to-red-50'}`}>
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
      <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-red-950 via-black to-red-950' : 'bg-gradient-to-br from-red-100 via-white to-red-100'}`}>
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
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30 whitespace-nowrap inline-block text-center"
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
                  ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20'
                  : 'bg-gradient-to-br from-red-50 to-white border border-red-200'
              }`}>
                <MapPin className="w-8 h-8 text-red-600 mb-4" />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Address</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                <br />
                UP India 
                </p>
              </div>

              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20'
                  : 'bg-gradient-to-br from-red-50 to-white border border-red-200'
              }`}>
                <Phone className="w-8 h-8 text-red-600 mb-4" />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Phone</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  +91 7388270331<br />
                  
                </p>
              </div>

              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20'
                  : 'bg-gradient-to-br from-red-50 to-white border border-red-200'
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
                  ? "bg-gradient-to-br from-red-950/20 to-black border border-red-900/20"
                  : "bg-gradient-to-br from-red-50 to-white border border-red-200"
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
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/30"
                >
                  Send via WhatsApp
                </button>
              </form>
            </div>
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
            className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5 w-24 h-24 flex items-center justify-center rounded-2xl transition-colors duration-300`}
          >
            <img
              src="/cosmo-logo.png"
              alt="Logo"
              className="w-20 h-20 transition-all duration-300"
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
          {['Books', 'About', 'Blog', 'Contact'].map((link) => (
            <li key={link}>
              <button 
                onClick={() => scrollToSection(link.toLowerCase())}
                className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Legacy</h4>
        <ul className="space-y-2">
          <li>
            
<Link
  to="/legacy"
  className={`${darkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-600'} transition-colors`}>
  Legacy
</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Follow Us</h4>
        <div className="flex space-x-4">
          {[
            { 
              name: 'Facebook',
              link: 'https://www.facebook.com/profile.php?id=61562467420068',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )
            },
            { 
              name: 'Twitter',
              link: 'https://x.com/IndiaCosmo',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              )
            },
            { 
              name: 'Instagram',
              link: 'https://www.instagram.com/cosmoindiaprakashan/',
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.25a1 1 0 110 2 1 1 0 010-2z"/>
                </svg>
              )
            },
            { 
              name: 'LinkedIn',
              link: 'https://www.linkedin.com/company/cosmo-india-prakashan/',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )
            }
          ].map(({ name, link, icon }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white'
                  : 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white'
              }`}
              aria-label={name}
            >
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

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-vertical {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100vh); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-float-vertical {
          animation: float-vertical 20s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default CosmoPublicationSite;