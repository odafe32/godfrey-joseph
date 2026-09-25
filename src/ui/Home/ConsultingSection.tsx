import { motion } from 'framer-motion';
import { Lightbulb, Workflow, Bot, Compass } from 'lucide-react';
import PillButton from '@/components/PillButton';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const areas = [
  { icon: Compass, label: 'Technology strategy' },
  { icon: Workflow, label: 'Systems & automation' },
  { icon: Bot, label: 'AI adoption' },
  { icon: Lightbulb, label: 'Digital opportunities' },
];

const ConsultingSection = () => {
  return (
    <section id="consulting" className="py-20 lg:py-28 bg-gray-50 dark:bg-[#141414] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          {...fadeUp(0.1)}
          className="relative overflow-hidden rounded-3xl bg-[#1e2f4d] px-8 py-14 sm:px-12 lg:px-16 lg:py-20"
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#d4a017]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#3d5a8c]/40 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Copy */}
            <div>
              <span className="inline-block rounded-full bg-[#d4a017]/15 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#e9c766]">
                Consulting
              </span>
              <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-wide text-white">
                Technology can do more for your business
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
                Most businesses are sitting on technology opportunities they haven't
                unlocked yet. I help you find them — then build the systems that
                turn them into growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PillButton href="/?inquiry=consultation#contact" variant="gold" arrow>
                  Book a Consultation
                </PillButton>
                <PillButton href="/#projects" variant="outline">
                  See My Work
                </PillButton>
              </div>
            </div>

            {/* Areas */}
            <div className="grid gap-4 sm:grid-cols-2">
              {areas.map((area, i) => (
                <motion.div
                  key={area.label}
                  {...fadeUp(0.25 + i * 0.1)}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#d4a017]/40 hover:bg-white/10"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d4a017]/15 text-[#e9c766]">
                    <area.icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-white">{area.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultingSection;
