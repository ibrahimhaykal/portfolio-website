"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  // Handle scroll untuk efek navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check system preference for dark mode on initial load
  useEffect(() => {
    // Check if dark mode is saved in localStorage
    const savedMode = localStorage.getItem("darkMode");
    
    if (savedMode !== null) {
      const isDark = savedMode === "true";
      setDarkMode(isDark);
      applyDarkMode(isDark);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      applyDarkMode(true);
    }
  }, []);

  // Function to apply dark mode to the entire site
  const applyDarkMode = (isDark: boolean): void => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Toggle dark mode
  const toggleDarkMode = (): void => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-md shadow-md dark:bg-gray-900/80 bg-white/80" 
          : "dark:bg-gray-900 bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span
                className="text-xl font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 dark:from-sky-400 dark:via-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                MyPortfolio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-sky-500 dark:text-sky-400"
                    : "text-gray-600 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-yellow-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="flex items-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-0.5 transition-transform bg-gray-600 dark:bg-gray-300 ${
                    menuOpen ? "transform rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 transition-opacity bg-gray-600 dark:bg-gray-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 transition-transform bg-gray-600 dark:bg-gray-300 ${
                    menuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-2 py-1 text-center transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-sky-500 font-medium dark:text-sky-400" 
                      : "text-gray-600 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}