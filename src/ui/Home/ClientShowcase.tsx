import React from 'react';
import { motion } from 'framer-motion';

interface Client {
  name: string;
  logo: string;
  testimonial?: string;
  project?: string;
  category?: string;
}

const ClientShowcase: React.FC = () => {
  const clients: Client[] = [
    {
      name: "Mel's Meals",
      logo: "/a.PNG",
      project: "LinkedIn Strategy Proposal",
      category: "LinkedIn Strategy"
    },
    {
      name: "Professional Services",
      logo: "/b.jpg", 
      project: "Presentations & Proposals",
      category: "Proposals & Presentations"
    },
    {
      name: "Travel Planning",
      logo: "/c.JPG",
      project: "Business Trip Planning",
      category: "Travel & Logistics"
    },
    {
      name: "Management Solutions",
      logo: "/d.JPG",
      project: "Account Management",
      category: "Management"
    },
    {
      name: "Product Reviews",
      logo: "/h.jpg",
      project: "Prism Products Review",
      category: "Financial Admin"
    },
    {
      name: "Brand Analytics",
      logo: "/f.jpg",
      project: "Brand Reports & Research",
      category: "Data & Research"
    },
    {
      name: "ALX Project",
      logo: "/Alx.PNG",
      project: "Advanced Learning Experience",
      category: "Education & Training"
    },
    {
      name: "Documentation",
      logo: "/IMG_7396.jpg",
      project: "Professional Documentation",
      category: "Content Creation"
    },
    {
      name: "Brand Development",
      logo: "/IMG_7434.PNG",
      project: "Brand Identity Design",
      category: "Visual Design"
    },
    {
      name: "Project Management",
      logo: "/IMG_7445.JPG",
      project: "Project Coordination",
      category: "Management"
    },
    {
      name: "Content Strategy",
      logo: "/IMG_7449.JPG",
      project: "Strategic Content Planning",
      category: "Marketing"
    },
    {
      name: "Client's Testimony",
         logo: "/IMG_7452.PNG",
      project: "Testimony",
      category: "Testimonies"
    },
    {
      name: "Data Analysis",
      logo: "/IMG_8309.PNG",
      project: "Comprehensive Data Analysis",
      category: "Research & Analytics"
    },
    {
      name: "Business Intelligence",
      logo: "/IMG_8310.PNG",
      project: "BI Solutions & Reporting",
      category: "Data & Research"
    },
    {
      name: "Marketing Campaign",
      logo: "/IMG_8311.PNG",
      project: "Digital Marketing Strategy",
      category: "Marketing"
    },
    {
      name: "Financial Planning",
      logo: "/IMG_8312.PNG",
      project: "Financial Strategy & Planning",
      category: "Financial Admin"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block">
               <span className="text-[#7d4934]/80 text-sm font-semibold tracking-wider uppercase bg-[#7d4934]/10 px-4 py-2 rounded-full mb-6 inline-block">
             Services & Specialisations
            </span>
          </div>
            <motion.h2 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-6"
                   >
                      Additional Services & Specialisations
                   </motion.h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering exceptional results across various industries with tailored solutions
          </p>
        </div>

        {/* Client Grid - Seamless Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden"
            >
              {/* Image Container - Full Size */}
              <div className="relative w-full h-64 lg:h-80">
                <img 
                  src={client.logo}
                  alt={`${client.name} project`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content Overlay - Shows on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-1">{client.name}</h3>
                    <p className="text-sm text-gray-200 mb-2">{client.project}</p>
                    <span className="text-xs font-medium bg-[#7d4934] px-2 py-1 rounded-full">
                      {client.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-[#7d4934] hover:bg-[#7d4934]/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span>View All Projects</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;
