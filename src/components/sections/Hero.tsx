"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

// ─── Variants (defined OUTSIDE component — stable reference) ─────────────────

// Hero section entrance — stagger semua elemen dari atas ke bawah
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Generic fade up untuk elemen standalone di hero
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// Nama — sedikit 3D biar lebih dramatic
const titleVariant = {
  hidden: { opacity: 0, y: 36, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
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
function Highlight({ children, color = "sky" }: { children: React.ReactNode; color?: "sky" | "amber" | "emerald" }) {
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
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [text] = useTypewriter({
    words: [
      "Backend & System Engineer",
      "Full Stack Developer",
      "ERP Integration Specialist",
      "Data Transformation Geek",
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
      id="home"
      className="min-h-screen flex items-center justify-center bg-transparent py-16 relative overflow-hidden"
    >
      {/* Orchestrated entrance — semua elemen jalan bareng via heroContainer stagger */}
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* ── Avatar ── */}
        <motion.div
          variants={fadeUp}
          className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6"
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
                  sizes="(max-width: 768px) 128px, 160px"
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

        {/* ── Nama — 3D fade up ── */}
        <motion.h1
          variants={titleVariant}
          style={{ transformPerspective: 900 }}
          className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
        >
          Ibrahim Haykal Alatas
        </motion.h1>

        {/* ── Typewriter subtitle ── */}
        <motion.div variants={fadeUp} className="h-8 mb-6">
          <div className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500 font-medium">
                {text.replace(" ✌️", "")}
              </span>
              {text.includes("✌️") && (
                <span className="inline-block" role="img" aria-label="Peace">
                  ✌️
                </span>
              )}
            </span>
            <Cursor cursorStyle="|" cursorColor="#0EA5E9" />
          </div>
        </motion.div>

        {/* ── Description — highlighted text yang meaningful ── */}
        <motion.p
          variants={fadeUp}
          className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed text-lg"
        >
          Transforming{" "}
          <Highlight color="amber">raw operational data</Highlight>{" "}
          into{" "}
          <Highlight color="emerald">reliable digital systems</Highlight>.{" "}
          Focused on handling real-world{" "}
          <Highlight color="sky">manufacturing constraints</Highlight>,{" "}
          <Highlight color="sky">transactional consistency</Highlight>,and legacy ERP architectures.
        </motion.p>

        {/* ── CTA Buttons — stagger via ctaContainer ── */}
        <motion.div
          variants={fadeUp}
          className="mb-8"
        >
          <motion.div
            variants={ctaContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              variants={ctaItem}
              whileHover={{ scale: 1.05, transition: { duration: 0.18, delay: 0 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1, delay: 0 } }}
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium shadow-lg shadow-gray-900/20 dark:shadow-white/20 transition-colors duration-300"
            >
              View Work
            </motion.button>

            <motion.a
              variants={ctaItem}
              whileHover={{ scale: 1.05, transition: { duration: 0.18, delay: 0 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1, delay: 0 } }}
              href="cv/Ibrahim_Haykal_Alatas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full font-medium hover:bg-sky-100 dark:hover:bg-sky-500/20 border border-sky-200 dark:border-sky-500/30 transition-colors duration-300 flex items-center gap-2"
            >
              <FileText size={18} />
              See My Resume
            </motion.a>

            <motion.button
              variants={ctaItem}
              whileHover={{ scale: 1.05, transition: { duration: 0.18, delay: 0 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1, delay: 0 } }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 bg-white dark:bg-black text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-zinc-900 border border-gray-200 dark:border-zinc-800 transition-colors duration-300"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Social Links — stagger via socialContainer ── */}
        <motion.div variants={fadeUp} className="mb-8">
          <motion.div
            variants={socialContainer}
            initial="hidden"
            animate="visible"
            className="flex justify-center gap-5"
          >
            {socials.map((social, i) => (
              <motion.a
                key={i}
                variants={socialItem}
                whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.18, delay: 0 } }}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group p-3 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-300"
              >
                <social.icon
                  size={22}
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
            className="flex flex-col items-center gap-2 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group"
          >
            <span className="text-sm font-medium">Let&apos;s Get Started</span>
            <ArrowDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}