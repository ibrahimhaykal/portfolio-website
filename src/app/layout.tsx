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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-black antialiased`}>
        {children}
      </body>
    </html>
  );
}