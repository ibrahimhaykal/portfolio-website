"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type LoadingScreenProps = {
  onComplete: () => void;
  photoUrl: string;
};

export default function LoadingScreen({ onComplete, photoUrl }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

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
    /*
      Tema diambil dari class `dark` di <html> yang udah dipasang script blocking
      di layout — jadi warna udah bener sejak paint pertama, nggak ada flash.
      Jangan bungkus root ini pakai <AnimatePresence>: itu bikin context presence
      baru yang nutup sinyal exit dari parent, jadi fade-out-nya nggak pernah jalan.
    */
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center w-full max-w-md px-4">

        {/* --- LOGO SECTION --- */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 relative"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">

            {/* 1. SOFT GLOW — statis, biar nggak kedip */}
            <div
              className="absolute inset-[-20px] rounded-full z-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 70%)",
                filter: "blur(25px)",
              }}
            />

            {/* 2. THIN SPINNING RING — rotasi konstan, bukan kedip */}
            <motion.div
              className="absolute inset-0 rounded-full z-10"
              style={{
                // Conic gradient menciptakan efek ekor memudar
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(14, 165, 233, 0.1) 50%, #0EA5E9 100%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              {/* Masking tengah untuk membuat efek cincin tipis (2px) */}
              <div className="absolute inset-[2px] rounded-full bg-white dark:bg-black" />
            </motion.div>

            {/* 3. PROFILE IMAGE CONTAINER */}
            {/* Inset 6px memberikan jarak antara cincin putar dan foto */}
            <div className="absolute inset-[6px] rounded-full z-20 overflow-hidden flex items-center justify-center bg-white dark:bg-black">
              <div className="w-full h-full relative">
                <Image
                  src={photoUrl}
                  alt="Ibrahim Haykal"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>

            {/* 4. STATIC BORDER (Optional Frame Tipis) */}
            <div className="absolute inset-[6px] rounded-full z-30 border pointer-events-none border-black/5 dark:border-white/10" />
          </div>
        </motion.div>
        {/* --- END LOGO SECTION --- */}

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2 tracking-tight text-gray-900 dark:text-white">
            Hello 👋🏼
          </h1>
          <p className="text-lg font-light tracking-wide text-gray-500 dark:text-gray-400">
            Welcome to my journey
          </p>
        </motion.div>

        {/* PROGRESS BAR (Minimalist) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-64 mx-auto"
        >
          <div className="h-[3px] rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-800">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #0EA5E9 0%, #3B82F6 100%)",
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
          </div>

          <div className="flex justify-between mt-2 px-1">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              Loading assets
            </span>
            <span className="text-[10px] font-mono tabular-nums text-zinc-400 dark:text-zinc-500">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
