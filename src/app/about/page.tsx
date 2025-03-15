"use client";
import Navbar from "../../components/Navbar";
import About from "../../components/sections/About";

export default function AboutPage() {
  return (
    <main className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="pt-16">
        <About />
      </div>
    </main>
  );
}