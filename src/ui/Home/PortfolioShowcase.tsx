import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillButton from '@/components/PillButton';
import { workCategories } from '@/data/works';
import { useWorks } from '@/data/worksStore';

const CATEGORIES = ["All", ...workCategories];

const PortfolioShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const works = useWorks();

  const filtered = activeCategory === "All"
    ? works
    : works.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gray-50 dark:bg-[#141414]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#9a6f00] dark:text-[#e9c766] text-sm font-semibold tracking-wider uppercase bg-[#d4a017]/10 px-4 py-2 rounded-full inline-block mb-4">
            Portfolio
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Projects & Solutions
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
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
                  ? 'bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-white shadow-md'
                  : 'bg-white dark:bg-[#141414] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-[#d4a017] hover:text-[#3d5a8c] dark:hover:text-[#8fb4e8]'
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
                className="group flex flex-col bg-white dark:bg-[#141414] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-white/10"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold text-[#9a6f00] dark:text-[#e9c766] bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                  {/* CTA */}
                  {project.link !== "#" ? (
                    <PillButton
                      href={project.link}
                      variant="gold"
                      arrow
                      size="sm"
                      className="self-start"
                    >
                      View Project
                    </PillButton>
                  ) : (
                    <span className="text-xs font-medium text-gray-400 border border-gray-200 dark:border-white/10 px-4 py-2.5 rounded-lg self-start">
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
