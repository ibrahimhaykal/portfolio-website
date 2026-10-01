"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ExternalLink, Github, X, ArrowUpRight, FileText, Plus, Minus } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TechChip from "../ui/TechChip";
import { gsap, useGSAP } from "../../lib/gsap";
import { useReveal } from "../../lib/reveal";
import { useLang, type Pair } from "../../lib/i18n";

type Category = "Web App" | "Mobile App" | "AI/ML";

type Project = {
  title: string;
  description: Pair;
  image: string;
  tech: string[];
  category: Category;
  portrait?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  /** Published paper or thesis backing the project. */
  paperUrl?: string;
};

const CATEGORY_LABEL: Record<string, Pair> = {
  All: ["All", "Semua"],
  "Web App": ["Web App", "Aplikasi Web"],
  "Mobile App": ["Mobile App", "Aplikasi Mobile"],
  "AI/ML": ["AI/ML", "AI/ML"],
};

const projects: Project[] = [
  {
    title: "VALAK CRM, Actuarial Consulting",
    description: [
      "Enterprise CRM for an actuarial consulting firm on Laravel 12, React 19, TypeScript, and MySQL. A 19-stage project board synced live over Pusher with optimistic drag-and-drop and rollback, 32 REST endpoints across 6 controllers, an Excel-driven configuration pipeline that rewrites cells in place while preserving multi-sheet structure, and role-based dashboards for 6 internal roles.",
      "CRM enterprise untuk firma konsultan aktuaria dengan Laravel 12, React 19, TypeScript, dan MySQL. Papan proyek 19 tahap yang tersinkron live lewat Pusher dengan drag-and-drop optimistis dan rollback, 32 endpoint REST di 6 controller, pipeline konfigurasi berbasis Excel yang menulis ulang sel di tempat tanpa merusak struktur multi-sheet, serta dashboard berbasis peran untuk 6 peran internal.",
    ],
    image: "/projects/crm.png",
    tech: ["Laravel", "React", "TypeScript", "MySQL", "Pusher", "Tailwind CSS"],
    category: "Web App",
  },
  {
    title: "Real-Time Warehouse Inventory",
    description: [
      "FIFO floor-storage monitoring for Astra Otoparts Group covering 48 material blocks and 400+ weekly transactions, with QR gate in/out, digital block visualization, and supply scheduling. Cut material search cycle time by 76.10% (103.00 → 24.62 minutes), validated by time study.",
      "Monitoring penyimpanan lantai FIFO untuk Astra Otoparts Group yang mencakup 48 blok material dan 400+ transaksi per minggu, dengan QR gate in/out, visualisasi blok digital, dan penjadwalan suplai. Memangkas waktu pencarian material 76,10% (103,00 → 24,62 menit), divalidasi lewat time study.",
    ],
    image: "/projects/warehouse.png",
    tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript"],
    paperUrl: "http://repository.stmi.ac.id/id/eprint/2840/",
    category: "Web App",
  },
  {
    title: "Smart Andon Ticketing System",
    description: [
      "Stateful digital ticketing that maps physical manufacturing workflows. QR validation, lifecycle tracking, technician activity monitoring, and Mean Time To Repair (MTTR) visibility for production issue handling.",
      "Tiket digital berbasis status yang memetakan alur kerja manufaktur fisik. Validasi QR, pelacakan siklus hidup, monitoring aktivitas teknisi, dan visibilitas Mean Time To Repair (MTTR) untuk penanganan masalah produksi.",
    ],
    image: "/projects/andon.png",
    tech: ["Laravel", "PostgreSQL", "Oracle", "JavaScript"],
    category: "Web App",
  },
  {
    title: "Mitsubishi Dealership Landing",
    description: [
      "Freelance corporate profile and lead-generation landing page for a Mitsubishi dealership. Interactive vehicle showcases using Swiper.js and direct WhatsApp routing to accelerate sales conversions.",
      "Landing page profil perusahaan dan lead generation (freelance) untuk dealer Mitsubishi. Showcase kendaraan interaktif dengan Swiper.js dan routing langsung ke WhatsApp untuk mempercepat konversi penjualan.",
    ],
    image: "/projects/mitsubishi.png",
    tech: ["Bootstrap", "JavaScript", "WhatsApp API"],
    demoUrl: "https://mitsubishidjakarta.com/",
    category: "Web App",
  },
  {
    title: "SME Digital Platform",
    description: [
      "National 2nd place hackathon platform for MSMEs (Jun 2025). Integrated a WhatsApp chatbot to streamline user engagement, digital marketing, and automated customer workflows.",
      "Platform juara 2 hackathon nasional untuk UMKM (Jun 2025). Mengintegrasikan chatbot WhatsApp untuk merapikan engagement pengguna, pemasaran digital, dan alur pelanggan otomatis.",
    ],
    image: "/projects/sme.png",
    tech: ["Laravel", "Tailwind CSS", "WhatsApp API"],
    category: "Web App",
  },
  {
    title: "SIPS Android Archiving",
    description: [
      "Full-stack archiving system built from a comparative study at BBSPJIKFK (Ministry of Industry). Architected with comprehensive UML and powered by a RESTful API.",
      "Sistem arsip full-stack hasil studi komparasi di BBSPJIKFK (Kementerian Perindustrian). Dirancang dengan UML lengkap dan didukung RESTful API.",
    ],
    image: "/projects/sips.png",
    tech: ["Kotlin", "Laravel", "MySQL", "REST API"],
    category: "Mobile App", portrait: true,
  },
  {
    title: "AI Defect Detection (Fender Apron)",
    description: [
      "End-to-end visual inspection pipeline for automotive parts (Dec 2024). Custom dataset annotation via Roboflow, YOLOv8 training, and a live real-time inference app on Streamlit and WebRTC for automated quality control.",
      "Pipeline inspeksi visual end-to-end untuk komponen otomotif (Des 2024). Anotasi dataset custom lewat Roboflow, training YOLOv8, dan aplikasi inferensi real-time di Streamlit dan WebRTC untuk quality control otomatis.",
    ],
    image: "/projects/fender-apron.png",
    tech: ["Python", "YOLOv8", "Roboflow", "Streamlit", "WebRTC"],
    demoUrl: "https://fender-apron-detection-systems.streamlit.app/",
    githubUrl: "https://github.com/ibrahimhaykal/Fender-Apron-Detection",
    category: "AI/ML",
  },
  {
    title: "Wedding Organizer Platform",
    description: [
      "Web platform managing venue operations, dynamic package pricing, and customer inquiries. Streamlines vendor and client communication and booking logistics.",
      "Platform web untuk operasional venue, harga paket dinamis, dan pertanyaan pelanggan. Merapikan komunikasi vendor dan klien serta logistik booking.",
    ],
    image: "/projects/wedding.png",
    tech: ["Laravel", "MySQL", "Bootstrap", "WhatsApp API"],
    demoUrl: "https://www.refnawedding.com/",
    category: "Web App",
  },
  {
    title: "Q-Tin Dashboard UI",
    description: [
      "Responsive UI components for a smart dashboard using DaisyUI and Flowbite, built as part of a bilingual corporate profile platform with cross-device consistency.",
      "Komponen UI responsif untuk dashboard pintar dengan DaisyUI dan Flowbite, bagian dari platform profil perusahaan dua bahasa dengan tampilan konsisten di semua perangkat.",
    ],
    image: "/projects/qtin.png",
    tech: ["Laravel", "Tailwind CSS", "DaisyUI", "Flowbite", "Figma"],
    category: "Web App",
  },
  {
    title: "Education Chat Bot",
    description: [
      "AI-powered learning assistant using deep learning NLP for intelligent, context-aware responses to student queries.",
      "Asisten belajar berbasis AI dengan NLP deep learning untuk jawaban yang cerdas dan sesuai konteks atas pertanyaan siswa.",
    ],
    image: "/projects/edubot.png",
    tech: ["Python", "TensorFlow", "NLTK", "Streamlit"],
    githubUrl: "https://github.com/ibrahimhaykal/chatbot-edu-bot",
    category: "AI/ML",
  },
  {
    title: "E-Brochure, Indomobil",
    description: [
      "Interactive digital automotive catalog with dynamic vehicle showcases, customizable color selections, and direct WhatsApp integration for sales lead generation.",
      "Katalog otomotif digital interaktif dengan showcase kendaraan dinamis, pilihan warna yang bisa diatur, dan integrasi WhatsApp langsung untuk lead penjualan.",
    ],
    image: "/projects/ebrosur.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "WhatsApp API"],
    demoUrl: "https://ridhoindomobil.vercel.app/",
    category: "Web App", portrait: true,
  },
  {
    title: "Portfolio Website",
    description: [
      "This site. Personal portfolio on Next.js and TypeScript with four switchable themes (mono, glass, neobrutalism, comic) and two languages, driven by plain CSS variables and GSAP.",
      "Situs ini. Portofolio pribadi dengan Next.js dan TypeScript, empat tema yang bisa diganti (mono, glass, neobrutalism, komik) dan dua bahasa, digerakkan CSS variable biasa dan GSAP.",
    ],
    image: "/projects/portfolio.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://ibrahimhaykal.my.id",
    githubUrl: "https://github.com/ibrahimhaykal/portfolio-website",
    category: "Web App",
  },
  {
    title: "Cargo Invoice System",
    description: [
      "Admin system for Herona Express optimizing logistics transactions and invoice generation, with master data management for regional shipment tracking.",
      "Sistem admin untuk Herona Express yang mengoptimalkan transaksi logistik dan pembuatan invoice, dengan manajemen master data untuk pelacakan pengiriman per wilayah.",
    ],
    image: "/projects/cargo.png",
    tech: ["PHP", "Bootstrap", "MySQL"],
    category: "Web App",
  },
];

