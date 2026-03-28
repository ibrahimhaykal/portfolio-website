"use client";

import { motion } from "framer-motion";
import { Code, Award, Briefcase, GraduationCap } from "lucide-react";
import {
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiKotlin, SiBootstrap
} from "react-icons/si";

// ── Skill grid variants — parent trigger stagger, child inherit ──
const skillGrid = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,  // jeda antar icon
      delayChildren: 0.1,     // delay setelah parent visible
    },
  },
};

const skillCard = {
  hidden: { opacity: 0, scale: 0.82, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function About() {
  const stats = [
    { icon: Code, value: "5+", label: "Projects" },
    { icon: Briefcase, value: "1+", label: "Years Exp" },
    { icon: GraduationCap, value: "B.Sc", label: "Degree" },
    { icon: Award, value: "5+", label: "Certifications" },
  ];

  const skills = [
    { icon: FaLaravel, name: "Laravel", color: "text-red-500" },
    { icon: FaPhp, name: "PHP", color: "text-purple-500" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-600" },
    { icon: SiOracle, name: "Oracle", color: "text-red-600" },
    { icon: SiMysql, name: "MySQL", color: "text-blue-500" },
    { icon: FaReact, name: "React", color: "text-cyan-500" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-gray-900 dark:text-white" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-600" },
    { icon: SiBootstrap, name: "Bootstrap", color: "text-purple-900" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-500" },
    { icon: FaJs, name: "JavaScript", color: "text-yellow-500" },
    { icon: SiKotlin, name: "Kotlin", color: "text-purple-600" },
    { icon: FaPython, name: "Python", color: "text-yellow-600" },
    { icon: FaFigma, name: "Figma", color: "text-purple-500" },
    { icon: FaGitAlt, name: "Git", color: "text-orange-500" },
    { icon: FaDocker, name: "Docker", color: "text-blue-500" },
    { icon: FaDatabase, name: "DB Design", color: "text-gray-600 dark:text-gray-400" },
  ];

  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hey, I&apos;m Ibrahim. 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            I turn complex operational bottlenecks into reliable, fast, and scalable digital systems.
          </p>
        </motion.div>

        {/* ── Story Card ── */}
        <motion.div
          className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl p-8 mb-8 border border-gray-200/50 dark:border-white/5 shadow-sm"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg font-light">
            I&apos;m a final-year Information Systems student currently working as a{" "}
            <strong className="text-gray-900 dark:text-white font-semibold">
              System Engineer Intern at Astra Otoparts Group (PT Gemala Kempa Daya)
            </strong>
            . I specialize in building custom internal tools on top of legacy ERPs—whether that&apos;s
            engineering a real-time Warehouse Management System or optimizing heavy-duty financial
            workflows. If it involves executing zero-downtime database migrations (like Oracle to
            PostgreSQL) or smoothing out messy operational data, I&apos;m your guy.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-400">
              Currently open for{" "}
              <span className="text-sky-600 dark:text-sky-400">Full Stack Developer</span> or{" "}
              <span className="text-sky-600 dark:text-sky-400">System Engineer</span> opportunities.
            </span>
          </div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -5, scale: 1.04, transition: { duration: 0.2, delay: 0 } }}
              className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-colors duration-300 group cursor-default"
            >
              <stat.icon
                className="text-gray-400 dark:text-gray-500 group-hover:text-sky-500 transition-colors mb-4"
                size={24}
              />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Tech Stack ── */}
        <motion.div
          className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-white/5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-sky-500 rounded-full" />
            Tech Stack
          </h3>

          {/*
            Kunci anti race condition:
            - Parent `motion.div` punya variants skillGrid (staggerChildren)
            - `whileInView` di parent yang trigger, bukan di child
            - Child cukup punya `variants={skillCard}` — Framer yang urus timing
            - Ga ada `delay` manual di child sama sekali
          */}
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={skillGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={skillCard}
                whileHover={{ scale: 1.08, y: -5, transition: { duration: 0.18, delay: 0 } }}
                className="flex flex-col items-center justify-center gap-3 p-4 bg-white/40 dark:bg-black/20 rounded-xl border border-gray-200/50 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-300 cursor-default group shadow-sm hover:shadow-md"
              >
                <skill.icon
                  className={`${skill.color} text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300`}
                />
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-wide">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}