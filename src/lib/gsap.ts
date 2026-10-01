"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
}

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother };

/** Easing yang dipakai seragam di seluruh situs. */
export const EASE = "power3.out";

/*
  Reveal tetap dipicu IntersectionObserver (lib/reveal.ts). ScrollTrigger cuma
  dipakai buat parallax yang di-scrub, karena itu butuh progress scroll, bukan
  sekadar "udah kelihatan atau belum".
*/

/**
 * Ganti tema/bahasa dengan mulus: halaman ([data-fade]) memudar sebentar,
 * perubahan dipasang pas lagi transparan, lalu muncul lagi.
 */
export function fadeSwap(change: () => void) {
  const page = document.querySelectorAll("[data-fade]");
  gsap
    .timeline()
    .to(page, { autoAlpha: 0, y: 6, duration: 0.2, ease: "power2.in" })
    .add(change)
    .to(page, { autoAlpha: 1, y: 0, duration: 0.45, ease: EASE, clearProps: "transform" });
}
