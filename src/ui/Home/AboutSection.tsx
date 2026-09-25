import { motion } from 'framer-motion';
import { Code2, Compass, GraduationCap, Users, Mic } from 'lucide-react';
import PillButton from '@/components/PillButton';

const pillars = [
  { icon: Code2, label: 'Build', text: 'Software & digital products' },
  { icon: Compass, label: 'Consult', text: 'Technology & business guidance' },
  { icon: GraduationCap, label: 'Teach', text: 'Practical knowledge' },
  { icon: Users, label: 'Coach', text: 'Mentorship & guidance' },
  { icon: Mic, label: 'Speak', text: 'Events, panels & workshops' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white dark:bg-[#141414] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#d4a017]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-[#b8860b]/30 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#d4a017]/40 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-center">

          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Offset gold frame */}
            <div aria-hidden className="absolute -inset-3 rounded-3xl border-2 border-[#d4a017]/30 rotate-2" />
            <img
              src="https://res.cloudinary.com/dllrkis3c/image/upload/v1783156615/IMG-20260603-WA0048.jpg_ofcj2g.jpg"
              alt="Godfrey Joseph Sule"
              className="relative w-full h-[420px] lg:h-[500px] rounded-2xl object-cover object-top shadow-2xl"
            />

            {/* Floating: years badge */}
            <motion.div
              {...fadeUp(0.4)}
              className="absolute -top-4 -right-3 sm:-right-6 rounded-full bg-gradient-to-r from-[#d4a017] to-[#b8860b] px-5 py-2.5 shadow-lg"
            >
              <p className="font-display text-lg font-semibold uppercase tracking-wide text-white leading-none">
                6+ yrs building
              </p>
            </motion.div>

            {/* Floating: Kagayaki founder card */}
            <motion.div
              {...fadeUp(0.55)}
              className="absolute -bottom-6 -left-3 sm:-left-8 flex items-center gap-3 rounded-2xl bg-white dark:bg-[#1a1a1a] px-4 py-3 shadow-xl border border-black/5 dark:border-white/10"
            >
              <img src="/logo-mono.png" alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Godfrey Joseph Sule</p>
                <p className="text-xs text-[#9a6f00] dark:text-[#e9c766] font-medium">I Build. I Teach. I Guide.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <div>
            <motion.p
              {...fadeUp(0)}
              className="inline-block rounded-full bg-[#d4a017]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]"
            >
              About
            </motion.p>

            <motion.h2
              {...fadeUp(0.1)}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[0.95]"
            >
              More Than Just <span className="text-[#3d5a8c] dark:text-[#8fb4e8]">Software</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Technology is what I build. But my work goes beyond writing code —
              I help people understand technology, help businesses identify
              opportunities, build digital products, teach what I learn, and
              share practical lessons from my journey.
            </motion.p>

            <motion.p
              {...fadeUp(0.28)}
              className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300"
            >
              With over half a decade of experience, I've delivered web and
              mobile applications, business systems and cloud solutions for
              clients across Africa — and I share everything I learn along the
              way through content, teaching and mentorship.
            </motion.p>

            {/* Five pillars */}
            <motion.div {...fadeUp(0.36)} className="mt-8 flex flex-wrap gap-3">
              {pillars.map(({ icon: Icon, label, text }) => (
                <div
                  key={label}
                  className="group flex items-center gap-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 transition-colors hover:border-[#d4a017]/50"
                >
                  <Icon className="h-4 w-4 text-[#9a6f00] dark:text-[#e9c766]" />
                  <span className="font-display text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                    {label}
                  </span>
                  <span className="hidden xl:inline text-xs text-gray-500 dark:text-gray-400">— {text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.44)} className="mt-10 flex flex-wrap gap-3">
              <PillButton href="#contact" variant="gold" arrow>
                Work With Me
              </PillButton>
              <PillButton href="#projects" variant="outlineInk">
                Explore My Work
              </PillButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
