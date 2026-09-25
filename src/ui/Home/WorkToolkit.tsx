import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Code2, Rocket, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

interface WorkStep {
  id: number;
  title: string;
  description: string;
  points: string[];
  icon: React.ElementType;
}

const workSteps: WorkStep[] = [
  {
    id: 1,
    title: "Discover",
    description: "Every project starts with understanding — the problem, the people it serves, and what success actually looks like.",
    points: ["Requirements & goals", "User & business needs", "Feasibility & scope"],
    icon: Search,
  },
  {
    id: 2,
    title: "Design",
    description: "Before a line of code, I plan the system — architecture, data flow, and an interface people can actually use.",
    points: ["System architecture", "Wireframes & UX", "Technology choices"],
    icon: Compass,
  },
  {
    id: 3,
    title: "Build",
    description: "Iterative development with regular check-ins — you see progress as it happens, not just at the end.",
    points: ["Agile development", "Clean, tested code", "Regular demos"],
    icon: Code2,
  },
  {
    id: 4,
    title: "Ship & Support",
    description: "Deployment is the beginning, not the end — monitoring, maintenance, and improvements after launch.",
    points: ["Deployment & CI/CD", "Monitoring & fixes", "Ongoing improvements"],
    icon: Rocket,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const HowIWork: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#0d0d0f] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Process"
          title="How I Work"
          description="Client project or my own product — every build follows the same disciplined path from idea to shipped solution."
        />

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-10 bottom-10 hidden w-px bg-gradient-to-b from-[#d4a017]/60 via-gray-200 to-transparent dark:via-white/10 md:block" />

          <div className="space-y-8">
            {workSteps.map((step, index) => (
              <motion.div
                key={step.id}
                {...fadeUp(0.1 + index * 0.1)}
                className="group relative flex flex-col gap-5 rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-all duration-300 hover:border-[#d4a017]/50 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-[#141414]/60 dark:hover:bg-[#141414] sm:p-8 md:ml-20 md:flex-row md:items-start md:gap-8"
              >
                {/* Step number + icon — sits on the line */}
                <div className="md:absolute md:-left-20 md:top-8 flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8860b] text-white shadow-lg shadow-[#d4a017]/25 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-7 w-7" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-sm font-bold tracking-[0.2em] text-[#9a6f00] dark:text-[#e9c766]">
                      {String(step.id).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>

                <ul className="flex shrink-0 flex-col gap-2 md:pt-1">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="h-4 w-4 text-[#d4a017]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          {...fadeUp(0.5)}
          className="mx-auto mt-14 max-w-2xl text-center text-lg italic leading-relaxed text-gray-600 dark:text-gray-300"
        >
          "Good software isn't just written — it's understood, designed and shipped with purpose."
        </motion.p>
      </div>
    </section>
  );
};

export default HowIWork;
