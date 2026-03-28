"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react";
import {
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiKotlin, SiBootstrap
} from "react-icons/si";

// ─── Variants defined OUTSIDE component (stable reference, no re-creation on render) ───

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

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
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const educationVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
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
      role: "System Engineer Intern (Full Stack)",
      company: "PT Gemala Kempa Daya (Astra Otoparts Group)",
      period: "Feb 2025 - Present",
      location: "Jakarta, Indonesia",
      achievements: [
        "Engineered a real-time Raw Material Warehouse Inventory system with complex FIFO logic and dynamic 48-block rack mapping, successfully bypassing read-only legacy ERP constraints.",
        "Executed a zero-downtime database migration for the Trucking Control System from Oracle to PostgreSQL utilizing an application-level dual-write strategy.",
        "Architected a stateful Smart Andon System to map physical operational workflows, implementing OTP/QR validations and measuring Mean Time To Repair (MTTR).",
        "Optimized heavy-duty Accounting & Cost Management Excel reporting modules via client-side rendering (Sheet.JS), reducing server memory load by 50%."
      ],
      tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript","Bootstrap", "Sheet.JS"]
    },
    {
      role: "Web Developer",
      company: "Nirmala Technology",
      period: "Aug 2024 - Jan 2025",
      location: "Jakarta, Indonesia",
      achievements: [
        "Engineered and deployed a responsive bilingual corporate profile platform utilizing Laravel 11 and Tailwind CSS.",
        "Developed high-fidelity UI components for the Q-Tin Dashboard, integrating DaisyUI and Flowbite to ensure cross-device consistency.",
        "Collaborated closely with design teams to translate Figma prototypes into functional, user-friendly frontend architectures."
      ],
      tech: ["Laravel", "Tailwind CSS", "Figma", "DaisyUI"]
    },
    {
      role: "Junior Web Developer (Scholarship Participant)",
      company: "Digital Talent Scholarship (Ministry of Communication & IT)",
      period: "Jul 2023 - Oct 2023",
      location: "Remote, Indonesia",
      achievements: [
        "Completed an intensive web development training program focused on industry-standard engineering practices.",
        "Developed a full-stack scholarship management platform with comprehensive CRUD functionality using PHP and MySQL.",
        "Obtained the official BNSP (National Professional Certification Board) certification for Junior Web Development."
      ],
      tech: ["PHP", "Bootstrap", "MySQL", "SQL"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header — standalone element, reverses on scroll */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Experience.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Building impactful, enterprise-grade solutions in production environments.
          </p>
        </motion.div>

        {/* Timeline — parent owns stagger, children inherit timing */}
        <motion.div
          className="space-y-6"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              // ✅ whileHover inline with delay: 0 — resets inherited stagger delay
              whileHover={{
                y: -4,
                scale: 1.01,
                boxShadow: "0 12px 40px rgba(14, 165, 233, 0.12)",
                transition: { duration: 0.2, delay: 0 },
              }}
              className="relative bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-colors duration-300 cursor-default"
            >
              {/* Company Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sky-100/80 dark:bg-sky-500/10 rounded-xl backdrop-blur-sm border border-sky-200/50 dark:border-sky-500/20 mt-1">
                    <Briefcase className="text-sky-600 dark:text-sky-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {exp.company}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6 space-y-3 pl-2">
                {exp.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="w-1.5 h-1.5 bg-sky-500/50 dark:bg-sky-400/50 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/50 dark:border-white/5">
                {exp.tech.map((tech, i) => {
                  const Icon = techIcons[tech];
                  return (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium
                                 bg-white/50 dark:bg-white/5
                                 text-gray-600 dark:text-gray-400
                                 rounded-full border border-gray-200/50 dark:border-white/5"
                    >
                      {Icon && <span className="text-sm opacity-70">{Icon}</span>}
                      <span>{tech}</span>
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education — standalone card, reverses on scroll */}
        <motion.div
          variants={educationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{
            y: -4,
            scale: 1.01,
            boxShadow: "0 12px 40px rgba(168, 85, 247, 0.12)",
            transition: { duration: 0.2, delay: 0 },
          }}
          className="mt-12 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-white/5 hover:border-purple-500/30 transition-colors duration-300 cursor-default"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-500 rounded-full" />
            Education
          </h3>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100/80 dark:bg-purple-500/10 rounded-xl backdrop-blur-sm border border-purple-200/50 dark:border-purple-500/20">
              <GraduationCap className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Bachelor of Applied Computer Science
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                Information Systems (Automotive Industry)
              </div>
              <div className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                Politeknik STMI Jakarta (Ministry of Industry)
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                Sep 2022 - Present • GPA: 3.77/4.00
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}