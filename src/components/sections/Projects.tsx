"use client";
import { Code, ExternalLink, Github } from "lucide-react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // Set to false agar animasi berulang
      easing: 'ease-out',
      mirror: true, // Menambahkan mirror agar animasi berjalan saat scroll up
    });
  }, []);

  const projects = [
    {
      title: "Cargo Management System",
      description:
        "A system to manage and track cargo shipments efficiently On Herona Express, built using PHP, Bootstrap, and MySQL.",
      image: "/projects/cargo.png",
      tech: ["PHP", "Bootstrap", "MySQL"],
      githubUrl: "https://github.com/ibrahimhaykal/Manajemen-Pengiriman-Barang",
    },
    {
      title: "Scholarship Registration System",
      description:
        "A system for managing scholarship applications with user-friendly registration features.",
      image: "/projects/scholar.png",
      tech: ["PHP", "Bootstrap", "MySQL"],
      githubUrl: "https://github.com/ibrahimhaykal/Sistem-PendaftaranBeasiswa",
    },
    {
      title: "Company Profile Nirmala Technology",
      description:
        "A responsive Company Profile for Nirmala Technology With English Page And Indonesian Page, built with Tailwind CSS and Laravel.",
      image: "/projects/nirma.png",
      tech: ["Laravel", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
       {/* Enhanced Animated Header */}
       <div className="text-center mb-16">
          <div 
            data-aos="fade-down"
            data-aos-duration="800"
            className="relative inline-block"
          >
            <h2 className="flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              <span
                data-aos="zoom-in"
                data-aos-delay="400"
                className="bg-sky-100 rounded-full p-2 mr-3"
              >
                <Code className="text-sky-500" size={28} />
              </span>
              <span
                data-aos="fade-in"
                data-aos-delay="600"
                className="relative"
              >
                Projects
                <span 
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-sky-500/20"
                  data-aos="slide-right"
                  data-aos-delay="800"
                />
              </span>
            </h2>
            <p 
              className="text-gray-600 mt-4 max-w-lg mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Explore some of the key projects I've worked on.
            </p>
            {/* Decorative corners */}
            <div 
              className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-sky-500/20"
              data-aos="fade-down-right"
              data-aos-delay="1200"
            />
            <div 
              className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-sky-500/20"
              data-aos="fade-up-left"
              data-aos-delay="1200"
            />
          </div>
        </div>
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-anchor-placement="top-bottom" // Menambahkan anchor placement untuk kontrol yang lebih baik
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative group h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-sky-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.demoUrl}
                    className="p-2 bg-white rounded-full hover:scale-110 transition-transform duration-300"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5 text-sky-500" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-2 bg-white rounded-full hover:scale-110 transition-transform duration-300"
                    title="View Code"
                  >
                    <Github className="w-5 h-5 text-sky-500" />
                  </a>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}