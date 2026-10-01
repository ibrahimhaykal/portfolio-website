"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, FileText } from "lucide-react";
import { scrollToSection } from "../lib/reveal";
import { fadeSwap } from "../lib/gsap";
import { SECTIONS, useLang } from "../lib/i18n";
import ThemeSwitcher from "./ThemeSwitcher";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="grid grid-cols-2 gap-2">
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          onClick={() => lang !== l && fadeSwap(() => setLang(l))}
          aria-pressed={lang === l}
          className={`btn !py-2 text-xs uppercase ${lang === l ? "btn-primary" : ""}`}
        >
          {l === "en" ? "English" : "Indonesia"}
        </button>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Section aktif: pita tipis di tengah layar, jadi yang aktif selalu tepat satu.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  const nav = SECTIONS.map((item) => (
    <button
      key={item.id}
      onClick={() => go(item.id)}
      className={`flex w-full items-center justify-between px-3 py-2 text-sm font-medium transition-colors ${
        active === item.id ? "text-fg" : "text-muted hover:text-fg"
      }`}
    >
      {t(...item.label)}
      {active === item.id && <span className="h-1.5 w-1.5 rounded-full bg-fg" />}
    </button>
  ));

  const profile = (size: number) => (
    <div className="relative shrink-0 overflow-hidden rounded-full border border-[color:var(--edge)]" style={{ width: size, height: size }}>
      <Image src="/profile/profile-sidebar.png" alt="Ibrahim Haykal" fill sizes={`${size}px`} className="object-cover" priority />
    </div>
  );

  const settings = (
    <div className="space-y-2">
      <ThemeSwitcher />
      <LangToggle />
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside data-fade className="card fixed left-6 top-6 bottom-6 z-50 hidden w-64 flex-col overflow-y-auto p-5 lg:flex">
        <button onClick={() => go("home")} className="flex items-center gap-3 text-left">
          {profile(44)}
          <span>
            <span className="heading block text-[15px]">Ibrahim Haykal</span>
            <span className="text-xs text-muted">Full Stack Developer</span>
          </span>
        </button>

        <nav className="my-6 flex-1 space-y-0.5">{nav}</nav>

        <a href="/cv/Resume_Ibrahim_Haykal_Alatas.pdf" target="_blank" rel="noopener noreferrer" className="btn mb-2 w-full">
          <FileText size={15} /> {t("Resume", "CV")}
        </a>
        {settings}
      </aside>

      {/* Mobile header */}
      <div data-fade className="card !rounded-none !border-x-0 !border-t-0 fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          {profile(36)}
          <span className="heading text-sm">Ibrahim Haykal</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className="p-2"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <aside id="mobile-navigation" className="card fixed inset-x-4 top-[72px] z-50 space-y-4 p-4 animate-modal-in lg:hidden">
          <nav className="space-y-0.5">{nav}</nav>
          {settings}
        </aside>
      )}
    </>
  );
}
