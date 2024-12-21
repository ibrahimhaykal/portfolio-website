import Navbar from "../../components/Navbar";
import Experience from "../../components/sections/Experience";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Experience />
      </div>
    </main>
  );
}