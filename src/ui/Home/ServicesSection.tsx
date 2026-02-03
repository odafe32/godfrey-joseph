import { motion } from 'framer-motion';
import { Users, Calendar, Plane, FileText, Database, DollarSign, ArrowRight, Check, Coins, CoinsIcon, FolderArchive, Linkedin, BrickWallShieldIcon, Code, Lightbulb, Zap } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: "Full-Stack & Mobile Development",
      description: "Building scalable web and mobile applications with React, React Native, Laravel, Next.js, and modern frameworks.",
      features: ["Web Applications", "Mobile Apps", "API Development", "Database Design"],
      popular: true
    },
    {
      icon: Users,
      title: "IT Consulting & Strategy",
      description: "Providing technical guidance and strategic planning for digital transformation and technology adoption.",
      features: ["System Architecture", "Technical Strategy", "Digital Solutions", "Performance Optimization"],
      popular: false
    },
    {
      icon: Lightbulb,
      title: "Solution Design & Architecture",
      description: "Designing efficient, maintainable systems that solve real business problems and scale effectively.",
      features: ["Solution Architecture", "System Design", "Scalability Planning", "Technical Consulting"],
      popular: false
    },
    {
      icon: Zap,
      title: "Deployment, Scaling & Digital Visibility",
      description: "Ensuring systems run reliably, scale seamlessly, and increase your digital presence for maximum impact.",
      features: ["VPS Deployment", "System Monitoring", "SEO Optimization", "Digital Presence"],
      popular: false
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-amber-50/20 relative overflow-hidden" id="services">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3d5a8c 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
            <span className="text-[#3d5a8c]/80 text-sm font-semibold tracking-wider uppercase bg-[#3d5a8c]/10 px-4 py-2 rounded-full mb-6 inline-block">
            Services
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
         Digital Solutions & Technical Services
          </motion.h2>
          <p className="text-md text-gray-600 max-w-3xl mx-auto mb-8">
           Transforming ideas into scalable digital solutions. From concept to deployment, I build robust systems that amplify your digital presence and drive business growth.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#3d5a8c] to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border ${
                  service.popular 
                    ? 'border-[#3d5a8c] hover:ring-2 hover:ring-[#3d5a8c]/20' 
                    : 'border-gray-200 hover:border-[#3d5a8c]/50'
                } p-8 group`}
              >

                <div className="w-16 h-16 bg-gradient-to-br from-[#3d5a8c]/10 to-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-[#3d5a8c]" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#3d5a8c] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>


                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <a 
                    href="#contact"
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 hover:bg-[#3d5a8c] hover:text-white hover:shadow-lg block"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 border border-gray-200">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Need a Custom Solution?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              I offer tailored packages to meet your specific business needs. Let's discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <a href="mailto:godfreyj.sule1@gmail.com" target='blank'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3d5a8c] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#3d5a8c]/90 transition-all duration-300 shadow-lg"
              >
             
                Schedule Consultation
              
              </motion.button>
               </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
