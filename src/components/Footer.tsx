"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, MessageCircle } from "lucide-react";

// ─── Variants (outside component — stable reference) ──────────────────────────

const footerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const footerColVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const socialsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const socialItem = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const bottomVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const heartTransition = {
  duration: 0.8,
  repeat: Infinity,
  repeatDelay: 1,
  ease: "easeInOut" as const,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { name: "Home",       id: "home" },
    { name: "About",      id: "about" },
    { name: "Projects",   id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact",    id: "contact" },
  ];

  const socials = [
    { icon: Github,        link: "https://github.com/ibrahimhaykal",                    label: "Visit GitHub Profile" },
    { icon: Linkedin,      link: "https://www.linkedin.com/in/ibrahimhaykalalatas/",    label: "Visit LinkedIn Profile" },
    { icon: MessageCircle, link: "https://wa.me/6289628066432",                         label: "Chat on WhatsApp" },
    { icon: Mail,          link: "mailto:ibrahimhaykal@gmail.com",                      label: "Send Email" },
  ];

  return (
    <footer className="border-t border-gray-200/50 dark:border-white/5 py-10 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto px-6">

        {/* Top Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-4 mb-10"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand */}
          <motion.div variants={footerColVariants} className="text-center lg:text-left flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
              Ibrahim Haykal
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              System Engineer | Full Stack Developer
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={footerColVariants}
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 flex-1 lg:max-w-xs"
          >
            {links.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ y: -2, transition: { duration: 0.15, delay: 0 } }}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Social Icons — staggered */}
          <motion.div
            variants={socialsContainer}
            className="flex justify-center lg:justify-end gap-3 flex-1"
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                variants={socialItem}
                whileHover={{ scale: 1.15, transition: { duration: 0.15, delay: 0 } }}
                whileTap={{ scale: 0.9, transition: { duration: 0.1, delay: 0 } }}
                className="p-2.5 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-colors duration-300 border border-gray-200/50 dark:border-white/5 flex-shrink-0"
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={bottomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="pt-8 border-t border-gray-200/50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium"
        >
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Ibrahim Haykal Alatas. All rights reserved.
          </p>

          <motion.div
            className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 bg-white/40 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-white/5 backdrop-blur-sm"
            whileHover={{ scale: 1.05, transition: { duration: 0.18, delay: 0 } }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={heartTransition}
            >
              <Heart size={12} className="fill-red-500 text-red-500" />
            </motion.div>
            <span>in Jakarta</span>
          </motion.div>
        </motion.div>

      </div>
    </footer>
  );
}