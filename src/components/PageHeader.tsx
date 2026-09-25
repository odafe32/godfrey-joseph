import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div>
      <motion.p
        {...fadeUp(0)}
        className="inline-block rounded-full bg-[#d4a017]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        {...fadeUp(0.1)}
        className="mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[0.95]"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300"
        >
          {description}
        </motion.p>
      )}
      <motion.div
        {...fadeUp(0.25)}
        className="mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-[#d4a017] to-[#b8860b]"
      />
    </div>
  );
}
