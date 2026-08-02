"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Sun, Home, User, Code, Briefcase, Mail, Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Variants (outside component — stable reference) ──────────────────────────

const profileVariants = {
  hidden: { scale: 0.88, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Nav items stagger on mount
const navContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Mobile menu slide-in panel
const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const mobileBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

// Mobile nav items stagger
const mobileNavContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const mobileNavItem = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") !== "false";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navItems = [
    { name: "Home",       id: "home",       icon: Home },
    { name: "About",      id: "about",      icon: User },
    { name: "Projects",   id: "projects",   icon: Code },
    { name: "Experience", id: "experience", icon: Briefcase },
    { name: "Contact",    id: "contact",    icon: Mail },
  ];

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex fixed left-6 top-6 bottom-6 w-64 flex-col z-50">
        <div className="flex-1 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 flex flex-col shadow-[0_0_15px_rgba(0,0,0,0.03)] overflow-hidden">

          {/* Profile */}
          <div className="p-6 border-b border-black/5 dark:border-white/5">
            <motion.div
              variants={profileVariants}
              initial="hidden"
              animate="visible"
              className="relative w-16 h-16 mx-auto mb-4 cursor-pointer group"
              onClick={() => scrollToSection("home")}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
                <Image
                  src="/profile/profile-sidebar.png"
                  alt="Profile"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 z-50 w-6 h-6 bg-white dark:bg-zinc-900 border-2 border-white dark:border-zinc-900 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs leading-none filter-none">👋🏼</span>
              </div>
            </motion.div>

            <div className="text-center">
              <h2 className="text-gray-950 dark:text-white font-semibold text-[15px] tracking-tight">
                Ibrahim Haykal
              </h2>
              <p className="eyebrow text-gray-500 dark:text-gray-400 mt-1.5">
                Full Stack Developer
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                  Open to work
                </span>
              </div>
            </div>
          </div>

          {/* Navigation — staggered entrance */}
          <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
            <motion.div
              className="space-y-1"
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    variants={navItemVariants}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ x: 3, transition: { duration: 0.15, delay: 0 } }}
                    className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-300 group ${
                      isActive
                        ? "text-gray-950 dark:text-white"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navPill"
                        transition={{ type: "spring", stiffness: 340, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-black/[0.055] ring-1 ring-inset ring-black/[0.06] dark:bg-white/[0.08] dark:ring-white/10"
                      />
                    )}
                    <Icon
                      size={17}
                      strokeWidth={2}
                      className={`relative z-10 transition-colors ${isActive ? "text-sky-500" : "group-hover:text-sky-500"}`}
                    />
                    <span className="relative z-10 text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute right-3 z-10 w-1.5 h-1.5 rounded-full bg-sky-500"
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </nav>

          {/* Resume + Dark Mode Toggle */}
          <div className="p-4 border-t border-black/5 dark:border-white/5 space-y-2">
            <motion.a
              href="/cv/Ibrahim_Haykal_Alatas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, transition: { duration: 0.15, delay: 0 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1, delay: 0 } }}
              className="group flex w-full items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/[0.07] px-4 py-2.5 text-sky-700 transition-colors duration-300 hover:bg-sky-500/[0.14] dark:text-sky-300"
            >
              <span className="flex items-center gap-2">
                <FileText size={15} />
                <span className="text-xs font-semibold">Resume</span>
              </span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>

            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.02, transition: { duration: 0.15, delay: 0 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1, delay: 0 } }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                <span className="text-xs font-medium uppercase tracking-wider">
                  {darkMode ? "Dark" : "Light"}
                </span>
              </div>
              <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${darkMode ? "left-5" : "left-1"}`} />
              </div>
            </motion.button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 z-50">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                <Image
                  src="/profile/profile-sidebar.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 z-50 w-4 h-4 bg-white dark:bg-zinc-900 border border-white dark:border-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-[8px] leading-none filter-none">👋🏼</span>
              </div>
            </div>
            <div>
              <h2 className="text-gray-950 dark:text-white font-semibold text-sm tracking-tight">Ibrahim Haykal</h2>
              <p className="eyebrow text-gray-500 dark:text-gray-400">Full Stack Developer</p>
            </div>
          </div>

          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.08, transition: { duration: 0.15, delay: 0 } }}
            whileTap={{ scale: 0.92, transition: { duration: 0.1, delay: 0 } }}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              variants={mobileBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 mt-[60px]"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed right-0 top-[60px] bottom-0 w-64 bg-white dark:bg-zinc-950 border-l border-black/5 dark:border-white/10 z-50 shadow-2xl"
            >
              <nav className="p-4 h-full flex flex-col">
                {/* Nav items — stagger from right */}
                <motion.div
                  className="space-y-1 flex-1"
                  variants={mobileNavContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        variants={mobileNavItem}
                        onClick={() => scrollToSection(item.id)}
                        whileHover={{ x: -3, transition: { duration: 0.15, delay: 0 } }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                          isActive
                            ? "bg-black/5 dark:bg-white/10 text-black dark:text-white"
                            : "text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <Icon size={18} className={isActive ? "text-sky-500" : ""} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Mobile Dark Toggle */}
                <div className="pt-4 border-t border-black/5 dark:border-white/10">
                  <motion.button
                    onClick={toggleDarkMode}
                    whileHover={{ scale: 1.02, transition: { duration: 0.15, delay: 0 } }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.1, delay: 0 } }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-sm font-medium">Dark Mode</span>
                    <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${darkMode ? "left-5" : "left-1"}`} />
                    </div>
                  </motion.button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}