"use client";
import Navbar from "../../components/Navbar";
import Experience from "../../components/sections/Experience";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="pt-16">
        <Experience />
      </div>
    </main>
  );
}