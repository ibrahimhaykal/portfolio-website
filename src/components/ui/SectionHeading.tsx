"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// ─── Variants (outside component — stable reference) ──────────────────────────

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const headingLine = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingRule = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1, opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

type SectionHeadingProps = {
  /** Two-digit section marker, e.g. "01" */
  index: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={`mb-10 ${className}`}
    >
      {/* Eyebrow rail — index, label, hairline */}
      <motion.div variants={headingLine} className="flex items-center gap-3 mb-6">
        <span className="eyebrow text-sky-600 dark:text-sky-400">{index}</span>
        <span className="eyebrow text-gray-400 dark:text-gray-500">{eyebrow}</span>
        <motion.span
          variants={headingRule}
          style={{ originX: 0 }}
          className="hairline flex-1"
          aria-hidden
        />
      </motion.div>

      <motion.h2
        variants={headingLine}
        className="text-[2.15rem] sm:text-5xl font-semibold leading-[1.08] tracking-tightest text-gray-950 dark:text-white"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={headingLine}
          className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed text-gray-500 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
