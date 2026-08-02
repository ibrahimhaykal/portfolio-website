import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "../lib/site";
import "../styles/globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const ogImage = `${SITE_URL}/profile/profile-img.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Ibrahim Haykal Alatas",
    "Full Stack Developer Jakarta",
    "Laravel Developer Indonesia",
    "React Developer Indonesia",
    "CRM Developer",
    "ERP Integration",
    "Warehouse Management System",
    "Oracle to PostgreSQL migration",
    "Next.js",
    "TypeScript",
    "Politeknik STMI Jakarta",
  ],
  authors: [{ name: "Ibrahim Haykal Alatas", url: SITE_URL }],
  creator: "Ibrahim Haykal Alatas",
  publisher: "Ibrahim Haykal Alatas",
  // Canonical selalu ke domain utama, walaupun halaman diakses dari mirror vercel.app
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: '/profile/profile-sidebar.png',
    apple: '/profile/profile-sidebar.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "profile",
    url: SITE_URL,
    siteName: `${SITE_NAME} Portfolio`,
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Ibrahim Haykal Alatas — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [ogImage],
  },
  category: "technology",
  verification: {
    google: "XRUfFFn_9k2Sdaa3CbncXhqLluXqD879X2rVjRnwih0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Satu @graph biar mesin AI bisa nyambungin Person ↔ WebSite ↔ ProfilePage ↔ karya.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Ibrahim Haykal Alatas",
        "givenName": "Ibrahim Haykal",
        "familyName": "Alatas",
        "url": SITE_URL,
        "image": `${SITE_URL}/profile/profile-img.png`,
        "email": "mailto:ibrahimhaykal@gmail.com",
        "telephone": "+62-896-2806-6432",
        "jobTitle": "Full Stack Developer",
        "description": SITE_DESCRIPTION,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jakarta",
          "addressCountry": "ID"
        },
        "sameAs": [
          "https://github.com/ibrahimhaykal",
          "https://www.linkedin.com/in/ibrahimhaykalalatas/"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "PT Data Teknologi Terintegrasi",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jakarta",
            "addressCountry": "ID"
          }
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Politeknik STMI Jakarta, Ministry of Industry",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jakarta",
            "addressCountry": "ID"
          }
        },
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Applied Bachelor of Computer Science (S.Tr.Kom) — Industrial Automotive Information Systems",
            "credentialCategory": "degree",
            "educationalLevel": "Bachelor",
            "recognizedBy": {
              "@type": "CollegeOrUniversity",
              "name": "Politeknik STMI Jakarta, Ministry of Industry"
            }
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Database Administrator",
            "credentialCategory": "certification",
            "recognizedBy": {
              "@type": "Organization",
              "name": "BNSP — Badan Nasional Sertifikasi Profesi"
            }
          }
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Full Stack Developer",
          "occupationLocation": {
            "@type": "City",
            "name": "Jakarta"
          },
          "skills": "Laravel, PHP, React, Next.js, TypeScript, PostgreSQL, Oracle PL/SQL, REST API design, role-based access control, ERP integration, database migration"
        },
        "award": "2nd Place — National Hackathon 2025, SME Digital Platform",
        "knowsLanguage": ["id", "en"],
        "knowsAbout": [
          "Full Stack Web Development",
          "Laravel",
          "React",
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Oracle PL/SQL",
          "REST API Design",
          "CRM Systems",
          "ERP Integration",
          "Warehouse Management Systems",
          "Manufacturing Information Systems",
          "Database Migration",
          "AI API Integration"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": `${SITE_NAME} Portfolio`,
        "description": SITE_DESCRIPTION,
        "inLanguage": "en",
        "publisher": { "@id": `${SITE_URL}/#person` }
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        "url": SITE_URL,
        "name": SITE_TITLE,
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "about": { "@id": `${SITE_URL}/#person` },
        "mainEntity": { "@id": `${SITE_URL}/#person` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/profile/profile-img.png`
        },
        "inLanguage": "en"
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects`,
        "name": "Selected work by Ibrahim Haykal Alatas",
        "itemListOrder": "https://schema.org/ItemListOrderDescending",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "VALAK CRM — Actuarial Consulting Platform",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Enterprise CRM for an actuarial consulting firm built with Laravel 12 and React 19, covering role-based dashboards, calculation submission and progress tracking, a revision-note chatroom for report review, and AI-powered summary insights.",
              "author": { "@id": `${SITE_URL}/#person` }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "FIFO Warehouse Monitoring System",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Floor-storage warehouse monitoring for PT Gemala Kempa Daya (Astra Otoparts Group) covering 48 material blocks and 400+ weekly transactions with QR gate in/out and digital block visualization, reducing material search cycle time by 76.10% from 103.00 to 24.62 minutes.",
              "author": { "@id": `${SITE_URL}/#person` }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "AI Defect Detection System",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "description": "End-to-end visual inspection pipeline for automotive parts using YOLOv8, Roboflow, Streamlit, and WebRTC for real-time quality control inference.",
              "url": "https://fender-apron-detection-systems.streamlit.app/",
              "author": { "@id": `${SITE_URL}/#person` }
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "SoftwareApplication",
              "name": "E-Brochure Digital Catalog — Indomobil",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Interactive digital automotive catalog built with Next.js and TypeScript, featuring dynamic vehicle showcases, customizable color selection, and WhatsApp lead generation.",
              "url": "https://ridhoindomobil.vercel.app/",
              "author": { "@id": `${SITE_URL}/#person` }
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* JSON-LD di <head> — crawler yang nggak eksekusi JS tetap kebaca */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`
          ${jakarta.variable}
          ${jetbrainsMono.variable}
          font-sans
          antialiased
          bg-white
          dark:bg-black
          dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_-25%,rgba(6,182,212,0.28),rgba(255,255,255,0))]
        `}
      >
        {children}
      </body>
    </html>
  );
}
