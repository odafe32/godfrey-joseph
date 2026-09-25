import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Compass, GraduationCap, Mic, Users } from 'lucide-react';
import PillButton from '@/components/PillButton';
import SectionHeader from '@/components/SectionHeader';

const MotionLink = motion.create(Link);

const pillars = [
  {
    num: '01',
    icon: Code2,
    label: 'Build',
    title: 'Software & digital products',
    message: 'I build technology that solves real problems.',
    items: ['Web & mobile apps', 'SaaS products', 'APIs & systems', 'AI products'],
    href: '/?inquiry=project#contact',
  },
  {
    num: '02',
    icon: Compass,
    label: 'Consult',
    title: 'Technology & business guidance',
    message: 'I help businesses understand where technology fits into their growth and what to do next.',
    items: ['Technology strategy', 'Digital transformation', 'AI adoption', 'Automation'],
    href: '/?inquiry=consultation#contact',
  },
  {
    num: '03',
    icon: GraduationCap,
    label: 'Teach',
    title: 'Technology, business & practical knowledge',
    message: "I share what I'm learning, building and experiencing so others can learn from it too.",
    items: ['YouTube', 'Tutorials & articles', 'Workshops', 'Resources'],
    href: '/learn',
  },
  {
    num: '04',
    icon: Users,
    label: 'Coach',
    title: 'Mentorship & personal guidance',
    message: "Sometimes people don't need another tutorial — they need someone who can help them see the next step.",
    items: ['Developer mentorship', 'Career guidance', 'Product mentorship', '1-on-1 sessions'],
    href: '/?inquiry=consultation#contact',
  },
  {
    num: '05',
    icon: Mic,
    label: 'Speak',
    title: 'Events, panels, podcasts & workshops',
    message: 'I share practical lessons from technology, business and my journey as a builder.',
    items: ['Conferences & panels', 'Podcasts', 'University events', 'Workshops'],
    href: '/speaking',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white dark:from-[#0d0d0f] to-amber-50/20 dark:to-[#0d0d0f] relative overflow-hidden" id="services">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4a017 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="What I Do"
          title="Five Ways I Create Value"
          description="I build technology, guide businesses through it, teach what I learn, mentor people on the journey, and speak about all of it."
        />

        {/* Pillars grid — 5 areas + CTA tile */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const cardClass =
              "group relative flex flex-col bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-white/10 p-7 shadow-sm hover:shadow-xl hover:border-[#d4a017]/50 hover:-translate-y-1 transition-all duration-300";
            const motionProps = {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: false },
              transition: { duration: 0.6, delay: index * 0.08 },
            } as const;
            const inner = (
              <>
                <div className="flex items-start justify-between mb-6">
                  <span className="w-12 h-12 bg-gradient-to-br from-[#d4a017]/10 to-[#b8860b]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#9a6f00] dark:text-[#e9c766]" />
                  </span>
                  <span className="font-display text-3xl font-bold text-gray-200 dark:text-white/10 group-hover:text-[#d4a017]/40 transition-colors">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-gray-900 dark:text-white group-hover:text-[#3d5a8c] dark:group-hover:text-[#8fb4e8] transition-colors">
                  {pillar.label}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766] mt-1 mb-3">
                  {pillar.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                  {pillar.message}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {pillar.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#3d5a8c] dark:text-[#8fb4e8]">
                  {pillar.href.includes('#contact') ? 'Get started' : 'Explore'}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </>
            );

            return pillar.href.startsWith('/') ? (
              <MotionLink key={pillar.label} to={pillar.href} {...motionProps} className={cardClass}>
                {inner}
              </MotionLink>
            ) : (
              <motion.a key={pillar.label} href={pillar.href} {...motionProps} className={cardClass}>
                {inner}
              </motion.a>
            );
          })}

          {/* CTA tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8860b] p-7 text-[#1a1a1a]"
          >
            <div>
              <h3 className="font-display text-3xl font-bold uppercase tracking-wide leading-tight">
                Not sure what you need?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1a1a1a]/80">
                Tell me what you're trying to build or figure out — I'll help you
                find the right next step.
              </p>
            </div>
            <PillButton href="/#contact" variant="solid" arrow className="mt-8 w-fit">
              Let's Talk
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
