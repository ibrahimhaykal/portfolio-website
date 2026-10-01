"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Briefcase, Handshake, Layers, MessageCircle, Send, Trophy, X, type LucideIcon } from "lucide-react";
import { gsap, useGSAP } from "../lib/gsap";
import { useLang, type Pair } from "../lib/i18n";

type Turn = { role: "user" | "assistant"; content: string };

const SUGGESTIONS: Array<{ icon: LucideIcon; text: Pair }> = [
  { icon: Briefcase, text: ["What did he build on VALAK CRM?", "Apa yang dia bangun di VALAK CRM?"] },
  { icon: Trophy, text: ["What's his strongest result?", "Apa hasil kerja terkuatnya?"] },
  { icon: Layers, text: ["What's his tech stack?", "Apa saja tech stack-nya?"] },
  { icon: Handshake, text: ["Is he open to work?", "Apakah dia terbuka untuk kerja?"] },
];

const EMAIL = "ibrahimhaykal@gmail.com";
const NUDGE_KEY = "askme-nudged";

function Avatar({ size = 28, waving = false }: { size?: number; waving?: boolean }) {
  return (
    <span className="relative block shrink-0 overflow-hidden rounded-full bg-fg/[0.06]" style={{ width: size, height: size }}>
      <Image
        src={waving ? "/profile/profile-ip-hi.png" : "/profile/profile-ip-emoji.png"}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </span>
  );
}

/** Tiga titik yang naik-turun pelan selama jawaban belum datang. */
function Typing() {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to("span", { y: -3, duration: 0.4, ease: "sine.inOut", stagger: 0.15, repeat: -1, yoyo: true });
      });
    },
    { scope: ref }
  );
  return (
    <span ref={ref} className="inline-flex gap-1 py-1" aria-label="…">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted" />
      ))}
    </span>
  );
}

function Bubble({ turn }: { turn: Turn }) {
  if (turn.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-[var(--radius)] rounded-br-sm bg-accent px-3.5 py-2 text-accent-fg">
          {turn.content}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2">
      <Avatar />
      <div className="max-w-[85%] whitespace-pre-wrap rounded-[var(--radius)] rounded-bl-sm border border-[color:var(--line)] bg-fg/[0.04] px-3.5 py-2">
        {turn.content || <Typing />}
      </div>
    </div>
  );
}

/**
 * Tanya-jawab soal portofolio. Jawabannya dari /api/chat, yang cuma boleh
 * memakai fakta di llms.txt. Riwayat cuma hidup selama tab terbuka.
 */
export default function AskMe() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Sapaan kecil sekali per sesi, beberapa detik setelah halaman dibuka.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch {}
    const timer = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const dismissNudge = () => {
    setNudge(false);
    try {
      sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {}
  };

  useGSAP(
    () => {
      if (open) gsap.from(panelRef.current, { autoAlpha: 0, y: 16, scale: 0.97, duration: 0.4, ease: "power3.out" });
    },
    { dependencies: [open] }
  );
  useGSAP(
    () => {
      if (nudge && !open)
        gsap.from(nudgeRef.current, { autoAlpha: 0, y: 10, scale: 0.9, transformOrigin: "bottom right", duration: 0.5, ease: "back.out(1.6)" });
    },
    { dependencies: [nudge, open] }
  );

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    dismissNudge();
    setOpen(!open);
  };

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || busy) return;
    const history: Turn[] = [...turns, { role: "user", content: text }];
    setTurns([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const write = (content: string) =>
      setTurns((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        write(
          res.status === 429
            ? t(`Phew, that's a lot of questions! Give me a few minutes, or email ${EMAIL}.`, `Wah, pertanyaannya banyak sekali! Coba lagi beberapa menit lagi, atau email ${EMAIL}.`)
            : t(`I can't answer right now. Email ${EMAIL} and Ibrahim will reply himself.`, `Saya belum bisa menjawab sekarang. Email ${EMAIL} dan Ibrahim akan membalas langsung.`)
        );
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        write(answer);
      }
    } catch {
      write(t(`The connection dropped. Email ${EMAIL} instead.`, `Koneksi terputus. Email ${EMAIL} saja.`));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t("Ask about Ibrahim", "Tanya soal Ibrahim")}
          className="card fixed bottom-24 right-5 z-[60] flex h-[min(580px,72vh)] w-[min(390px,calc(100vw-2.5rem))] flex-col overflow-hidden !bg-[rgb(var(--bg))]"
        >
          <div className="divider flex items-center gap-3 border-b p-4">
            <span className="relative block shrink-0">
              <Avatar size={42} />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[color:rgb(var(--bg))] bg-emerald-500" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="heading text-base leading-tight">{t("Ibrahim's assistant", "Asisten Ibrahim")}</p>
              <p className="text-xs text-muted">{t("Answers from his verified work", "Menjawab dari karya yang terverifikasi")}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={t("Close", "Tutup")} className="btn-icon shrink-0">
              <X size={15} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4 text-sm leading-relaxed">
            <div className="flex items-end gap-2">
              <Avatar waving />
              <div className="max-w-[85%] rounded-[var(--radius)] rounded-bl-sm border border-[color:var(--line)] bg-fg/[0.04] px-3.5 py-2">
                {t(
                  "Hi there! 👋 I'm Ibrahim's portfolio assistant. Ask me about his projects, his experience, or whether he's open to work.",
                  "Halo! 👋 Saya asisten portofolio Ibrahim. Tanya saja soal proyeknya, pengalamannya, atau apakah dia terbuka untuk kerja."
                )}
              </div>
            </div>

            {turns.length === 0 && (
              <div className="grid grid-cols-2 gap-2 pl-9">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.text[0]}
                    onClick={() => ask(t(...s.text))}
                    className="card card-hover flex flex-col items-start gap-1.5 p-3 text-left text-xs font-medium"
                  >
                    <s.icon size={16} />
                    {t(...s.text)}
                  </button>
                ))}
              </div>
            )}

            {turns.map((turn, i) => (
              <Bubble key={i} turn={turn} />
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="divider border-t p-3"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder={t("Ask me anything about his work…", "Tanya apa saja soal karyanya…")}
                aria-label={t("Your question", "Pertanyaan kamu")}
                className="field !py-2"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label={t("Send", "Kirim")} className="btn btn-primary !px-3 disabled:opacity-50">
                <Send size={15} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted">
              {t("AI can make mistakes. For anything important, email Ibrahim.", "AI bisa keliru. Untuk hal penting, email Ibrahim langsung.")}
            </p>
          </form>
        </div>
      )}

      {nudge && !open && (
        <div ref={nudgeRef} className="card fixed bottom-24 right-5 z-[60] flex max-w-[260px] items-start gap-2 p-3 text-sm">
          <button onClick={toggle} className="text-left">
            {t("Hi! 👋 Curious about my work? Ask me anything.", "Halo! 👋 Penasaran soal karya saya? Tanya saja.")}
          </button>
          <button onClick={dismissNudge} aria-label={t("Dismiss", "Tutup")} className="shrink-0 text-muted hover:text-fg">
            <X size={14} />
          </button>
        </div>
      )}

      <button
        onClick={toggle}
        aria-expanded={open}
        aria-label={t("Ask about my work", "Tanya soal karya saya")}
        className="btn btn-primary fixed bottom-6 right-5 z-[60] !rounded-full !p-3 sm:!px-5"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        <span className="hidden sm:inline">{t("Ask about my work", "Tanya soal karya saya")}</span>
      </button>
    </>
  );
}
