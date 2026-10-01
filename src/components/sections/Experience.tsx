"use client";

import { useRef } from "react";
import { MapPin, GraduationCap, BadgeCheck, FileText, ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TechChip from "../ui/TechChip";
import { useReveal } from "../../lib/reveal";
import { useLang, type Pair } from "../../lib/i18n";

type Job = {
  role: Pair;
  company: Pair;
  period: Pair;
  location: string;
  /** Logo transparan di public/exp-logo, digambar pakai warna tinta tema. */
  logo: string;
  current?: boolean;
  metrics: Pair[];
  achievements: Pair[];
  tech: string[];
};

const same = (text: string): Pair => [text, text];

const experiences: Job[] = [
  {
    role: same("Full Stack Developer"),
    company: same("PT Data Teknologi Terintegrasi"),
    period: ["Jun 2026 - Present", "Jun 2026 - Sekarang"],
    location: "Jakarta, Indonesia",
    logo: "datapolis",
    current: true,
    metrics: [
      ["19-stage project board", "Papan proyek 19 tahap"],
      ["32 REST endpoints", "32 endpoint REST"],
      ["Real-time via Pusher", "Real-time lewat Pusher"],
      ["6 internal roles", "6 peran internal"],
    ],
    achievements: [
      [
        "Developing VALAK CRM, an actuarial consulting platform on Laravel 12, React 19, TypeScript, and MySQL, spanning authentication, master data, calculation, and reporting for 6 internal roles.",
        "Mengembangkan VALAK CRM, platform konsultasi aktuaria dengan Laravel 12, React 19, TypeScript, dan MySQL, mencakup autentikasi, master data, perhitungan, dan pelaporan untuk 6 peran internal.",
      ],
      [
        "Built a 19-stage project board with Pusher real-time sync and optimistic drag-and-drop with rollback, using in-flight move reconciliation to prevent stale-state overwrites under rapid updates.",
        "Membangun papan proyek 19 tahap dengan sinkronisasi real-time Pusher dan drag-and-drop optimistis dengan rollback, memakai rekonsiliasi perpindahan in-flight agar state lama tidak menimpa update yang datang cepat.",
      ],
      [
        "Delivered 32 REST endpoints across 6 controllers on a repository, service and handler structure, and resolved cross-layer defects in role-based board access.",
        "Menghadirkan 32 endpoint REST di 6 controller dengan struktur repository, service, dan handler, serta memperbaiki defect lintas layer pada akses papan berbasis peran.",
      ],
      [
        "Engineered an Excel-driven configuration pipeline: client-side parsing, header-driven editable previews, and in-place cell rewriting that preserves multi-sheet structure, relayed to a legacy calculation engine via machine-to-machine auth.",
        "Merancang pipeline konfigurasi berbasis Excel: parsing di sisi klien, preview yang bisa diedit berdasarkan header, dan penulisan ulang sel di tempat yang menjaga struktur multi-sheet, diteruskan ke engine perhitungan lama lewat autentikasi machine-to-machine.",
      ],
      [
        "Built role-based dashboards and todo workflows for all 6 roles with a shared typed chart library and Leaflet maps, plus AI summary insights scoped per project and aware of document versions.",
        "Membangun dashboard dan alur todo berbasis peran untuk ke-6 peran dengan library chart bertipe bersama dan peta Leaflet, plus ringkasan insight AI per proyek yang memahami versi dokumen.",
      ],
    ],
    tech: ["Laravel", "React", "TypeScript", "MySQL", "Pusher", "Tailwind CSS"],
  },
  {
    role: ["Full Stack Developer Intern", "Magang Full Stack Developer"],
    company: same("PT Gemala Kempa Daya, Astra Otoparts Group"),
    period: same("Feb 2025 - Jun 2026"),
    location: "Jakarta, Indonesia",
    logo: "gkd",
    metrics: [
      ["-76.10% search time", "-76,10% waktu pencarian"],
      ["48 material blocks", "48 blok material"],
      ["400+ weekly transactions", "400+ transaksi per minggu"],
      ["30K+ rows in ~9s", "30K+ baris dalam ~9 detik"],
    ],
    achievements: [
      [
        "Developed a FIFO floor-storage warehouse monitoring system covering 48 material blocks and 400+ weekly transactions with QR gate in/out, digital block visualization, and supply scheduling, cutting material search cycle time by 76.10% (103.00 → 24.62 minutes, validated by time study).",
        "Mengembangkan sistem monitoring gudang FIFO floor storage untuk 48 blok material dan 400+ transaksi per minggu dengan QR gate in/out, visualisasi blok digital, dan penjadwalan suplai, memangkas waktu pencarian material 76,10% (103,00 → 24,62 menit, divalidasi lewat time study).",
      ],
      [
        "Built a finished-goods visualization system for Giant Rack Plant 3, mapping 80+ rack columns across multi-layer, top, and side U-shape layouts with customer filtering, barcode scanning, and shipment status tracking.",
        "Membangun sistem visualisasi barang jadi untuk Giant Rack Plant 3, memetakan 80+ kolom rak di layout multi-layer, atas, dan U-shape samping dengan filter customer, scan barcode, dan pelacakan status pengiriman.",
      ],
      [
        "Shipped inventory aging and LMB reporting for accounting reconciliation: 30K+ row multi-sheet Excel exports in around 9 seconds, with drill-down from warehouse summary to transaction detail.",
        "Merilis laporan inventory aging dan LMB untuk rekonsiliasi akuntansi: ekspor Excel multi-sheet 30K+ baris dalam sekitar 9 detik, dengan drill-down dari ringkasan gudang sampai detail transaksi.",
      ],
      [
        "Designed Smart Andon maintenance monitoring with QR validation, lifecycle tracking, technician activity monitoring, and MTTR visibility.",
        "Merancang monitoring maintenance Smart Andon dengan validasi QR, pelacakan siklus hidup, monitoring aktivitas teknisi, dan visibilitas MTTR.",
      ],
      [
        "Built maintenance cost approval workflows spanning sparepart usage, COA classification, asset submission, and multi-level approval between Maintenance and Accounting.",
        "Membangun alur persetujuan biaya maintenance mulai dari pemakaian sparepart, klasifikasi COA, pengajuan aset, hingga approval bertingkat antara Maintenance dan Accounting.",
      ],
      [
        "Executed a phased Oracle-to-PostgreSQL migration for the Trucking Control System using an application-level dual-write strategy, with zero downtime during live production.",
        "Menjalankan migrasi bertahap Oracle ke PostgreSQL untuk Trucking Control System dengan strategi dual-write di level aplikasi, tanpa downtime selama produksi berjalan.",
      ],
    ],
    tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript", "Bootstrap"],
  },
  {
    role: same("Web Developer"),
    company: same("Nirmala Technology"),
    period: ["Aug 2024 - Jan 2025", "Agu 2024 - Jan 2025"],
    location: "Jakarta, Indonesia",
    logo: "nirmatech",
    metrics: [same("Midtrans webhooks"), ["Bilingual CMS", "CMS dua bahasa"]],
    achievements: [
      [
        "Built a QR-based restaurant ordering system with cart, checkout, order tracking, Midtrans payment webhook, and admin dashboard modules.",
        "Membangun sistem pemesanan restoran berbasis QR dengan modul keranjang, checkout, pelacakan pesanan, webhook pembayaran Midtrans, dan dashboard admin.",
      ],
      [
        "Developed coliving and cafe event booking with room/event availability, deposit payments via Midtrans, payment status polling, webhook handling, email notifications, and a role-based admin CMS.",
        "Mengembangkan booking coliving dan event kafe dengan ketersediaan kamar/event, pembayaran deposit via Midtrans, polling status pembayaran, penanganan webhook, notifikasi email, dan CMS admin berbasis peran.",
      ],
      [
        "Delivered a bilingual corporate profile platform on Laravel 11 and engineered responsive, component-based UI for the Q-Tin Dashboard using DaisyUI and Flowbite.",
        "Menghadirkan platform profil perusahaan dua bahasa dengan Laravel 11 dan membangun UI responsif berbasis komponen untuk Q-Tin Dashboard dengan DaisyUI dan Flowbite.",
      ],
    ],
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Figma"],
  },
  {
    role: ["Junior Web Developer, Scholarship Participant", "Junior Web Developer, Peserta Beasiswa"],
    company: ["Digital Talent Scholarship, Ministry of Communication & IT", "Digital Talent Scholarship, Kementerian Kominfo"],
    period: ["Jul 2023 - Oct 2023", "Jul 2023 - Okt 2023"],
    location: "Remote, Indonesia",
    logo: "digitalent",
    metrics: [["BNSP certified", "Bersertifikat BNSP"]],
    achievements: [
      [
        "Completed an intensive web development program focused on industry-standard engineering practices.",
        "Menyelesaikan program intensif pengembangan web yang berfokus pada praktik engineering standar industri.",
      ],
      [
        "Built a full-stack scholarship management platform with complete CRUD functionality using PHP and MySQL.",
        "Membangun platform manajemen beasiswa full-stack dengan fitur CRUD lengkap menggunakan PHP dan MySQL.",
      ],
    ],
    tech: ["PHP", "Bootstrap", "MySQL"],
  },
];

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  useReveal(rootRef);

  return (
    <section ref={rootRef} id="experience" className="py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          index="03"
          eyebrow={t("Experience", "Pengalaman")}
          title={t("Where the work happened.", "Jejak kerja saya.")}
          subtitle={t(
            "Production systems in manufacturing, consulting, and client delivery, measured by what changed on the floor, not by feature count.",
            "Sistem produksi di manufaktur, konsultan, dan proyek klien, diukur dari apa yang berubah di lapangan, bukan dari jumlah fitur."
          )}
        />

        <div className="space-y-5">
          {experiences.map((exp) => (
            <article key={exp.company[0]} data-reveal className="card p-6 sm:p-7">
              <div className="divider mb-5 flex items-center justify-between gap-4 border-b pb-5">
                <span
                  role="img"
                  aria-label={exp.company[0]}
                  className="logo-mark h-12 w-32"
                  style={{ "--logo": `url(/exp-logo/${exp.logo}.png)` } as React.CSSProperties}
                />
                <span className="flex flex-wrap items-center justify-end gap-2">
                  {exp.current && <span className="chip btn-primary !py-0.5">{t("Now", "Sekarang")}</span>}
                  <span className="label">{t(...exp.period)}</span>
                </span>
              </div>
              <h3 className="heading text-xl">{t(...exp.role)}</h3>
              <p className="mt-1 text-sm font-medium">{t(...exp.company)}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <MapPin size={13} /> {exp.location}
              </p>

              <div className="my-5 flex flex-wrap gap-1.5">
                {exp.metrics.map((m) => <span key={m[0]} className="chip font-mono">{t(...m)}</span>)}
              </div>

              <ul className="mb-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-fg">
                {exp.achievements.map((a) => <li key={a[0]}>{t(...a)}</li>)}
              </ul>

              <div className="divider flex flex-wrap gap-1.5 border-t pt-4">
                {exp.tech.map((tech) => <TechChip key={tech} name={tech} />)}
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="card mt-10 p-6 sm:p-8">
          <p className="label mb-6">{t("Education · Graduated", "Pendidikan · Lulus")}</p>
          <div className="flex items-start gap-4">
            <GraduationCap size={26} className="mt-0.5 shrink-0" />
            <div>
              <h3 className="heading text-xl">{t("Applied Bachelor of Computer Science", "Sarjana Terapan Ilmu Komputer")}</h3>
              <p className="mt-1 text-sm font-medium">{t("Industrial Automotive Information Systems", "Sistem Informasi Industri Otomotif")}</p>
              <p className="mt-1 text-sm text-muted">{t("Politeknik STMI Jakarta, Ministry of Industry", "Politeknik STMI Jakarta, Kementerian Perindustrian")}</p>
              <p className="mt-2 font-mono text-xs text-muted">Sep 2022 - Jul 2026 · {t("GPA 3.77 / 4.00", "IPK 3,77 / 4,00")}</p>
            </div>
          </div>

          <div className="divider mt-6 border-t pt-5">
            <p className="label mb-2">{t("Thesis", "Skripsi")}</p>
            <p className="text-sm leading-relaxed text-muted">
              {t(
                "Steel Sheet Monitoring Information System at PT Gemala Kempa Daya. Reduced warehouse material search and information retrieval time by 76.10% (103.00 → 24.62 minutes), validated via time study across 30 measurement cycles.",
                "Sistem Informasi Monitoring Steel Sheet di PT Gemala Kempa Daya. Memangkas waktu pencarian material dan informasi gudang 76,10% (103,00 → 24,62 menit), divalidasi lewat time study pada 30 siklus pengukuran."
              )}
            </p>
            <a
              href="http://repository.stmi.ac.id/id/eprint/2840/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
            >
              <FileText size={14} aria-hidden="true" /> {t("Read the full thesis on STMI Repository", "Baca skripsi lengkap di Repository STMI")}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <p className="divider mt-5 flex items-center gap-2.5 border-t pt-5 text-sm text-muted">
            <BadgeCheck size={18} className="shrink-0 text-fg" />
            <span>
              <span className="font-medium text-fg">Database Administrator</span>,{" "}
              {t("BNSP National Professional Certification", "Sertifikasi Profesi Nasional BNSP")}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
