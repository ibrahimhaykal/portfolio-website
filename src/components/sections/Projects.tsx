"use client";

import { useState } from "react";
import { ExternalLink, Github, Globe, Smartphone, BrainCircuit, Star, Layout, X, ArrowUpRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiKotlin,
  SiDaisyui, SiBootstrap
} from "react-icons/si";
import Image from "next/image";
import type { IconType } from "react-icons";
import SectionHeading from "../ui/SectionHeading";
import { onSpotlightMove } from "../ui/spotlight";

type Project = {
  title: string;
  description: string;
  /** Optional — cards fall back to a generated monogram panel when no shot exists yet. */
  image?: string;
  tech: string[];
  category: string;
  orientation?: "landscape" | "portrait";
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  /** Published paper or thesis backing the project. */
  paperUrl?: string;
};

// ─── Variants (outside component — stable reference) ──────────────────────────

const filterContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const filterItem = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, scale: 0.95, y: -6,
    transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalPanel = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, y: 20, scale: 0.97,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ctaVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Monogram fallback saat screenshot belum ada
function monogram(title: string) {
  return title
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Projects() {
  // Komponen, bukan element — biar tiap svg bisa dikasih aria-hidden sendiri
  const techIcons: Record<string, IconType> = {
    Laravel: FaLaravel, PHP: FaPhp, "Node.js": FaNodeJs,
    React: FaReact, JavaScript: FaJs, Python: FaPython,
    Figma: FaFigma, Git: FaGitAlt, Docker: FaDocker,
    Database: FaDatabase, PostgreSQL: SiPostgresql, Oracle: SiOracle,
    MySQL: SiMysql, "Next.js": SiNextdotjs, TypeScript: SiTypescript,
    "Tailwind CSS": SiTailwindcss, Kotlin: SiKotlin,
    DaisyUI: SiDaisyui, Bootstrap: SiBootstrap,
  };

  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "VALAK CRM — Actuarial Consulting",
      description: "Enterprise CRM for an actuarial consulting firm on Laravel 12 and React 19. Role-based dashboards for admin, sales, marketing, data, actuary, and finance; calculation submission with progress tracking; a revision-note chatroom for report review; and AI-powered summary insights via Kimi AI.",
      tech: ["Laravel", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      category: "Web App", featured: true,
    },
    {
      title: "Real-Time Warehouse Inventory",
      description: "FIFO floor-storage monitoring for Astra Otoparts Group covering 48 material blocks and 400+ weekly transactions, with QR gate in/out, digital block visualization, and supply scheduling — cutting material search cycle time by 76.10% (103.00 → 24.62 minutes), validated by time study.",
      image: "/projects/warehouse.png",
      tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript"],
      paperUrl: "http://repository.stmi.ac.id/id/eprint/2840/",
      category: "Web App", featured: true,
    },
    {
      title: "Smart Andon Ticketing System",
      description: "Stateful digital ticketing that maps physical manufacturing workflows. QR validation, lifecycle tracking, technician activity monitoring, and Mean Time To Repair (MTTR) visibility for production issue handling.",
      image: "/projects/andon.png",
      tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript"],
      category: "Web App", featured: true,
    },
    {
      title: "Mitsubishi Dealership Landing",
      description: "Freelance corporate profile and lead-generation landing page for a Mitsubishi dealership. Interactive vehicle showcases using Swiper.js and direct WhatsApp routing to accelerate sales conversions.",
      image: "/projects/mitsubishi.png",
      tech: ["Bootstrap", "JavaScript", "WhatsApp API"],
      demoUrl: "https://mitsubishidjakarta.com/",
      category: "Web App", featured: true,
    },
    {
      title: "SME Digital Platform",
      description: "National 2nd place hackathon platform for MSMEs (Jun 2025). Integrated a WhatsApp chatbot to streamline user engagement, digital marketing, and automated customer workflows.",
      image: "/projects/sme.png",
      tech: ["Laravel", "Tailwind CSS", "WhatsApp API"],
      category: "Web App", featured: true,
    },
    {
      title: "SIPS Android Archiving",
      description: "Full-stack archiving system built from a comparative study at BBSPJIKFK (Ministry of Industry). Architected with comprehensive UML and powered by a RESTful API.",
      image: "/projects/sips.png",
      tech: ["Kotlin", "Laravel", "MySQL", "REST API"],
      category: "Mobile App", featured: true, orientation: "portrait",
    },
    {
      title: "AI Defect Detection (Fender Apron)",
      description: "End-to-end visual inspection pipeline for automotive parts (Dec 2024). Custom dataset annotation via Roboflow, YOLOv8 training, and a live real-time inference app on Streamlit and WebRTC for automated quality control.",
      image: "/projects/fender-apron.png",
      tech: ["Python", "YOLOv8", "Roboflow", "Streamlit", "WebRTC"],
      demoUrl: "https://fender-apron-detection-systems.streamlit.app/",
      githubUrl: "https://github.com/ibrahimhaykal/Fender-Apron-Detection",
      category: "AI/ML", featured: true,
    },
    {
      title: "Wedding Organizer Platform",
      description: "Web platform managing venue operations, dynamic package pricing, and customer inquiries. Streamlines vendor–client communication and booking logistics.",
      image: "/projects/wedding.png",
      tech: ["Laravel", "MySQL", "Bootstrap", "WhatsApp API"],
      demoUrl: "https://www.refnawedding.com/",
      category: "Web App",
    },
    {
      title: "Q-Tin Dashboard UI",
      description: "Responsive UI components for a smart dashboard using DaisyUI and Flowbite, built as part of a bilingual corporate profile platform with cross-device consistency.",
      image: "/projects/qtin.png",
      tech: ["Laravel", "Tailwind CSS", "DaisyUI", "Flowbite", "Figma"],
      category: "Web App", featured: true,
    },
    {
      title: "Education Chat Bot",
      description: "AI-powered learning assistant using deep learning NLP for intelligent, context-aware responses to student queries.",
      image: "/projects/edubot.png",
      tech: ["Python", "TensorFlow", "NLTK", "Streamlit"],
      githubUrl: "https://github.com/ibrahimhaykal/chatbot-edu-bot",
      category: "AI/ML",
    },
    {
      title: "E-Brochure — Indomobil",
      description: "Interactive digital automotive catalog with dynamic vehicle showcases, customizable color selections, and direct WhatsApp integration for sales lead generation.",
      image: "/projects/ebrosur.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
      demoUrl: "https://ridhoindomobil.vercel.app/",
      category: "Web App", orientation: "portrait",
    },
    {
      title: "Portfolio Website",
      description: "This site. Personal portfolio built on Next.js and TypeScript with a hand-tuned motion system, scroll-driven transitions, and a fully responsive layout.",
      image: "/projects/portfolio.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      demoUrl: "https://portfolio-website-ibrahim-haykal.vercel.app/",
      githubUrl: "https://github.com/ibrahimhaykal/portfolio-website",
      category: "Web App",
    },
    {
      title: "Cargo Invoice System",
      description: "Admin system for Herona Express optimizing logistics transactions and invoice generation, with master data management for regional shipment tracking.",
      image: "/projects/cargo.png",
      tech: ["PHP", "Bootstrap", "MySQL"],
      category: "Web App",
    },
  ];

  const categories = ["All", "Web App", "Mobile App", "AI/ML"];
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const countFor = (cat: string) =>
    cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mobile App": return <Smartphone size={12} />;
      case "Web App":    return <Globe size={12} />;
      case "AI/ML":      return <BrainCircuit size={12} />;
      default:           return <Layout size={12} />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">

        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          title="Things I shipped."
          subtitle="Enterprise platforms, manufacturing tooling, and client products — most of them running in production right now."
        />

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          variants={filterContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={filterItem}
              whileHover={{ y: -2, transition: { duration: 0.15, delay: 0 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                filter === cat
                  ? "border-gray-950 bg-gray-950 text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/[0.07] bg-white/50 text-gray-600 backdrop-blur-md hover:border-sky-500/30 hover:text-gray-950 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {cat !== "All" && getCategoryIcon(cat)}
              {cat}
              <span
                className={`font-mono text-[10px] ${
                  filter === cat ? "opacity-60" : "opacity-45"
                }`}
              >
                {countFor(cat)}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={gridContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariant}
                whileHover={{ y: -5, transition: { duration: 0.22, delay: 0 } }}
                onMouseMove={onSpotlightMove}
                onClick={() => setSelected(project)}
                className="surface surface-hover spotlight group flex cursor-pointer flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-40 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-black/30">
                  {project.image ? (
                    <div className="relative h-full w-full transform transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={project.orientation === "portrait" ? "object-contain p-3" : "object-cover"}
                      />
                    </div>
                  ) : (
                    /* Monogram fallback — screenshot belum ada */
                    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_30%_0%,rgba(14,165,233,0.22),transparent_60%)] dark:bg-[radial-gradient(120%_120%_at_30%_0%,rgba(14,165,233,0.28),transparent_60%)]">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:18px_18px]" />
                      <span className="relative font-mono text-4xl font-semibold tracking-tight text-sky-600/70 dark:text-sky-300/60">
                        {monogram(project.title)}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/50 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-900">
                      Details <ArrowUpRight size={11} />
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute right-2 top-2 z-10">
                      <span className="flex items-center gap-1 rounded-full border border-white/20 bg-sky-500/90 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow backdrop-blur-md">
                        <Star size={8} className="fill-white" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute left-2 top-2 z-10">
                    <span className="flex items-center gap-1 rounded-full border border-black/5 bg-white/90 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gray-900 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/80 dark:text-white">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1.5 flex items-start gap-2">
                    <span className="mt-[3px] font-mono text-[10px] tabular-nums text-gray-300 dark:text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-semibold leading-snug tracking-tight text-gray-950 transition-colors duration-300 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                      {project.title}
                    </h3>
                  </div>

                  <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>

                  {/* Tech — max 3 */}
                  <div className="mt-auto flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech) => {
                      const Icon = techIcons[tech];
                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-1 rounded-md border border-black/[0.06] px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:border-white/[0.07] dark:text-gray-400"
                        >
                          {Icon && (
                            <Icon className="text-xs opacity-70" aria-hidden="true" focusable="false" />
                          )}
                          {tech}
                        </span>
                      );
                    })}
                    {project.tech.length > 3 && (
                      <span className="rounded-md border border-black/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium text-gray-400 dark:border-white/[0.07] dark:text-gray-500">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center"
          variants={ctaVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.a
            href="https://github.com/ibrahimhaykal"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, transition: { duration: 0.18, delay: 0 } }}
            className="group inline-flex items-center gap-2 rounded-full border border-black/[0.07] px-5 py-2.5 text-sm text-gray-600 transition-colors duration-300 hover:border-sky-500/30 hover:text-gray-950 dark:border-white/[0.07] dark:text-gray-400 dark:hover:text-white"
          >
            <Github size={15} />
            <span>Full repository history on GitHub</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </motion.div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              variants={modalPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-black/[0.07] bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-950"
              >
                {/* Modal Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-black/40">
                  {selected.image ? (
                    <Image
                      src={selected.image}
                      alt={selected.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 42rem"
                      className={selected.orientation === "portrait" ? "object-contain p-6" : "object-cover"}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_30%_0%,rgba(14,165,233,0.22),transparent_60%)]">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:22px_22px]" />
                      <span className="relative font-mono text-6xl font-semibold tracking-tight text-sky-600/60 dark:text-sky-300/50">
                        {monogram(selected.title)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  {/* Close */}
                  <motion.button
                    onClick={() => setSelected(null)}
                    aria-label="Close project details"
                    whileHover={{ scale: 1.1, transition: { duration: 0.15, delay: 0 } }}
                    whileTap={{ scale: 0.9, transition: { duration: 0.1, delay: 0 } }}
                    className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/50 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                  >
                    <X size={16} />
                  </motion.button>

                  {/* Badges */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full border border-black/5 bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-gray-900 backdrop-blur-md dark:border-white/10 dark:bg-black/80 dark:text-white">
                      {getCategoryIcon(selected.category)}
                      {selected.category}
                    </span>
                    {selected.featured && (
                      <span className="flex items-center gap-1 rounded-full border border-white/20 bg-sky-500/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        <Star size={9} className="fill-white" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="mb-3 text-xl font-semibold tracking-tight text-gray-950 dark:text-white">
                    {selected.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {selected.description}
                  </p>

                  {/* All tech */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {selected.tech.map((tech) => {
                      const Icon = techIcons[tech];
                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 rounded-md border border-black/[0.07] bg-black/[0.02] px-2.5 py-1 text-xs font-medium text-gray-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-400"
                        >
                          {Icon && <Icon className="opacity-70" aria-hidden="true" focusable="false" />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 border-t border-black/[0.06] pt-5 dark:border-white/[0.07]">
                    {selected.demoUrl && (
                      <motion.a
                        href={selected.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, transition: { duration: 0.15, delay: 0 } }}
                        whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
                        className="flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-lg dark:bg-white dark:text-black"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </motion.a>
                    )}
                    {selected.githubUrl && (
                      <motion.a
                        href={selected.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, transition: { duration: 0.15, delay: 0 } }}
                        whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
                        className="flex items-center gap-2 rounded-full border border-black/[0.07] px-4 py-2 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:border-white/10 dark:text-white"
                      >
                        <Github size={14} />
                        Source Code
                      </motion.a>
                    )}
                    {selected.paperUrl && (
                      <motion.a
                        href={selected.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, transition: { duration: 0.15, delay: 0 } }}
                        whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
                        className="flex items-center gap-2 rounded-full border border-black/[0.07] px-4 py-2 text-sm font-semibold text-gray-900 transition-colors duration-300 dark:border-white/10 dark:text-white"
                      >
                        <FileText size={14} />
                        Thesis
                      </motion.a>
                    )}
                    <button
                      onClick={() => setSelected(null)}
                      className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
