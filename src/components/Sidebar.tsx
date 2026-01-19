"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Moon, Sun, Home, User, Code, Briefcase, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Initialize dark mode
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") !== "false";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
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

  // Track active section
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
    { name: "Home", id: "home", icon: Home },
    { name: "About", id: "about", icon: User },
    { name: "Projects", id: "projects", icon: Code },
    { name: "Experience", id: "experience", icon: Briefcase },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Sidebar - Floating & Thin */}
      <aside className="hidden lg:flex fixed left-6 top-6 bottom-6 w-64 flex-col z-50">
        <div className="flex-1 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 flex flex-col shadow-[0_0_15px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* Profile Section */}
          <div className="p-6 border-b border-black/5 dark:border-white/5">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-16 h-16 mx-auto mb-4 cursor-pointer group"
              onClick={() => scrollToSection("home")}
            >
              {/* Profile Image with Thin Ring */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
                 <Image 
                    src="/profile/profile-img.png" 
                    alt="Profile"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                 />
              </div>
              
              {/* FIXED EMOJI DESKTOP: Added z-50 and filter-none for iOS */}
              <div className="absolute -bottom-1 -right-1 z-50 w-6 h-6 bg-white dark:bg-zinc-900 border-2 border-white dark:border-zinc-900 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs leading-none filter-none">👋🏼</span>
              </div>
            </motion.div>

            <div className="text-center">
              <h2 className="text-gray-900 dark:text-white font-semibold text-sm tracking-wide">
                Ibrahim Haykal
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-light">
                Full Stack Developer
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "text-black dark:text-white bg-black/5 dark:bg-white/10"
                        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} className={`transition-colors ${isActive ? "text-sky-500" : "group-hover:text-sky-500"}`} />
                    <span className="text-sm font-medium">{item.name}</span>
                    
                    {/* Active Indicator (Small dot) */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeDot"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-sky-500" 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Dark Mode Toggle */}
          <div className="p-4 border-t border-black/5 dark:border-white/5">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                <span className="text-xs font-medium uppercase tracking-wider">{darkMode ? "Dark" : "Light"}</span>
              </div>
              <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${
                darkMode ? "bg-zinc-700" : "bg-zinc-300"
              }`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${
                  darkMode ? "left-5" : "left-1"
                }`} />
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 z-50">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            
            {/* FIXED EMOJI MOBILE: Wrapped in relative div to support badge */}
            <div className="relative">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                 <Image 
                   src="/profile/profile-img.png"
                   alt="Profile"
                   fill
                   className="object-cover"
                 />
              </div>
              {/* Added Emoji Badge for Mobile */}
              <div className="absolute -bottom-1 -right-1 z-50 w-4 h-4 bg-white dark:bg-zinc-900 border border-white dark:border-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-[8px] leading-none filter-none">👋🏼</span>
              </div>
            </div>

            <div>
              <h2 className="text-gray-900 dark:text-white font-medium text-sm">Ibrahim Haykal</h2>
              <p className="text-gray-500 dark:text-gray-500 text-[10px] tracking-wide uppercase">Full Stack Developer</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} // Smoother fade
              className="lg:hidden fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 mt-[60px]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              // FIXED ANIMATION: Changed from Spring to EaseOut for smoother mobile performance
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
              className="lg:hidden fixed right-0 top-[60px] bottom-0 w-64 bg-white dark:bg-zinc-950 border-l border-black/5 dark:border-white/10 z-50 shadow-2xl"
            >
              <nav className="p-4 h-full flex flex-col">
                <div className="space-y-1 flex-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-black/5 dark:bg-white/10 text-black dark:text-white"
                            : "text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <Icon size={18} className={isActive ? "text-sky-500" : ""} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Mobile Dark Toggle */}
                <div className="pt-4 border-t border-black/5 dark:border-white/10">
                   <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-sm font-medium">Dark Mode</span>
                    <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${
                      darkMode ? "bg-zinc-700" : "bg-zinc-300"
                    }`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${
                        darkMode ? "left-5" : "left-1"
                      }`} />
                    </div>
                  </button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}