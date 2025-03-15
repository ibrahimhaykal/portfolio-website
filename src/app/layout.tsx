// src/app/layout.tsx
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ibrahim Haykal's Portfolio Website",
  description: "Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-sky-50`}>{children}
      <Footer />
      </body>
    </html>
  );
}