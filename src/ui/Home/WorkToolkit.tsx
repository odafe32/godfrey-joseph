import React from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, Target, BarChart3, Zap, TrendingUp, CheckCircle2, TrendingDown, Activity } from 'lucide-react';

interface WorkStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
}

const HowIWork: React.FC = () => {
  const workSteps: WorkStep[] = [
    {
      id: 1,
      title: "Discovery & Analysis",
      description: "Understand project requirements, user needs, technical specifications, and feasibility analysis.",
      icon: Search,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500"
    },
    {
      id: 2,
      title: "Design & Architecture",
      description: "Plan system architecture, choose technologies, create wireframes, and design user interfaces.",
      icon: Settings,
      bgColor: "bg-blue-50", 
      iconColor: "text-blue-500"
    },
    {
      id: 3,
      title: "Development",
      description: "Code implementation, version control, agile development, and iterative building.",
      icon: Zap,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-500"
    },
    {
      id: 4,
      title: "Testing & Deployment",
      description: "Quality assurance, CI/CD pipelines, launch, monitoring, and maintenance.",
      icon: Activity,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      
      {/* Background Pattern - subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(61, 90, 140, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61, 90, 140, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Left side with header - matches sidebar style */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-20">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-800 mb-8 leading-tight"
              >
                How I Work
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 leading-relaxed mb-12 max-w-lg"
              >
                My software development methodology ensures robust, scalable solutions from concept to deployment.
              </motion.p>

              {/* Progress indicators */}
              <div className="hidden lg:block space-y-4">
                {workSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    className="flex items-center text-sm text-gray-400 group-hover:text-[#3d5a8c] transition-colors duration-300"
                  >
                    <div className={`w-2 h-2 rounded-full mr-3 transition-colors duration-300 ${
                      index < workSteps.length - 1 ? 'bg-gray-300 group-hover:bg-[#3d5a8c]' : 'bg-green-500'
                    }`}></div>
                    <span className="font-medium">{step.title}</span>
                    {index < workSteps.length - 1 && (
                      <CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Process Steps */}
          <div className="lg:col-span-7">
            <div className="space-y-12">
              {workSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.15) }}
                  className="group relative"
                >
                  {/* Connecting line for all but last */}
                  {index < workSteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-px h-20 bg-gradient-to-b from-gray-200 to-transparent"></div>
                  )}

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.15) }}
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-md border border-gray-100`}
                    >
                      <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.15) }}
                        className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300"
                      >
                        {step.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 + (index * 0.15) }}
                        className="text-gray-600 leading-relaxed text-base"
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-16 pt-12 border-t border-gray-100"
            >
              <div className="bg-gradient-to-r from-[#3d5a8c]/5 to-amber-600/5 rounded-2xl p-8">
                <p className="text-gray-700 text-lg italic leading-relaxed">
                  "Software development is not about perfection — it's about functionality and scalability."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
