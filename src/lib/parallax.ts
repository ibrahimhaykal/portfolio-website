"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";

/*
  Parallax: elemen bergerak lebih lambat dari halaman, jadi kerasa ada
  kedalaman.

  Tandai elemennya: <div data-parallax="24"> — angkanya jarak geser maksimum
  dalam piksel. Makin besar makin dramatis; 16-32 biasanya pas.

  Dua hal penting soal cara kerjanya:

  1. Posisi elemen diukur SEKALI di awal (dan tiap resize), bukan tiap frame.
     Manggil getBoundingClientRect() 60x per detik per elemen maksa browser
     ngitung ulang layout terus-menerus, dan itu yang bikin scroll jadi berat.

  2. Nulisnya pakai gsap.quickSetter — nulis langsung ke elemen tanpa bikin
     tween baru tiap frame.

  JANGAN pasang data-parallax di elemen yang juga punya data-reveal atau
  data-card: dua-duanya nulis ke `transform`, dan mereka bakal rebutan.
*/

type ParallaxItem = {
  setY: (value: number) => void;
  strength: number;
  center: number;
  height: number;
};

export function useParallax(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    // Parallax adalah pemicu utama motion sickness — kalau pengguna minta
    // hemat gerakan, ini yang pertama dimatikan.
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!elements.length) return;

    let items: ParallaxItem[] = [];

    const measure = () => {
      items = elements.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          setY: gsap.quickSetter(el, "y", "px") as (value: number) => void,
          strength: Number(el.dataset.parallax) || 20,
          center: rect.top + window.scrollY + rect.height / 2,
          height: rect.height,
        };
      });
    };

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrolled = window.scrollY;

      for (const item of items) {
        // progress: +1 saat elemen masih di bawah layar, 0 pas di tengah,
        // -1 saat udah lewat di atas.
        const progress =
          (item.center - scrolled - viewport / 2) / (viewport / 2 + item.height / 2);
        item.setY(Math.max(-1, Math.min(1, progress)) * item.strength);
      }
    };

    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      gsap.set(elements, { clearProps: "transform" });
    };
  }, [scope]);
}