// Kartu yang tampil di awal, dan tambahan tiap klik "Load more".
const PAGE = 6;
const STEP = 3;

function Shot({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes={sizes}
      className={project.portrait ? "object-contain p-3" : "object-cover object-top"}
    />
  );
}

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<Project | null>(null);

  // Ganti filter = kartu baru, jadi reveal dipasang ulang.
  useReveal(rootRef, [filter]);

  // Modal: latar memudar, panel naik, isinya menyusul satu per satu.
  useGSAP(
    () => {
      if (!selected) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-overlay]", { autoAlpha: 0, duration: 0.3 })
        .from("[data-panel]", { autoAlpha: 0, y: 40, scale: 0.97, duration: 0.55 }, "<")
        .from("[data-panel-item]", { autoAlpha: 0, y: 14, duration: 0.4, stagger: 0.05 }, "-=0.3");
    },
    { scope: modalRef, dependencies: [selected] }
  );

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const shown = filtered.slice(0, limit);
  const remaining = filtered.length - shown.length;
  const links = selected && [
    { href: selected.demoUrl, icon: ExternalLink, text: t("Live Demo", "Demo") },
    { href: selected.githubUrl, icon: Github, text: t("Source Code", "Kode Sumber") },
    { href: selected.paperUrl, icon: FileText, text: t("Thesis", "Skripsi") },
  ].filter((l) => l.href);

  return (
    <section ref={rootRef} id="projects" className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow={t("Selected Work", "Karya Pilihan")}
          title={t("Things I shipped.", "Yang sudah saya rilis.")}
          subtitle={t(
            "Enterprise platforms, manufacturing tooling, and client products. Most of them run in production right now.",
            "Platform enterprise, tools manufaktur, dan produk klien. Sebagian besar masih berjalan di produksi sampai sekarang."
          )}
        />

        <div data-reveal className="mb-8 flex flex-wrap gap-2">
          {Object.keys(CATEGORY_LABEL).map((cat) => (
            <button key={cat} onClick={() => { setFilter(cat); setLimit(PAGE); }} className={`btn !py-2 ${filter === cat ? "btn-primary" : ""}`}>
              {t(...CATEGORY_LABEL[cat])}
              <span className="font-mono text-[10px] opacity-60">
                {cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <button
              key={project.title}
              data-card
              onClick={() => setSelected(project)}
              className="card card-hover group flex flex-col overflow-hidden text-left"
            >
              <div className="divider relative h-44 w-full shrink-0 overflow-hidden border-b bg-fg/5">
                {/* Lebih tinggi dari bingkainya, jadi waktu parallax menggeser
                    gambar nggak ada celah kosong di atas/bawah. */}
                <div data-speed="12" className="absolute inset-x-0 -top-6 h-[calc(100%+3rem)]">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Shot project={project} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="label mb-2">{t(...CATEGORY_LABEL[project.category])}</p>
                <h3 className="heading mb-2 text-lg leading-snug">{project.title}</h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">{t(...project.description)}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold">
                  {t("Details", "Detail")}
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Load more: kartu baru otomatis kena reveal + parallax lewat
            MutationObserver di useReveal, jadi di sini cuma nambah limit. */}
        {filtered.length > PAGE && (
          <div className="mt-8 flex flex-col items-center gap-2">
            {remaining > 0 ? (
              <button onClick={() => setLimit(limit + STEP)} className="btn btn-primary">
                <Plus size={15} /> {t("Load more", "Muat lagi")}
                <span className="font-mono text-xs opacity-70">+{Math.min(STEP, remaining)}</span>
              </button>
            ) : (
              <button onClick={() => { setLimit(PAGE); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="btn">
                <Minus size={15} /> {t("Show less", "Tampilkan lebih sedikit")}
              </button>
            )}
            <p className="font-mono text-xs text-muted">
              {t(`${shown.length} of ${filtered.length} projects`, `${shown.length} dari ${filtered.length} proyek`)}
            </p>
          </div>
        )}

        <div data-reveal className="mt-10 text-center">
          <a href="https://github.com/ibrahimhaykal" target="_blank" rel="noopener noreferrer" className="btn">
            <Github size={15} /> {t("Full repository history on GitHub", "Riwayat repositori lengkap di GitHub")}
          </a>
        </div>
      </div>

      {/* Portal ke body: kolom konten punya stacking context sendiri (z-10),
          jadi modal di dalamnya bakal ketutup sidebar. */}
      {selected && createPortal(
        <div ref={modalRef} className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div data-overlay onClick={() => setSelected(null)} className="absolute inset-0 bg-black/60" />
          <div
            data-panel
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            className="card relative max-h-[88vh] w-full max-w-2xl overflow-y-auto !bg-[rgb(var(--bg))]"
          >
            <div className="divider relative h-64 border-b bg-fg/5">
              <Shot project={selected} sizes="(max-width: 768px) 100vw, 42rem" />
              <button onClick={() => setSelected(null)} aria-label="Close project details" className="btn-icon absolute right-3 top-3">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 sm:p-7">
              <p data-panel-item className="label mb-3">{t(...CATEGORY_LABEL[selected.category])}</p>
              <h3 data-panel-item className="heading mb-3 text-2xl">{selected.title}</h3>
              <p data-panel-item className="mb-6 text-sm leading-relaxed text-muted">{t(...selected.description)}</p>
              <div data-panel-item className="mb-6 flex flex-wrap gap-1.5">
                {selected.tech.map((tech) => <TechChip key={tech} name={tech} />)}
              </div>
              {links && links.length > 0 && (
                <div data-panel-item className="divider flex flex-wrap gap-3 border-t pt-5">
                  {links.map((l, i) => (
                    <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? "btn-primary" : ""}`}>
                      <l.icon size={14} /> {l.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
