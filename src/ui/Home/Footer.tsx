import React, { useEffect } from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import { ArrowRight, Facebook, Instagram, Youtube, Music, Linkedin } from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      const footer = document.querySelector('[data-footer-animate]');
      if (footer) {
        footer.setAttribute('data-animate', 'true');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer 
      data-footer-animate
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative bg-[#1a1a1a] text-white overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-[200px] font-black">Josephine</span>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          
          {/* Left Section - Brand Info */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white">Josephine</h3>
              <p className="text-[#7d4934] text-sm mt-2">The brand behind the brand</p>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-sm leading-relaxed max-w-sm"
            >
              Helping you work smarter, not harder. Executive virtual assistance and brand support services that elevate your business.
            </motion.p>
            
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#7d4934] text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-[#7d4934]/90 transition-all duration-300"
            >
              <span>Get in touch</span>
              <motion.div 
                className="bg-white text-[#7d4934] rounded-full p-1 ml-2 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-3 w-3" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Middle Section - Menu */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.h4 
              variants={itemVariants}
              className="text-[#7d4934] font-semibold text-lg"
            >Menu</motion.h4>
            <motion.nav 
              variants={itemVariants}
              className="space-y-3"
            >
              {['Home', 'Services', 'About', 'Projects', 'Contact'].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="block text-gray-400 hover:text-white transition-colors duration-200 mb-3 last:mb-0"
                >
                  {item}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>

          {/* Right Section - Social */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.h4 
              variants={itemVariants}
              className="text-[#7d4934] font-semibold text-lg"
            >Social</motion.h4>
            <motion.nav 
              variants={itemVariants}
              className="space-y-3"
            >
              {[
                { icon: Facebook, name: 'Facebook', href: '#' },
                { icon: Instagram, name: 'Instagram', href: '#' },
                { icon: Music, name: 'TikTok', href: '#' },
                { icon: Linkedin, name: 'Linkedin', href: '#' }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a 
                    key={social.name}
                    href={social.href}
                    variants={socialVariants}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 mb-3 last:mb-0"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="h-4 w-4" />
                    </motion.div>
                    <span>{social.name}</span>
                  </motion.a>
                );
              })}
            </motion.nav>
          </motion.div>
        </motion.div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 mt-5 pt-8 border-t border-gray-800"
        >
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center mt items-center gap-2 md:gap-4 text-center md:text-left"
          >
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 text-xs"
            >
              ©{new Date().getFullYear()} Copyright
            </motion.p>
            <span className="hidden md:inline text-gray-500 text-xs">•</span>
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 text-xs"
            >
              All rights reserved
            </motion.p>
            <span className="hidden md:inline text-gray-500 text-xs">•</span>
            <motion.p 
              variants={itemVariants}
              className="text-gray-500 text-xs"
            >
                <motion.a 
                  href="https:kagaykiglobal.cloud" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="hover:text-white transition-colors duration-200"
                >
                    Tech Partner:   <span className='text-orange-500'>KAGAYAKI GLOBAL </span>
               
                </motion.a>
            </motion.p>
          </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
