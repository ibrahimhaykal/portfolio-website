"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, GraduationCap, BadgeCheck } from "lucide-react";
import {
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiKotlin, SiBootstrap
} from "react-icons/si";
import SectionHeading from "../ui/SectionHeading";
import { onSpotlightMove } from "../ui/spotlight";

// ─── Variants defined OUTSIDE component (stable reference, no re-creation on render) ───

// Parent controls ALL stagger timing — no manual delay on children
const timelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const railVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const educationVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function Experience() {
  const techIcons: Record<string, JSX.Element> = {
    Laravel: <FaLaravel />,
    PHP: <FaPhp />,
    "Node.js": <FaNodeJs />,
    React: <FaReact />,
    JavaScript: <FaJs />,
    Python: <FaPython />,
    Figma: <FaFigma />,
    Git: <FaGitAlt />,
    Docker: <FaDocker />,
    Database: <FaDatabase />,
    PostgreSQL: <SiPostgresql />,
    Oracle: <SiOracle />,
    MySQL: <SiMysql />,
    "Next.js": <SiNextdotjs />,
    TypeScript: <SiTypescript />,
    "Bootstrap": <SiBootstrap />,
    "Tailwind CSS": <SiTailwindcss />,
    Kotlin: <SiKotlin />,
  };

  const experiences = [
    {
      role: "Full Stack Developer",
      company: "PT Data Teknologi Terintegrasi",
      period: "Jun 2026 — Present",
      location: "Jakarta, Indonesia",
      current: true,
      metrics: ["6 role-based dashboards", "Laravel 12 + React 19", "AI summary insights"],
      achievements: [
        "Developing VALAK CRM, an actuarial consulting platform, across authentication, master data, calculation, and reporting modules.",
        "Built role-based dashboards and task management views for admin, sales (AM), marketing, data, actuary, and finance — including an internal dashboard for the actuarial team.",
        "Shipped calculation submission and progress tracking, wiring calculation APIs and per-PIC company dropdown endpoints into the frontend workflow.",
        "Integrated AI-powered summary insights (Kimi AI for NirmaAI) plus a data-labeling API for role-based document management.",
        "Implemented core platform modules: login, PIC and group management CRUD, client–group linking, revision-note chatroom for report review, and project ID/number administration APIs.",
      ],
      tech: ["Laravel", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    },
    {
      role: "Full Stack Developer / System Engineer Intern",
      company: "PT Gemala Kempa Daya — Astra Otoparts Group",
      period: "Feb 2025 — Jun 2026",
      location: "Jakarta, Indonesia",
      metrics: ["−76.10% search time", "48 material blocks", "400+ weekly transactions", "30K+ rows in ~9s"],
      achievements: [
        "Developed a FIFO floor-storage warehouse monitoring system covering 48 material blocks and 400+ weekly transactions with QR gate in/out, digital block visualization, and supply scheduling — cutting material search cycle time by 76.10% (103.00 → 24.62 minutes, validated by time study).",
        "Built a finished-goods visualization system for Giant Rack Plant 3, mapping 80+ rack columns across multi-layer, top, and side U-shape layouts with customer filtering, barcode scanning, and shipment status tracking.",
        "Shipped inventory aging and LMB reporting for accounting reconciliation — 30K+ row multi-sheet Excel exports in around 9 seconds, with drill-down from warehouse summary to transaction detail.",
        "Designed Smart Andon maintenance monitoring with QR validation, lifecycle tracking, technician activity monitoring, and MTTR visibility.",
        "Built maintenance cost approval workflows spanning sparepart usage, COA classification, asset submission, and multi-level approval between Maintenance and Accounting.",
        "Executed a phased Oracle-to-PostgreSQL migration for the Trucking Control System using an application-level dual-write strategy — zero downtime during live production.",
      ],
      tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript", "Bootstrap"],
    },
    {
      role: "Web Developer",
      company: "Nirmala Technology",
      period: "Aug 2024 — Jan 2025",
      location: "Jakarta, Indonesia",
      metrics: ["Midtrans webhooks", "Bilingual CMS"],
      achievements: [
        "Built a QR-based restaurant ordering system with cart, checkout, order tracking, Midtrans payment webhook, and admin dashboard modules.",
        "Developed coliving and cafe event booking with room/event availability, deposit payments via Midtrans, payment status polling, webhook handling, email notifications, and a role-based admin CMS.",
        "Delivered a bilingual corporate profile platform on Laravel 11 and engineered responsive, component-based UI for the Q-Tin Dashboard using DaisyUI and Flowbite.",
      ],
      tech: ["Laravel", "Tailwind CSS", "MySQL", "Figma"],
    },
    {
      role: "Junior Web Developer — Scholarship Participant",
      company: "Digital Talent Scholarship, Ministry of Communication & IT",
      period: "Jul 2023 — Oct 2023",
      location: "Remote, Indonesia",
      metrics: ["BNSP certified"],
      achievements: [
        "Completed an intensive web development program focused on industry-standard engineering practices.",
        "Built a full-stack scholarship management platform with complete CRUD functionality using PHP and MySQL.",
      ],
      tech: ["PHP", "Bootstrap", "MySQL"],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where the work happened."
          subtitle="Production systems in manufacturing, consulting, and client delivery — measured by what changed on the floor, not by feature count."
        />

        {/* Timeline — rail + nodes, parent owns stagger */}
        <div className="relative">
          {/* Rail */}
          <motion.div
            variants={railVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            style={{ originY: 0 }}
            className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-sky-500/60 via-black/10 to-transparent dark:via-white/[0.12]"
            aria-hidden
          />

          <motion.div
            className="space-y-5"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {experiences.map((exp) => (
              <motion.div key={exp.company} variants={cardVariants} className="relative pl-9 sm:pl-11">
                {/* Node */}
                <span className="absolute left-[3px] top-7 flex h-4 w-4 items-center justify-center" aria-hidden>
                  <span
                    className={`relative h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-black ${
                      exp.current ? "bg-sky-500" : "bg-gray-300 dark:bg-zinc-700"
                    }`}
                  />
                </span>

                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.22, delay: 0 } }}
                  onMouseMove={onSpotlightMove}
                  className="surface surface-hover spotlight overflow-hidden p-6 sm:p-7 cursor-default"
                >
                  {/* Head */}
                  <div className="mb-5">
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="eyebrow text-sky-600 dark:text-sky-400">{exp.period}</span>
                      {exp.current && (
                        <span className="rounded-full bg-sky-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400 ring-1 ring-inset ring-sky-500/25">
                          Now
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-950 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {exp.company}
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Impact metrics */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {exp.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-md bg-black/[0.035] dark:bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] font-medium tracking-tight text-gray-700 dark:text-gray-300"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <ul className="mb-5 space-y-2.5">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-[9px] h-px w-3 flex-shrink-0 bg-sky-500/50" aria-hidden />
                        <p className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400">
                          {achievement}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 border-t border-black/[0.06] dark:border-white/[0.07] pt-4">
                    {exp.tech.map((tech) => {
                      const Icon = techIcons[tech];
                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.07] px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:text-gray-400"
                        >
                          {Icon && <span className="text-xs opacity-70">{Icon}</span>}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education — standalone card, reverses on scroll */}
        <motion.div
          variants={educationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ y: -3, transition: { duration: 0.22, delay: 0 } }}
          onMouseMove={onSpotlightMove}
          className="surface spotlight overflow-hidden mt-12 p-6 sm:p-8 cursor-default hover:border-violet-500/30 transition-colors duration-300"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-3.5 w-[3px] rounded-full bg-violet-500" />
            <span className="eyebrow text-gray-500 dark:text-gray-400">Education</span>
            <span className="hairline flex-1" aria-hidden />
            <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400 ring-1 ring-inset ring-violet-500/25">
              Graduated
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-violet-200/60 dark:border-violet-400/20 bg-violet-100/60 dark:bg-violet-500/10 p-3">
              <GraduationCap className="text-violet-600 dark:text-violet-400" size={22} />
            </div>
            <div className="min-w-0">
              <div className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
                Applied Bachelor of Computer Science — S.Tr.Kom
              </div>
              <div className="mt-0.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                Industrial Automotive Information Systems
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Politeknik STMI Jakarta, Ministry of Industry
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-500">
                <span>Sep 2022 — Jul 2026</span>
                <span aria-hidden>·</span>
                <span>GPA 3.77 / 4.00</span>
              </div>
            </div>
          </div>

          {/* Thesis */}
          <div className="mt-6 rounded-xl border border-black/[0.06] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02] p-5">
            <div className="eyebrow mb-2 text-gray-400 dark:text-gray-600">Thesis</div>
            <p className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-200">
                Steel Sheet Monitoring Information System
              </span>{" "}
              at PT Gemala Kempa Daya — reduced warehouse material search and information retrieval
              time by{" "}
              <span className="font-medium text-gray-900 dark:text-gray-200">76.10%</span>{" "}
              (103.00 → 24.62 minutes), validated via time study across 30 measurement cycles.
            </p>
          </div>

          {/* Certification */}
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.07] px-5 py-4">
            <BadgeCheck className="text-emerald-500 flex-shrink-0" size={18} />
            <span className="text-[13px] text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-200">Database Administrator</span>{" "}
              — BNSP National Professional Certification
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
