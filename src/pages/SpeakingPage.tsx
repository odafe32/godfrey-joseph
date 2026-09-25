import { motion } from "framer-motion";
import { Cpu, Briefcase, Compass } from "lucide-react";
import PillButton from "@/components/PillButton";
import PageHeader from "@/components/PageHeader";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const topics = [
  {
    icon: Cpu,
    title: "Technology",
    text: "AI and the future of technology, building digital products, software development and technology trends.",
  },
  {
    icon: Briefcase,
    title: "Business",
    text: "Using technology to grow businesses, digital transformation, building technology businesses and entrepreneurship.",
  },
  {
    icon: Compass,
    title: "Personal Journey",
    text: "Becoming a software developer, building a technology career, and lessons from learning, building and growing.",
  },
];

const formats = [
  "Conferences",
  "Podcasts",
  "Panels",
  "University Events",
  "Developer Communities",
  "Workshops",
  "Youth Programmes",
  "Business Events",
];

export default function SpeakingPage() {
  return (
    <section className="bg-white dark:bg-[#0d0d0f] pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Speaking"
          title={
            <>
              Let's Talk About Technology,{" "}
              <span className="text-[#3d5a8c] dark:text-[#8fb4e8]">Business & Growth</span>
            </>
          }
          description="I share practical lessons from technology, business and my journey as a builder — on stages, podcasts, panels and in workshops."
        />

        {/* Topics */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {topics.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              {...fadeUp(0.3 + i * 0.1)}
              className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141414] p-8 transition-colors hover:border-[#d4a017]/50"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Formats */}
        <motion.div {...fadeUp(0.6)} className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Available for
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {formats.map((format) => (
              <span
                key={format}
                className="rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {format}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUp(0.7)}
          className="mt-16 flex flex-col items-start gap-6 rounded-3xl bg-[#1e2f4d] p-8 sm:p-12 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Planning an event?
            </h2>
            <p className="mt-2 max-w-lg text-white/75">
              Tell me about your audience and what you'd like them to walk away
              with — I'll shape the talk around it.
            </p>
          </div>
          <PillButton href="/?inquiry=speaking#contact" variant="gold" arrow>
            Book Me to Speak
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}
