import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, FileText, Compass } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  const services = [
    {
      number: "01",
      title: "Software Development | Web | Mobile",
      icon: Briefcase
    },
    {
      number: "02", 
      title: "IT Consulting & Solution Design",
      icon: Compass
    },
    {
      number: "03",
      title: "Digital Presence & Visibility", 
      icon: FileText
    },
    {
      number: "04",
      title: "Deployment, Scaling & Optimization",
      icon: Calendar
    }
  ];

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>

      <section 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden" id="home"
      >
        {/* Enhanced Background with Static Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30" />

        {/* Static Noise Texture */}
        <div className="absolute inset-0 opacity-15 mix-blend-multiply">
          <div className="w-full h-full noise-texture" />
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/10 to-indigo-200/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-sky-200/10 to-blue-200/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] lg:min-h-[80vh]">
            
            {/* Left Content - Staggered Animations */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-2 lg:space-y-4">
                <p 
                  className={`text-[#a1a1a1] text-base sm:text-lg lg:text-xl font-light tracking-wide text-shadow opacity-0 ${
                    isLoaded ? 'animate-text-reveal' : ''
                  }`}
                  style={{ animationDelay: '0.2s' }}
                >
                  Hey, I'm
                </p>
                <h1 
                  className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#3d5a8c] leading-[0.85] lg:leading-[0.85] tracking-tight text-shadow opacity-0 ${
                    isLoaded ? 'animate-slide-up' : ''
                  }`}
                  style={{ animationDelay: '0.4s' }}
                >
                  Godfrey 
                  <br />
                  <span 
                    className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl opacity-0 ${
                      isLoaded ? 'animate-slide-left' : ''
                    }`}
                    style={{ animationDelay: '0.8s' }}
                  >
                    Joseph Sule
                  </span>
                </h1>
              </div>

              {/* Enhanced Tagline */}
              <div 
                className={`lg:block space-y-3 lg:space-y-0 max-w-md opacity-0 ${
                  isLoaded ? 'animate-slide-right' : ''
                }`}
                style={{ animationDelay: '1.2s' }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3d5a8c] leading-tight text-shadow relative">
                Giving Visibility to You,
                  <br />
                 Amplifying Your Influence
                  <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-[#3d5a8c] to-blue-600 rounded-full" />
                </h2>
              </div>
            </div>

            {/* Right Content - Hero Image with Enhanced Effects */}
            <div className="relative">
              <div className="relative mx-auto lg:mx-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-96 lg:w-96 lg:h-[450px] xl:w-[450px] xl:h-[500px]">
                
                {/* Animated Ring Effects */}
                <div className="absolute inset-0 -m-4">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 rounded-full border border-[#3d5a8c]/20 ${
                        isLoaded ? 'animate-ripple' : 'opacity-0'
                      }`}
                      style={{ 
                        animationDelay: `${1.5 + index * 0.5}s`,
                        animationDuration: '4s'
                      }}
                    />
                  ))}
                </div>

                {/* Main Image Container */}
                <div 
                  ref={imageRef}
                  className={`relative w-full h-full opacity-0 ${
                    isLoaded ? 'animate-morph' : ''
                  } magnetic-effect`}
                  style={{ 
                  }}
                >
                  <img 
                    src="/odafe2.png" 
                    alt="Godfrey Joseph Sule – Full-Stack Web & Mobile Software Engineer" 
                    className="w-full h-full object-cover rounded-[50%] shadow-2xl image-glow transition-transform duration-300"
                  />

                  {/* Enhanced Circular Fade */}
                  <div 
                    className="absolute inset-0 rounded-full transition-opacity duration-300 hover:opacity-70"
                    style={{
                      background: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(61, 90, 140, 0.15) 60%, rgba(61, 90, 140, 0.5) 80%, #3d5a8c 100%)`
                    }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-800/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Enhanced Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-800/30 via-blue-700/20 to-transparent rounded-full blur-xl -z-10 animate-pulse-glow" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }} />

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-[#3d5a8c]/40 rounded-full animate-float opacity-0 ${
                      isLoaded ? 'opacity-100' : ''
                    }`}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 10}%`,
                      animationDelay: `${2 + i * 0.3}s`,
                      animationDuration: `${4 + i * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Services Section */}
          <div 
            className={`mt-8 sm:mt-10 lg:mt-8 opacity-0 ${
              isLoaded ? 'animate-slide-up' : ''
            }`}
            style={{ animationDelay: '1.6s' }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={service.number}
                    className={`group relative text-left service-card opacity-0 ${
                      isLoaded ? 'animate-slide-up' : ''
                    }`}
                    style={{ 
                      animationDelay: `${2 + index * 0.1}s`,
                    }}
                  >
                    <div className="space-y-2 sm:space-y-3 p-4 rounded-xl hover:bg-white/50 hover:backdrop-blur-sm transition-all duration-300 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-[#3d5a8c]/60 font-mono text-xs sm:text-sm">
                          #{service.number}
                        </span>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3d5a8c]/10 group-hover:bg-[#3d5a8c]/20 transition-colors duration-300">
                          <IconComponent className="w-4 h-4 text-[#3d5a8c] group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                      <h3 className="text-[#3d5a8c] font-semibold text-base sm:text-lg group-hover:text-[#2d4466] transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      {/* Hover underline effect */}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-[#3d5a8c] to-blue-600 group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated dots with enhanced effects */}
          <div 
            className={`absolute top-1/4 left-4 sm:left-8 w-2 h-2 bg-[#3d5a8c]/30 rounded-full opacity-0 ${
              isLoaded ? 'animate-slide-up' : ''
            }`}
            style={{ 
              animationDelay: '2.5s',
              animation: isLoaded ? 'slideInUp 1s ease-out 2.5s forwards, float 4s ease-in-out 3.5s infinite' : 'none'
            }}
          />
          <div 
            className={`absolute top-1/3 right-6 sm:right-12 w-3 h-3 bg-[#3d5a8c]/40 rounded-full opacity-0 ${
              isLoaded ? 'animate-slide-up' : ''
            }`}
            style={{ 
              animationDelay: '3s',
              animation: isLoaded ? 'slideInUp 1s ease-out 3s forwards, float 5s ease-in-out 4s infinite' : 'none'
            }}
          />
          <div 
            className={`absolute bottom-1/4 left-8 sm:left-16 w-1 h-1 bg-[#3d5a8c]/50 rounded-full opacity-0 ${
              isLoaded ? 'animate-slide-up' : ''
            }`}
            style={{ 
              animationDelay: '2.8s',
              animation: isLoaded ? 'slideInUp 1s ease-out 2.8s forwards, float 6s ease-in-out 3.8s infinite' : 'none'
            }}
          />

          {/* Additional floating elements */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-[#3d5a8c]/20 rounded-full opacity-0 ${
                isLoaded ? 'animate-slide-up' : ''
              }`}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
                animationDelay: `${3 + i * 0.2}s`,
                animation: isLoaded ? `slideInUp 1s ease-out ${3 + i * 0.2}s forwards, float ${4 + i * 0.3}s ease-in-out ${4 + i * 0.2}s infinite` : 'none'
              }}
            />
          ))}
        </div>

        {/* Scroll indicator with animation */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 ${
            isLoaded ? 'animate-slide-up' : ''
          }`}
          style={{ animationDelay: '3.5s' }}
        >
          <div className="flex flex-col items-center space-y-2 text-[#a1a1a1]">
            <span className="text-sm font-mono">Scroll</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-[#3d5a8c]/60 to-transparent animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;