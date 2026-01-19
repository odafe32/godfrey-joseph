import React from 'react'
import { motion } from 'framer-motion'

const TestimonialCard = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-amber-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#7d4934]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-amber-600/30 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#7d4934]/40 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-[#7d4934]/80 text-sm font-semibold tracking-wider uppercase bg-[#7d4934]/10 px-4 py-2 rounded-full mb-6 inline-block">
            Testimonials
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            What Clients Say
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Real feedback from real clients about the quality and dedication I bring to every project
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#7d4934] to-amber-600 mx-auto rounded-full" />
        </motion.div>

        {/* Testimonial Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            <div className="flex flex-col items-center text-center gap-8">
              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="mb-6">
                  <span className="text-[#7d4934] text-sm font-semibold tracking-wide uppercase">
                    Testimonial
                  </span>
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                  "Love it! Keep it up, Josephine. Your work always exceeds expectations."
                </blockquote>
                
                <cite className="text-gray-900 font-bold text-lg lg:text-xl not-italic">
                  Margaret Auta
                </cite>
              </div>
              
              {/* Profile Image */}
              <div className="w-full">
                <div className="w-full h-64 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="/img/IMG_7452.PNG" 
                    alt="Margaret Auta" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialCard
