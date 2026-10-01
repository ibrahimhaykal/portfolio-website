"use client";

import { useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import { scrollToSection } from "../../lib/reveal";
import { useLang, type Pair } from "../../lib/i18n";

const NAME = ["Ibrahim", "Haykal", "Alatas"];

const socials = [
  { icon: Github, link: "https://github.com/ibrahimhaykal", label: "Visit GitHub Profile" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ibrahimhaykalalatas/", label: "Visit LinkedIn Profile" },
  { icon: Mail, link: "mailto:ibrahimhaykal@gmail.com", label: "Send Email" },
];

const facts: Array<{ label: Pair; value: Pair }> = [
  { label: ["Now", "Sekarang"], value: ["Full Stack Dev, PT Data Teknologi Terintegrasi", "Full Stack Dev, PT Data Teknologi Terintegrasi"] },
  { label: ["Before", "Sebelumnya"], value: ["System Engineer Intern, Astra Otoparts Group", "Magang System Engineer, Astra Otoparts Group"] },
  { label: ["Stack", "Stack"], value: ["Laravel, React, TypeScript, PostgreSQL", "Laravel, React, TypeScript, PostgreSQL"] },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  /*
    Keadaan awal (opacity 0) dipasang CSS biar nggak sempat kegambar sebelum
    JS jalan. Kata di nama naik dari balik mask-nya; posisi awalnya diset di
    sini lewat fromTo, bukan dari CSS transform, supaya GSAP nggak salah baca.
  */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          if (ctx.conditions?.reduce) {
            tl.to("[data-word], [data-hero]", { autoAlpha: 1, duration: 0.5, stagger: 0.05 });
            return;
          }
          tl.fromTo("[data-word]", { yPercent: 110, autoAlpha: 1 }, { yPercent: 0, duration: 1.1, stagger: 0.09 })
            .fromTo("[data-hero]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.8");

          // Waktu discroll keluar, isi hero naik sedikit dan memudar habis
          // sebelum About masuk, jadi nggak pernah numpuk sama section berikutnya.
          // Yang digerakkan pembungkusnya, jadi nggak rebutan sama timeline masuk.
          gsap.to("[data-hero-inner]", {
            y: -60,
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top top", end: "70% top", scrub: true },
          });
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="home" className="flex min-h-[92vh] items-center pb-12 pt-28 lg:pt-16">
      <div data-hero-inner className="mx-auto w-full max-w-4xl px-6">
        <div data-hero className="mb-8 flex items-center gap-4">
          <div className="card relative h-20 w-20 overflow-hidden !rounded-full">
            <Image src="/profile/profile-img.png" alt="Ibrahim Haykal" fill sizes="80px" className="object-cover" priority />
          </div>
          <div>
            <p className="label">Full Stack Developer</p>
            <p className="mt-2 text-sm text-muted">Jakarta, Indonesia · {t("open to work", "terbuka untuk kerja")}</p>
          </div>
        </div>

        <h1 className="heading mb-6 text-5xl leading-[1.02] sm:text-7xl">
          {NAME.map((word) => (
            <span key={word} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
              <span data-word className="inline-block">{word}</span>
            </span>
          ))}
        </h1>

        <p data-hero className="mb-10 max-w-2xl text-lg leading-relaxed text-muted">
          {t("I build ", "Saya membangun ")}
          <span className="font-semibold text-fg">{t("enterprise CRM", "CRM enterprise")}</span>
          {t(" and ", " dan ")}
          <span className="font-semibold text-fg">{t("manufacturing systems", "sistem manufaktur")}</span>
          {t(
            " with Laravel and React, turning messy operational data and legacy ERP constraints into workflows people actually trust.",
            " dengan Laravel dan React, mengubah data operasional yang berantakan dan batasan ERP lama menjadi alur kerja yang benar-benar bisa dipercaya."
          )}
        </p>

        <div data-hero className="mb-12 flex flex-wrap items-center gap-3">
          <button onClick={() => scrollToSection("projects")} className="btn btn-primary">
            {t("View work", "Lihat karya")} <ArrowRight size={16} />
          </button>
          <a href="/cv/Resume_Ibrahim_Haykal_Alatas.pdf" target="_blank" rel="noopener noreferrer" className="btn">
            <FileText size={16} /> {t("Resume", "CV")}
          </a>
          {socials.map((s) => (
            <a key={s.label} href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="btn-icon">
              <s.icon size={18} />
            </a>
          ))}
        </div>

        <dl className="grid gap-3 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label[0]} data-hero className="card p-4">
              <dt className="label mb-2">{t(...f.label)}</dt>
              <dd className="text-sm font-medium">{t(...f.value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
