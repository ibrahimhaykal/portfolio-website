"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";


export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false, // Ulangi animasi saat elemen kembali terlihat
      mirror: true, // Animasi juga aktif saat scroll ke atas
    });
  }, []);

  return (
    <section id="home" className="pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div
            className="relative group order-1 md:order-none"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full blur-md opacity-30 pointer-events-none"></div>
            <div className="relative w-64 h-64 md:w-96 md:h-96 bg-sky-500 rounded-full mx-auto overflow-hidden transition-transform duration-300 transform group-hover:scale-105 z-10">
              <Image
                src="/profile/profile-pic.png"
                alt="Profile"
                layout="fill" // Gambar akan sepenuhnya memenuhi kontainer
                className="object-cover"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-6 text-center md:text-left" data-aos="fade-up">
            <div className="space-y-2">
              <p className="text-sky-500 font-medium">
                Welcome to my portfolio website
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Hi, I'm <span className="text-sky-500">Ibrahim Haykal</span>
              </h1>
              <p className="text-xl text-gray-600">
                <Typewriter
                  words={[
                    "Web Developer",
                    "UI/UX Designer",
                    "Mobile Developer",
                    "IT Enthusiast",
                  ]}
                  loop={false}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-4">
              <button className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Mail size={20} />
                <span>Contact Me</span>
              </button>
              <button className="border border-sky-500 text-sky-500 px-6 py-3 rounded-lg hover:bg-sky-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Download size={20} />
                <span>Download CV</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-4 pt-4">
              {[
                { icon: Github, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Mail, link: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-gray-600 hover:text-sky-500 transition-colors duration-300 transform hover:scale-110"
                >
                  <item.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
