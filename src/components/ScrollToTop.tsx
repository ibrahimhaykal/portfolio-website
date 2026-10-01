"use client";

import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";

/**
 * Tali progress di sisi kanan + tombol balik ke atas.
 *
 * Talinya keisi dari atas ke bawah mengikuti posisi baca, jadi dia sekaligus
 * indikator "udah sejauh mana". Muncul setelah pengguna scroll lewat 60% layar
 * pertama, sebelum itu belum ada yang perlu dibalikin.
 */
export default function ScrollToTop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    gsap.set(root, { autoAlpha: 0, y: 14 });
    gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });

    const setFill = gsap.quickSetter(fill, "scaleY") as (value: number) => void;
    let shown = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setFill(max > 0 ? Math.min(window.scrollY / max, 1) : 0);

      const shouldShow = window.scrollY > window.innerHeight * 0.6;
      if (shouldShow === shown) return;

      shown = shouldShow;
      gsap.to(root, {
        autoAlpha: shouldShow ? 1 : 0,
        y: shouldShow ? 0 : 14,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const backToTop = () => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /*
      `scroll-behavior: smooth` di CSS harus dimatikan selama tween jalan.
      Kalau nggak, tiap window.scrollTo() per frame bakal dianimasikan lagi
      sama browser, dua penggerak rebutan, hasilnya tersendat.
    */
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    /*
      Reduce motion tetap dapat scroll halus, cuma lebih singkat.

      Yang dibatasi aturan reduce motion itu animasi hiasan; ini gerakan yang
      diminta pengguna sendiri lewat klik, dan lompat mendadak ke atas justru
      bikin orang kehilangan konteks posisinya.
    */
    const position = { y: window.scrollY };
    gsap.to(position, {
      y: 0,
      // Halaman yang panjang butuh waktu lebih lama, tapi dibatasi supaya
      // nggak kerasa lelet.
      duration: reduced
        ? 0.6
        : Math.min(1.3, 0.45 + window.scrollY / 3500),
      ease: reduced ? "power2.inOut" : "power3.inOut",
      onUpdate: () => window.scrollTo(0, position.y),
      onComplete: () => {
        html.style.scrollBehavior = previous;
      },
    });
  };

  return (
    <div
      ref={rootRef}
      className="fixed right-5 bottom-24 z-[55] hidden sm:flex flex-col items-center gap-3"
    >
      {/* Tali */}
      <span className="relative block h-24 w-px overflow-hidden bg-fg/15">
        <span
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full bg-fg"
        />
      </span>

      <button
        type="button"
        onClick={backToTop}
        aria-label="Back to top"
        className="btn-icon"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}
