import Navbar from "../../components/Navbar";
import About from "../../components/sections/About";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <About />
      </div>
    </main>
  );
}