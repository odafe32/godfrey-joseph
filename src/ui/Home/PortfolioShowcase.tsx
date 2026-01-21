import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
interface Project {
  id: number;
  title: string;
  category: string;
  number: string;
  image: string;
  description?: string;
}

const PortfolioShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Linkedin Strategy Proposal for Mel's Meals",
      category: "Linkedin Strategy",
      number: "01",
      image: "/a.PNG",
      description: "Linkedin Strategy Proposal for Mel's Meals"
    },
    {
      id: 2,
      title: "Presentations", 
      category: "Proposals & Presentations",
      number: "02",
      image: "/b.jpg",
      description: "Professional slide decks and strategy documents that convert prospects into clients."
    },
    {
      id: 3,
      title: "Business Trip Planning Checklist",
      category: "Travel & Logistics", 
      number: "03",
      image: "/c.JPG",
      description: "Detailed itineraries, booking management, and seamless travel coordination."
    },
    {
      id: 4,
      title: "Management",
      category: "Management",
      number: "04", 
      image: "/d.JPG",
      description: "Account optimisation, content strategy, and engagement to elevate your professional presence"
    },
    {
      id: 5,
      title: "Product Reviews: Prism Curler & Ionic Straightener",
      category: "Financial Admin",
      number: "05",
      image: "/h.jpg",
      description: "Invoice creation, payment tracking, and financial documentation support"
    },
    {
      id: 6,
      title: "Brand Reports",
      category: "Data & Research",
      number: "06",
      image: "/f.jpg", 
      description: "Accurate data entry, comprehensive research, and organised information management."
    }
  ];

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
    const radius = 320;
    
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#7d4934]/20 to-amber-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-600/20 to-[#7d4934]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-[#7d4934]/10 via-transparent to-[#7d4934]/10 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block">
            <span className="text-[#7d4934]/80 text-sm font-semibold tracking-wider uppercase  px-4 py-2 rounded-full mb-6 inline-block animate-[fadeInUp_1s_ease-out]">
              Behind the Designs
            </span>
          </div>
          
       
            <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                    >
              A Glimpse Into My Work
                    </motion.h2>
          
          <p className="text-lg sm:text-md text-gray-600 max-w-2xl mx-auto mb-8 animate-[fadeInUp_1s_ease-out] [animation-delay:0.4s] [animation-fill-mode:both]">
          Real examples of the quality and attention to detail I bring to every project, from LinkedIn optimisation to comprehensive travel planning
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
        <div className="relative">
          <div 
            className="relative mx-auto"
            style={{ 
              height: '600px',
              perspective: '1200px',
              perspectiveOrigin: 'center center'
            }}
          >
            {/* Carousel Container */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                transformStyle: 'preserve-3d',
                width: '400px',
                height: '500px'
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="absolute cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    width: '300px',
                    height: '400px',
                    left: '50px',
                    top: '50px',
                    ...getTransform(index)
                  }}
                  onClick={() => handleProjectClick(index)}
                >
                  {/* Project Card */}
                  <div className="relative w-full h-full group">
                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                      {/* Placeholder for actual image */}

                      {/* comment this when using actual images */}
                      {/* <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-6xl font-black mb-4">#{project.number}</div>
                          <div className="text-lg font-semibold">{project.title}</div>
                        </div>
                      </div> */}
                      
                      {/* For actual images, uncomment this: */}
                   
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      /> 
                      
                     
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-white">
                          <span className="text-[#7d4934] text-sm font-medium">#{project.number}</span>
                          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                          <p className="text-gray-200 text-sm">{project.category}</p>
                        </div>
                      </div>
                      
                      {/* Hover Border */}
                      <div className="absolute inset-0 border-2 border-[#7d4934] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleProjectClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#7d4934] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Project Info Panel */}
          <div className="absolute bottom-10 left-10 right-10 lg:left-auto lg:right-10 lg:w-80">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#7d4934] text-2xl font-black">#{projects[currentIndex].number}</span>
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