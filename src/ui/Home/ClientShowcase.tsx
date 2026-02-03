import React from 'react';
import { motion } from 'framer-motion';

interface Client {
  name: string;
  logo: string;
  testimonial?: string;
  project?: string;
  category?: string;
  link?: string;
}

const ClientShowcase: React.FC = () => {
  const clients: Client[] = [
    {
      name: "Davion Wears",
      logo: "/shop-with-davion.png",
      project: "E-commerce Platform",
      category: "E-commerce",
      link: "https://shopwithdavion.com/"
    },
    {
      name: "Josephine Chibuike",
      logo: "/josephine-portfolio2.png",
      project: "Portfolio Website",
      category: "Portfolio",
      link: "https://josephine-portfolio-one.vercel.app/"
    },
    {
      name: "Cornerstone Global",
      logo: "/cornerstone-app.png",
      project: "Church Management App",
      category: "Full-Stack & Mobile Development",
      link: "https://app.cornerstoneglobal.org"
    },
    {
      name: "Mike + MikePartners",
      logo: "/mikeandmike.png",
      project: "Real Estate Platform",
      category: "Full-Stack Development",
      link: "https://mikeandmikepartners.com/"
    },
    {
      name: "MindfulYouth Hub",
      logo: "/mindfulyouth2.png",
      project: "Youth Education Platform",
      category: "Full-Stack & Mobile Development",
      link: "https://themindfulyouthhub.com/"
    },
    {
      name: "MovieAI",
      logo: "/movie-ai.png",
      project: "AI Movie Recommendations",
      category: "AI Development",
      link: "https://movie-recommendation-nextjs.vercel.app/"
    },
    {
      name: "MovieAI",
      logo: "/movie-ai2.png",
        project: "AI Movie Recommendations",
      category: "AI Development",
      link: "https://movie-recommendation-nextjs.vercel.app/"
    },
    {
      name: "Maseke Daniel Ministries",
      logo: "/maseke.png",
      project: "Admin Dashboard",
      category: "Full-Stack Development",
      link: "#"
    },
    {
      name: "Logistics Global",
      logo: "/logistics.png",
      project: "Logistics Platform",
      category: "Full-Stack Development",
      link: "#"
    },
    // {
    //   name: "Project Management",
    //   logo: "/IMG_7445.JPG",
    //   project: "Project Coordination",
    //   category: "DevOps",
    //   link: "#"
    // },
    // {
    //   name: "Content Strategy",
    //   logo: "/IMG_7449.JPG",
    //   project: "Strategic Content Planning",
    //   category: "Digital Marketing",
    //   link: "#"
    // },
    // {
    //   name: "Client's Testimony",
    //      logo: "/IMG_7452.PNG",
    //   project: "Testimony",
    //   category: "Client Relations",
    //   link: "#"
    // },

  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block">
               <span className="text-[#3d5a8c]/80 text-sm font-semibold tracking-wider uppercase bg-[#3d5a8c]/10 px-4 py-2 rounded-full mb-6 inline-block">
             Additional Projects & Solutions
            </span>
          </div>
            <motion.h2 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-6"
                   >
                      Additional Projects & Solutions
                   </motion.h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-world solutions I've built, from web applications and mobile apps to cloud infrastructure and digital transformation projects
          </p>
        </div>

        {/* Client Grid - Seamless Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {clients.map((client, index) => (
            <a href={client.link || "#"} target={client.link && client.link !== "#" ? "_blank" : "_self"} className="block group relative overflow-hidden">
              {/* Image Container - Full Size */}
              <div className="relative w-full h-64 aspect-square">
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
                    <span className="text-xs font-medium bg-[#3d5a8c] px-2 py-1 rounded-full">
                      {client.category}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          {/* <button className="inline-flex items-center gap-3 bg-[#7d4934] hover:bg-[#7d4934]/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span>View All Projects</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;
