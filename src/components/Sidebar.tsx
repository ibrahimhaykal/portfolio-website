"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Sun, Home, User, Code, Briefcase, Mail, Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "../lib/reveal";

const NAV_ITEMS = [
  { name: "Home",       id: "home",       icon: Home },
  { name: "About",      id: "about",      icon: User },
  { name: "Projects",   id: "projects",   icon: Code },
  { name: "Experience", id: "experience", icon: Briefcase },
  { name: "Contact",    id: "contact",    icon: Mail },
];

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Class `dark` udah dipasang script blocking di layout sebelum paint pertama.
  // Di sini cuma nyamain state tombol sama kondisi DOM.
  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  /*
    Section aktif dideteksi IntersectionObserver. Nggak ada perhitungan posisi
    yang bisa meleset — browser yang bilang section mana yang lagi di tengah
    layar. rootMargin memangkas viewport jadi satu pita tipis di tengah, jadi
    yang "aktif" selalu tepat satu.
  */
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex fixed left-6 top-6 bottom-6 w-64 flex-col z-50">
        {/* Sengaja tanpa backdrop-blur: sidebar ini nempel di layar sementara
            konten di belakangnya bergerak, jadi backdrop-filter harus nyontek
            ulang tiap frame scroll. Latar hampir pekat, hasilnya nyaris sama. */}
        <div className="flex-1 bg-white/95 dark:bg-zinc-950/95 rounded-2xl border border-black/5 dark:border-white/10 flex flex-col shadow-[0_0_15px_rgba(0,0,0,0.03)] overflow-hidden">

          {/* Profile */}
          <div className="p-6 border-b border-black/5 dark:border-white/5">
            <button
              type="button"
              onClick={() => go("home")}
              aria-label="Go to top of page"
              className="relative block w-16 h-16 mx-auto mb-4 cursor-pointer group"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
                <Image
                  src="/profile/profile-sidebar.png"
                  alt="Profile"
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 z-50 w-6 h-6 bg-white dark:bg-zinc-900 border-2 border-white dark:border-zinc-900 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs leading-none">👋🏼</span>
              </div>
            </button>

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

          {/* Navigation */}
          <nav className="flex-1 p-3 overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors duration-300 group ${
                      isActive
                        ? "text-gray-950 dark:text-white bg-black/[0.055] dark:bg-white/[0.08] ring-1 ring-inset ring-black/[0.06] dark:ring-white/10"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                      className={`transition-colors ${isActive ? "text-sky-500" : "group-hover:text-sky-500"}`}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-sky-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Resume + Dark Mode Toggle */}
          <div className="p-4 border-t border-black/5 dark:border-white/5 space-y-2">
            <a
              href="/cv/Resume_Ibrahim_Haykal_Alatas.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/[0.07] px-4 py-2.5 text-sky-700 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-500/[0.14] dark:text-sky-300"
            >
              <span className="flex items-center gap-2">
                <FileText size={15} />
                <span className="text-xs font-semibold">Resume</span>
              </span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              onClick={toggleDarkMode}
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
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 dark:bg-black/95 border-b border-black/5 dark:border-white/10 z-50">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                <Image src="/profile/profile-sidebar.png" alt="Profile" fill sizes="36px" className="object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 z-50 w-4 h-4 bg-white dark:bg-zinc-900 border border-white dark:border-zinc-900 rounded-full flex items-center justify-center">
                <span className="text-[8px] leading-none">👋🏼</span>
              </div>
            </div>
            <div>
              <h2 className="text-gray-950 dark:text-white font-semibold text-sm tracking-tight">Ibrahim Haykal</h2>
              <p className="eyebrow text-gray-500 dark:text-gray-400">Full Stack Developer</p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu — selalu ter-render, digeser pakai CSS transform ── */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden
        className={`lg:hidden fixed inset-0 mt-[60px] z-40 bg-black/20 dark:bg-black/60 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={`lg:hidden fixed right-0 top-[60px] bottom-0 w-64 bg-white dark:bg-zinc-950 border-l border-black/5 dark:border-white/10 z-50 shadow-2xl transition-transform duration-300 ease-swift ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="p-4 h-full flex flex-col">
          <div className="space-y-1 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  tabIndex={mobileOpen ? 0 : -1}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
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

          <div className="pt-4 border-t border-black/5 dark:border-white/10">
            <button
              onClick={toggleDarkMode}
              tabIndex={mobileOpen ? 0 : -1}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 text-gray-600 dark:text-gray-400"
            >
              <span className="text-sm font-medium">Dark Mode</span>
              <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${darkMode ? "left-5" : "left-1"}`} />
              </div>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
