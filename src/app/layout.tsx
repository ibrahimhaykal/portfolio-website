import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Ibrahim Haykal Alatas | System Engineer",
  description: "System Engineer & Full Stack Developer at Astra Otoparts Group. Specializing in automated internal systems, database architecture, ERP integrations, and scalable solutions.",
  keywords: "Ibrahim Haykal, System Engineer, Full Stack Developer, Laravel, Next.js, PostgreSQL, Oracle, System Architecture, ERP",
  authors: [{ name: "Ibrahim Haykal Alatas" }],
  icons: {
    icon: '/profile/profile-sidebar.png',
    apple: '/profile/profile-sidebar.png',
  },
  openGraph: {
    title: "Ibrahim Haykal Alatas | System Engineer",
    description: "Building automated systems and scalable solutions at Astra Otoparts Group",
    type: "website",
    url: "https://ibrahim-haykal.vercel.app", 
    siteName: "Ibrahim Haykal Portfolio",
    images: [
      {
        url: "https://ibrahim-haykal.vercel.app/profile/profile-img.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  verification: {
    google: "XRUfFFn_9k2Sdaa3CbncXhqLluXqD879X2rVjRnwih0", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ibrahim Haykal Alatas",
    "url": "https://ibrahim-haykal.vercel.app",
    "image": "https://ibrahim-haykal.vercel.app/profile/profile-img.png",
    "sameAs": [
      "https://github.com/ibrahimhaykal",
      "https://www.linkedin.com/in/ibrahimhaykalalatas/",
      "mailto:ibrahimhaykal@gmail.com"
    ],
    "jobTitle": "System Engineer | Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Astra Otoparts Group"
    },
    "description": "Information System student and System Engineer specializing in enterprise architectures, ERP synchronizations, and zero-downtime database migrations."
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`
          ${jetbrainsMono.className} 
          antialiased
          bg-white 
          /* Base: Hitam Pekat */
          dark:bg-black
          dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.50),rgba(255,255,255,0))]
          selection:bg-cyan-500/30
          selection:text-cyan-100
        `}
      >
        {children}
        
        {/* JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}