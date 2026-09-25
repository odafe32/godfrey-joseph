import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Hammer, TrendingUp, ArrowUpRight } from 'lucide-react';
import PillButton from '@/components/PillButton';
import SectionHeader from '@/components/SectionHeader';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const tracks = [
  {
    icon: Code2,
    title: 'Code & Build',
    text: 'Tutorials and walkthroughs on software development — from fundamentals to shipping real products.',
  },
  {
    icon: Hammer,
    title: 'Business & Growth',
    text: 'Practical lessons on using technology to grow a business — tools, systems and strategy.',
  },
  {
    icon: TrendingUp,
    title: 'The Journey',
    text: 'Honest notes from building products and a company — what works, what fails, what I learn.',
  },
];

const TeachingSection = () => {
  return (
    <section id="teach" className="py-20 lg:py-28 bg-white dark:bg-[#0d0d0f] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Teaching"
          title="Learn With Godfrey"
          description="I share everything I learn — code, business and the builder's journey — through videos, articles and resources."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              {...fadeUp(0.1 + i * 0.1)}
              className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#141414] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a017]/50 hover:shadow-xl"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766] transition-transform duration-300 group-hover:scale-110">
                <track.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                {track.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {track.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-gradient-to-r from-[#1e2f4d] to-[#3d5a8c] px-8 py-8 sm:flex-row sm:items-center"
        >
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              New content, regularly
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Videos, guides and resources — all free, all practical.
            </p>
          </div>
          <PillButton href="/learn" variant="gold" arrow className="shrink-0">
            Explore Learning
          </PillButton>
        </motion.div>

        <motion.p
          {...fadeUp(0.5)}
          className="mt-6 text-center"
        >
          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3d5a8c] dark:text-[#8fb4e8] hover:text-[#9a6f00] dark:hover:text-[#e9c766] transition-colors"
          >
            See all content on the Learn page
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.p>
      </div>
    </section>
  );
};

export default TeachingSection;
