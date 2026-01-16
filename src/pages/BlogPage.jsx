import { useContext } from 'react';
import { PenTool, BookOpen, Users, TrendingUp, Sparkles, ArrowRight, Mail, Phone, FileText, Award, Globe, Lightbulb, Heart, Brain, MapPin } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import Posts from './Posts';

const BlogPage = () => {
  const { darkMode } = useContext(DarkModeContext);

  const writerBenefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Reach',
      description: 'Your words will reach thousands of readers across India and beyond'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Recognition',
      description: 'Build your personal brand and establish yourself as a thought leader'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community',
      description: 'Join a vibrant community of writers, educators, and change-makers'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth',
      description: 'Receive feedback and grow your writing skills with expert guidance'
    }
  ];

  const topics = [
    'Literature & Arts',
    'Self-Help & Growth',
    'Education & Learning',
    'Youth Development',
    'Indian Culture',
    'Philosophy & Ethics',
    'Social Impact',
    'Innovation & Technology',
    'Health & Wellness',
    'Career & Success',
    'History & Heritage',
    'Environmental Awareness'
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className={`absolute inset-0 ${darkMode ? 'bg-linear-to-br from-black via-red-950 to-black' : 'bg-linear-to-br from-gray-100 via-red-100 to-gray-100'}`}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-black/50' : 'bg-white/30'}`}></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${darkMode ? 'bg-red-600/10' : 'bg-red-600/20'} animate-pulse`}
              style={{
                width: Math.random() * 120 + 40 + 'px',
                height: Math.random() * 120 + 40 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 10 + 10 + 's'
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-10 py-30 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-linear-to-r from-red-600/20 to-red-700/20 border border-red-600/30 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className={`text-sm font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
              Share Your Voice
            </span>
          </div>
          
          <h1 className={`text-2xl md:text-7xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
            Write for <span className="bg-linear-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">CIP Manthan</span>
          </h1>
          
          <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-8 max-w-4xl mx-auto leading-relaxed`}>
           CIP Manthan is a blog initiative of Cosmo India Prakashan, created to churn ideas before they become absolute. It aims to awaken the intellect of India’s youth through literature and knowledge.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('contact-info').scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-linear-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 flex items-center space-x-2"
            >
              <PenTool className="w-5 h-5" />
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => document.getElementById('blog-posts').scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                darkMode 
                  ? 'bg-red-950/30 text-red-400 border border-red-900/50 hover:bg-red-950/50' 
                  : 'bg-red-100 text-red-600 border border-red-200 hover:bg-red-200'
              } flex items-center space-x-2`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Latest Posts</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className={`py-16 ${darkMode ? 'bg-linear-to-b from-red-950/20 to-black' : 'bg-linear-to-b from-red-50/50 to-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 md:p-12 rounded-3xl ${
            darkMode ? 'bg-linear-to-br from-red-950/30 to-black border border-red-900/30' : 'bg-white border border-red-200 shadow-xl'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className={`inline-flex p-4 rounded-xl mb-4 ${darkMode ? 'bg-red-950/40' : 'bg-red-100'}`}>
                  <Heart className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Enrich the Nation
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Share knowledge that uplifts and empowers our country
                </p>
              </div>
              
              <div>
                <div className={`inline-flex p-4 rounded-xl mb-4 ${darkMode ? 'bg-red-950/40' : 'bg-red-100'}`}>
                  <Brain className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Educate the Youth
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Inspire and guide the next generation of leaders
                </p>
              </div>
              
              <div>
                <div className={`inline-flex p-4 rounded-xl mb-4 ${darkMode ? 'bg-red-950/40' : 'bg-red-100'}`}>
                  <Lightbulb className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Spark Innovation
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Foster critical thinking and creative expression
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Write for Us Section */}
      <section className={`py-20 ${darkMode ? 'bg-linear-to-b from-black to-red-950/10' : 'bg-linear-to-b from-white to-red-50/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Why Write for Us?
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Become part of India's leading platform for enriching literature and education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {writerBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                  darkMode
                    ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20'
                    : 'bg-white border border-gray-200 hover:border-red-400 hover:shadow-2xl hover:shadow-red-300/30'
                }`}
              >
                <div className={`inline-flex p-4 rounded-xl mb-6 transition-all duration-300 ${
                  darkMode
                    ? 'bg-red-950/40 text-red-400 group-hover:bg-red-600 group-hover:text-white'
                    : 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                }`}>
                  {benefit.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {benefit.title}
                </h3>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* Blog Posts Section */}
      <section id="blog-posts" className={`py-20 ${darkMode ? 'bg-linear-to-b from-black to-red-950/20' : 'bg-linear-to-b from-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Latest from Our Blog
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Insights, stories, and knowledge from our community of writers
            </p>
          </div>
          
          <div className="mt-8">
            <Posts darkMode={darkMode} />
          </div>
        </div>
      </section>
      {/* Topics We're Looking For */}
      <section className={`py-20 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Topics We Love
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Share your expertise on these subjects and more
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {topics.map((topic, index) => (
              <div
                key={index}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 cursor-pointer ${
                  darkMode
                    ? 'bg-red-950/30 text-red-400 border border-red-900/30 hover:bg-red-600 hover:text-white'
                    : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white'
                }`}
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section id="contact-info" className={`py-20 ${darkMode ? 'bg-linear-to-b from-red-950/10 to-black' : 'bg-linear-to-b from-red-50/50 to-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Ready to Share Your Story?
            </h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get in touch with us to start your writing journey
            </p>
          </div>

          <div className={`p-8 md:p-12 rounded-3xl shadow-2xl ${
            darkMode
              ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20'
              : 'bg-white border border-gray-200'
          }`}>
            <div className="space-y-8">
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Contact Us
                </h3>
                <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  Send us your article proposals, writing samples, or any questions you have about contributing to our blog
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="mailto:cosmoindiaprakashan@gmail.com"
                  className={`group p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'bg-red-950/30 border border-red-900/30 hover:border-red-600/50'
                      : 'bg-red-50 border border-red-200 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-950/40' : 'bg-red-100'}`}>
                      <Mail className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Email Us
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'} group-hover:underline`}>
                        cosmoindiaprakashan@gmail.com
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+917388270331"
                  className={`group p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? 'bg-red-950/30 border border-red-900/30 hover:border-red-600/50'
                      : 'bg-red-50 border border-red-200 hover:border-red-400'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-950/40' : 'bg-red-100'}`}>
                      <Phone className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Call Us
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-600'} group-hover:underline`}>
                        +91 738 827 0331
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className={`p-6 rounded-xl ${
                darkMode ? 'bg-red-950/30 border border-red-900/30' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-950/40' : 'bg-red-100'}`}>
                    <MapPin className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Visit Us
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Cosmo India Prakashan<br />
                      Kanpur Nagar, UP (India)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
                <div className={`mt-12 p-6 rounded-2xl ${
                darkMode ? 'bg-red-950/20 border border-red-900/30' : 'bg-red-50 border border-red-200'
                }`}>
                <div className="flex items-start space-x-3">
                    <FileText className={`w-6 h-6 mt-1 shrink-0 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    <div>
                    <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        A Note to Writers
                    </h4>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        CIP Manthan welcomes writing that is honest, thoughtful, and rooted in depth.
                        If your words arise from reflection, inquiry, or lived experience—and seek to
                        awaken minds rather than chase noise—you already belong here.
                    </p>
                    </div>
                </div>
                </div>

        </div>
      </section>


    </div>
  );
};

export default BlogPage;