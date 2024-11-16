"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null, // Viewport adalah area yang dilihat
      threshold: 0.5, // 50% elemen terlihat
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Set ID elemen yang terlihat
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Hapus observer saat komponen unmount
  }, []);

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
            {["home", "about", "projects", "experience", "contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`capitalize ${
                    activeSection === item
                      ? "text-sky-500 font-semibold"
                      : "text-gray-600 hover:text-sky-500"
                  } transition-colors duration-300`}
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Logo in the Center */}
          <div className="flex items-center justify-center flex-shrink-0">
            <span
              className="text-2xl font-bold text-sky-500 bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 text-transparent bg-clip-text"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              MyPortfolio
            </span>
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
            <div className="flex flex-col space-y-4 mt-4 items-center">
              {["home", "about", "projects", "experience", "contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMenuOpen(false)}
                    className={`capitalize ${
                      activeSection === item
                        ? "text-sky-500 font-semibold"
                        : "text-gray-600 hover:text-sky-500"
                    } transition-colors duration-300`}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
