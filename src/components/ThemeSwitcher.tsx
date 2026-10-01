"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Blocks, Check, Contrast, GlassWater, Moon, Palette, Sun, X, Zap } from "lucide-react";
import { gsap, useGSAP, fadeSwap } from "../lib/gsap";
import { useLang } from "../lib/i18n";

const THEMES = [
  { id: "mono", name: "Mono", icon: Contrast, note: ["Black and white. Quiet, sharp, nothing extra.", "Hitam putih. Tenang, tegas, tanpa hiasan."] },
  { id: "glass", name: "Glass", icon: GlassWater, note: ["Frosted panels floating over soft color.", "Panel kaca buram di atas warna lembut."] },
  { id: "brutal", name: "Brutal", icon: Blocks, note: ["Thick borders, hard shadows, loud yellow.", "Garis tebal, bayangan keras, kuning mencolok."] },
  { id: "comic", name: "Comic", icon: Zap, note: ["Ink outlines, halftone dots, caption boxes.", "Garis tinta, titik halftone, kotak caption."] },
] as const;

// Warna diambil langsung dari variabel tema, jadi swatch selalu cocok sama temanya.
const SWATCHES = [
  ["bg", "rgb(var(--bg))"],
  ["ink", "rgb(var(--fg))"],
  ["muted", "rgb(var(--muted))"],
  ["accent", "rgb(var(--accent))"],
  ["card", "var(--card)"],
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("mono");
  const [dark, setDark] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const { t } = useLang();

  // Tema udah dipasang script blocking di layout, di sini cuma nyamain state.
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "mono");
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      if (!open) return;
      tl.current = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-overlay]", { autoAlpha: 0, duration: 0.3 })
        .from("[data-panel]", { autoAlpha: 0, y: 40, scale: 0.97, duration: 0.55 }, "<")
        .from("[data-option]", { autoAlpha: 0, y: 18, duration: 0.45, stagger: 0.06 }, "-=0.35");
    },
    { scope: modalRef, dependencies: [open] }
  );

  const close = contextSafe(() => {
    if (!tl.current) return setOpen(false);
    tl.current.eventCallback("onReverseComplete", () => setOpen(false)).timeScale(1.8).reverse();
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const apply = (nextTheme: string, nextDark: boolean) =>
    fadeSwap(() => {
      const html = document.documentElement;
      html.dataset.theme = nextTheme;
      html.classList.toggle("dark", nextDark);
      localStorage.setItem("theme", nextTheme);
      localStorage.setItem("darkMode", String(nextDark));
      setTheme(nextTheme);
      setDark(nextDark);
    });

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn w-full justify-between">
        <span className="flex items-center gap-2">
          <current.icon size={15} /> {current.name} · {dark ? t("Dark", "Gelap") : t("Light", "Terang")}
        </span>
        <Palette size={15} />
      </button>

      {open &&
        createPortal(
          <div ref={modalRef} className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div data-overlay onClick={close} className="absolute inset-0 bg-black/50" />

            <div
              data-panel
              role="dialog"
              aria-modal="true"
              aria-label="Choose a theme"
              className="card relative max-h-[90vh] w-full max-w-2xl overflow-y-auto !bg-[rgb(var(--bg))] p-6"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="label mb-3">{t("Appearance", "Tampilan")}</p>
                  <h2 className="heading text-3xl">{t("Pick a theme", "Pilih tema")}</h2>
                </div>
                <button onClick={close} aria-label="Close theme picker" className="btn-icon">
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                {THEMES.map((th) => (
                  // data-theme di sini bikin kartu ini jadi preview hidup tema itu.
                  <button
                    key={th.id}
                    data-option
                    data-theme={th.id}
                    onClick={() => apply(th.id, dark)}
                    aria-pressed={theme === th.id}
                    className={`${dark ? "dark" : ""} card card-hover p-4 text-left font-sans text-fg`}
                  >
                    <span className="mb-2 flex items-center justify-between">
                      <span className="heading flex items-center gap-2 text-lg">
                        <th.icon size={18} /> {th.name}
                      </span>
                      {theme === th.id && (
                        <span className="btn-primary rounded-full p-1"><Check size={12} /></span>
                      )}
                    </span>
                    <span className="mb-4 block text-xs leading-relaxed text-muted">{t(th.note[0], th.note[1])}</span>
                    <span className="flex gap-2">
                      {SWATCHES.map(([name, color]) => (
                        <span key={name} className="flex flex-col items-center gap-1">
                          <span className="h-7 w-7 rounded-full" style={{ background: color, border: "2px solid var(--edge)" }} />
                          <span className="font-mono text-[9px] text-muted">{name}</span>
                        </span>
                      ))}
                    </span>
                  </button>
                ))}
              </div>

              <div data-option className="grid grid-cols-2 gap-3">
                {[false, true].map((d) => (
                  <button key={String(d)} onClick={() => apply(theme, d)} className={`btn ${dark === d ? "btn-primary" : ""}`}>
                    {d ? <Moon size={15} /> : <Sun size={15} />} {d ? t("Dark", "Gelap") : t("Light", "Terang")}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
