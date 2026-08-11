"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export { gsap, useGSAP };

/** Easing yang dipakai seragam di seluruh situs. */
export const EASE = "power3.out";

/*
  Catatan: ScrollTrigger sengaja TIDAK dipakai di project ini.

  Semua section sudah ada di DOM sejak awal (biar ke-crawl tanpa JS), di balik
  loading screen yang nutup layar beberapa detik. ScrollTrigger menghitung
  posisi start/end saat dibuat, dan di urutan itu perhitungannya nggak pernah
  benar — reveal-nya kepakai habis sebelum sempat kelihatan.

  Pemicunya dipindah ke IntersectionObserver (lihat lib/reveal.ts), yang nggak
  menghitung apa pun. GSAP tetap yang menganimasi.
*/
