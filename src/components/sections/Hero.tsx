"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown, FileText, ArrowUpRight } from "lucide-react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

// ─── Variants (defined OUTSIDE component — stable reference) ─────────────────

// Hero section entrance — stagger semua elemen dari atas ke bawah
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

// Generic fade up untuk elemen standalone di hero
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// Nama — sedikit 3D + blur reveal biar lebih dramatic tapi tetep clean
const titleVariant = {
  hidden: { opacity: 0, y: 32, rotateX: 8, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

// Avatar — scale dari 0.85
const avatarVariant = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Badge emoji — spring pop setelah avatar
const badgeVariant = {
  hidden: { opacity: 0, scale: 0, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: 0.55, duration: 0.45, type: "spring", stiffness: 220, damping: 14 },
  },
};

// CTA buttons — stagger parent
const ctaContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0 },
  },
};

const ctaItem = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Social icons — stagger parent
const socialContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

const socialItem = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Highlight Component ──────────────────────────────────────────────────────

// Highlight dengan animated underline — meaningful, bukan sekadar warna
function Highlight({
  children,
  color = "sky",
  play = true,
}: {
  children: React.ReactNode;
  color?: "sky" | "amber" | "emerald";
  play?: boolean;
}) {
  const colorMap = {
    sky: "text-sky-600 dark:text-sky-400",
    amber: "text-amber-600 dark:text-amber-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
  };

  return (
    <span className={`relative inline-block font-semibold ${colorMap[color]}`}>
      {children}
      {/* Animated underline */}
      <motion.span
        className={`absolute bottom-0 left-0 h-[2px] rounded-full ${
          color === "sky"
            ? "bg-sky-400/60 dark:bg-sky-500/50"
            : color === "amber"
            ? "bg-amber-400/60 dark:bg-amber-500/50"
            : "bg-emerald-400/60 dark:bg-emerald-500/50"
        }`}
        initial={{ width: "0%" }}
        animate={{ width: play ? "100%" : "0%" }}
        transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

type HeroProps = {
  /**
   * Entrance animations hold at their initial state until the loading screen is gone.
   * Content still renders into the DOM immediately so crawlers without JS can read it.
   */
  ready?: boolean;
};

export default function Hero({ ready = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax halus — konten hero naik & fade pas di-scroll keluar
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center bg-transparent py-24 relative overflow-hidden"
    >
      {/* Orchestrated entrance — semua elemen jalan bareng via heroContainer stagger */}
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={heroContainer}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
      >
        {/* ── Status pill ── */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <div className="surface inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-4">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />
            <span className="eyebrow text-gray-600 dark:text-gray-300">
              Full Stack Dev @ Datapolis
            </span>
          </div>
        </motion.div>

        {/* ── Avatar ── */}
        <motion.div
          variants={fadeUp}
          className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-7"
        >
          <motion.div variants={avatarVariant} className="relative w-full h-full">
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
          </motion.div>

          {/* Badge — spring pop, delay sendiri via badgeVariant */}
          <motion.div
            variants={badgeVariant}
            className="absolute -bottom-2 -right-2 z-50 w-10 h-10 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-zinc-800"
          >
            <span className="text-xl leading-none select-none pointer-events-none" role="img" aria-label="Coder Emoji">
              👨🏼‍💻
            </span>
          </motion.div>
        </motion.div>

        {/* ── Nama — 3D blur reveal + sheen ── */}
        <motion.h1
          variants={titleVariant}
          style={{ transformPerspective: 900 }}
          className="text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-bold tracking-tightest mb-4"
        >
          <span className="text-sheen">Ibrahim Haykal Alatas</span>
        </motion.h1>

        {/* ── Typewriter subtitle ── */}
        <motion.div variants={fadeUp} className="h-8 mb-7">
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
        </motion.div>

        {/* ── Description — highlighted text yang meaningful ── */}
        <motion.p
          variants={fadeUp}
          className="text-gray-500 dark:text-gray-400 mb-9 max-w-xl mx-auto leading-relaxed text-[15px] sm:text-lg"
        >
          I build{" "}
          <Highlight color="sky" play={ready}>enterprise CRM</Highlight>{" "}and{" "}
          <Highlight color="emerald" play={ready}>manufacturing systems</Highlight>{" "}
          with Laravel and React — turning{" "}
          <Highlight color="amber" play={ready}>messy operational data</Highlight>{" "}
          and legacy ERP constraints into workflows people actually trust.
        </motion.p>

        {/* ── CTA Buttons — stagger via ctaContainer ── */}
        <motion.div variants={fadeUp} className="mb-9">
          <motion.div
            variants={ctaContainer}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-3"
          >
            <motion.button
              variants={ctaItem}
              whileHover={{ scale: 1.04, transition: { duration: 0.18, delay: 0 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
              onClick={() => scrollToSection("projects")}
              className="group flex items-center gap-2 px-7 py-3 bg-gray-950 dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold shadow-lg shadow-gray-900/15 dark:shadow-white/10 transition-colors duration-300"
            >
              View Work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.button>

            <motion.a
              variants={ctaItem}
              whileHover={{ scale: 1.04, transition: { duration: 0.18, delay: 0 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
              href="/cv/Ibrahim_Haykal_Alatas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-500/20 border border-sky-200/70 dark:border-sky-400/25 transition-colors duration-300"
            >
              <FileText size={16} />
              Resume
            </motion.a>

            <motion.button
              variants={ctaItem}
              whileHover={{ scale: 1.04, transition: { duration: 0.18, delay: 0 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1, delay: 0 } }}
              onClick={() => scrollToSection("contact")}
              className="px-7 py-3 rounded-full text-sm font-semibold surface surface-hover text-gray-800 dark:text-gray-200"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Social Links — stagger via socialContainer ── */}
        <motion.div variants={fadeUp} className="mb-10">
          <motion.div
            variants={socialContainer}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            className="flex justify-center gap-3"
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                variants={socialItem}
                whileHover={{ scale: 1.1, y: -3, transition: { duration: 0.18, delay: 0 } }}
                whileTap={{ scale: 0.94, transition: { duration: 0.1, delay: 0 } }}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.07] bg-white/50 dark:bg-white/[0.03] backdrop-blur-md hover:border-black/15 dark:hover:border-white/20 transition-colors duration-300"
              >
                <social.icon
                  size={20}
                  className={`text-gray-500 dark:text-gray-400 transition-colors duration-300 ${social.color}`}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Scroll Indicator ── */}
        <motion.div variants={fadeUp} className="flex justify-center">
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
        </motion.div>
      </motion.div>
    </section>
  );
}
