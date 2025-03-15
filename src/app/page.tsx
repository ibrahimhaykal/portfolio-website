"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="flex-grow">
        <Hero />
      </div>
    </main>
  );
}