"use client";

import { useRef } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowUp, Download } from "lucide-react";
import { scrollToSection, useReveal } from "../lib/reveal";
import { SECTIONS, useLang } from "../lib/i18n";

const EMAIL = "ibrahimhaykal@gmail.com";

const socials = [
  { icon: Github, link: "https://github.com/ibrahimhaykal", label: "GitHub" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ibrahimhaykalalatas/", label: "LinkedIn" },
  { icon: Mail, link: `mailto:${EMAIL}`, label: "Email" },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  useReveal(rootRef);

  return (
    <footer ref={rootRef} className="px-6 pb-8 pt-6">
      <div data-reveal className="card mx-auto max-w-4xl p-7 sm:p-10">
        <p className="label mb-4">{t("Open to Full Stack & Backend roles", "Terbuka untuk posisi Full Stack & Backend")}</p>
        <h2 className="heading mb-6 text-3xl leading-tight sm:text-5xl">
          {t("Have a system that needs building?", "Punya sistem yang perlu dibangun?")}
        </h2>
        <div className="mb-10 flex flex-wrap gap-3">
          <a href={`mailto:${EMAIL}`} className="btn btn-primary">
            {EMAIL} <ArrowUpRight size={16} />
          </a>
          <a href="/cv/Portfolio_Ibrahim_Haykal_Alatas.pdf" download className="btn">
            <Download size={16} /> {t("Portfolio PDF", "Portofolio PDF")}
          </a>
        </div>

        <div className="divider grid gap-8 border-t pt-8 sm:grid-cols-3">
          <div>
            <p className="label mb-3">{t("Sitemap", "Navigasi")}</p>
            <ul className="space-y-1.5 text-sm">
              {SECTIONS.slice(1).map((s) => (
                <li key={s.id}>
                  <button onClick={() => scrollToSection(s.id)} className="text-muted hover:text-fg">{t(...s.label)}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-3">{t("Elsewhere", "Temukan saya")}</p>
            <ul className="space-y-1.5 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-fg">
                    <s.icon size={14} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-3">{t("Based in", "Lokasi")}</p>
            <p className="text-sm text-muted">
              Jakarta, Indonesia
              <br />
              GMT+7, {t("open to remote", "terbuka untuk remote")}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-4xl items-center justify-between text-xs text-muted">
        <span>© {new Date().getFullYear()} Ibrahim Haykal Alatas</span>
        <button onClick={() => scrollToSection("home")} className="inline-flex items-center gap-1 hover:text-fg">
          {t("Back to top", "Kembali ke atas")} <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
