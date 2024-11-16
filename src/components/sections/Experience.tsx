"use client";
import React, { useEffect } from 'react';
import { Briefcase, GraduationCap } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";

export default function Experience() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-out',
      mirror: true,
    });
  }, []);

  const experiences = [
    {
      title: "Web Developer",
      company: "Nirmala Technology",
      period: "2024 - Present",
      description: [
        "Developing and maintaining company websites and web applications",
        "Implementing responsive design and ensuring cross-browser compatibility",
        "Collaborating with all teams on projects",
      ],
    },
  ];

  const education = [
    {
      degree: "Information System",
      school: "Polytechnic STMI Jakarta",
      period: "2022 - 2026 (Expected)",
      description: "Specialized in web development and information systems management",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-white">
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
                <Briefcase className="text-sky-500" size={28} />
              </span>
              <span
                data-aos="fade-in"
                data-aos-delay="600"
                className="relative"
              >
                Experience Journey
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
              My professional journey and educational background
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

        <div className="grid md:grid-cols-2 gap-12">
          {/* Work Experience */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
                data-aos="fade-in"
                data-aos-delay="400">
              <span className="bg-sky-100 rounded-full p-1.5">
                <Briefcase className="text-sky-500" size={20} />
              </span>
              Work Experience
            </h3>
            <div className="space-y-8" data-aos="fade-up"data-aos-delay="100">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                  className="relative pl-6 border-l-2 border-sky-200 hover:border-sky-500 transition-all duration-300 p-4 rounded-lg hover:shadow-md bg-white"
                >
                  <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-sky-500 transition-all duration-300" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-800">{exp.title}</h4>
                    <div className="text-sky-500 font-medium">{exp.company}</div>
                    <div className="text-gray-600 text-sm">{exp.period}</div>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {exp.description.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
                data-aos="fade-in"
                data-aos-delay="400">
              <span className="bg-sky-100 rounded-full p-1.5">
                <GraduationCap className="text-sky-500" size={20} />
              </span>
              Education
            </h3>
            <div className="space-y-8"data-aos="fade-up"data-aos-delay="100">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + (index * 0.2) }}
                  className="relative pl-6 border-l-2 border-sky-200 hover:border-sky-500 transition-all duration-300 p-4 rounded-lg hover:shadow-md bg-white"
                >
                  <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-sky-500 transition-all duration-300" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-800">{edu.degree}</h4>
                    <div className="text-sky-500 font-medium">{edu.school}</div>
                    <div className="text-gray-600 text-sm">{edu.period}</div>
                    <motion.p 
                      className="text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 }}
                    >
                      {edu.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}