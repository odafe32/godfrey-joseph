import React from 'react';
import { motion } from 'framer-motion';

const ALXSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#7d4934]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-amber-600/30 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#7d4934]/40 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block">
            <span className="text-[#7d4934]/80 text-sm font-semibold tracking-wider uppercase bg-[#7d4934]/10 px-4 py-2 rounded-full mb-6 inline-block">
              Certification
            </span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            ALX
            <br />
            <span className="text-[#7d4934]">Professional Certification</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Professional certification in virtual assistant services and administrative support
          </motion.p>
        </div>

        {/* Certificate Display */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Certificate Container */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
              
              {/* Certificate Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src="/img/Alx.PNG"
                    alt="ALX Professional Certification"
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Certificate Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -top-4 -right-4 bg-[#7d4934] text-white rounded-full p-4 shadow-xl"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </motion.div>
              </div>

              {/* Certificate Title */}
              <div className="text-center mt-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  ALX Africa Virtual Assistant Program
                </h3>
                <p className="text-lg text-[#7d4934] font-semibold">
                  Professional Certification
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-3 bg-[#7d4934] hover:bg-[#7d4934]/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span>View Certificate</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ALXSection;
