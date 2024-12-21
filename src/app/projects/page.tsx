import Navbar from "../../components/Navbar";
import Projects from "../../components/sections/Projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Projects />
      </div>
    </main>
  );
}