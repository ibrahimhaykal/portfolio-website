"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

type LoadingScreenProps = {
  onComplete: () => void;
  photoUrl: string;
};

/*
  Animasi masuk sengaja pakai CSS keyframe, bukan gsap.from().

  gsap.from() langsung menaruh elemen di keadaan awal (opacity 0). Kalau
  timeline-nya sempat terputus — Fast Refresh, StrictMode nge-mount dua kali,
  atau error di tempat lain — elemennya nyangkut transparan dan seluruh loading
  screen kelihatan hilang. CSS keyframe dengan `both` selalu berhenti di keadaan
  akhir, jadi kejadian itu nggak mungkin terjadi.

  GSAP di sini cuma kebagian dua hal yang memang butuh nilai dinamis:
  lebar progress bar, dan fade keluar.
*/

export default function LoadingScreen({ onComplete, photoUrl }: LoadingScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const handleDone = useCallback(() => {
    const el = rootRef.current;
    if (!el) {
      onComplete();
      return;
    }

    const inner = el.querySelector("[data-ls-inner]");
    const tl = gsap.timeline({ onComplete });
    if (inner) {
      tl.to(inner, { y: -24, opacity: 0, duration: 0.45, ease: "power2.in" });
    }
    tl.to(el, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "-=0.2");
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
    >
      <div data-ls-inner className="text-center w-full max-w-md px-4">

        {/* --- LOGO --- */}
        <div className="animate-ls-pop mb-12 relative">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">

            {/* Glow — radial-gradient langsung, TANPA filter blur. Blur di sini
                dulu bikin spinner-nya ikut macet. */}
            <div
              className="absolute inset-[-24px] rounded-full z-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(14,165,233,0.28) 0%, rgba(139,92,246,0.14) 45%, transparent 70%)",
              }}
            />

            {/* Cincin berputar — cuma border yang diputar. Rotasi border murni
                kerjaan compositor; conic-gradient harus digambar ulang tiap
                frame dan itu yang bikin macet. */}
            <div
              className="absolute inset-0 rounded-full z-10 border-2 border-sky-500/15 border-t-sky-500 animate-spin"
              style={{ animationDuration: "1.1s" }}
            />

            {/* Foto profil */}
            <div className="absolute inset-[6px] rounded-full z-20 overflow-hidden bg-white dark:bg-black">
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

            {/* Border tipis di atas foto */}
            <div className="absolute inset-[6px] rounded-full z-30 border pointer-events-none border-black/5 dark:border-white/10" />
          </div>
        </div>

        {/* --- TEKS --- */}
        <div className="mb-8">
          <h1
            style={{ animationDelay: "0.15s" }}
            className="animate-ls-rise text-3xl lg:text-4xl font-semibold mb-2 tracking-tight text-gray-900 dark:text-white"
          >
            Hello 👋🏼
          </h1>
          <p
            style={{ animationDelay: "0.25s" }}
            className="animate-ls-rise text-lg font-light tracking-wide text-gray-500 dark:text-gray-400"
          >
            Welcome to my journey
          </p>
        </div>

        <ProgressBar onDone={handleDone} />

      </div>
    </div>
  );
}

/* Dipisah supaya tick tiap 50ms cuma me-render ulang bar dan angka persen —
   bukan foto dan glow yang kena blur. */
function ProgressBar({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const next = Math.min(prev + (Math.random() * 4 + 1), 100);

        // Efek samping dijaga ref, bukan ditaruh di dalam updater. React
        // StrictMode menjalankan updater dua kali di mode dev, dan tanpa
        // penjaga ini timer selesainya kepasang dobel.
        if (next >= 100 && !doneRef.current) {
          doneRef.current = true;
          setTimeout(onDone, 450);
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onDone]);

  // Lebar bar di-tween: kenaikannya random tiap 50ms, dan tanpa tween
  // pergerakannya kelihatan patah-patah.
  useEffect(() => {
    if (!barRef.current) return;
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [progress]);

  return (
    <div style={{ animationDelay: "0.35s" }} className="animate-ls-rise w-64 mx-auto">
      <div className="h-[3px] rounded-full overflow-hidden bg-gray-200 dark:bg-zinc-800">
        <div
          ref={barRef}
          style={{ width: "0%" }}
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
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
    </div>
  );
}
