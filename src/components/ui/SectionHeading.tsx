import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Two-digit section marker, e.g. "01" */
  index: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
};

export default function SectionHeading({ index, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div data-reveal className="mb-8">
      <p className="label mb-4">{index} / {eyebrow}</p>
      <h2 className="heading text-4xl sm:text-5xl leading-[1.05]">{title}</h2>
      {subtitle && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
