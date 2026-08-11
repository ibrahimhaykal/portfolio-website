"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown, FileText, ArrowUpRight } from "lucide-react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { gsap, useGSAP, EASE } from "../../lib/gsap";
import { scrollToSection } from "../../lib/reveal";

const NAME_WORDS = ["Ibrahim", "Haykal", "Alatas"];

// ─── Highlight ────────────────────────────────────────────────────────────────

const HIGHLIGHT_TONE = {
  sky: { text: "text-sky-600 dark:text-sky-400", rule: "bg-sky-400/60 dark:bg-sky-500/50" },
  amber: { text: "text-amber-600 dark:text-amber-400", rule: "bg-amber-400/60 dark:bg-amber-500/50" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", rule: "bg-emerald-400/60 dark:bg-emerald-500/50" },
} as const;

function Highlight({
  children,
  tone = "sky",
}: {
  children: React.ReactNode;
  tone?: keyof typeof HIGHLIGHT_TONE;
}) {
  const { text, rule } = HIGHLIGHT_TONE[tone];
  return (
    <span className={`relative inline-block font-semibold ${text}`}>
      {children}
      <span
        data-draw
        className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full ${rule}`}
      />
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

type HeroProps = {
  /**
   * Entrance animations hold at their initial state until the loading screen is
   * gone. Content still renders into the DOM immediately so crawlers without JS
   * can read it.
   */
  ready?: boolean;
};

export default function Hero({ ready = true }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /*
        Reduce motion cuma menghilangkan GERAKAN, bukan animasinya.

        Versi sebelumnya di sini langsung nge-set semua elemen ke keadaan akhir
        kalau setelan reduce motion menyala — jadi di mesin yang setelannya
        nyala, hero-nya nggak pernah beranimasi sama sekali.
      */
      const reduced =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /*
        Semua keadaan awal diset SEBELUM pemeriksaan `ready`.

        Kalau ditaruh setelahnya, elemennya baru disembunyikan saat loading
        screen hilang — padahal saat itu dia sudah sempat kegambar. Hasilnya
        kedip: kelihatan dulu, baru hilang, baru dianimasikan.
      */
      if (!reduced) gsap.set("[data-reveal]", { y: 18 });

      if (!ready) return;

      /*
        Urutannya disusun, bukan ngikut urutan DOM: FOTO dulu, baru NAMA, baru
        sisanya. Di DOM, pill status ada di atas foto — kalau ngikut DOM, yang
        muncul duluan malah pill, dan namanya nyusul entah di mana. Perkenalan
        yang enak dibaca itu wajah dulu, baru nama.
      */
      const rest = "[data-reveal]:not([data-hero-avatar])";

      if (reduced) {
        // Tanpa gerakan sama sekali — semuanya disingkap pakai clip-path.
        // Keadaan awal kata sudah diurus CSS, jadi di sini nggak perlu di-set
        // lagi (nge-set ulang di sini justru yang dulu bikin kedip).
        gsap.set("[data-draw]", { scaleX: 1 });

        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .to("[data-hero-avatar]", { opacity: 1, duration: 0.6 })
          .to(
            "[data-word]",
            {
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.65,
              stagger: 0.1,
              // Ditimpa jadi `none`, BUKAN clearProps. clearProps menghapus
              // inline style dan elemennya jatuh balik ke clip-path awal di
              // CSS — namanya bakal lenyap lagi begitu animasi kelar.
              onComplete: () => {
                gsap.set(rootRef.current?.querySelectorAll("[data-word]") ?? [], {
                  clipPath: "none",
                });
              },
            },
            "-=0.2"
          )
          .to(rest, { opacity: 1, duration: 0.55, stagger: 0.07 }, "-=0.3");
        return;
      }

      gsap
        .timeline({ defaults: { ease: EASE } })
        .to("[data-hero-avatar]", { opacity: 1, y: 0, duration: 0.75 })
        .to("[data-word]", { yPercent: 0, duration: 0.9, stagger: 0.09 }, "-=0.4")
        .to(rest, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, "-=0.55")
        .to(
          "[data-draw]",
          { scaleX: 1, duration: 0.5, stagger: 0.09, ease: "power2.out" },
          "-=0.3"
        );
    },
    // revertOnUpdate: pas `ready` berubah, context lama dibuang dulu supaya
    // matchMedia dan inline style-nya nggak numpuk.
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true }
  );

  /*
    Parallax hero: konten naik pelan sambil memudar saat di-scroll keluar.

    Pakai listener scroll + quickSetter GSAP, bukan ScrollTrigger. quickSetter
    nulis langsung ke elemen tanpa bikin tween baru tiap frame, jadi murah.
    Yang digerakkan cuma pembungkusnya — anak-anaknya diurus timeline masuk,
    jadi nggak ada yang rebutan properti.
  */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const setY = gsap.quickSetter(el, "y", "px");
    const setOpacity = gsap.quickSetter(el, "opacity");

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      setY(progress * 90);
      setOpacity(Math.max(1 - progress * 1.25, 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const [text] = useTypewriter({
    words: [
      "Full Stack Developer",
      "Laravel + React Engineer",
      "CRM & ERP Systems Builder",
      "Warehouse Digitalization Nerd",
      "Lifelong Learner ✌️",
    ],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  const socials = [
    {
      icon: Github,
      link: "https://github.com/ibrahimhaykal",
      label: "Visit GitHub Profile",
      color: "group-hover:text-[#181717] dark:group-hover:text-white",
    },
    {
      icon: Linkedin,
      link: "https://www.linkedin.com/in/ibrahimhaykalalatas/",
      label: "Visit LinkedIn Profile",
      color: "group-hover:text-[#0A66C2]",
    },
    {
      icon: Mail,
      link: "mailto:ibrahimhaykal@gmail.com",
      label: "Send Email",
      color: "group-hover:text-[#EA4335]",
    },
  ];

  return (
    <section
      ref={rootRef}
      id="home"
      className="min-h-screen flex items-center justify-center bg-transparent py-24 relative overflow-hidden"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* ── Status pill ── */}
        <div data-reveal className="flex justify-center mb-8">
          <div className="surface inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
            <span className="eyebrow text-gray-600 dark:text-gray-300">
              Full Stack Dev @ PT Data Teknologi Terintegrasi
            </span>
          </div>
        </div>

        {/* ── Avatar ── */}
        <div data-reveal data-hero-avatar className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-7">
          <div className="relative w-full h-full">
            {/* Soft glow */}
            <div className="absolute inset-0 bg-sky-500/30 blur-2xl rounded-full opacity-40" />

            {/* Ring + image */}
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 dark:to-transparent">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-zinc-950 relative shadow-2xl">
                <Image
                  src="/profile/profile-img.png"
                  alt="Ibrahim Haykal"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2 z-50 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-zinc-800">
            <span className="text-xl leading-none select-none pointer-events-none" role="img" aria-label="Coder Emoji">
              👨🏼‍💻
            </span>
          </div>
        </div>

        {/* ── Nama — tiap kata naik dari balik garis teksnya ── */}
        <h1 className="text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-tightest mb-4 text-gray-950 dark:text-white">
          {NAME_WORDS.map((word, i) => (
            <span key={word}>
              <span className="word-mask">
                <span data-word>{word}</span>
              </span>
              {i < NAME_WORDS.length - 1 ? " " : null}
            </span>
          ))}
        </h1>

        {/* ── Typewriter subtitle ── */}
        <div data-reveal className="h-8 mb-7">
          <div className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400 font-medium">
                {text.replace(" ✌️", "")}
              </span>
              {text.includes("✌️") && (
                <span className="inline-block" role="img" aria-label="Peace">
                  ✌️
                </span>
              )}
            </span>
            <Cursor cursorStyle="_" cursorColor="#0EA5E9" />
          </div>
        </div>

        {/* ── Description ── */}
        <p
          data-reveal
          className="text-gray-500 dark:text-gray-400 mb-9 max-w-xl mx-auto leading-relaxed text-[15px] sm:text-lg"
        >
          I build <Highlight tone="sky">enterprise CRM</Highlight> and{" "}
          <Highlight tone="emerald">manufacturing systems</Highlight> with Laravel and React —
          turning <Highlight tone="amber">messy operational data</Highlight> and legacy ERP
          constraints into workflows people actually trust.
        </p>

        {/* ── CTA Buttons ── */}
        <div data-reveal className="mb-9 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => scrollToSection("projects")}
            className="group flex items-center gap-2 px-7 py-3 bg-gray-950 dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold shadow-lg shadow-gray-900/15 dark:shadow-white/10 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            View Work
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          <a
            href="/cv/Resume_Ibrahim_Haykal_Alatas.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-500/20 border border-sky-200/70 dark:border-sky-400/25 transition-[background-color,transform] duration-200 hover:-translate-y-0.5"
          >
            <FileText size={16} />
            Resume
          </a>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-7 py-3 rounded-full text-sm font-semibold surface surface-hover text-gray-800 dark:text-gray-200 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Get In Touch
          </button>
        </div>

        {/* ── Social Links ── */}
        <div data-reveal className="mb-10 flex justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.07] bg-white/50 dark:bg-white/[0.03] hover:border-black/15 dark:hover:border-white/20 transition-[border-color,transform] duration-200 hover:-translate-y-1"
            >
              <social.icon
                size={20}
                className={`text-gray-500 dark:text-gray-400 transition-colors duration-300 ${social.color}`}
              />
            </a>
          ))}
        </div>

        {/* ── Scroll Indicator ── */}
        <div data-reveal className="flex justify-center">
          <button
            onClick={() => scrollToSection("about")}
            aria-label="Scroll down to About section"
            className="group flex flex-col items-center gap-2 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            <span className="eyebrow">Scroll</span>
            <ArrowDown
              size={18}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
