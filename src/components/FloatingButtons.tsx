import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Github, Instagram, Linkedin, Link, Youtube, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/data/settingsStore';

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const settings = useSettings();

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: settings.socials.github },
    { icon: Youtube, label: 'YouTube', url: settings.socials.youtube },
    { icon: Facebook, label: 'Facebook', url: settings.socials.facebook },
    { icon: Instagram, label: 'Instagram', url: settings.socials.instagram },
    { icon: Linkedin, label: 'LinkedIn', url: settings.socials.linkedin }
  ].filter((s) => s.url);

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
    const message = encodeURIComponent('Hello! I\'m interested in your services.');
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
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
            className="bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-white p-3 rounded-full shadow-lg hover:brightness-95 transition-all duration-300"
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
            className="bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-white p-3 rounded-full shadow-lg hover:brightness-95 transition-all duration-300"
            aria-label={social.label}
          >
            <social.icon className="h-5 w-5" />
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
        className="bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-white p-3 rounded-full shadow-lg hover:brightness-95 transition-all duration-300"
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
