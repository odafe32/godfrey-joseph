import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BrandSupportSection: React.FC = () => {
  const expectations = [
    "End-to-end software development lifecycle management",
    "Scalable architecture design and implementation",
    "Timely delivery with quality assurance",
    "Ongoing support and maintenance services"
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-blue-50/20 relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#3d5a8c]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-600/30 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#3d5a8c]/40 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-[#3d5a8c]/80 text-sm font-semibold tracking-wider uppercase bg-[#3d5a8c]/10 px-4 py-2 rounded-full mb-6 inline-block">
            Contact
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Your Projects Deserve Expert Development
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Ready to bring your ideas to life? Let's collaborate to build scalable, innovative software solutions.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#3d5a8c] to-blue-600 mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're a startup launching your MVP, an enterprise modernizing your systems, or a business owner needing custom software, I'm here to deliver high-quality, efficient solutions.
              </p>
            </div>

            {/* What You Can Expect Section */}
            <div className="space-y-6">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl font-semibold text-gray-700 mb-6"
              >
                What You Can Expect:
              </motion.h3>
              
              <div className="space-y-4">
                {expectations.map((expectation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-[#3d5a8c] rounded-full mt-3"></div>
                    <p className="text-gray-600 leading-relaxed">
                      {expectation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <a 
                href="mailto:godfrey.joseph@example.com" 
                className="bg-[#3d5a8c] hover:bg-[#3d5a8c]/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center space-x-2"
              >
                <span>Let's Build Something Great</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="relative w-80 h-96 lg:w-96 lg:h-[480px]">
                {/* Main Image */}
                <img 
                  src="/odafe2.jpg"
                  alt="Godfrey Joseph - Full-Stack Software Engineer"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                
                {/* Placeholder if no image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">�‍�</div>
                    <p className="text-lg font-medium">Software Developer Photo</p>
                    <p className="text-sm opacity-60">Replace with your image</p>
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3d5a8c]/10 via-blue-600/10 to-[#3d5a8c]/10 rounded-2xl -z-10 blur-xl" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#3d5a8c]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#3d5a8c]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-blue-600/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#3d5a8c]/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default BrandSupportSection;