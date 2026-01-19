"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react";
import {
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiKotlin
} from "react-icons/si";

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
      "Tailwind CSS": <SiTailwindcss />,
      Kotlin: <SiKotlin />,
    };

  const experiences = [
    {
      role: "Full Stack Developer",
      company: "PT Gemala Kempa Daya (Astra Otoparts Group)",
      period: "Feb 2025 - Present",
      location: "North Jakarta, Indonesia",
      achievements: [
        "Engineered real-time inventory control system with FIFO logic managing 48 blocks and 300+ material types",
        "Automated supply scheduling with Infor ERP integration, handling 400+ weekly transactions",
        "Executed zero-downtime Oracle to PostgreSQL migration using dual-write synchronization",
        "Developed high-performance reporting tool for Inventory Aging and Stock Movement",
        "Built secure cost management system with RBAC and automated input validation"
      ],
      tech: ["Laravel", "Oracle", "PostgreSQL", "Infor ERP", "JavaScript"]
    },
    {
      role: "Web Developer",
      company: "Nirmala Technology",
      period: "Aug 2024 - Jan 2025",
      location: "Jakarta, Indonesia",
      achievements: [
        "Designed bilingual company profile website using Figma, Laravel 11, and Tailwind CSS",
        "Developed language toggle feature for English and Indonesian accessibility",
        "Sliced UI components for Q-Tin Dashboard using Tailwind, DaisyUI, and Flowbite",
        "Collaborated with team to deliver responsive and user-friendly interfaces"
      ],
      tech: ["Laravel", "Tailwind CSS", "Figma", "DaisyUI"]
    },
    {
      role: "Scholarship Participant",
      company: "Digital Talent Scholarship",
      period: "Jul 2023 - Oct 2023",
      location: "Remote",
      achievements: [
        "Completed web development training program focused on industry-relevant skills",
        "Built scholarship website using Bootstrap with full CRUD functionality",
        "Implemented features using PHP and SQL for database management",
        "Obtained BNSP certification for Junior Web Development"
      ],
      tech: ["PHP", "Bootstrap", "MySQL", "SQL"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} // Gerakan y diperkecil agar ringan
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }} // Pakai easeOut, bukan spring
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Experience.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Building impactful solutions in production environments.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }} // y: 15 cukup untuk efek visual tanpa lag
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }} // Spring dihapus
              className="relative bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5"
            >
              {/* Company Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sky-100/80 dark:bg-sky-500/10 rounded-xl backdrop-blur-sm border border-sky-200/50 dark:border-sky-500/20">
                    <Briefcase className="text-sky-600 dark:text-sky-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {exp.company}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-500">
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
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} // Ringan & Smooth
          className="mt-12 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-white/5 hover:border-purple-500/30 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
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
                Information Systems
              </div>
              <div className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                Polytechnic of Industrial Management Jakarta (STMI) 
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                Sep 2022 - Oct 2026 (Expected) • Jakarta, Indonesia
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}