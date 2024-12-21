import Navbar from "../../components/Navbar";
import Contact from "../../components/sections/Contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Contact />
      </div>
      <footer className="bg-sky-800 text-gray-300 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-sm">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://portfolio-website-ibrahim-haykal.vercel.app/"
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