"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";
import Sidebar from "../components/Sidebar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Reading-progress rail — springed so it glides instead of snapping
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // Konten selalu ada di DOM (biar ke-crawl tanpa JS); loader cuma nutupin di atasnya,
  // jadi scroll dikunci selama loader masih tampil.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            onComplete={() => setLoading(false)}
            photoUrl="/profile/profile-ip-emoji.png"
          />
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300 relative">

          {/* --- GLOBAL BACKGROUND (Fixed) --- */}
          <div className="grain fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* 1. Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* 2. Vignette Mask (fokus ke tengah) */}
            <div className="absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_62%_52%_at_50%_45%,transparent_0%,black_100%)] opacity-85" />

            {/* 3. Aurora — dua blob drifting pelan, bikin depth tanpa keliatan "gradient tempel" */}
            <div className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-sky-400/[0.12] dark:bg-sky-500/[0.12] blur-[130px] animate-aurora-a" />
            <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-[140px] animate-aurora-b" />
            <div className="absolute bottom-0 -left-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/[0.08] dark:bg-cyan-500/[0.08] blur-[150px] animate-aurora-a" />

            {/* 4. Hairline horizon di atas — nge-frame konten */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/25 to-transparent" />
          </div>
          {/* --- END BACKGROUND --- */}

          {/* Reading progress */}
          <motion.div
            style={{ scaleX: progress }}
            className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500"
            aria-hidden
          />

          {/* Sidebar (z-50 biar di atas background) */}
          <Sidebar />

          {/* Content Wrapper (z-10 biar di atas background) */}
          <div className="relative z-10 lg:ml-80 lg:pr-6">
            <Hero ready={!loading} />
            <About />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </div>
      </main>
    </>
  );
}
