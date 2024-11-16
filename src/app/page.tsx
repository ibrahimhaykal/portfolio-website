import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";


import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <footer className="bg-sky-800 text-gray-300 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          {/* Portfolio Link */}
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:underline"
            >
              Ibrahim Haykal Alatas
            </a>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
