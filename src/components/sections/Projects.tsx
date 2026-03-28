"use client";

import { useState } from "react";
import { ExternalLink, Github, Globe, Smartphone, BrainCircuit, Star, Layout, X, ChevronRight } from "lucide-react";
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

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  orientation?: "landscape" | "portrait";
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
};

// ─── Variants (outside component — stable reference) ──────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

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
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.42, ease: [0.25, 0.1, 0.25, 1] },
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
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0, y: 20, scale: 0.97,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Projects() {
  const techIcons: Record<string, JSX.Element> = {
    Laravel: <FaLaravel />, PHP: <FaPhp />, "Node.js": <FaNodeJs />,
    React: <FaReact />, JavaScript: <FaJs />, Python: <FaPython />,
    Figma: <FaFigma />, Git: <FaGitAlt />, Docker: <FaDocker />,
    Database: <FaDatabase />, PostgreSQL: <SiPostgresql />, Oracle: <SiOracle />,
    MySQL: <SiMysql />, "Next.js": <SiNextdotjs />, TypeScript: <SiTypescript />,
    "Tailwind CSS": <SiTailwindcss />, Kotlin: <SiKotlin />,
    DaisyUI: <SiDaisyui />, Bootstrap: <SiBootstrap />,
  };

  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Real-Time Warehouse Inventory",
      description: "Enterprise-grade inventory dashboard for Astra Otoparts Group. Features live visualization of 48 physical rack blocks, barcode scanning, and complex FIFO logic — bypassing read-only legacy ERP constraints while handling 400+ weekly transactions.",
      image: "/projects/warehouse.png",
      tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript"],
      category: "Web App", featured: true,
    },
    {
      title: "Smart Andon Ticketing System",
      description: "Stateful digital ticketing system that maps and automates physical manufacturing workflows. Monitors operational bottlenecks, measures Mean Time To Repair (MTTR), and enforces secure issue resolution through OTP and QR code validations.",
      image: "/projects/andon.png",
      tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript"],
      category: "Web App", featured: true,
    },
    {
      title: "Mitsubishi Dealership Landing",
      description: "Freelance corporate profile and lead-generation landing page for a Mitsubishi dealership. Features interactive vehicle showcases using Swiper.js and direct WhatsApp routing to accelerate sales conversions.",
      image: "/projects/mitsubishi.png",
      tech: ["Bootstrap", "JavaScript", "WhatsApp API"],
      demoUrl: "https://mitsubishidjakarta.com/",
      category: "Web App", featured: true,
    },
    {
      title: "SME Digital Platform",
      description: "National 2nd Place hackathon platform engineered for MSMEs. Integrated a dynamic WhatsApp chatbot to streamline user engagement, digital marketing, and automated customer workflows.",
      image: "/projects/sme.png",
      tech: ["Laravel", "Tailwind CSS", "WhatsApp API"],
      category: "Web App", featured: true,
    },
    {
      title: "SIPS Android Archiving",
      description: "Full-stack archiving system developed based on a comparative study at BBSPJIKFK (Ministry of Industry). Architected with comprehensive UML and powered by a robust RESTful API.",
      image: "/projects/sips.png",
      tech: ["Kotlin", "Laravel", "MySQL", "REST API"],
      category: "Mobile App", featured: true, orientation: "portrait",
    },
    {
      title: "AI Defect Detection (Fender Apron)",
      description: "End-to-end visual inspection pipeline for automotive parts. Annotated custom datasets via Roboflow and deployed a live real-time inference web app using Streamlit and WebRTC for automated Quality Control.",
      image: "/projects/fender-apron.png",
      tech: ["Python", "YOLOv8", "Roboflow", "Streamlit", "WebRTC"],
      demoUrl: "https://fender-apron-detection-systems.streamlit.app/",
      githubUrl: "https://github.com/ibrahimhaykal/Fender-Apron-Detection",
      category: "AI/ML", featured: true,
    },
    {
      title: "Wedding Organizer Platform",
      description: "Web platform managing venue operations, dynamic package pricing, and customer inquiries. Streamlines vendor-client communication and booking logistics.",
      image: "/projects/wedding.png",
      tech: ["Laravel", "MySQL", "Bootstrap", "WhatsApp API"],
      demoUrl: "https://www.refnawedding.com/",
      category: "Web App",
    },
    {
      title: "Q-Tin Dashboard UI",
      description: "Responsive UI components for a smart dashboard using DaisyUI and Flowbite. Engineered as part of a corporate profile platform ensuring cross-device consistency.",
      image: "/projects/qtin.png",
      tech: ["Laravel", "Tailwind CSS", "DaisyUI", "Flowbite", "Figma"],
      category: "Web App", featured: true,
    },
    {
      title: "Education Chat Bot",
      description: "AI-powered learning assistant with deep learning NLP for intelligent, context-aware responses to student queries.",
      image: "/projects/edubot.png",
      tech: ["Python", "TensorFlow", "NLTK", "Streamlit"],
      githubUrl: "https://github.com/ibrahimhaykal/chatbot-edu-bot",
      category: "AI/ML",
    },
    {
      title: "E-Brochure — Indomobil",
      description: "Digital automotive catalog with interactive showcases, dynamic color selections, and WhatsApp integrations for seamless sales lead generation.",
      image: "/projects/ebrosur.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
      demoUrl: "https://ridhoindomobil.vercel.app/",
      category: "Web App", orientation: "portrait",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing full-stack and system engineering capabilities with clean responsive design, Framer Motion animations, and modern architecture.",
      image: "/projects/portfolio.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      demoUrl: "https://portfolio-website-ibrahim-haykal.vercel.app/",
      githubUrl: "https://github.com/ibrahimhaykal/portfolio-website",
      category: "Web App",
    },
    {
      title: "Cargo Invoice System",
      description: "Admin system for Herona Express optimizing logistics transactions and invoice generation. Includes master data management for regional shipment tracking.",
      image: "/projects/cargo.png",
      tech: ["PHP", "Bootstrap", "MySQL"],
      category: "Web App",
    },
  ];

  const categories = ["All", "Web App", "Mobile App", "AI/ML"];
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mobile App": return <Smartphone size={12} />;
      case "Web App":    return <Globe size={12} />;
      case "AI/ML":      return <BrainCircuit size={12} />;
      default:           return <Layout size={12} />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Projects.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Engineering robust solutions for complex operational challenges.
          </p>
        </motion.div>

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
              whileHover={{ scale: 1.05, transition: { duration: 0.15, delay: 0 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1, delay: 0 } }}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300 flex items-center gap-2 border ${
                filter === cat
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white shadow-lg shadow-sky-500/10"
                  : "bg-white/40 dark:bg-zinc-900/40 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-gray-200/50 dark:border-white/10 hover:border-sky-500/30 backdrop-blur-sm"
              }`}
            >
              {cat !== "All" && getCategoryIcon(cat)}
              {cat}
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
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariant}
                whileHover={{ y: -4, transition: { duration: 0.2, delay: 0 } }}
                onClick={() => setSelected(project)}
                className="group relative bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-colors duration-300 flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 bg-gray-100 dark:bg-black/20 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-white/5 dark:to-white/10" />
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={project.orientation === "portrait" ? "object-contain p-3" : "object-cover"}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      View Details <ChevronRight size={12} />
                    </span>
                  </div>

                  {project.featured && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-sky-500/90 text-white rounded-full shadow backdrop-blur-md border border-white/20">
                        <Star size={8} className="fill-white" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white rounded-full border border-black/5 dark:border-white/10 shadow-sm">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-sky-500 transition-colors duration-300 mb-1.5 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech — max 3 */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.tech.slice(0, 3).map((tech, i) => {
                      const Icon = techIcons[tech];
                      return (
                        <span key={i} className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-white/5 rounded-md border border-gray-200/50 dark:border-white/5">
                          {Icon && <span className="opacity-70 text-xs">{Icon}</span>}
                          {tech}
                        </span>
                      );
                    })}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-white/30 dark:bg-white/5 rounded-md border border-gray-200/50 dark:border-white/5">
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
          className="text-center mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.a
            href="https://github.com/ibrahimhaykal"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3, transition: { duration: 0.18, delay: 0 } }}
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-300 text-sm"
          >
            <span>Explore my complete repository history on GitHub</span>
            <Github size={14} />
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
                className="pointer-events-auto w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl"
              >
                {/* Modal Image */}
                <div className="relative h-56 bg-gray-100 dark:bg-black/30 overflow-hidden">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    className={selected.orientation === "portrait" ? "object-contain p-6" : "object-cover"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Close */}
                  <motion.button
                    onClick={() => setSelected(null)}
                    whileHover={{ scale: 1.1, transition: { duration: 0.15, delay: 0 } }}
                    whileTap={{ scale: 0.9, transition: { duration: 0.1, delay: 0 } }}
                    className="absolute top-3 right-3 z-10 p-1.5 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white rounded-full border border-white/20 transition-colors"
                  >
                    <X size={16} />
                  </motion.button>

                  {/* Badges */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white rounded-full border border-black/5 dark:border-white/10">
                      {getCategoryIcon(selected.category)}
                      {selected.category}
                    </span>
                    {selected.featured && (
                      <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-sky-500/90 text-white rounded-full border border-white/20">
                        <Star size={9} className="fill-white" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selected.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                    {selected.description}
                  </p>

                  {/* All tech */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selected.tech.map((tech, i) => {
                      const Icon = techIcons[tech];
                      return (
                        <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-md border border-gray-200 dark:border-white/10">
                          {Icon && <span className="opacity-70">{Icon}</span>}
                          {tech}
                        </span>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                    {selected.demoUrl && (
                      <motion.a
                        href={selected.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04, transition: { duration: 0.15, delay: 0 } }}
                        whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium shadow-lg"
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
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/10 text-gray-900 dark:text-white rounded-xl text-sm font-medium border border-gray-200 dark:border-white/10 transition-colors duration-300"
                      >
                        <Github size={14} />
                        Source Code
                      </motion.a>
                    )}
                    <button
                      onClick={() => setSelected(null)}
                      className="ml-auto text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
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