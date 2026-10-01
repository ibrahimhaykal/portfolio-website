import Sidebar from "../components/Sidebar";
import Backdrop from "../components/Backdrop";
import SmoothScroll from "../components/SmoothScroll";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import AskMe from "../components/AskMe";
import WebMCP from "../components/WebMCP";
import { LangProvider } from "../lib/i18n";

export default function Home() {
  return (
    <LangProvider>
    <main className="relative min-h-screen">
      <Backdrop />

      {/* Tool surface buat AI agent (WebMCP), nggak render apa-apa */}
      <WebMCP />
      <Sidebar />
      <ScrollToTop />
      <AskMe />

      <SmoothScroll>
      <div data-fade className="relative z-10 lg:ml-80 lg:pr-6">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
      </SmoothScroll>
    </main>
    </LangProvider>
  );
}
