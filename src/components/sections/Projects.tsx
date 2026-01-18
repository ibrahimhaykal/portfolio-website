"use client";

import { useState } from "react";
import { ExternalLink, Github, Globe, Smartphone, BrainCircuit, Star, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import { 
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs, 
  SiTypescript, SiTailwindcss, SiKotlin,
  SiDaisyui
} from "react-icons/si";
import Image from "next/image";

// Definisi tipe data project
type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  orientation?: "landscape" | "portrait"; // Untuk mengatur object-fit pada gambar
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
};

export default function Projects() {
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
    DaisyUI: <SiDaisyui />,
  };
  const [filter, setFilter] = useState("All");

  const projects: Project[] = [
    {
      title: "SIPS - Sistem Informasi Penomoran Surat",
      description:
        "Mobile application for seamless document number requests and real-time status tracking. Integrated with Laravel backend for secure data synchronization.",
      image: "/projects/sips.png",
      tech: ["Laravel", "Kotlin", "MySQL", "REST API"],
      category: "Mobile App",
      featured: true,
      orientation: "portrait",
    },
    {
      title: "Fender Apron Detection",
      description:
        "Real-time defect detection system for automotive industry using YOLOv8 for accurate classification of cracks, rust, and optimal conditions.",
      image: "/projects/fender-apron.png",
      tech: ["Python", "YOLOv8", "Streamlit", "OpenCV"],
      demoUrl: "https://fender-apron-detection-systems.streamlit.app/",
      githubUrl: "https://github.com/ibrahimhaykal/Fender-Apron-Detection",
      category: "AI/ML",
      featured: true
    },
    // {
    //   title: "Digital Menu & POS System",
    //   description:
    //     "Complete restaurant management with digital menu, real-time kitchen display, integrated POS with thermal receipt printing. Integrated with Midtrans payment gateway for QRIS, e-wallet, and bank transfers.",
    //   image: "/projects/pos.png",
    //   tech: ["Laravel", "MySQL", "jQuery", "Midtrans API"],
    //   category: "Web App",
    //   featured: true,
    //   // Default landscape, gaperlu ditambahin orientation
    // },
    {
      title: "Wedding Organizer Management",
      description:
        "Complete wedding planning platform with venue management, package pricing, service catalog, customer inquiry system, and elegant gallery showcase.",
      image: "/projects/wedding.png",
      tech: ["Laravel", "MySQL", "Bootstrap", "WhatsApp Integration"],
      demoUrl: "https://www.refnawedding.com/",
      category: "Web App",
      featured: true,
    },
    {
      title: "Q-Tin Dashboard UI Slicing",
      description:
        "High-fidelity UI implementation for a smart canteen management dashboard. Converted Figma designs into responsive Laravel Blade templates using Tailwind CSS.",
      image: "/projects/qtin.png",
      tech: ["Laravel", "Tailwind CSS", "DaisyUI", "Flowbite", "Figma"],
      category: "Web App",
      featured: true,
    },
    {
      title: "Education Chat Bot",
      description:
        "AI-powered interactive learning assistant using deep learning for natural language understanding and intelligent responses to student queries.",
      image: "/projects/edubot.png",
      tech: ["Python", "TensorFlow", "NLTK", "Streamlit"],
      githubUrl: "https://github.com/ibrahimhaykal/chatbot-edu-bot",
      category: "AI/ML"
    },
    {
      title: "E-Brochure Platform - Indomobil",
      description:
        "Modern digital catalog for automotive products with interactive showcase, dynamic color selection, and WhatsApp integration for seamless customer engagement.",
      image: "/projects/ebrosur.png",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
      demoUrl: "https://ridhoindomobil.vercel.app/",
      category: "Web App",
      orientation: "portrait",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio showcasing projects and skills through clean, responsive design with interactive elements and smooth animations.",
      image: "/projects/portfolio.png",
      tech: ["Next.js", "TypeScript", "Framer Motion"],
      demoUrl: "https://portfolio-website-ibrahim-haykal.vercel.app/",
      githubUrl: "https://github.com/ibrahimhaykal/portfolio-website",
      category: "Web App"
    },
{
      title: "Cargo Invoice System (Herona Express)",
      description:
        "Web-based administration dashboard for recording shipping transactions and generating invoices. Features master data management for senders, receivers, and regional logistics locations.",
      image: "/projects/cargo.png", 
      tech: ["PHP", "Bootstrap", "MySQL", "jQuery"], 
      category: "Web App"
    },
  ];

  const categories = ["All", "Web App", "Mobile App", "AI/ML"];
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mobile App": return <Smartphone size={14} />;
      case "Web App": return <Globe size={14} />;
      case "AI/ML": return <BrainCircuit size={14} />;
      default: return <Layout size={14} />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Crafted experiences that solve real problems.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                filter === cat
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white shadow-lg shadow-sky-500/10"
                  : "bg-white/40 dark:bg-zinc-900/40 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border-gray-200/50 dark:border-white/10 hover:border-sky-500/30 backdrop-blur-sm"
              }`}
            >
              {cat !== "All" && getCategoryIcon(cat)}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-sky-500/5"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  
                  {/* Image Section - HYBRID MODE */}
                  <div className="relative lg:w-80 h-64 lg:h-auto bg-gray-100 dark:bg-black/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    
                    {/* Placeholder Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-white/5 dark:to-white/10" />
                    
                    {/* Next.js Image Component - SMART ORIENTATION */}
                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                       <Image 
                          src={project.image} 
                          alt={project.title}
                          fill
                          // LOGIC: Kalo portrait -> contain, Kalo landscape -> cover
                          className={project.orientation === "portrait" ? "object-contain p-2" : "object-cover"}
                       />
                    </div>

                    {/* Overlay Gradient (Cuma buat Landscape) */}
                    {project.orientation !== "portrait" && (
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:hidden" />
                    )}
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-sky-500/90 text-white rounded-full shadow-lg backdrop-blur-md border border-white/20">
                          <Star size={10} className="fill-white" />
                          Featured
                        </span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white rounded-full border border-black/5 dark:border-white/10 shadow-sm">
                        {getCategoryIcon(project.category)}
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-sky-500 transition-colors duration-300">
                           {project.title}
                         </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => {
                          const Icon = techIcons[tech];
                          return (
                            <span
                              key={i}
                              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium
                                         text-gray-600 dark:text-gray-400
                                         bg-white/50 dark:bg-white/5
                                         rounded-md border border-gray-200/50 dark:border-white/5"
                            >
                              {Icon && <span className="text-xs opacity-70">{Icon}</span>}
                              <span>{tech}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50 dark:border-white/5">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-gray-900/10 dark:shadow-white/10"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/10 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 border border-gray-200 dark:border-white/10"
                        >
                          <Github size={14} />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://github.com/ibrahimhaykal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-300 text-sm group"
          >
            <span>See more projects on GitHub</span>
            <Github size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}