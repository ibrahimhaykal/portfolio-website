"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll untuk efek navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`capitalize transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-sky-500 font-medium"
                    : "text-gray-600 hover:text-sky-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Link href="/">
              <span
                className="text-2xl font-bold text-sky-500 bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 text-transparent bg-clip-text"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                MyPortfolio
              </span>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div
            className="md:hidden flex items-center cursor-pointer flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform ${
                  menuOpen ? "transform rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform ${
                  menuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 mt-4 items-center pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`capitalize transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-sky-500 font-medium"
                      : "text-gray-600 hover:text-sky-500"
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