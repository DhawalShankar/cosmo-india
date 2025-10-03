import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight, BookOpen, Users, Award, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Star, ArrowRight, TrendingUp, Flame } from 'lucide-react';

const CosmoPublicationSite = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredBook, setHoveredBook] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
    { id: 'children', name: 'Children' },
    { id: 'academic', name: 'Academic' },
    { id: 'poetry', name: 'Poetry' }
  ];

  const featuredBooks = [
    {
      id: 1,
      title: 'रत्न रहस्य - 1',
      author: 'Rajkumar Ratnapriya',
      category: 'Astrology',
      price: '₹299',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      badge: '',
      rating: 4.8
    },
    {
      id: 2,
      title: 'सौरमंडल और आप',
      author: 'Keval Anand Joshi',
      category: 'Astrology',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop',
      badge: '',
      rating: 4.6
    },
    {
      id: 3,
      title: 'रत्न रहस्य - 2',
      author: 'Rajkumar Ratnapriya',
      category: 'Astrology',
      price: '₹399',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      badge: '',
      rating: 4.9
    },
    
  ];

  const filteredBooks = activeCategory === 'all' 
    ? featuredBooks 
    : featuredBooks.filter(book => book.category === activeCategory);

  const authors = [
    { name: 'Rajkumar Ratnapriya', books: 1, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
    { name: 'Keval Anand Joshi', books: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
    { name: "Shyamlal 'Saketi'", books: 3, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-900/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Flame className={`w-8 h-8 transition-colors duration-300 ${scrolled ? 'text-red-600' : 'text-red-500'}`} />
              <span className={`text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text ${scrolled ? 'text-transparent' : 'text-white'}`}>
                Cosmo India Prakashan
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['Books', 'Authors', 'About', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? 'text-gray-300 hover:text-red-500' : 'text-white hover:text-red-400'}`}
                >
                  {item}
                </a>
              ))}
              <button className={`p-2 rounded-full transition-all duration-300 ${scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'}`}>
                <Search className={`w-5 h-5 ${scrolled ? 'text-gray-300' : 'text-white'}`} />
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-300' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-300' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-red-900/30">
            <div className="px-4 pt-2 pb-4 space-y-3">
              {['Books', 'Authors', 'About', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-300 hover:text-red-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-red-600/10 rounded-full animate-pulse"
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
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Discover Stories That
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                Ignite Imagination
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              India's premier publishing house bringing you the finest literature, academic excellence, and inspiring narratives
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 flex items-center space-x-2">
                <span>Explore Catalog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-red-600 text-white rounded-full font-semibold text-lg hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105">
                Meet Our Authors
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-red-500 rotate-90" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, value: '2000+', label: 'Published Books' },
              { icon: Users, value: '500+', label: 'Authors' },
              { icon: Award, value: '150+', label: 'Awards Won' },
              { icon: TrendingUp, value: '50M+', label: 'Readers Reached' }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-12 h-12 mx-auto text-red-600 mb-4 group-hover:text-red-500 transition-colors" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="books" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Publications
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Curated collection of our most celebrated works
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/50 scale-105'
                    : 'bg-red-950/30 text-gray-300 border border-red-900/30 hover:bg-red-950/50 hover:scale-105'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                className="group relative bg-gradient-to-br from-red-950/20 to-black rounded-2xl shadow-lg shadow-red-900/10 overflow-hidden border border-red-900/20 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-500 hover:-translate-y-2"
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
                      <button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300">
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">{book.rating}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 mb-3">by {book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">{book.price}</span>
                    <button className="p-2 bg-red-950/30 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
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
      <section id="authors" className="py-20 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Celebrated Authors and Their Books
            </h2>
            <p className="text-xl text-gray-400">
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
                <h3 className="text-xl font-bold text-white mb-2">{author.name}</h3>
                <p className="text-gray-400">{author.books} </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-950 via-black to-red-950 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-red-600/5 rounded-full"
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get exclusive updates on new releases, author interviews, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-black/50 border border-red-900/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900/30 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Flame className="w-8 h-8 text-red-600" />
                <span className="text-xl font-bold">Cosmo India</span>
              </div>
              <p className="text-gray-400">
                Publishing excellence since 1982. Bringing Indian voices to the world.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-red-500">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Catalog</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Authors</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-red-500">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Kanpur, Uttar Pradesh (India)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>+91 7985046049</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  <span>cosmoindiaprakshan@gmail.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-red-500">Follow Us</h4>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-red-950/30 border border-red-900/30 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-red-900/30 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Cosmo India Prakashan. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-vertical {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-float-vertical {
          animation: float-vertical 8s infinite ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CosmoPublicationSite;