import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, Award } from 'lucide-react'

const ImpactMetrics = () => {
  const metrics = [
    {
      value: "15+",
      label: "Projects Completed",
      description: "Full-stack applications and systems delivered successfully",
      icon: Target
    },
    {
      value: "10+",
      label: "Technologies Mastered",
      description: "Expertise in modern web technologies and frameworks",
      icon: TrendingUp
    },
    {
      value: "100%",
      label: "On-Time Delivery",
      description: "All projects delivered before deadlines with quality",
      icon: Award
    },
    {
      value: "4.9",
      label: "Client Satisfaction",
      description: "Average rating from satisfied clients",
      icon: Users
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-amber-50/20 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#3d5a8c]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-[#3d5a8c]/30 rounded-full animate-pulse [animation-delay:1s]" />
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
            Impact Metrics
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            My Impact in Numbers
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Measurable results that demonstrate the value of professional software development and technical solutions
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#3d5a8c] to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 p-8 border border-gray-100">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3d5a8c]/10 to-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-[#3d5a8c]" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  
                  {/* Label */}
                  <div className="text-xl font-semibold text-gray-800 mb-3">{metric.label}</div>
                  
                  {/* Description */}
                  <div className="text-sm text-gray-600 leading-relaxed">{metric.description}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            <div className="text-center">
              <div className="mb-8">
                <span className="text-[#3d5a8c] text-sm font-semibold tracking-wide uppercase">
                  Client Testimonial
                </span>
              </div>
              
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                "Godfrey Joseph delivered exceptional software solutions that exceeded our expectations. His technical expertise and attention to detail transformed our digital presence."
              </blockquote>
              
              <cite className="text-gray-900 font-bold text-lg lg:text-xl not-italic">
                CEO, Davion Wears
              </cite>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactMetrics
