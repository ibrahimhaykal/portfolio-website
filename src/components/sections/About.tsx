"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import { Trophy, BadgeCheck, BookOpen, ArrowUpRight } from "lucide-react";
import {
  FaLaravel, FaPhp, FaNodeJs, FaReact, FaJs, FaPython,
  FaFigma, FaGitAlt, FaDocker, FaDatabase
} from "react-icons/fa";
import {
  SiPostgresql, SiOracle, SiMysql, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiBootstrap, SiFramer,
  SiStreamlit, SiDaisyui, SiPusher, SiLeaflet, SiLaravel
} from "react-icons/si";
import SectionHeading from "../ui/SectionHeading";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReveal } from "../../lib/reveal";
import { useLang, type Pair } from "../../lib/i18n";

/** color: warna brand ikon. Kosong = ikut warna tinta tema (buat brand yang aslinya hitam). */
type Skill = { icon: IconType; name: string; color?: string };

const stats: Array<{ value: string; label: Pair; note: Pair }> = [
  { value: "2+", label: ["Years shipping", "Tahun berkarya"], note: ["since Aug 2024", "sejak Agustus 2024"] },
  { value: "13", label: ["Projects delivered", "Proyek selesai"], note: ["internal + client", "internal + klien"] },
  { value: "3.77", label: ["GPA / 4.00", "IPK / 4.00"], note: ["graduated 2026", "lulus 2026"] },
  { value: "76.1%", label: ["Search time cut", "Waktu cari turun"], note: ["103.0 → 24.6 min", "103,0 → 24,6 menit"] },
];

const achievements: Array<{ icon: typeof Trophy; title: Pair; note: Pair; href?: string }> = [
  { icon: Trophy, title: ["2nd Place, National Hackathon", "Juara 2 Hackathon Nasional"], note: ["SME Digital Platform, 2025", "Platform Digital UMKM, 2025"] },
  { icon: BadgeCheck, title: ["Certified Database Administrator", "Database Administrator Bersertifikat"], note: ["BNSP national certification", "Sertifikasi nasional BNSP"] },
  {
    icon: BookOpen,
    title: ["Published thesis", "Skripsi terbit"],
    note: ["76.10% faster material search", "Pencarian material 76,10% lebih cepat"],
    href: "http://repository.stmi.ac.id/id/eprint/2840/",
  },
];

const stack: Array<{ group: string; items: Skill[] }> = [
  {
    group: "Backend & Database",
    items: [
      { icon: FaLaravel, name: "Laravel 12", color: "#FF2D20" }, { icon: FaPhp, name: "PHP", color: "#777BB4" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" }, { icon: SiOracle, name: "Oracle PL/SQL", color: "#F80000" },
      { icon: SiMysql, name: "MySQL", color: "#4479A1" }, { icon: FaNodeJs, name: "Node.js", color: "#5FA04E" },
      { icon: FaDatabase, name: "REST API" },
    ],
  },
  {
    group: "Frontend & Real-time",
    items: [
      { icon: FaReact, name: "React 19", color: "#61DAFB" }, { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6" }, { icon: FaJs, name: "JavaScript", color: "#F7DF1E" },
      { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" }, { icon: SiPusher, name: "Pusher", color: "#8B5CF6" },
      { icon: SiLaravel, name: "Laravel Echo", color: "#FF2D20" }, { icon: SiLeaflet, name: "Leaflet", color: "#199900" },
      { icon: SiDaisyui, name: "DaisyUI", color: "#5A0EF8" }, { icon: SiBootstrap, name: "Bootstrap", color: "#7952B3" },
      { icon: SiFramer, name: "Framer Motion", color: "#0055FF" },
    ],
  },
  {
    group: "Tools & AI/ML",
    items: [
      { icon: FaGitAlt, name: "Git", color: "#F05032" }, { icon: FaFigma, name: "Figma", color: "#F24E1E" },
      { icon: FaDocker, name: "Docker", color: "#2496ED" }, { icon: FaPython, name: "Python", color: "#3776AB" },
      { icon: SiStreamlit, name: "Streamlit / YOLOv8", color: "#FF4B4B" },
    ],
  },
];

/**
 * Satu baris carousel. Isinya digandakan, lalu track digeser -50%: pas
 * salinan kedua sampai di posisi awal, loop-nya nyambung tanpa sambungan.
 * Jeda antar chip pakai padding (bukan gap) biar hitungan 50%-nya pas.
 */
function Marquee({ items, reverse = false }: { items: Skill[]; reverse?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current!;
        const tween = gsap.fromTo(
          "[data-marquee]",
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: items.length * 3.2, ease: "none", repeat: -1 }
        );
        // Hover: melambat pelan, bukan berhenti mendadak.
        const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6, ease: "power2.out" });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6, ease: "power2.in" });
        root.addEventListener("mouseenter", slow);
        root.addEventListener("mouseleave", resume);
        return () => {
          root.removeEventListener("mouseenter", slow);
          root.removeEventListener("mouseleave", resume);
        };
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="overflow-hidden py-1">
      <div data-marquee className="flex w-max">
        {[...items, ...items].map((item, i) => (
          <span key={i} data-dup={i >= items.length || undefined} aria-hidden={i >= items.length} className="pb-1.5 pr-3">
            <span className="chip !px-4 !py-2 text-sm">
              <item.icon aria-hidden="true" focusable="false" style={{ color: item.color }} className="text-base" />
              {item.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const { lang, t } = useLang();
  useReveal(rootRef);

  return (
    <section ref={rootRef} id="about" className="py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          index="01"
          eyebrow={t("About", "Tentang")}
          title={t("Systems that hold up on the factory floor.", "Sistem yang tetap andal di lantai produksi.")}
          subtitle={t(
            "I turn operational bottlenecks like legacy ERPs, manual warehouse tracking and spreadsheet reporting into software that stays reliable under real production load.",
            "Saya mengubah hambatan operasional seperti ERP lama, pencatatan gudang manual, dan laporan spreadsheet menjadi software yang tetap andal di bawah beban produksi nyata."
          )}
        />

        <div data-reveal className="card mb-5 p-7 sm:p-9">
          {lang === "id" ? (
            <p className="text-lg leading-[1.75]">
              Saya <strong>Full Stack Developer</strong> di PT Data Teknologi Terintegrasi, membangun{" "}
              <strong>VALAK CRM</strong>, platform konsultasi aktuaria dengan Laravel 12 dan React 19.
              Sebelumnya saya menghabiskan satu setengah tahun di <strong>Astra Otoparts Group</strong>{" "}
              mendigitalisasi gudang dan alur kerja maintenance di atas ERP Infor/Baan yang read-only:
              penyimpanan lantai FIFO, visualisasi rak, Smart Andon, dan migrasi Oracle ke PostgreSQL
              secara live tanpa downtime.
            </p>
          ) : (
            <p className="text-lg leading-[1.75]">
              I&apos;m a <strong>Full Stack Developer</strong> at PT Data Teknologi Terintegrasi, building{" "}
              <strong>VALAK CRM</strong>, an actuarial consulting platform on Laravel 12 and React 19. Before
              that I spent a year and a half inside <strong>Astra Otoparts Group</strong> digitalizing
              warehouses and maintenance workflows on top of a read-only Infor/Baan ERP: FIFO floor storage,
              rack visualization, Smart Andon, and a live Oracle-to-PostgreSQL migration with zero downtime.
            </p>
          )}
          <p className="divider mt-6 border-t pt-5 text-sm text-muted">
            {t("Open to Full Stack & Backend roles", "Terbuka untuk posisi Full Stack & Backend")} · Jakarta, Indonesia (WIB)
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.value} data-reveal className="card card-hover p-5">
              <div className="heading text-3xl tabular-nums">{stat.value}</div>
              <div className="mt-1.5 text-sm font-medium">{t(...stat.label)}</div>
              <div className="mt-0.5 text-xs text-muted">{t(...stat.note)}</div>
            </div>
          ))}
        </div>

        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {achievements.map((a) => {
            const body = (
              <>
                <a.icon size={20} className="mb-3" />
                <p className="heading text-base leading-snug">{t(...a.title)}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  {t(...a.note)} {a.href && <ArrowUpRight size={12} />}
                </p>
              </>
            );
            return a.href ? (
              <a key={a.title[0]} data-reveal href={a.href} target="_blank" rel="noopener noreferrer" className="card card-hover block p-5">
                {body}
              </a>
            ) : (
              <div key={a.title[0]} data-reveal className="card p-5">{body}</div>
            );
          })}
        </div>

        <div data-reveal className="card space-y-5 overflow-hidden p-6">
          <p className="label">{t("Skill highlights", "Sorotan skill")}</p>
          {stack.map((group, i) => (
            <div key={group.group}>
              <p className="mb-2 text-xs font-medium text-muted">{group.group}</p>
              <Marquee items={group.items} reverse={i % 2 === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
