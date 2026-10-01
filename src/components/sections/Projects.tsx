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
  /** Cerita singkat di modal: masalahnya, peranku, keputusan penting, hasilnya. */
  caseStudy?: { problem: Pair; role: Pair; decisions: Pair[]; result: Pair };
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
      "Internal CRM for an actuarial consulting firm that carries a PSAK 219 valuation from quotation to billing. I built the digital actuarial report module with multi-book projects and final report release, the 18-stage project board for 7 roles with realtime updates, and the bridge to the valuation app. React 19, TypeScript, and Laravel 12.",
      "CRM internal untuk kantor konsultan aktuaria yang membawa project valuasi PSAK 219 dari penawaran sampai penagihan. Saya membangun modul laporan aktuaria digital dengan dukungan multi-buku dan penerbitan laporan final, papan Project Management 18 stage untuk 7 peran dengan pembaruan realtime, serta jembatan ke aplikasi valuasi. React 19, TypeScript, dan Laravel 12.",
    ],
    image: "/projects/crm.png",
    tech: ["React", "TypeScript", "Laravel", "MySQL", "Vite", "React Query", "Tailwind CSS"],
    category: "Web App",
    caseStudy: {
      problem: [
        "One PSAK 219 employee-benefit valuation runs from quotation, employee data collection, and calculation in a separate valuation app, through draft report, sign-off, and printing, to billing. Seven roles touch it, and most of the flow was tracked by hand outside any system.",
        "Satu project valuasi imbalan kerja PSAK 219 berjalan dari penawaran, pengumpulan data karyawan, dan perhitungan di aplikasi valuasi terpisah, lewat draft laporan, pengesahan, dan cetak buku, sampai penagihan. Tujuh peran terlibat, dan sebagian besar alurnya dilacak manual di luar sistem.",
      ],
      role: [
        "Main frontend developer on the React app (625 commits), plus the Laravel endpoints those flows needed (116 commits), in a repo shared by several engineers. In daily use since the trial began in late September 2026.",
        "Peran utama di frontend React (625 commit), ditambah endpoint Laravel yang dibutuhkan alur itu (116 commit), di repo yang digarap banyak engineer. Dipakai setiap hari sejak fase trial akhir September 2026.",
      ],
      decisions: [
        [
          "The prototype kept board stages in each browser's localStorage because the endpoint did not exist yet. Once the backend was ready I moved them to the database, so two people can no longer see different stages for the same project and press actions that no longer apply.",
          "Prototipe menyimpan stage papan di localStorage tiap browser karena endpoint-nya belum ada. Begitu backend tersedia, saya pindahkan ke database, jadi dua orang tidak lagi melihat stage berbeda untuk project yang sama lalu menekan aksi yang sudah tidak berlaku.",
        ],
        [
          "Moved access rules to the backend and had the frontend read flags from it, so nobody sees a button the server will reject. One account went from seeing 22 other people's tasks to 0.",
          "Memindahkan aturan akses ke backend dan frontend cukup membaca flag darinya, jadi tidak ada lagi tombol yang akhirnya ditolak server. Satu akun yang tadinya melihat 22 tugas milik orang lain turun menjadi 0.",
        ],
        [
          "Treated accounts and sessions as a requirement, since the app holds client payroll and employee benefit liabilities. I built the account and security module on both sides: email and password changes hashed on the server (the prototype kept passwords in the browser), forced logout and state cleanup when a token is rejected, and per-account data cleared on logout for shared devices.",
          "Memperlakukan akun dan sesi sebagai syarat, karena aplikasinya menyimpan data gaji dan kewajiban imbalan kerja klien. Saya membangun modul akun dan keamanan di kedua sisi: ganti email dan sandi dengan hash di server (prototipe menyimpan sandi di browser), logout paksa dan pembersihan state saat token ditolak, serta data per akun dibersihkan saat logout untuk perangkat bersama.",
        ],
        [
          "Bridged the CRM to the valuation app through a backend relay: employee data, company regulations, configuration, and Tables 1 to 5 are checked for anomalies, sent, calculated, and tracked without leaving the CRM.",
          "Menjembatani CRM dengan aplikasi valuasi lewat relay backend: data karyawan, peraturan perusahaan, konfigurasi, dan Tabel 1 sampai 5 diperiksa anomalinya, dikirim, dihitung, dan dipantau tanpa keluar dari CRM.",
        ],
        [
          "Fixed what the trial exposed: a 1,664-company directory went from 17 chained requests to 1, CORS preflight is cached for 24 hours (half of a page's 66 requests were empty preflights), and filter options dropped from 930 ms to 205 ms.",
          "Membereskan temuan trial: direktori 1.664 perusahaan dari 17 request berantai menjadi 1, preflight CORS di-cache 24 jam (separuh dari 66 request satu halaman adalah preflight kosong), dan opsi filter turun dari 930 ms ke 205 ms.",
        ],
      ],
      result: [
        "The firm's main daily workflow: an 18-stage board for 7 roles, digital PSAK 219 reports with multi-book support, and a final report release that replaced a manual process.",
        "Alur kerja utama kantor setiap hari: papan 18 stage untuk 7 peran, laporan PSAK 219 digital dengan dukungan multi-buku, dan penerbitan laporan final yang menggantikan proses manual.",
      ],
    },
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
    caseStudy: {
      problem: [
        "Steel sheet material sat in 48 floor-storage blocks with 400+ transactions a week, tracked by hand on top of a read-only ERP. Finding one material took 103 minutes on average.",
        "Material steel sheet tersimpan di 48 blok lantai dengan 400+ transaksi per minggu, dicatat manual di atas ERP yang read-only. Mencari satu material rata-rata butuh 103 menit.",
      ],
      role: [
        "Full stack developer intern at PT Gemala Kempa Daya. The system is also the subject of my published thesis.",
        "Magang full stack developer di PT Gemala Kempa Daya. Sistem ini juga jadi topik skripsi saya yang sudah terbit.",
      ],
      decisions: [
        [
          "QR scanning at the gate, so every movement in or out is recorded the moment it happens instead of being typed in later.",
          "Scan QR di gate, jadi setiap material masuk atau keluar tercatat saat itu juga, bukan diketik belakangan.",
        ],
        [
          "A digital map of the blocks that mirrors the physical floor, so operators look a block up instead of walking the floor.",
          "Peta blok digital yang meniru lantai gudang aslinya, jadi operator cukup mencari di layar, bukan menyusuri gudang.",
        ],
        [
          "FIFO and supply scheduling enforced by the new system, since the Infor/Baan ERP was read-only and could not be changed.",
          "FIFO dan penjadwalan suplai dijalankan oleh sistem baru, karena ERP Infor/Baan read-only dan tidak bisa diubah.",
        ],
        [
          "Impact measured with a time study across 30 measurement cycles, not estimated.",
          "Dampaknya diukur lewat time study pada 30 siklus pengukuran, bukan perkiraan.",
        ],
      ],
      result: [
        "Material search time cut by 76.10%, from 103.00 to 24.62 minutes.",
        "Waktu pencarian material turun 76,10%, dari 103,00 menjadi 24,62 menit.",
      ],
    },
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
                <p className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="label">{t(...CATEGORY_LABEL[project.category])}</span>
                  {project.caseStudy && <span className="chip btn-primary !py-0.5">{t("Case study", "Studi kasus")}</span>}
                </p>
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
              {selected.caseStudy && (
                <div data-panel-item className="divider mb-6 space-y-5 border-t pt-5 text-sm leading-relaxed">
                  <div>
                    <p className="label mb-2">{t("The problem", "Masalahnya")}</p>
                    <p className="text-muted">{t(...selected.caseStudy.problem)}</p>
                  </div>
                  <div>
                    <p className="label mb-2">{t("My role", "Peran saya")}</p>
                    <p className="text-muted">{t(...selected.caseStudy.role)}</p>
                  </div>
                  <div>
                    <p className="label mb-2">{t("Key decisions", "Keputusan penting")}</p>
                    <ol className="list-decimal space-y-1.5 pl-5 text-muted marker:font-mono marker:text-fg">
                      {selected.caseStudy.decisions.map((d) => <li key={d[0]}>{t(...d)}</li>)}
                    </ol>
                  </div>
                  <div className="card p-4">
                    <p className="label mb-2">{t("Result", "Hasilnya")}</p>
                    <p className="font-semibold">{t(...selected.caseStudy.result)}</p>
                  </div>
                </div>
              )}
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
