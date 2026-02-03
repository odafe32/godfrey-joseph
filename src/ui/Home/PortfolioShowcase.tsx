import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
interface Project {
  id: number;
  title: string;
  category: string;
  number: string;
  image: string;
  description?: string;
  link: string;
}

const PortfolioShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [carouselSize, setCarouselSize] = useState({ width: 400, height: 600 });
  const [radius, setRadius] = useState(320);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Davion Wears - Premium Fashion E-commerce",
      category: "E-commerce",
      number: "01",
      image: "/shop-with-davion.png",
      description: "Full-stack PWA e-commerce platform built with Laravel, React, REST API, and Shadcn UI. Features premium fashion products, shopping cart, user authentication, payment integration, admin backend, and dashboard for frontend control. Deployed on VPS with custom setup.",
      link: "https://shopwithdavion.com/"
    },
    {
      id: 2,
      title: "Josephine Chibuike",
      category: "Portfolio",
      number: "02",
      image: "/josephine-portfolio2.png",
      description: "Professional portfolio website for a Brand Strategist and Virtual Assistant, built with modern web technologies. Features responsive design, brand strategy showcase, service offerings",
      link: "https://josephine-portfolio-one.vercel.app/"
    },
    {
      id: 3,
      title: "Cornerstone Global - Church Management App",
      category: "Full-Stack & Mobile Development",
      number: "03",
      image: "/cornerstone-app.png",
      description: "Full-stack church management application with mobile support, built using Laravel backend, REST API, Shadcn UI, TypeScript, and React Native. Features include giving, membership registration, devotionals, sermons, counselling, and comprehensive backend with admin panel for seamless church operations. Deployed on VPS with custom setup.",
      link: "https://app.cornerstoneglobal.org"
    },
    {
      id: 4,
      title: "Mike + MikePartners - Real Estate",
      category: "Full-Stack Development",
      number: "04",
      image: "/mikeandmike.png",
      description: "Full-stack development for Mike + MikePartners, a real estate and architectural firm offering services in buying/selling/renting properties, architectural design, interior design, master planning, consultancy, and project management. Built with Laravel and PHP. Features company overview, team profiles, service listings, and project showcases.",
      link: "https://mikeandmikepartners.com/"
    },
    {
      id: 5,
      title: "MindfulYouth Hub",
      category: "Full-Stack & Mobile Development",
      number: "05",
      image: "/mindfulyouth.png",
      description: "Full-stack web and mobile application for MindfulYouth Hub, a youth-focused creative and educational platform. Built with Laravel, React, and TypeScript. Features digital courses, coaching programs, creative content, and goal setting tools. Includes logo design and VPS deployment with custom setup.",
      link: "https://themindfulyouthhub.com/"
    },
    {
      id: 6,
      title: "MovieAI - AI Movie Recommendations",
      category: "AI Development",
      number: "06",
      image: "/movie-ai.png",
      description: "Revolutionizing movie discovery with AI-powered recommendations. Experience the future of movie discovery with advanced AI. Simply describe what you're in the mood for, and we'll find your perfect match. Features AI-powered recommendations, smart search using natural language processing, vast library across all genres, and advanced vector search technology.",
      link: "#"
    },
    
  ];

  // Responsive carousel size and radius
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCarouselSize({ width: 300, height: 450 });
        setRadius(200);
      } else {
        setCarouselSize({ width: 400, height: 600 });
        setRadius(320);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRotating, projects.length]);

  const handleProjectClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoRotating(false);
    
    // Resume auto-rotation after 10 seconds
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 10000);
  };

  const getTransform = (index: number) => {
    const diff = index - currentIndex;
    const totalProjects = projects.length;
    
    // Calculate angle for circular arrangement
    const angle = (360 / totalProjects) * diff;
    
    // Calculate 3D position
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius - radius;
    
    // Scale and opacity based on position
    const scale = diff === 0 ? 1.2 : Math.max(0.7, 1 - Math.abs(diff) * 0.2);
    const opacity = diff === 0 ? 1 : Math.max(0.4, 1 - Math.abs(diff) * 0.3);
    
    return {
      transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
      opacity,
      zIndex: diff === 0 ? 10 : Math.max(1, 5 - Math.abs(diff))
    };
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden" id="projects">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Abstract shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#3d5a8c]/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-[#3d5a8c]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-[#3d5a8c]/10 via-transparent to-[#3d5a8c]/10 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block">
            <span className="text-[#3d5a8c]/80 text-sm font-semibold tracking-wider uppercase  px-4 py-2 rounded-full mb-6 inline-block animate-[fadeInUp_1s_ease-out]">
              Portfolio
            </span>
          </div>
          
       
            <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                    >
              Featured Projects & Solutions
                    </motion.h2>
          
          <p className="text-lg sm:text-md text-gray-600 max-w-2xl mx-auto mb-8 animate-[fadeInUp_1s_ease-out] [animation-delay:0.4s] [animation-fill-mode:both]">
          Real-world solutions I've built, from web applications and mobile apps to cloud infrastructure and digital transformation projects
          </p>
          
          {/* CTA Button */}
          {/* <button className="group relative inline-flex items-center gap-3 bg-[#7d4934] hover:bg-[#7d4934]/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-[fadeInUp_1s_ease-out] [animation-delay:0.6s] [animation-fill-mode:both]">
            <span>See more Projects</span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
              </svg>
            </div>
          </button> */}
        </div>

        {/* 3D Carousel */}
        <div className="relative overflow-hidden mb-8 lg:mb-0">
          <div 
            className="flex justify-center items-center mx-auto"
            style={{ 
              perspective: '1000px',
              height: `${carouselSize.height}px`
            }}
          >
            <motion.div 
              className="relative"
              style={{ 
                transformStyle: 'preserve-3d',
                width: `${carouselSize.width}px`,
                height: `${carouselSize.height}px`
              }}
            >
              {projects.map((project, index) => (
                <a
                  key={project.id}
                  href={project.link}
                  target='blank'
                  className="absolute cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    width: '300px',
                    height: '400px',
                    left: '50px',
                    top: '50px',
                    ...getTransform(index)
                  }}
                  onClick={(e) => {
                    // Allow carousel navigation on middle click or ctrl+click
                    if (e.metaKey || e.ctrlKey) {
                      e.preventDefault();
                      handleProjectClick(index);
                    }
                  }}
                >
                  {/* Project Card */}
                  <div className="relative w-full h-full group">
                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                      {/* Content Overlay */}
                      <div className={`absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 ${index === currentIndex ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
                        <div className="text-white">
                          <span className="text-[#3d5a8c] text-sm font-medium">#{project.number}</span>
                          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                          <p className="text-gray-200 text-sm">{project.category}</p>
                        </div>
                      </div>

                      {/* Hover Border */}
                      <div className="absolute inset-0 border-2 border-[#3d5a8c] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
              onClick={() => handleProjectClick((currentIndex - 1 + projects.length) % projects.length)}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5 text-[#3d5a8c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Navigation Dots */}
            <div className="flex items-center gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleProjectClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#3d5a8c] scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handleProjectClick((currentIndex + 1) % projects.length)}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <svg className="w-5 h-5 text-[#3d5a8c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Project Info Panel */}
          <div className="relative lg:absolute lg:bottom-10 lg:left-auto lg:right-10 lg:w-80 mt-4 lg:mt-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#3d5a8c] text-2xl font-black">#{projects[currentIndex].number}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{projects[currentIndex].title}</h3>
                  <p className="text-gray-600 text-sm">{projects[currentIndex].category}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {projects[currentIndex].description}
              </p>

              {/* Auto-rotation indicator */}

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PortfolioShowcase;
