"use client";

import { gsap, useGSAP } from "../lib/gsap";

/*
  Cahaya lembut di belakang kartu kaca, cuma tampil di tema glass.
  Tiap lapisan hanyut sejauh jarak yang beda sepanjang halaman (data-drift,
  piksel dari atas ke bawah). Beda jarak itu yang bikin kerasa berlapis.
  Yang digeser cuma transform, jadi blur-nya nggak dirender ulang.
*/
export default function Backdrop() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.to(el, {
          y: Number(el.dataset.drift),
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 1 },
        });
      });
    });
  });

  return (
    <div className="glass-only fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <span data-drift="-260" className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-indigo-300/60 blur-[110px] will-change-transform dark:bg-indigo-600/30" />
      <span data-drift="-120" className="absolute -bottom-48 left-[10%] h-[30rem] w-[30rem] rounded-full bg-sky-200/70 blur-[110px] will-change-transform dark:bg-sky-700/25" />
    </div>
  );
}
