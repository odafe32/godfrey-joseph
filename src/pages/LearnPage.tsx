import { motion } from "framer-motion";
import { Code2, Hammer, Briefcase, TrendingUp, Map } from "lucide-react";
import PillButton from "@/components/PillButton";
import PageHeader from "@/components/PageHeader";

const YOUTUBE_URL = "https://www.youtube.com/@OdafeGodfrey32";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const categories = [
  {
    icon: Code2,
    tag: "CODE",
    title: "Software Development",
    text: "Programming, web and mobile development, architecture, AI development and the tools I use.",
  },
  {
    icon: Hammer,
    tag: "BUILD",
    title: "Products & Projects",
    text: "Behind-the-scenes of what I'm building — decisions, trade-offs and lessons.",
  },
  {
    icon: Briefcase,
    tag: "BUSINESS",
    title: "Technology & Business",
    text: "Using technology to grow businesses, digital transformation and entrepreneurship.",
  },
  {
    icon: TrendingUp,
    tag: "GROW",
    title: "Career & Growth",
    text: "Career development, discipline, learning technology and personal growth.",
  },
  {
    icon: Map,
    tag: "JOURNEY",
    title: "The Journey",
    text: "Experiences, failures, wins and lessons from building technology and businesses.",
  },
];

export default function LearnPage() {
  return (
    <section className="bg-white dark:bg-[#0d0d0f] pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Learn"
          title={
            <>
              Learn With{" "}
              <span className="text-[#3d5a8c] dark:text-[#8fb4e8]">Godfrey</span>
            </>
          }
          description="Practical lessons on technology, software development, business, growth and life — taught through YouTube, tutorials, workshops and resources."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, tag, title, text }, i) => (
            <motion.div
              key={tag}
              {...fadeUp(0.3 + i * 0.08)}
              className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141414] p-6 transition-colors hover:border-[#d4a017]/50"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#d4a017]/10 text-[#9a6f00] dark:text-[#e9c766]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  {tag}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
            </motion.div>
          ))}

          {/* YouTube CTA card */}
          <motion.div
            {...fadeUp(0.7)}
            className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8860b] p-6 text-white"
          >
            <div>
              <h3 className="text-2xl font-bold font-display uppercase tracking-wide">
                Watch on YouTube
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                New videos on coding, life and business — subscribe and learn along.
              </p>
            </div>
            <PillButton
              href={YOUTUBE_URL}
              variant="solid"
              arrow
              className="mt-6 w-fit"
            >
              Open Channel
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
