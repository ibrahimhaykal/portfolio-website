"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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

      {!loading && (
        <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300 relative selection:bg-sky-500/30">
          
          {/* --- GLOBAL BACKGROUND (Fixed) --- */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            {/* 1. Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* 2. Vignette Mask (Fokus ke tengah) */}
            <div className="absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,black_100%)] opacity-80"></div>

            {/* 3. Top Spotlight (Cahaya Atas) */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-sky-500/10 via-transparent to-transparent blur-[100px] opacity-40" />
            
            {/* 4. Center Blob (Ngasih depth dikit di tengah layar) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] opacity-30 dark:opacity-20 animate-pulse" />
          </div>
          {/* --- END BACKGROUND --- */}

          {/* Sidebar (z-50 biar di atas background) */}
          <Sidebar />

          {/* Content Wrapper (z-10 biar di atas background) */}
          <div className="relative z-10 lg:ml-80 lg:pr-6">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}