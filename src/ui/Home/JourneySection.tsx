import { motion } from 'framer-motion';
import { FlaskConical, GraduationCap, Rocket } from 'lucide-react';
import PillButton from '@/components/PillButton';
import SectionHeader from '@/components/SectionHeader';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const currents = [
  {
    icon: Rocket,
    title: "Building",
    text: "Meiyo AI — an assistant for tasks, reminders and goals — plus new product ideas through Kagayaki.",
    tag: "In development",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    text: "Deepening my work in AI, product design and business — and sharing what I learn as I go.",
    tag: "Always on",
  },
  {
    icon: FlaskConical,
    title: "Experimenting",
    text: "Testing new tools, workflows and ideas — some become products, all become lessons.",
    tag: "Ongoing",
  },
];

const JourneySection = () => {
  return (
    <section id="journey" className="py-20 lg:py-28 bg-white dark:bg-[#0d0d0f] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="The Journey"
          title="I'm Still Building"
          description="This isn't a finished story — it's one being written. Here's what I'm working on, learning and experimenting with right now."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {currents.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(0.1 + i * 0.1)}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#141414] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a017]/50 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766] transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-[#d4a017]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
                  {item.tag}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Follow strip */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#141414] px-6 py-6 sm:flex-row sm:items-center sm:px-8"
        >
          <p className="max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Follow along</strong> — I
            document the wins, the failures and the lessons as they happen.
          </p>
          <PillButton href="/learn" variant="outlineInk" arrow className="shrink-0">
            Follow the Journey
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
