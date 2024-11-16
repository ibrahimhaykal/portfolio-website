"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, Code, Coffee } from "lucide-react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaJava,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiFigma,
  SiCanva,
  SiLaravel,
  SiPhp,
  SiPython,
  SiStreamlit,
  SiTailwindcss,
  SiKotlin,
} from "react-icons/si";
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

  // Data for skills
  const skills = [
    {
      category: "Design Tools",
      items: [
        { name: "Figma", icon: "SiFigma" as IconKey},
        { name: "Canva", icon: "SiCanva" as IconKey},
      ],
    },
    {
      category: "Frontend Development",
      items: [
        { name: "HTML", icon: "FaHtml5" as IconKey },
        { name: "CSS", icon: "FaCss3Alt" as IconKey},
        { name: "JavaScript", icon: "FaJs"  as IconKey},
        { name: "React", icon: "FaReact" as IconKey},
        { name: "Tailwind", icon: "SiTailwindcss"as IconKey },
      ],
    },
    {
      category: "Backend Development",
      items: [
        { name: "Node.js", icon: "FaNode" as IconKey},
        { name: "Express.js", icon: "SiExpress" as IconKey},
        { name: "MongoDB", icon: "SiMongodb"as IconKey },
        { name: "Laravel", icon: "SiLaravel"as IconKey },
        { name: "PHP", icon: "SiPhp"as IconKey },
        { name: "Python", icon: "SiPython"as IconKey },
        { name: "Streamlit", icon: "SiStreamlit" as IconKey},
        { name: "Java", icon: "FaJava" as IconKey},
        { name: "Kotlin", icon: "SiKotlin" as IconKey},
      ],
    },
  ];

  const iconMap = {
    SiTailwindcss,
    SiFigma,
    SiCanva,
    SiLaravel,
    SiPhp,
    SiPython,
    SiStreamlit,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNode,
    SiExpress,
    SiMongodb,
    FaJava,
    SiKotlin,
  } as const;
  
  type IconKey = keyof typeof iconMap;
  
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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="space-y-6" data-aos="fade-right">
            <p className="text-gray-600 leading-relaxed">
              I am a final-year student with a strong passion for learning and adapting to the ever-evolving world of technology. I thrive in collaborative environments and take pride in being a team player who can contribute effectively to shared goals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With hands-on experience as a web developer, I have honed my skills in creating modern, responsive websites. However, I am constantly seeking opportunities to grow and enhance my abilities to deliver even better solutions. My commitment to personal and professional development drives me to stay updated with the latest technologies and industry best practices.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-6" data-aos="fade-up">
            {stats.map((stat, index) => {
              const { ref, inView } = useInView({ threshold: 0.5 });
              return (
                <div
                  key={index}
                  ref={ref}
                  className="p-6 bg-sky-50 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 shadow-sm"
                >
                  <stat.icon className="w-10 h-10 text-sky-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800">
                    {inView ? <CountUp start={0} end={stat.value} duration={2.5} /> : 0}+
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-16" data-aos="fade-up">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Skills & Technologies
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillSet, index) => (
              <div
                key={index}
                className="space-y-4 text-center"
                data-aos="zoom-in"
                data-aos-delay={`${index * 100}`}
              >
                <h4 className="text-sky-500 font-medium">{skillSet.category}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillSet.items.map((skill, skillIndex) => {
                    const Icon = iconMap[skill.icon];
                    return (
                      <span
                        key={skillIndex}
                        className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300"
                      >
                        {Icon && <Icon className="mr-2" />}
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
