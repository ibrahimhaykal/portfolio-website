"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  // Data Socials - Added aria-label for SEO/Accessibility
  const socials = [
    { 
      icon: Github, 
      link: "https://github.com/ibrahimhaykal",
      label: "Visit GitHub Profile" 
    },
    { 
      icon: Linkedin, 
      link: "https://www.linkedin.com/in/ibrahimhaykalalatas/",
      label: "Visit LinkedIn Profile"
    },
    { 
      icon: Mail, 
      link: "mailto:ibrahimhaykal@gmail.com",
      label: "Send Email"
    },
  ];

  return (
    <footer className="border-t border-gray-200/50 dark:border-white/5 py-10 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Ibrahim Haykal</h3>
            {/* FIX CONTRAST: text-gray-500 -> text-gray-600 dark:text-gray-400 */}
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Full Stack Developer</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                // FIX CONTRAST & HOVER COLOR
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label} // FIX ACCESSIBILITY
                className="p-2.5 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 hover:scale-110 transition-all duration-300 border border-gray-200/50 dark:border-white/5"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          {/* FIX CONTRAST: text-gray-500 -> text-gray-600 dark:text-gray-400 */}
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Ibrahim Haykal Alatas. All rights reserved.
          </p>
          
          <motion.div 
            // FIX CONTRAST: text-gray-500 -> text-gray-600 dark:text-gray-400
            className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 bg-white/40 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-white/5 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            >
               <Heart size={12} className="fill-red-500 text-red-500" />
            </motion.div>
            <span>in Jakarta</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}