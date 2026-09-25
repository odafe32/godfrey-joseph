import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
      className={`${centered ? "text-center" : "text-left"} mb-16 lg:mb-20`}
    >
      <span className="mb-6 inline-block rounded-full bg-[#d4a017]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#9a6f00] dark:text-[#e9c766]">
        {eyebrow}
      </span>
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mb-8 text-md leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`h-1 w-32 rounded-full bg-gradient-to-r from-[#d4a017] to-[#b8860b] ${
          centered ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
