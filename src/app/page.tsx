"use client";

import { useEffect, useRef, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Sidebar from "../components/Sidebar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import WebMCP from "../components/WebMCP";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const progressBarRef = useRef<HTMLDivElement>(null);

  /*
    Versi lama komponen ini nulis `overflow: hidden` ke <body> selama loader
    tampil. Fast Refresh nggak menjalankan cleanup milik efek yang sudah
    dihapus, jadi nilainya bisa nyangkut sepanjang sesi dev dan bikin halaman
    nggak bisa discroll. Di produksi baris ini no-op.
  */
  useEffect(() => {
    document.body.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow");
  }, []);

  /*
    Satu listener scroll buat dua hal: progress bar dan drift lapisan cahaya
    di background.

    Lapisan cahaya digeser sedikit dengan jarak yang beda-beda sepanjang
    halaman — itu yang bikin kerasa ada kedalaman waktu di-scroll. Nilainya
    diikat ke progress halaman (0-1), bukan ke jumlah piksel scroll, supaya
    jarak geser totalnya tetap sama di halaman pendek maupun panjang.
  */
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layers = reduced
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-drift]")).map((el) => ({
          el,
          range: Number(el.dataset.drift) || 0,
        }));

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      for (const layer of layers) {
        layer.el.style.transform = `translate3d(0, ${ratio * layer.range}px, 0)`;
      }
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

  return (
    <>
      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
          photoUrl="/profile/profile-ip-emoji.png"
        />
      )}

      <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300 relative">

        {/*
          --- GLOBAL BACKGROUND (Fixed) ---

          Semua cahaya di sini pakai radial-gradient, BUKAN lingkaran yang
          di-blur. Sebelumnya ada tiga div dengan `blur(130-150px)` seukuran
          28-38rem; blur sebesar itu harus dirasterisasi ulang terus-menerus dan
          bikin seluruh halaman turun ke beberapa FPS — animasi jadi kelihatan
          patah, bahkan spinner loading pun ikut macet.

          Gradient menghasilkan bentuk yang praktis sama persis, tapi ongkos
          rendernya nol. Jangan ganti balik ke blur.
        */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Grid tipis */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* Cahaya — tiap lapisan hanyut sejauh jarak yang beda (data-drift,
              dalam piksel, dari atas ke bawah halaman). Beda jarak itu yang
              bikin kerasa berlapis. */}
          <div
            data-drift="140"
            className="absolute inset-0 bg-[radial-gradient(60rem_38rem_at_50%_-8%,rgba(56,189,248,0.13),transparent_70%)]"
          />
          <div
            data-drift="-90"
            className="absolute inset-0 bg-[radial-gradient(46rem_34rem_at_112%_38%,rgba(99,102,241,0.10),transparent_70%)]"
          />
          <div
            data-drift="70"
            className="absolute inset-0 bg-[radial-gradient(42rem_30rem_at_-12%_96%,rgba(34,211,238,0.09),transparent_70%)]"
          />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/25 to-transparent" />
        </div>
        {/* --- END BACKGROUND --- */}

        {/* Reading progress. scaleX(0) inline supaya bar-nya nggak sempat
            kelihatan penuh sebelum GSAP ambil alih. */}
        <div
          ref={progressBarRef}
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500"
          aria-hidden
        />

        {/* Tool surface buat AI agent (WebMCP) — nggak render apa-apa */}
        <WebMCP />

        <Sidebar />

        {/* Tali progress + tombol balik ke atas, sisi kanan */}
        <ScrollToTop />

        <div className="relative z-10 lg:ml-80 lg:pr-6">
          <Hero ready={!loading} />
          <About />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
