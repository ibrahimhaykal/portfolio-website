"use client";

import { useRef } from "react";
import { Github, Linkedin, Mail, Heart, MessageCircle } from "lucide-react";
import { useReveal, scrollToSection } from "../lib/reveal";

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

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
    <footer
      ref={rootRef}
      className="border-t border-gray-200/50 dark:border-white/5 py-10 bg-transparent relative z-10"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-4 mb-10">
          {/* Brand */}
          <div data-reveal className="text-center lg:text-left flex-1">
            <h3 className="text-xl font-semibold text-gray-950 dark:text-white mb-1.5 tracking-tightest">
              Ibrahim Haykal Alatas
            </h3>
            <p className="eyebrow text-gray-500 dark:text-gray-400">
              Full Stack Developer · S.Tr.Kom
            </p>
          </div>

          {/* Quick Links */}
          <div
            data-reveal
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 flex-1 lg:max-w-xs"
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-[color,transform] duration-200 hover:-translate-y-0.5"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div data-reveal className="flex justify-center lg:justify-end gap-3 flex-1">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 bg-white/50 dark:bg-white/[0.03] rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:border-sky-500/30 transition-[color,border-color,transform] duration-200 hover:-translate-y-1 border border-black/[0.06] dark:border-white/[0.07] flex-shrink-0"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          data-reveal
          className="pt-8 border-t border-gray-200/50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium"
        >
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Ibrahim Haykal Alatas. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-white/[0.03] px-3 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.07] transition-transform duration-200 hover:-translate-y-0.5">
            <span>Made with</span>
            <Heart size={12} className="fill-red-500 text-red-500" />
            <span>in Jakarta</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
