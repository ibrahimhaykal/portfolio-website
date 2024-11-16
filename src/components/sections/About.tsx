"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, Code, Coffee } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function About() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  // Data for statistics
  const stats = [
    { icon: Code, label: "Projects", value: 50 },
    { icon: Coffee, label: "Years Experience", value: 1 },
  ];

  // Create refs and inView for each statistic
  const { ref: refProjects, inView: inViewProjects } = useInView({ threshold: 0.5 });
  const { ref: refExperience, inView: inViewExperience } = useInView({ threshold: 0.5 });

  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
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
                <User className="text-sky-500" size={28} />
              </span>
              <span
                data-aos="fade-in"
                data-aos-delay="600"
                className="relative"
              >
                About Me
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
              Discover my journey and expertise as a developer.
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
        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed"data-aos="fade-up-left"
              data-aos-delay="500">
              I am a final-year student with a strong passion for learning and adapting to the ever-evolving world of technology. I thrive in collaborative environments and take pride in being a team player who can contribute effectively to shared goals.
            </p>
            <p className="text-gray-600 leading-relaxed"data-aos="fade-up-right"
              data-aos-delay="500">
              With hands-on experience as a web developer, I have honed my skills in creating modern, responsive websites. However, I am constantly seeking opportunities to grow and enhance my abilities to deliver even better solutions. My commitment to personal and professional development drives me to stay updated with the latest technologies and industry best practices.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-6"data-aos="fade-up"
              data-aos-delay="500">
            {/* Stat 1: Projects */}
            <div
              ref={refProjects}
              className="p-6 bg-sky-50 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 shadow-sm"
            >
              <Code className="w-10 h-10 text-sky-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">
                {inViewProjects ? <CountUp start={0} end={50} duration={2.5} /> : 0}+
              </h3>
              <p className="text-gray-600 text-sm mt-2">Projects</p>
            </div>

            {/* Stat 2: Years of Experience */}
            <div
              ref={refExperience}
              className="p-6 bg-sky-50 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 shadow-sm"
            >
              <Coffee className="w-10 h-10 text-sky-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">
                {inViewExperience ? <CountUp start={0} end={1} duration={2.5} /> : 0}+
              </h3>
              <p className="text-gray-600 text-sm mt-2">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center" data-aos="fade-up"
              data-aos-delay="500">
            Skills & Technologies
          </h3>
          <div className="grid md:grid-cols-3 gap-8"data-aos="fade-up-right"
              data-aos-delay="500">
            {/* Skill Category 1 */}
            <div className="space-y-4 text-center">
              <h4 className="text-sky-500 font-medium">Design Tools</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  Figma
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  Canva
                </span>
              </div>
            </div>

            {/* Skill Category 2 */}
            <div className="space-y-4 text-center">
              <h4 className="text-sky-500 font-medium">Frontend Development</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  HTML
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  CSS
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  JavaScript
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  React
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  Tailwind
                </span>
              </div>
            </div>

            {/* Skill Category 3 */}
            <div className="space-y-4 text-center">
              <h4 className="text-sky-500 font-medium">Backend Development</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  Node.js
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  Express.js
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  MongoDB
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  Laravel
                </span>
                <span className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300">
                  PHP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
