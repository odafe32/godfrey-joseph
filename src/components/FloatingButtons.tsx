import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, MessageSquare, Github, Instagram, Linkedin, Globe, Link, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/odafe32' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/odafegodfrey/?__pwa=1' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/godfrey-joseph-a06370248/' },
    { icon: Video, label: 'TikTok', url: 'https://tiktok.com/@yourusername' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    const phoneNumber = '2347019259834'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hello! I\'m interested in your services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="bg-[#3d5a8c] text-white p-3 rounded-full shadow-lg hover:bg-[#3d5a8c]/90 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Social Media Buttons */}
      <AnimatePresence>
        {showSocial && socialLinks.map((social, index) => (
          <motion.button
            key={social.label}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(social.url, '_blank')}
            className="bg-[#3d5a8c] text-white p-3 rounded-full shadow-lg hover:bg-[#3d5a8c]/90 transition-all duration-300"
            aria-label={social.label}
          >
            {social.label === 'TikTok' ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            ) : (
              <social.icon className="h-5 w-5" />
            )}
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Social Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSocial(!showSocial)}
        className="bg-[#3d5a8c] text-white p-3 rounded-full shadow-lg hover:bg-[#3d5a8c]/90 transition-all duration-300"
        aria-label="Social Media"
      >
        <Link className="h-5 w-5" />
      </motion.button>

      {/* WhatsApp Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openWhatsApp}
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default FloatingButtons;
