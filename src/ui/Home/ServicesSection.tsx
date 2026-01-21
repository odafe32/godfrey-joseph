import { motion } from 'framer-motion';
import { Users, Calendar, Plane, FileText, Database, DollarSign, ArrowRight, Check, Coins, CoinsIcon, FolderArchive, Linkedin, BrickWallShieldIcon } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: BrickWallShieldIcon,
      title: "Brand Management",
      description: " content strategy, and engagement to elevate your professional presence.",
      features: [ "Content Strategy", "Outreach Campaigns", "Analytics & Reporting"],
      popular: true
    },
    {
      icon: Calendar,
      title: "Calendar & Inbox",
      description: "Streamlined scheduling, email management, and appointment coordination for maximum efficiency.",
      features: ["Calendar Management", "Email Organization", "Appointment Scheduling", "Time Management"],
      popular: false
    },
    {
      icon: Plane,
      title: "Travel & Logistics",
      description: "Detailed itineraries, booking management, and seamless travel coordination.",
      features: ["Travel Planning", "Booking Management", "Itinerary Creation", "Logistics Coordination"],
      popular: false
    },
    {
      icon: FileText,
      title: "Proposals & Presentations",
      description: "Professional slide decks and strategy documents that convert prospects into clients.",
      features: ["Custom Design", "Content Development", "Visual Branding", "Revisions Included"],
      popular: false
    },
    {
      icon: FolderArchive,
      title: "Data & Research",
      description: "Accurate data entry, comprehensive research, and organised information management.",
      features: ["Data Entry", "Market Research", "Information Organization", "Report Generation"],
      popular: false
    },
    {
      icon: CoinsIcon,
      title: "Financial Admin",
      description: "Invoice creation, payment tracking, and financial documentation support.",
      features: ["Invoice Creation", "Payment Tracking", "Financial Documentation", "Budget Management"],
      popular: false
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-amber-50/20 relative overflow-hidden" id="services">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #7d4934 1px, transparent 1px)`,
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
            <span className="text-[#7d4934]/80 text-sm font-semibold tracking-wider uppercase bg-[#7d4934]/10 px-4 py-2 rounded-full mb-6 inline-block">
            Services
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
         Virtual Assistance Services
          </motion.h2>
          <p className="text-md text-gray-600 max-w-3xl mx-auto mb-8">
           Comprehensive support tailored to help you focus on what matters most whilst I handle the details that keep your business running smoothly.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#7d4934] to-amber-600 mx-auto rounded-full" />
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
                    ? 'border-[#7d4934] hover:ring-2 hover:ring-[#7d4934]/20' 
                    : 'border-gray-200 hover:border-[#7d4934]/50'
                } p-8 group`}
              >

                <div className="w-16 h-16 bg-gradient-to-br from-[#7d4934]/10 to-amber-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-[#7d4934]" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7d4934] transition-colors duration-300">
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
                    className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 hover:bg-[#7d4934] hover:text-white hover:shadow-lg block"
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
                 <a href="https://calendly.com/josephinechibuike17/brand-strategy-consultation" target='blank'>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#7d4934] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#7d4934]/90 transition-all duration-300 shadow-lg"
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
