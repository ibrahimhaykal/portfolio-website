"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LoadingScreenProps = {
  onComplete: () => void;
  photoUrl: string;
};

export default function LoadingScreen({ onComplete, photoUrl }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Cek preferensi user
    const isDark = localStorage.getItem("darkMode") !== "false";
    setDarkMode(isDark);
  }, []);

  // Logika Progress Bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Delay sedikit sebelum hilang
          return 100;
        }
        // Kecepatan random biar terasa natural
        const increment = Math.random() * 4 + 1; 
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${
          darkMode ? "bg-black" : "bg-white"
        }`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center w-full max-w-md px-4">
          
          {/* --- ANIMATED LOGO SECTION --- */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 relative"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
              
              {/* 1. SOFT GLOW (Aura Belakang) */}
              <motion.div
                className="absolute inset-[-20px] rounded-full z-0 opacity-40"
                style={{
                  background: darkMode
                    ? "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)"
                    : "radial-gradient(circle, rgba(14, 165, 233, 0.6) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)",
                  filter: "blur(25px)", // Blur tinggi untuk efek halus
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* 2. THIN SPINNING RING (Garis Tipis Berputar) */}
              <motion.div
                className="absolute inset-0 rounded-full z-10"
                style={{
                  // Conic gradient menciptakan efek ekor memudar
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(14, 165, 233, 0.1) 50%, #0EA5E9 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                {/* Masking tengah untuk membuat efek cincin tipis (2px) */}
                <div 
                  className={`absolute inset-[2px] rounded-full ${
                    darkMode ? "bg-black" : "bg-white"
                  }`} 
                />
              </motion.div>

              {/* 3. PROFILE IMAGE CONTAINER */}
              {/* Inset 6px memberikan jarak antara cincin putar dan foto */}
              <div className={`absolute inset-[6px] rounded-full z-20 overflow-hidden flex items-center justify-center ${
                 darkMode ? "bg-black" : "bg-white"
              }`}>
                <motion.div
                  className="w-full h-full relative"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src={photoUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </motion.div>
              </div>

              {/* 4. STATIC BORDER (Optional Frame Tipis) */}
              <div className={`absolute inset-[6px] rounded-full z-30 border pointer-events-none ${
                darkMode ? "border-white/10" : "border-black/5"
              }`} />
            </div>
          </motion.div>
          {/* --- END LOGO SECTION --- */}


          {/* TEXT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              className={`text-3xl lg:text-4xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hello 👋🏼
            </motion.h1>
            <p className={`text-lg font-light tracking-wide ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              Welcome to my journey
            </p>
          </motion.div>

          {/* PROGRESS BAR (Minimalist) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-64 mx-auto"
          >
            <div className={`h-[3px] rounded-full overflow-hidden ${
              darkMode ? "bg-zinc-800" : "bg-gray-200"
            }`}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #0EA5E9 0%, #3B82F6 100%)",
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
            
            <div className="flex justify-between mt-2 px-1">
              <span className={`text-[10px] uppercase tracking-wider ${
                 darkMode ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Loading assets
              </span>
              <span className={`text-[10px] font-mono ${
                 darkMode ? "text-zinc-500" : "text-zinc-400"
              }`}>
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}