import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, BookOpen, Edit3, FileText, Image, 
  Award, TrendingUp, CheckCircle, ArrowRight, Palette, 
  BarChart, Globe, Users, Zap, Star, Shield
} from 'lucide-react';

const PublishingServices = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      icon: Edit3,
      title: 'Professional Editing',
      description: 'Comprehensive editing services including developmental editing, copyediting, and line editing to refine your manuscript.',
      features: [
        'Developmental Editing',
        'Copy Editing',
        'Line Editing',
        'Proofreading',
        'Fact Checking'
      ],
      color: 'from-red-600 to-orange-600'
    },
    {
      id: 2,
      icon: FileText,
      title: 'Proofreading',
      description: 'Meticulous proofreading to eliminate errors and ensure your text is polished and publication-ready.',
      features: [
        'Grammar & Spelling',
        'Punctuation Check',
        'Consistency Review',
        'Style Guide Compliance',
        'Final Quality Check'
      ],
      color: 'from-orange-600 to-amber-600'
    },
    {
      id: 3,
      icon: Palette,
      title: 'Book Design & Layout',
      description: 'Beautiful interior design and typesetting that enhances readability and creates a professional look.',
      features: [
        'Interior Layout Design',
        'Typography Selection',
        'Chapter Styling',
        'Image Placement',
        'Print & Digital Formats'
      ],
      color: 'from-amber-600 to-yellow-600'
    },
    {
      id: 4,
      icon: Image,
      title: 'Cover Design',
      description: 'Eye-catching cover designs that capture your book\'s essence and attract readers at first glance.',
      features: [
        'Custom Cover Art',
        'Professional Graphics',
        'Multiple Concepts',
        'Unlimited Revisions',
        'Print & eBook Covers'
      ],
      color: 'from-yellow-600 to-red-600'
    },
    {
      id: 5,
      icon: Award,
      title: 'ISBN & Copyright',
      description: 'Complete ISBN registration and copyright services to protect your work and ensure proper distribution.',
      features: [
        'ISBN Registration',
        'Barcode Generation',
        'Copyright Filing',
        'Legal Documentation',
        'Rights Management'
      ],
      color: 'from-red-600 to-pink-600'
    },
    {
      id: 6,
      icon: TrendingUp,
      title: 'Marketing & Promotion',
      description: 'Strategic marketing campaigns to maximize your book\'s visibility and reach your target audience.',
      features: [
        'Social Media Marketing',
        'Book Launch Strategy',
        'Press Release Distribution',
        'Author Website',
        'Online Advertising'
      ],
      color: 'from-pink-600 to-red-600'
    }
  ];

  const packages = [
    {
      name: 'Essential',
      price: '₹24,999',
      description: 'Perfect for first-time authors',
      features: [
        'Professional Editing',
        'Proofreading (2 rounds)',
        'Basic Interior Layout',
        'Standard Cover Design',
        'ISBN Registration',
        'Digital Distribution'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '₹59,999',
      description: 'Our most popular choice',
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
      popular: true
    },
    {
      name: 'Premium',
      price: '₹99,999',
      description: 'Complete publishing solution',
      features: [
        'Full Editorial Services',
        'Unlimited Proofreading',
        'Deluxe Interior Design',
        'Premium Cover Design (3 concepts)',
        'ISBN & Copyright',
        'Full Distribution ( Print (500 copies) + Digital )',
        'Advanced Marketing Campaign',
        'Professional Author Website',
        'Social Media Setup',
        'Book Launch Event Support'
      ],
      popular: false
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Manuscript Submission',
      description: 'Submit your manuscript and discuss your vision with our team.'
    },
    {
      step: '02',
      title: 'Editing & Refinement',
      description: 'Our expert editors work on perfecting your content.'
    },
    {
      step: '03',
      title: 'Design & Layout',
      description: 'Professional designers create your book\'s visual identity.'
    },
    {
      step: '04',
      title: 'Review & Approval',
      description: 'Review all designs and content before final approval.'
    },
    {
      step: '05',
      title: 'Publishing & Distribution',
      description: 'Your book goes live across multiple platforms.'
    },
    {
      step: '06',
      title: 'Marketing & Promotion',
      description: 'Launch campaigns to reach your target readers.'
    }
  ];

  const testimonials = [
    {
      name: 'Shri Shatrughan Lal Shukla',
      book: 'Multiple Novels',
      text: 'Cosmo India Prakashan transformed my manuscript into a professional publication. Their editing team was thorough and their cover design exceeded my expectations.',
      rating: 5
    },
    {
      name: 'Shri Kewal Anand Joshi',
      book: 'Astrology Magazines and Books',
      text: 'The entire publishing process was seamless. From editing to marketing, every step was handled with professionalism and care.',
      rating: 5
    },
    {
      name: 'Mr. Dhawal Shukla',
      book: 'Science Magazines\" and "Hindi Poet',
      text: 'I couldn\'t be happier with the results. The team at Cosmo went above and beyond to make my writing a success.',
      rating: 5
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? (darkMode ? 'bg-black/95 backdrop-blur-lg shadow-lg shadow-red-900/20' : 'bg-white/95 backdrop-blur-lg shadow-lg') : 'bg-transparent'}`}>
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-25">
            <Link to="/" className="flex items-center space-x-2">
              <div className={`${darkMode ? 'bg-white' : 'bg-transparent'} m-5 w-24 h-24 flex items-center justify-center rounded-2xl transition-colors duration-300`}>
                <img src="/cosmo-logo.png" alt="Logo" className="w-20 h-20 transition-all duration-300" />
              </div>
              <span className={`text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text ${scrolled ? 'text-transparent' : (darkMode ? 'text-white' : 'text-gray-900')}`}>
                Cosmo India Prakashan
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-medium transition-all duration-300 hover:scale-105 ${scrolled ? (darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500') : (darkMode ? 'text-white hover:text-red-400' : 'text-gray-900 hover:text-red-500')}`}>
                Home
              </Link>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all duration-300 ${scrolled ? 'hover:bg-red-900/20' : 'hover:bg-white/10'}`}
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

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? (darkMode ? 'text-gray-300' : 'text-gray-700') : (darkMode ? 'text-white' : 'text-gray-900')}`} />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-black/95' : 'bg-white/95'} border-t ${darkMode ? 'border-red-900/30' : 'border-gray-200'}`}>
            <div className="px-4 pt-2 pb-4 space-y-3">
              <Link to="/" className={`block w-full text-left py-2 ${darkMode ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'} transition-colors`} onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className={`text-5xl md:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
              Complete Publishing
              <span className="block bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              From manuscript to market - we handle everything so you can focus on your writing
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/7388270331?text=I'm%20interested%20in%20your%20publishing%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Our Services
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              End-to-end publishing solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20'
                    : 'bg-white border border-gray-200 hover:border-red-400 hover:shadow-2xl hover:shadow-red-300/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className={`py-20 ${darkMode ? 'bg-gradient-to-b from-black to-red-950/20' : 'bg-gradient-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Publishing Packages
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose the package that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${
                  pkg.popular
                    ? 'transform scale-105 shadow-2xl border-2 border-red-600'
                    : darkMode
                    ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20'
                    : 'bg-white border border-gray-200'
                } hover:scale-105`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {pkg.price}
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    One-time payment
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/7388270331?text=I'm%20interested%20in%20the%20${pkg.name}%20package`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                      : darkMode
                      ? 'bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white border border-red-900/30'
                      : 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  Choose {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Our Process
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Six simple steps to bring your book to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, idx) => (
              <div
                key={idx}
                className={`relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20'
                    : 'bg-gradient-to-br from-red-50 to-white border border-red-200'
                }`}
              >
                <div className="text-6xl font-bold text-red-600/20 mb-4">
                  {step.step}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 ${darkMode ? 'bg-gradient-to-b from-black to-red-950/20' : 'bg-gradient-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Author Success Stories
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              See what our published authors have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-red-950/20 to-black border border-red-900/20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-red-500 fill-red-500" />
                  ))}
                </div>
                <p className={`mb-6 italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.text}"
                </p>
                <div>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Author of "{testimonial.book}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-red-950 via-black to-red-950' : 'bg-gradient-to-br from-red-100 via-white to-red-100'}`}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Ready to Publish Your Book?
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
            Let's discuss your project and find the perfect publishing solution for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/7388270331?text=I'd%20like%20to%20discuss%20publishing%20my%20book"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30"
            >
              Contact Us Today
            </a>
            <a
              href="tel:+917388270331"
              className={`px-8 py-4 border-2 border-red-600 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                darkMode ? 'text-white hover:bg-red-600' : 'text-red-600 hover:bg-red-600 hover:text-white'
              }`}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gradient-to-b from-black to-red-950' : 'bg-gradient-to-b from-white to-red-100'} border-t ${darkMode ? 'border-red-900/30' : 'border-red-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className={`${darkMode ? 'bg-white' : 'bg-transparent'} w-16 h-16 flex items-center justify-center rounded-xl`}>
                <img src="/cosmo-logo.png" alt="Logo" className="w-12 h-12" />
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Cosmo India Prakashan
              </span>
            </Link>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Publishing excellence since 1982
            </p>
            <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
              &copy; 2025 Cosmo India Prakashan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublishingServices;