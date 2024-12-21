import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <Hero />
      </div>
    </main>
  );
}