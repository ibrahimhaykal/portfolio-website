"use client";
import Navbar from "../../components/Navbar";
import Contact from "../../components/sections/Contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="pt-16">
        <Contact />
      </div>
    </main>
  );
}