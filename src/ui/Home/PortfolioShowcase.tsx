import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  stack: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Davion Wears",
    category: "E-commerce",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518884/shop-with-davion_hjtrux.png",
    description: "A full-stack progressive web app for a premium fashion brand. Delivered end-to-end — from product catalogue and shopping cart to payment integration, user authentication, and a custom admin dashboard. Deployed on a VPS with a custom server setup.",
    stack: ["Laravel", "React", "REST API", "Shadcn UI"],
    link: "https://shopwithdavion.com/"
  },
  {
    id: 2,
    title: "Workbrook Website",
    category: "Web Development",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1783155848/Screenshot_2026-07-04_100242_ehegmk.png",
    description: "Contributed to the marketing website for Workbrook, a workforce management platform. Built and shipped key pages and UI components, ensuring a polished, responsive, and production-ready experience.",
    stack: ["React", "TypeScript"],
    link: "https://workbrook.com/"
  },
  {
    id: 3,
    title: "Workbrook App",
    category: "Full-Stack & Mobile",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771519269/ss_pdjcfj.png",
    description: "Contributed to the core web and mobile platform for Workbrook. Built full-stack features covering work management, team collaboration, and real-time productivity tools — shipped across both web and mobile.",
    stack: ["React", "React Native", "TypeScript"],
    link: "https://web.workbrook.com/"
  },
  {
    id: 4,
    title: "Mike + MikePartners",
    category: "Full-Stack",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1781540857/ARCHITECT_2-33_uesjdp.jpg",
    description: "Built the full company website for a real estate and architectural firm. Includes property listings, service pages, team profiles, and project showcases — presenting the brand with clarity and professionalism.",
    stack: ["Laravel", "PHP"],
    link: "https://mikeandmikepartners.com/"
  },
  {
    id: 5,
    title: "Cornerstone Global",
    category: "Full-Stack & Mobile",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518859/cornerstone-app_wvsai3.png",
    description: "A comprehensive church management platform with web and mobile support. Built features for online giving, membership registration, devotionals, sermon access, and counselling — plus a full admin panel for church operations.",
    stack: ["Laravel", "React Native", "TypeScript", "Shadcn UI"],
    link: "https://cornerstoneglobal.org"
  },
  {
    id: 6,
    title: "MindfulYouth Hub",
    category: "Full-Stack & Mobile",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518881/mindfulyouth_ycaqgt.png",
    description: "Built a creative and educational platform for young people. Delivered digital courses, coaching programmes, and goal-setting tools across web and mobile. Also handled logo design and full VPS deployment.",
    stack: ["Laravel", "React", "TypeScript"],
    link: "https://themindfulyouthhub.com/"
  },
  {
    id: 7,
    title: "Josephine Chibuike",
    category: "Portfolio",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771518877/josephine-portfolio2_z8i2j0.png",
    description: "Designed and built a professional portfolio site for a Brand Strategist and Virtual Assistant. Showcases her services, brand strategy work, and client experience — fully responsive and optimised for conversions.",
    stack: ["React", "Tailwind CSS"],
    link: "https://josephine-portfolio-one.vercel.app/"
  },
  {
    id: 8,
    title: "Gefyra Agency",
    category: "Web Development",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1783156355/Screenshot_2026-07-04_101204_bomdpo.png",
    description: "Built the website for a digital consulting agency. Clean, modern design with a clear focus on presenting the agency's services, team, and case studies in a compelling and professional way.",
    stack: ["React", "Tailwind CSS"],
    link: "#"
  },
  {
    id: 9,
    title: "Lightbearers",
    category: "Full-Stack",
    image: "https://res.cloudinary.com/dllrkis3c/image/upload/v1771523658/Screenshot_2026-02-19_185409_dfjytz.png",
    description: "A faith-building platform for Christian families. Built daily devotionals, Bible-based affirmation cards, and spiritual resources tailored for toddlers and young children, helping parents nurture faith at home.",
    stack: ["React", "Vercel"],
    link: "https://lightbearers.vercel.app/"
  },
];

const CATEGORIES = ["All", "Full-Stack & Mobile", "Full-Stack", "Web Development", "E-commerce", "Portfolio"];

const PortfolioShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#3d5a8c]/80 text-sm font-semibold tracking-wider uppercase bg-[#3d5a8c]/10 px-4 py-2 rounded-full inline-block mb-4">
            Portfolio
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Projects & Solutions
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A selection of real-world projects I've designed, built, and shipped — across web, mobile, and cloud platforms.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#3d5a8c] text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#3d5a8c] hover:text-[#3d5a8c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold text-[#3d5a8c] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                  {/* CTA */}
                  {project.link !== "#" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#3d5a8c] hover:bg-[#3d5a8c]/90 px-4 py-2.5 rounded-lg transition-all duration-200 self-start"
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-gray-400 border border-gray-200 px-4 py-2.5 rounded-lg self-start">
                      Private Project
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 mt-16 text-base">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
};

export default PortfolioShowcase;
