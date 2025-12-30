import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, BookOpen, Heart, Lightbulb, Target, Award, 
  Users, TrendingUp, ArrowRight, Check, Star, Sparkles,
  MessageCircle, Calendar, FileText, Edit, Rocket, Coffee
} from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';

const DiscussYourBook = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bookStages = [
    {
      id: 'idea',
      title: 'Just an Idea',
      description: 'I have a concept but haven\'t started writing yet',
      icon: Lightbulb,
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 'writing',
      title: 'Writing in Progress',
      description: 'I\'m currently working on my manuscript',
      icon: Edit,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'completed',
      title: 'Manuscript Complete',
      description: 'My book is written and ready for the next step',
      icon: Check,
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'published',
      title: 'Previously Published',
      description: 'Looking for a new publisher or re-release',
      icon: BookOpen,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  const genres = [
    'Fiction', 'Non-Fiction', 'Biography/Memoir', 'Self-Help',
    'Business', 'Academic', 'Poetry', 'Children\'s Book',
    'Young Adult', 'Mystery/Thriller', 'Romance', 'Science Fiction/Fantasy',
    'History', 'Religion/Spirituality', 'Astrology', 'Other'
  ];

  const authorJourney = [
    {
      icon: MessageCircle,
      title: 'Initial Consultation',
      description: 'We start with a friendly conversation about your book, your vision, and your goals as an author.'
    },
    {
      icon: Target,
      title: 'Understanding Your Vision',
      description: 'We dive deep into your manuscript, target audience, and what makes your story unique.'
    },
    {
      icon: FileText,
      title: 'Custom Publishing Plan',
      description: 'Based on your needs, we create a personalized publishing roadmap just for you.'
    },
    {
      icon: Rocket,
      title: 'Bring Your Book to Life',
      description: 'From editing to design to marketing, we handle everything while you stay involved.'
    }
  ];

  const whyAuthorsChooseUs = [
    {
      icon: Heart,
      title: 'Personal Attention',
      description: 'Every author and every book is unique. We treat your work with the care it deserves.'
    },
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Our editors, designers, and marketers have decades of combined industry experience.'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality. Your book will meet professional publishing standards.'
    },
    {
      icon: TrendingUp,
      title: 'Author Success',
      description: 'We measure our success by yours. Your satisfaction and book quality are our top priorities.'
    }
  ];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    bookTitle: '',
    genre: '',
    stage: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.email) tempErrors.email = "Email is required";
    if (!form.phone) tempErrors.phone = "Phone is required";
    if (!form.bookTitle) tempErrors.bookTitle = "Book title is required";
    if (!form.genre) tempErrors.genre = "Please select a genre";
    if (!form.stage) tempErrors.stage = "Please select your current stage";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    const text = `New Book Discussion Request!\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBook Title: ${form.bookTitle}\nGenre: ${form.genre}\nStage: ${form.stage}\nMessage: ${form.message || 'N/A'}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/7388270331?text=${encodedText}`, "_blank");

    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      phone: '',
      bookTitle: '',
      genre: '',
      stage: '',
      message: ''
    });
    setErrors({});
    setSelectedGenre('');
    setSelectedStage('');

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Floating Publish Button */}
      <button
        onClick={() => navigate("/publish")}
        className="fixed bottom-8 right-8 z-50 group px-6 py-4 bg-linear-to-r from-red-600 to-red-700 text-white rounded-full font-semibold shadow-2xl hover:shadow-red-600/50 hover:scale-110 transition-all duration-300 flex items-center space-x-2"
      >
        <Rocket className="w-5 h-5" />
        View Services
        <ArrowRight className=" m-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className={`absolute inset-0 ${darkMode ? 'bg-linear-to-br from-black via-red-950 to-black' : 'bg-linear-to-br from-gray-100 via-red-100 to-gray-100'}`}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-black/50' : 'bg-white/30'}`}></div>
        </div>

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${darkMode ? 'bg-red-600/10' : 'bg-red-600/20'} rounded-full`}
              style={{
                width: Math.random() * 100 + 50 + 'px',
                height: Math.random() * 100 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `pulse ${Math.random() * 10 + 10}s infinite`,
                animationDelay: Math.random() * 5 + 's'
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-16 h-16 text-red-600 animate-pulse" />
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
              Let's Discuss
              <span className="block bg-linear-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
                Your Book
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
              Every great book starts with a conversation. Share your vision with us, and let's create something extraordinary together.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Coffee className="w-6 h-6 text-red-600" />
              <span className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Grab a coffee and let's chat about your masterpiece
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Where Are You in Your Journey */}
      <section className={`py-20 ${darkMode ? 'bg-linear-to-b from-black to-red-950/20' : 'bg-linear-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Where Are You in Your Journey?
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No matter where you are, we're here to help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => {
                  setSelectedStage(stage.title);
                  setForm({ ...form, stage: stage.title });
                  document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative p-8 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 ${
                  selectedStage === stage.title
                    ? 'border-2 border-red-600 shadow-2xl shadow-red-600/30'
                    : darkMode 
                    ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20 hover:border-red-600/50'
                    : 'bg-white border border-gray-200 hover:border-red-400 hover:shadow-xl'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${stage.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stage.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stage.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stage.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Authors Choose Us */}
      <section className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Why Work With Us
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're committed to bringing your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyAuthorsChooseUs.map((item, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
                    : 'bg-linear-to-br from-red-50 to-white border border-red-200'
                }`}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Publishing Journey */}
      <section className={`py-20 ${darkMode ? 'bg-linear-to-b from-black to-red-950/20' : 'bg-linear-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Your Publishing Journey With Us
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              From our first conversation to your book launch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {authorJourney.map((step, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
                    : 'bg-white border border-gray-200 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-red-600 mb-2">Step {index + 1}</div>
                    <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Tell Us About Your Book
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Fill out the form below and we'll schedule a call to discuss your project
            </p>
          </div>

          {submitted && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-600 font-semibold">✓ Thank you! We'll be in touch soon via WhatsApp.</p>
            </div>
          )}

          <div className={`p-8 md:p-12 rounded-3xl ${
            darkMode 
              ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
              : 'bg-white border border-red-200 shadow-xl'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ramdhari Singh Dinkar"
                    className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                      darkMode
                        ? 'bg-black/50 border-red-900/30 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="dinkar@bharat.com"
                    className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                      darkMode
                        ? 'bg-black/50 border-red-900/30 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Phone and Book Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                      darkMode
                        ? 'bg-black/50 border-red-900/30 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Book Title *
                  </label>
                  <input
                    type="text"
                    name="bookTitle"
                    value={form.bookTitle}
                    onChange={handleChange}
                    placeholder="Rashmirathi"
                    className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                      darkMode
                        ? 'bg-black/50 border-red-900/30 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  {errors.bookTitle && <p className="mt-1 text-sm text-red-500">{errors.bookTitle}</p>}
                </div>
              </div>

              {/* Genre */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Book Genre *
                </label>
                <select
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                    darkMode
                      ? 'bg-black/80 border-red-900/30 text-white'
                      : 'bg-white border-gray-600 text-gray-900'
                  }`}
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                {errors.genre && <p className="mt-1 text-sm text-red-500">{errors.genre}</p>}
              </div>

              {/* Stage */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Current Stage *
                </label>
                <select
                  name="stage"
                  value={form.stage}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all ${
                    darkMode
                      ? 'bg-black/80 border-red-900/30 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select your current stage</option>
                  {bookStages.map((stage) => (
                    <option key={stage.id} value={stage.title}>{stage.title}</option>
                  ))}
                </select>
                {errors.stage && <p className="mt-1 text-sm text-red-500">{errors.stage}</p>}
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tell Us More (Optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Share any additional details about your book, your goals, or questions you have..."
                  className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none ${
                    darkMode
                      ? 'bg-black/50 border-red-900/30 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 
                  hover:scale-105 flex items-center justify-center space-x-2
                  ${
                    darkMode
                      ? 'bg-linear-to-r from-green-800 to-green-900 text-white shadow-lg shadow-green-700/40 hover:from-green-800 hover:to-green-900'
                      : 'bg-linear-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-600/30 hover:from-green-600 hover:to-green-700'
                  }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start the Conversation via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </section>

          </div>
  );
};

export default DiscussYourBook;