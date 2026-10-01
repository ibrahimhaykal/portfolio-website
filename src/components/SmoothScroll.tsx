"use client";

import type { ReactNode } from "react";
import { gsap, useGSAP, ScrollSmoother } from "../lib/gsap";

/*
  Scroll halus satu halaman pakai ScrollSmoother: scroll aslinya tetap native,
  cuma kontennya yang menyusul pelan. Elemen fixed (sidebar, tombol, modal)
  harus di LUAR pembungkus ini, karena kontennya digeser pakai transform.

  Di layar sentuh dan saat reduce motion, scroll native biasa.
*/
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        smoothTouch: false,
        effects: false,
      });
      return () => smoother.kill();
    });
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
