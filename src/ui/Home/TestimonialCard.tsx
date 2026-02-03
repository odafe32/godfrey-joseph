import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TestimonialCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Josephine Chibuike",
      role: "Virtual Assistant",
      company: "Professional Services",
      quote: "Working with Godfrey has been transformative for my career. His technical expertise and guidance helped me build a professional portfolio that truly represents my brand. Highly recommended!",
      image: "/josephine-portfolio2.png"
    },
    {
      id: 2,
      name: "Racheal Sule",
      role: "Product Designer",
      company: "Design Studio",
      quote: "Godfrey's attention to detail and ability to translate design concepts into functional code is exceptional. He delivered a stunning portfolio that exceeded all my expectations.",
      image: "/IMG_7452.PNG"
    },
    {
      id: 3,
      name: "CEO",
      role: "Founder",
      company: "Mike + MikePartners",
      quote: "The real estate platform Godfrey built for us is robust, scalable, and user-friendly. His professionalism and technical skills are top-notch. A true software engineer!",
      image: "/mikeandmike.png"
    },
    {
      id: 4,
      name: "Dr. Prophet Maseke Daniels",
      role: "Founder",
      company: "Maseke Daniel Ministries",
      quote: "Godfrey developed an amazing mobile app and admin dashboard for our ministry. His dedication to quality and understanding of our needs made the project a huge success.",
      image: "/maseke.png"
    },
    {
      id: 5,
      name: "Director",
      role: "Founder",
      company: "MindfulYouth Hub",
      quote: "The web and mobile platform Godfrey created for MindfulYouth Hub is exactly what we needed. His technical expertise and creative problem-solving are outstanding.",
      image: "/mindfulyouth.png"
    },
    {
      id: 6,
      name: "Lead Pastor Elijah Amusan",
      role: "Lead Pastor",
      company: "Cornerstone Christian Centre",
      quote: "Godfrey built a comprehensive church management system that has revolutionized how we operate. His technical skills and understanding of our ministry needs are exceptional.",
      image: "/cornerstone-app.png"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 9000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-amber-50/20 relative overflow-hidden">
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
          <div className="w-32 h-1 bg-gradient-to-r from-[#3d5a8c] to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center gap-8">
              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="mb-6">
                  <span className="text-[#3d5a8c] text-sm font-semibold tracking-wide uppercase">
                    Testimonial
                  </span>
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                <div className="space-y-2">
                  <cite className="text-gray-900 font-bold text-lg lg:text-xl not-italic block">
                    {currentTestimonial.name}
                  </cite>
                  <p className="text-gray-600 text-sm">
                    {currentTestimonial.role} • {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-[#3d5a8c] text-white flex items-center justify-center hover:bg-[#3d5a8c]/90 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#3d5a8c] scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-[#3d5a8c] text-white flex items-center justify-center hover:bg-[#3d5a8c]/90 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialCard
