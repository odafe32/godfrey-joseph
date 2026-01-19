import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Target, Award } from 'lucide-react';

const AboutSection = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Executive Virtual Support",
      description: "Inbox, calendar, travel coordination, and operational support for founders and executives."
    },
    {
      icon: Users,
      title: "Brand & LinkedIn Management",
      description: "Profile optimisation, outreach structure, and content support for professional visibility."
    },
    {
      icon: Target,
      title: "Proposals & Pitch Decks",
      description: "Clear, conversion-focused decks and documents for partnerships and client acquisition."
    },
    {
      icon: Award,
      title: "Operational Structure",
      description: "Systems, workflows, and documentation that bring clarity and efficiency to growing brands."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#7d4934]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-amber-600/30 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#7d4934]/40 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
           className="text-[#7d4934]/80 text-sm font-semibold tracking-wider uppercase bg-[#7d4934]/10 px-4 py-2 rounded-full mb-6 inline-block">
          
            About Me
          </motion.p>
          <motion.h2 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                   >
                     The Brand Behind the Brand
                   </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7d4934] to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Josephine Chibuike
              </h3>
              <p className="text-[#7d4934] font-medium text-lg">
                Virtual Assistant | Administrative & Creative Support Specialist
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              I'm a passionate and detail-oriented Virtual Assistant with hands-on experience supporting busy professionals, entrepreneurs, and creative brands. From managing schedules to creating proposals that convert, I bring order, clarity, and creativity into every workspace I support.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              Over time, I've had the privilege of working with diverse clients across different industries, from entertainment managers and hairstylists to real estate consultants and e-commerce brands. My work has ranged from LinkedIn optimization, outreach emails, and proposal development to data entry, invoicing, and calendar management.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              What sets me apart is my ability to adapt quickly, learn new tools, and stay proactive even in fast-paced environments. I'm not just here to complete tasks. I'm here to help businesses grow efficiently through organization, communication, and strategy.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              I believe that every brand deserves structure, and every client deserves peace of mind knowing their operations are in capable hands.
            </p>

            <div className="pt-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#7d4934] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7d4934]/90 transition-colors duration-300"
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <img 
                src="/logo.JPG"
                alt="Josephine Chibuike - Executive Virtual Assistant"
                className="w-full max-w-md h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7d4934]/20 to-amber-600/20 rounded-2xl -z-10 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
