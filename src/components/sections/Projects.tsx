"use client";
import { Code, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Fender Apron Detection",
      description:
        "A real-time system for detecting and classifying fender apron defects, including cracks, rust, and good conditions. Built with YOLOv8 and Streamlit for automotive industry applications.",
      image: "/projects/fender-apron.png",
      tech:  ["Python", "YOLOv8", "Streamlit", "OpenCV"],
      demoUrl: "https://fender-apron-detection-systems.streamlit.app/",
      githubUrl: "https://github.com/ibrahimhaykal/Fender-Apron-Detection",
    },
    {
      title: "Education Chat Bot",
      description:
        "EduBot is an AI-powered chatbot designed for interactive learning. It uses deep learning to understand and respond to user questions naturally and informatively. Built with Python, EduBot leverages libraries like TensorFlow, NLTK, and Streamlit for easy model training and testing.",
      image: "/projects/edubot.png",
      tech: ["Python", "TensorFlow", "NLTK", "Streamlit"],
      githubUrl: "https://github.com/ibrahimhaykal/chatbot-edu-bot",
    },
    {
      title: "Company Profile Nirmala Technology",
      description:
        "A responsive Company Profile for Nirmala Technology With English Page And Indonesian Page, built with Tailwind CSS and Laravel.",
      image: "/projects/nirma.png",
      tech: ["Laravel", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "This is my personal portfolio website, built with Next.js and TypeScript. It showcases my projects and skills through a clean, responsive design, providing an interactive and user-friendly experience. The site highlights my work in web development and other technical projects, offering a professional and dynamic platform to display my achievements.",
      image: "/projects/portfolio.png",
      tech:  ["Next.js", "TypeScript"],
      demoUrl: "https://portfolio-website-ibrahim-haykal.vercel.app/",
      githubUrl: "https://github.com/ibrahimhaykal/portfolio-website",
    },
    {
      title: "Cargo Management System",
      description:
        "A system to manage and track cargo shipments efficiently On Herona Express, built using PHP, Bootstrap, and MySQL.",
      image: "/projects/cargo.png",
      tech: ["PHP", "Bootstrap", "MySQL"],
      githubUrl: "https://github.com/ibrahimhaykal/Manajemen-Pengiriman-Barang",
    },
    {
      title: "Scholarship Registration System",
      description:
        "A system for managing scholarship applications with user-friendly registration features.",
      image: "/projects/scholar.png",
      tech: ["PHP", "Bootstrap", "MySQL"],
      githubUrl: "https://github.com/ibrahimhaykal/Sistem-PendaftaranBeasiswa",
    },
  ];

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const underlineVariants = {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: { duration: 0.8, delay: 0.5 }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const techBadgeVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
      {/* Enhanced Responsive Header */}
      <motion.div 
        className="text-center mb-8 md:mb-16 px-4"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="relative inline-block max-w-full">
          <h2 className="flex flex-col sm:flex-row items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="bg-sky-100 dark:bg-sky-900/40 rounded-full p-2 mb-2 sm:mb-0 sm:mr-3"
            >
              <Code className="text-sky-500 dark:text-sky-400" size={24} />
            </motion.span>
            <span className="relative">
              My Journey Through Code
              <motion.span 
                className="absolute -bottom-2 left-0 h-0.5 bg-sky-500/20 dark:bg-sky-400/20"
                variants={underlineVariants}
              />
            </span>
          </h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mt-4 max-w-sm sm:max-w-md md:max-w-lg mx-auto text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Each project tells a story of challenges overcome and skills gained. 
            Take a look at what I&apos;ve built with passion and dedication.
          </motion.p>
          
          {/* Decorative corners - responsive sizing */}
          <motion.div 
            className="absolute -top-3 sm:-top-6 -left-3 sm:-left-6 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 border-sky-500/20 dark:border-sky-400/20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 border-sky-500/20 dark:border-sky-400/20"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.5
            }}
          />
        </div>
      </motion.div>
        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={projectVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-sky-900/20 transition-all duration-300"
            >
              {/* Project Image */}
              <motion.div 
                className="relative group h-48"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <motion.div 
                  className="absolute inset-0 bg-sky-500/80 dark:bg-sky-600/80 flex items-center justify-center space-x-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      className="p-2 bg-white dark:bg-gray-900 rounded-full"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title="Live Demo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      className="p-2 bg-white dark:bg-gray-900 rounded-full"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title="View Code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>

              {/* Project Details */}
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      variants={techBadgeVariants}
                      className="bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300 px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}