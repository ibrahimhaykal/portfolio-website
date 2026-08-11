"use client";

import { useEffect, type RefObject } from "react";
import { gsap, EASE } from "./gsap";

/*
  Reveal on scroll: IntersectionObserver yang MEMICU, GSAP yang MENGANIMASI.

  Kenapa bukan ScrollTrigger sebagai pemicu: ScrollTrigger menghitung posisi
  start/end dari tinggi halaman, jadi hasilnya bergantung pada kapan dia dibuat,
  apakah font sudah dimuat, dan apakah ada yang manggil refresh() setelah layout
  berubah. Di halaman ini semua section sudah ada di DOM sejak awal di balik
  loading screen, dan urutan itu ternyata bikin perhitungannya nggak pernah
  benar — animasinya kepakai habis sebelum sempat kelihatan.

  IntersectionObserver nggak menghitung apa pun. Browser yang bilang "elemen ini
  masuk layar", titik.

  Tandai elemen pakai atribut: data-reveal, data-card, data-draw, data-draw-y.
*/

type RevealSpec = {
  selector: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  stagger?: number;
};

/*
  Wipe: konten tersingkap dari bawah ke atas tanpa bergeser sedikit pun.

  Setelah selesai, clip-path-nya ditimpa jadi `none` — dua alasan:

  1. `inset(0 0 0 0)` memotong tepat di border-box, jadi bayangan kartu ikut
     kepotong kalau dibiarkan nempel.
  2. JANGAN pakai clearProps buat ini. clearProps menghapus inline style, dan
     elemennya langsung jatuh balik ke aturan CSS — yang isinya
     `clip-path: inset(0 0 100% 0)`. Hasilnya: animasi masuk, selesai, lalu
     kontennya lenyap lagi.
*/
const WIPE_FROM = { opacity: 0, clipPath: "inset(0 0 100% 0)" };
const WIPE_TO = {
  opacity: 1,
  clipPath: "inset(0 0 0% 0)",
  duration: 0.95,
  ease: EASE,
};

const SPECS: RevealSpec[] = [
  {
    selector: "[data-reveal]",
    from: { opacity: 0, y: 32 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: EASE },
    stagger: 0.1,
  },
  {
    // Judul dan paragraf: disingkap, bukan digeser. Teks yang meluncur masuk
    // itu pola paling generik; wipe bikin dia kebaca sebagai "dibuka".
    selector: "[data-wipe]",
    from: WIPE_FROM,
    to: WIPE_TO,
    stagger: 0.12,
  },
  {
    // Kartu naik sambil membesar sedikit — kesannya maju ke depan, bukan cuma
    // geser ke atas.
    selector: "[data-card]",
    from: { opacity: 0, y: 30, scale: 0.97 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: EASE },
    stagger: 0.08,
  },
  {
    selector: "[data-draw]",
    from: { scaleX: 0 },
    to: { scaleX: 1, duration: 0.9, ease: "power2.out" },
    stagger: 0.1,
  },
  {
    selector: "[data-draw-y]",
    from: { scaleY: 0 },
    to: { scaleY: 1, duration: 1.2, ease: "power2.out" },
  },
];

export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observers: IntersectionObserver[] = [];
    // Elemen yang udah didaftarkan, biar nggak dobel waktu DOM berubah.
    const registered = new WeakSet<HTMLElement>();
    const registrars: Array<() => void> = [];

    const context = gsap.context(() => {
      for (const spec of SPECS) {
        const items = Array.from(root.querySelectorAll<HTMLElement>(spec.selector));
        if (!items.length) continue;

        // Tanpa IntersectionObserver nggak ada cara aman buat tahu kapan elemen
        // kelihatan — tampilkan apa adanya.
        if (typeof IntersectionObserver === "undefined") {
          gsap.set(items, spec.to);
          continue;
        }

        /*
          Reduce motion TIDAK berarti "nggak ada animasi", dan juga nggak harus
          berarti "semuanya fade" — fade polos di semua elemen justru kelihatan
          murahan.

          Yang dilarang cuma GERAKAN. Wipe memenuhi syarat itu: elemennya diam
          di tempat, cuma tersingkap. Jadi pengguna dengan setelan ini tetap
          dapat animasi yang kerasa disengaja, bukan sisa-sisa.
        */
        const observer = new IntersectionObserver(
          (entries) => {
            const entered = entries
              .filter((entry) => entry.isIntersecting)
              .map((entry) => entry.target as HTMLElement);
            if (!entered.length) return;

            // Berhenti mengamati dulu — reveal cuma sekali, nggak mundur lagi
            // waktu di-scroll balik.
            entered.forEach((el) => observer.unobserve(el));

            // Elemen yang masuk barengan dianimasi sebagai satu grup, jadi
            // stagger-nya mengalir alami tanpa perlu ngitung indeks manual.
            const vars = reduced ? WIPE_TO : spec.to;
            const usesClip = "clipPath" in vars;

            gsap.to(entered, {
              ...vars,
              stagger: spec.stagger ?? 0,
              overwrite: true,
              onComplete: usesClip
                ? () => gsap.set(entered, { clipPath: "none" })
                : undefined,
            });
          },
          /*
            threshold 0: satu piksel bersinggungan udah cukup.

            Dulu 0.12 — dan waktu di-scroll cepat, elemen bisa lewat dari bawah
            root ke atas root di antara dua sampel observer tanpa pernah
            tercatat 12% kelihatan. Elemennya lalu nyangkut transparan.
          */
          { threshold: 0, rootMargin: "0px 0px -8% 0px" }
        );

        /*
          Didaftarkan lewat fungsi, bukan sekali jalan.

          Kalau React mengganti `key` sebuah elemen (misalnya karena judulnya
          diedit), node lamanya dibuang dan diganti node baru — sementara
          observer masih mengawasi node lama yang udah nggak ada. Node barunya
          nggak pernah terdaftar, jadi diam di opacity 0 selamanya.

          MutationObserver di bawah memanggil ulang fungsi ini tiap kali ada
          node baru masuk.
        */
        const register = () => {
          for (const el of root.querySelectorAll<HTMLElement>(spec.selector)) {
            if (registered.has(el)) continue;
            registered.add(el);
            gsap.set(el, reduced ? WIPE_FROM : spec.from);
            observer.observe(el);
          }
        };

        register();
        registrars.push(register);
        observers.push(observer);
      }
    }, root);

    // Node baru yang masuk belakangan ikut didaftarkan. Ini yang bikin elemen
    // nggak pernah lagi nyangkut transparan gara-gara React mengganti node.
    const mutations = new MutationObserver(() => {
      registrars.forEach((register) => register());
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observers.forEach((observer) => observer.disconnect());
      context.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Lompat ke section. Smooth-nya dari `scroll-behavior: smooth` di CSS. */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
