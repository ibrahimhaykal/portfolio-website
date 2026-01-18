import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ibrahim Haykal Alatas | Full Stack Developer",
  description: "Final-Year Information System Student & Full Stack Developer at Astra Otoparts Group. Specializing in automated systems, database architecture, and scalable solutions.",
  keywords: "Ibrahim Haykal, Full Stack Developer, Laravel, Next.js, PostgreSQL, Oracle, System Architecture",
  authors: [{ name: "Ibrahim Haykal Alatas" }],
  openGraph: {
    title: "Ibrahim Haykal Alatas | Full Stack Developer",
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
  // Data JSON-LD untuk AI
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
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Astra Otoparts Group"
    },
    "description": "Final-year Information System student and Full Stack Developer specializing in ERP synchronizations and database migrations."
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-black antialiased`}>
        {children}
        
        {/* JSON-LD Script ditaruh disini */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}