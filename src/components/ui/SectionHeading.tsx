import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Two-digit section marker, e.g. "01" */
  index: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

/**
 * Purely presentational. Motion comes from the `data-reveal` / `data-draw`
 * attributes, which the section's `useScrollReveal` picks up.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${className}`}>
      {/* Eyebrow rail — index, label, hairline */}
      <div data-reveal className="flex items-center gap-3 mb-6">
        <span className="eyebrow text-sky-600 dark:text-sky-400">{index}</span>
        <span className="eyebrow text-gray-400 dark:text-gray-500">{eyebrow}</span>
        <span data-draw className="hairline flex-1" aria-hidden />
      </div>

      {/* Judul dan subjudul pakai wipe, bukan geser. Teks yang meluncur masuk
          itu pola paling generik — wipe bikin dia kebaca sebagai "dibuka". */}
      <h2
        data-wipe
        className="text-[2.15rem] sm:text-5xl font-semibold leading-[1.08] tracking-tightest text-gray-950 dark:text-white"
      >
        {title}
      </h2>

      {subtitle && (
        <p
          data-wipe
          className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed text-gray-500 dark:text-gray-400"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
