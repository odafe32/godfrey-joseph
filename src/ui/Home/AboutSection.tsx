import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Lightbulb, Zap } from 'lucide-react';

const AboutSection = () => {
  const services = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Building scalable web applications with modern frameworks, APIs, and database architectures."
    },
    {
      icon: Users,
      title: "IT Consulting & Strategy",
      description: "Providing technical guidance and strategic planning for digital transformation initiatives."
    },
    {
      icon: Lightbulb,
      title: "Solution Design & Architecture",
      description: "Designing efficient, maintainable systems that solve real business problems."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Improving system performance, scalability, and user experience through technical expertise."
    }
  ];

  return (
   <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#3d5a8c]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-600/30 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#3d5a8c]/40 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
           className="text-[#3d5a8c]/80 text-sm font-semibold tracking-wider uppercase bg-[#3d5a8c]/10 px-4 py-2 rounded-full mb-6 inline-block">
          
            About Me
          </motion.p>
          <motion.h2 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                   >
                     Giving Visibility to You, Amplifying Your Influence
                   </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3d5a8c] to-blue-600 mx-auto rounded-full" />
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
                Godfrey Joseph Sule
              </h3>
              <p className="text-[#3d5a8c] font-medium text-lg">
               Full-Stack Software Engineer | IT Consultant | Systems Architect
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              I’m a Full-Stack Software Engineer and IT Consultant with more than half a decade of experience delivering scalable web and mobile applications, robust backend systems, and cloud-based solutions. My focus is helping individuals and businesses <strong>stand out, gain visibility, and achieve measurable impact through technology.</strong>
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              I specialize in <strong>React, React Native, Next.js, Laravel, Nest.js, and modern cloud platforms</strong>, translating complex requirements into <strong>reliable, maintainable, and performance-driven solutions</strong>. I bridge the gap between technical implementation and business strategy to ensure technology amplifies your goals.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
             I’ve partnered with diverse clients to transform thier ideas into scalable digital solutions, ensuring that it is reliable, visible and measurable .
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              My goal is simple: <strong>give visibility to your ideas and business, amplify your influence, and create solutions that make a difference</strong>. I don’t just build software, I help you leverage it to achieve real results.
            </p>


            <div className="pt-6">
                            <a href="mailto:godfreyj.sule1@gmail.com"  target='blank'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3d5a8c] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#3d5a8c]/90 transition-all duration-300 shadow-lg"
              >
             
               Get in touch
              
              </motion.button>
               </a>
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
                src="/odafe2.jpg"
                alt="Godfrey Joseph Sule - Full-Stack Software Engineer"
                className="w-full max-w-md lg:h-[400px] h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3d5a8c]/20 to-blue-600/20 rounded-2xl -z-10 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
