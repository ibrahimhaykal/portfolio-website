"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiBootstrap, SiFramer,
  SiStreamlit, SiDaisyui
} from "react-icons/si";
import SectionHeading from "../ui/SectionHeading";
import { onSpotlightMove } from "../ui/spotlight";

// ── Variants — parent trigger stagger, child inherit ──

const gridStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const cardIn = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const chipGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const chipIn = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const panelIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Data ──

type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

const stats: Stat[] = [
  { value: 2, suffix: "+", label: "Years shipping", note: "since Aug 2024" },
  { value: 13, suffix: "", label: "Projects delivered", note: "internal + client" },
  { value: 3.77, decimals: 2, label: "GPA / 4.00", note: "S.Tr.Kom, 2026" },
  { value: 76.1, decimals: 1, suffix: "%", label: "Search time cut", note: "103.0 → 24.6 min" },
];

const stack = [
  {
    group: "Backend & Database",
    items: [
      { icon: FaLaravel, name: "Laravel 12", color: "text-red-500" },
      { icon: FaPhp, name: "PHP", color: "text-indigo-400" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-600" },
      { icon: SiOracle, name: "Oracle PL/SQL", color: "text-red-600" },
      { icon: SiMysql, name: "MySQL", color: "text-blue-500" },
      { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
      { icon: FaDatabase, name: "REST API", color: "text-gray-500 dark:text-gray-400" },
    ],
  },
  {
    group: "Frontend & UI",
    items: [
      { icon: FaReact, name: "React 19", color: "text-cyan-500" },
      { icon: SiNextdotjs, name: "Next.js", color: "text-gray-900 dark:text-white" },
      { icon: SiTypescript, name: "TypeScript", color: "text-blue-600" },
      { icon: FaJs, name: "JavaScript", color: "text-yellow-500" },
      { icon: SiTailwindcss, name: "Tailwind CSS", color: "text-teal-500" },
      { icon: SiDaisyui, name: "DaisyUI", color: "text-fuchsia-500" },
      { icon: SiBootstrap, name: "Bootstrap", color: "text-purple-500" },
      { icon: SiFramer, name: "Framer Motion", color: "text-pink-500" },
    ],
  },
  {
    group: "Tools & AI/ML",
    items: [
      { icon: FaGitAlt, name: "Git", color: "text-orange-500" },
      { icon: FaFigma, name: "Figma", color: "text-purple-500" },
      { icon: FaDocker, name: "Docker", color: "text-blue-500" },
      { icon: FaPython, name: "Python", color: "text-yellow-600" },
      { icon: SiStreamlit, name: "Streamlit / YOLOv8", color: "text-rose-500" },
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              Systems that hold up
              <br className="hidden sm:block" />{" "}
              <span className="text-gray-400 dark:text-gray-600">on the factory floor.</span>
            </>
          }
          subtitle="I turn operational bottlenecks — legacy ERPs, manual warehouse tracking, spreadsheet reporting — into software that stays reliable under real production load."
        />

        {/* ── Story Panel ── */}
        <motion.div
          variants={panelIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onMouseMove={onSpotlightMove}
          className="surface spotlight overflow-hidden p-7 sm:p-9 mb-6"
        >
          <p className="text-[17px] sm:text-lg leading-[1.75] text-gray-700 dark:text-gray-300 font-light">
            I&apos;m a{" "}
            <strong className="font-semibold text-gray-950 dark:text-white">Full Stack Developer</strong>{" "}
            at PT Data Teknologi Terintegrasi, building{" "}
            <strong className="font-semibold text-gray-950 dark:text-white">VALAK CRM</strong>{" "}
            — an actuarial consulting platform on Laravel 12 and React 19. Before that I spent
            a year and a half inside{" "}
            <strong className="font-semibold text-gray-950 dark:text-white">Astra Otoparts Group</strong>{" "}
            digitalizing warehouses and maintenance workflows on top of a read-only Infor/Baan ERP:
            FIFO floor storage, rack visualization, Smart Andon, and a live Oracle-to-PostgreSQL
            migration with zero downtime.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/[0.06] dark:border-white/[0.07] pt-6">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Open to{" "}
                <span className="font-medium text-gray-900 dark:text-white">Full Stack</span> &{" "}
                <span className="font-medium text-gray-900 dark:text-white">Backend</span> roles
              </span>
            </div>
            <span className="eyebrow text-gray-400 dark:text-gray-600">Jakarta, Indonesia · WIB</span>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-14"
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardIn}
              whileHover={{ y: -4, transition: { duration: 0.22, delay: 0 } }}
              onMouseMove={onSpotlightMove}
              className="surface surface-hover spotlight overflow-hidden p-5 cursor-default"
            >
              <div className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tightest text-gray-950 dark:text-white tabular-nums">
                <CountUp
                  end={stat.value}
                  decimals={stat.decimals ?? 0}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                  duration={1.8}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <div className="mt-1.5 text-[13px] font-medium text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-600">
                {stat.note}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tech Stack — grouped like a real spec sheet, bukan tembok icon ── */}
        <motion.div
          className="space-y-3"
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {stack.map((group) => (
            <motion.div
              key={group.group}
              variants={cardIn}
              onMouseMove={onSpotlightMove}
              className="surface spotlight overflow-hidden p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-3.5 w-[3px] rounded-full bg-sky-500" />
                <span className="eyebrow text-gray-500 dark:text-gray-400">{group.group}</span>
                <span className="hairline flex-1" aria-hidden />
              </div>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={chipGrid}
              >
                {group.items.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={chipIn}
                    whileHover={{ y: -3, transition: { duration: 0.16, delay: 0 } }}
                    className="group flex items-center gap-2 rounded-lg border border-black/[0.06] dark:border-white/[0.07] bg-white/50 dark:bg-white/[0.03] px-3 py-2 cursor-default transition-colors duration-300 hover:border-sky-500/30"
                  >
                    <item.icon
                      className={`${item.color} text-base grayscale group-hover:grayscale-0 transition-all duration-300`}
                    />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-950 dark:group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
