import { motion } from 'framer-motion';
import { Mic2, Cpu, Briefcase, Route } from 'lucide-react';
import PillButton from '@/components/PillButton';
import SectionHeader from '@/components/SectionHeader';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const topics = [
  { icon: Cpu, label: 'Technology & AI' },
  { icon: Briefcase, label: 'Business & Growth' },
  { icon: Route, label: 'The Builder’s Journey' },
];

const SpeakingSection = () => {
  return (
    <section id="speaking" className="py-20 lg:py-28 bg-white dark:bg-[#0d0d0f] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="Speaking"
              title="Let's Talk About Technology, Business & Growth"
              description="I speak to teams, communities and events about building with technology — practical, honest talks drawn from real projects and real lessons."
            />

            {/* Topics */}
            <div className="flex flex-wrap gap-3">
              {topics.map((topic, i) => (
                <motion.span
                  key={topic.label}
                  {...fadeUp(0.2 + i * 0.1)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 dark:border-white/10 dark:bg-[#141414] dark:text-gray-300"
                >
                  <topic.icon className="h-4 w-4 text-[#9a6f00] dark:text-[#e9c766]" />
                  {topic.label}
                </motion.span>
              ))}
            </div>

            <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-wrap gap-4">
              <PillButton href="/speaking" variant="gold" arrow>
                Book Me to Speak
              </PillButton>
              <PillButton href="/speaking" variant="outlineInk">
                Speaking Topics
              </PillButton>
            </motion.div>
          </div>

          {/* Photo collage */}
          <motion.div {...fadeUp(0.3)} className="relative pb-10">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#d4a017]/15 blur-3xl" />

            <div className="relative grid grid-cols-2 gap-4">
              <img
                src="https://res.cloudinary.com/dllrkis3c/image/upload/v1790259524/694609330_1827068361599371_7400755334772390936_n_qsruuz.png"
                alt="Godfrey speaking at an event"
                className="mt-10 aspect-[4/5] w-full rounded-3xl object-cover shadow-xl ring-1 ring-black/5 dark:ring-white/10"
              />
              <img
                src="https://res.cloudinary.com/dllrkis3c/image/upload/v1790259527/695253885_1827068418266032_4378480762798642985_n_jcxaq2.png"
                alt="Godfrey giving a talk"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl ring-1 ring-black/5 dark:ring-white/10"
              />
            </div>

            {/* Floating formats card */}
            <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-[#1e2f4d] px-6 py-5 shadow-2xl">
              <div className="flex items-center justify-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#d4a017]/15 text-[#e9c766]">
                  <Mic2 className="h-5 w-5" />
                </span>
                <p className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                  Conferences · Workshops · Panels · Podcasts
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpeakingSection;
