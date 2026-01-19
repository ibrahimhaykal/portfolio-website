"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [text] = useTypewriter({
    words: [
      "Full Stack Developer",
      "IT Operations Engineer",
      "Automation Engineer",
      "Backend Engineer",
      "Lifelong Learner ✌️"
    ],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  const socials = [
    { 
      icon: Github, 
      link: "https://github.com/ibrahimhaykal",
      label: "Visit GitHub Profile", 
      color: "group-hover:text-[#181717] dark:group-hover:text-white" 
    },
    { 
      icon: Linkedin, 
      link: "https://www.linkedin.com/in/ibrahimhaykalalatas/",
      label: "Visit LinkedIn Profile", 
      color: "group-hover:text-[#0A66C2]" 
    },
    { 
      icon: Mail, 
      link: "mailto:ibrahimhaykal@gmail.com",
      label: "Send Email", 
      color: "group-hover:text-[#EA4335]" 
    },
  ];

  // Variabel animasi agar lebih rapi dan reusable
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: delay, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] // Custom Cubic Bezier untuk smooth "Apple-like" animation
      }
    })
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-transparent py-16 relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Profile Avatar Wrapper */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6">
          
          {/* Avatar Main Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // Lebih smooth daripada spring
            className="relative w-full h-full"
          >
            {/* Soft Glow Behind - Opacity dikurangi dikit biar enteng di HP */}
            <div className="absolute inset-0 bg-sky-500/30 blur-2xl rounded-full opacity-40" />

            {/* Ring Container */}
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 dark:to-transparent">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-zinc-950 relative shadow-2xl">
                <Image 
                  src="/profile/profile-img.png"
                  alt="Ibrahim Haykal"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Badge - FIXED: Ditambahkan z-50 dan posisi yang aman */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -bottom-2 -right-2 z-50 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-zinc-800"
          >
            <span className="text-xl leading-none select-none pointer-events-none filter-none" role="img" aria-label="Coder Emoji">
              👨🏼‍💻
            </span>
          </motion.div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Ibrahim Haykal Alatas
        </h1>

        {/* Subtitle with typewriter */}
        <motion.div
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="h-8 mb-6 relative" // relative context
        >
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 font-medium">
                {text.replace(" ✌️", "")}
              </span>
              {text.includes("✌️") && <span className="inline-block" role="img" aria-label="Peace">✌️</span>}
            </span>
            <Cursor cursorStyle="|" cursorColor="#0EA5E9" />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-gray-500 dark:text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          Final-year student engineering automated systems at <strong className="text-gray-900 dark:text-white font-medium">Astra Otoparts Group</strong>—from ERP synchronizations to zero-downtime database migrations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4 mb-2"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-gray-900/20 dark:shadow-white/20"
          >
            View Work
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 bg-white dark:bg-black text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition-all duration-300"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-center gap-5 mb-8"
        >
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group p-3 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-300"
            >
              <social.icon 
                size={22} 
                className={`text-gray-500 dark:text-gray-400 transition-colors duration-300 ${social.color}`} 
              />
            </a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          custom={0.8}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex justify-center"
        >
          <button
            onClick={() => scrollToSection('about')}
            aria-label="Scroll down to About section"
            className="flex flex-col items-center gap-2 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group"
          >
            <span className="text-sm font-medium">Let&apos;s Get Started</span>
            <ArrowDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}