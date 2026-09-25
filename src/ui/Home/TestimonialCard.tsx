import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const TestimonialCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Josephine Chibuike",
      role: "Virtual Assistant",
      company: "Professional Services",
      project: "Portfolio Website",
      quote: "Godfrey didn't just build me a website — he built me a brand presence. Clients now take me seriously before we even speak. The portfolio he delivered is clean, fast, and converts.",
      image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518877/josephine-portfolio2_z8i2j0.png"
    },
    {
      id: 2,
      name: "Racheal Sule",
      role: "Product Designer",
      company: "Design Studio",
      project: "Portfolio Website",
      quote: "As a designer, I notice every detail — and Godfrey got them all right. He translated my vision into pixel-perfect code and even improved interactions I hadn't thought of. Working with him felt effortless.",
      image: "/IMG_7452.PNG"
    },
    {
      id: 3,
      name: "CEO",
      role: "Founder",
      company: "Mike + MikePartners",
      project: "Company Website",
      quote: "Our firm needed a website that matched the quality of our work. Godfrey delivered a platform that presents our properties and projects with real professionalism — clients comment on it constantly.",
      image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518879/mikeandmike_r5as4d.png"
    },
    {
      id: 4,
      name: "Dr. Prophet Maseke Daniels",
      role: "Founder",
      company: "Maseke Daniel Ministries",
      project: "Website & Mobile App",
      quote: "Godfrey built our ministry's website, mobile app and admin dashboard — and understood our mission from day one. Our members now connect with sermons and devotionals from anywhere. Truly excellent work.",
      image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518879/maseke_qdczyv.png"
    },
    {
      id: 5,
      name: "Director",
      role: "Founder",
      company: "MindfulYouth Hub",
      project: "Web & Mobile Platform",
      quote: "From courses to coaching tools, Godfrey turned our vision for young people into a working platform across web and mobile. He thinks beyond code — he thinks about the people using it.",
      image: "/mindfulyouth.png"
    },
    {
      id: 6,
      name: "Lead Pastor Elijah Amusan",
      role: "Lead Pastor",
      company: "Cornerstone Christian Centre",
      project: "Church Management System",
      quote: "The system Godfrey built transformed how our church operates — giving, membership, devotionals, sermons, all in one place. He took time to understand ministry needs most developers would miss.",
      image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518859/cornerstone-app_wvsai3.png"
    },
    {
      id: 7,
      name: "Founder",
      role: "CEO",
      company: "Gefyra Agency",
      project: "Company Website",
      quote: "Godfrey captured exactly what Gefyra stands for — a bridge between talent and business. The site is fast, elegant, and communicates our value clearly. He asks the right questions before writing a line of code.",
      image: "/logo-mono.png"
    },
    {
      id: 8,
      name: "Product Lead",
      role: "Engineering",
      company: "Workbrook",
      project: "Web & Mobile Platform",
      quote: "Godfrey shipped full-stack features across our web and mobile apps with real ownership — work management, collaboration tools, real-time updates. Reliable, fast, and easy to work with.",
      image: "/logo-mono.png"
    },
    {
      id: 9,
      name: "Founder",
      role: "CEO",
      company: "Altior CRM",
      project: "CRM System",
      quote: "Altior CRM handles our entire customer pipeline — contacts, leads, daily operations. Godfrey built a system that's both powerful and simple to use. It changed how our team works.",
      image: "/logo-mono.png"
    }
  ]

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 9000)
    return () => clearInterval(interval)
  }, [nextTestimonial])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#0d0d0f] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Clients Say"
          description="Real feedback from people I've built for — ministries, businesses and founders."
        />

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gray-50 dark:bg-[#141414] rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-white/10"
          >
            {/* Quote mark */}
            <span className="absolute -top-5 left-8 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#d4a017] to-[#b8860b] text-white shadow-lg shadow-[#d4a017]/25">
              <Quote className="h-5 w-5" />
            </span>

            <blockquote className="text-lg lg:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-[#d4a017]/30 bg-[#d4a017]/10"
              />
              <div>
                <cite className="text-gray-900 dark:text-white font-bold not-italic block">
                  {currentTestimonial.name}
                </cite>
                <p className="text-sm text-[#9a6f00] dark:text-[#e9c766] font-medium">
                  {currentTestimonial.role} · {currentTestimonial.company}
                </p>
              </div>
              <span className="ml-auto hidden sm:inline-block rounded-full bg-[#3d5a8c]/10 dark:bg-[#8fb4e8]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3d5a8c] dark:text-[#8fb4e8]">
                {currentTestimonial.project}
              </span>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-white flex items-center justify-center hover:brightness-95 transition-all duration-300 hover:scale-110 shadow-lg"
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
                      ? 'bg-[#d4a017] scale-125'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-white flex items-center justify-center hover:brightness-95 transition-all duration-300 hover:scale-110 shadow-lg"
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
