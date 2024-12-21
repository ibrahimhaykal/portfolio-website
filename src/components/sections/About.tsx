"use client";

import { User, Code, Coffee } from "lucide-react";
import { FaFigma, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaLaravel, FaDatabase, FaJava, FaPython } from "react-icons/fa";
import { SiTailwindcss, SiKotlin, SiStreamlit } from "react-icons/si";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref: refProjects, inView: inViewProjects } = useInView({ threshold: 0.5 });
  const { ref: refExperience, inView: inViewExperience } = useInView({ threshold: 0.5 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const slideIn = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const skillItem = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="relative inline-block">
            <motion.h2 
              className="flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-800 mb-3"
              variants={fadeIn}
            >
              <motion.span
                className="bg-sky-100 rounded-full p-2 mr-3"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <User className="text-sky-500" size={28} />
              </motion.span>
              <span className="relative">
                About Me
                <motion.span
                  className="absolute -bottom-2 left-0 h-0.5 bg-sky-500/20"
                  variants={slideIn}
                />
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-600 mt-4 max-w-lg mx-auto"
              variants={fadeIn}
            >
              Discover my journey and expertise as a developer.
            </motion.p>
            
            {/* Decorative corners */}
            <motion.div
              className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-sky-500/20"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-sky-500/20"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p 
              className="text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              I am a final-year student with a strong passion for learning and adapting to the
              ever-evolving world of technology. I thrive in collaborative environments and take
              pride in being a team player who can contribute effectively to shared goals.
            </motion.p>
            <motion.p 
              className="text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              With hands-on experience as a web developer, I have honed my skills in creating
              modern, responsive websites. However, I am constantly seeking opportunities to grow
              and enhance my abilities to deliver even better solutions. My commitment to personal
              and professional development drives me to stay updated with the latest technologies
              and industry best practices.
            </motion.p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Stat 1: Projects */}
            <motion.div
              ref={refProjects}
              className="p-6 bg-sky-50 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 shadow-sm"
              variants={skillItem}
              whileHover={{ scale: 1.05 }}
            >
              <Code className="w-10 h-10 text-sky-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">
                {inViewProjects ? <CountUp start={0} end={50} duration={2.5} /> : 0}+
              </h3>
              <p className="text-gray-600 text-sm mt-2">Projects</p>
            </motion.div>

            {/* Stat 2: Years of Experience */}
            <motion.div
              ref={refExperience}
              className="p-6 bg-sky-50 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 shadow-sm"
              variants={skillItem}
              whileHover={{ scale: 1.05 }}
            >
              <Coffee className="w-10 h-10 text-sky-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">
                {inViewExperience ? <CountUp start={0} end={1} duration={2.5} /> : 0}+
              </h3>
              <p className="text-gray-600 text-sm mt-2">Years Experience</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div 
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h3 
            className="text-xl font-semibold text-gray-800 mb-6 text-center"
            variants={fadeIn}
          >
            Skills & Technologies
          </motion.h3>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* Skill Category 1 */}
            <motion.div 
              className="space-y-4 text-center"
              variants={fadeIn}
            >
              <h4 className="text-sky-500 font-medium flex items-center justify-center gap-2">
                <FaFigma size={20} className="text-sky-500" /> Design Tools
              </h4>
              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                variants={staggerContainer}
              >
                <motion.span 
                  className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm gap-1"
                  variants={skillItem}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaFigma size={16} /> Figma
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Skill Category 2 */}
            <motion.div 
              className="space-y-4 text-center"
              variants={fadeIn}
            >
              <h4 className="text-sky-500 font-medium flex items-center justify-center gap-2">
                <FaHtml5 size={20} className="text-sky-500" /> Frontend Development
              </h4>
              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                variants={staggerContainer}
              >
                {[
                  { icon: FaHtml5, name: "HTML" },
                  { icon: FaCss3Alt, name: "CSS" },
                  { icon: FaJs, name: "JavaScript" },
                  { icon: FaReact, name: "React" },
                  { icon: SiTailwindcss, name: "Tailwind" },
                ].map((skill, index) => (
                  <motion.span
                    key={index}
                    className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm gap-1"
                    variants={skillItem}
                    whileHover={{ scale: 1.1 }}
                  >
                    <skill.icon size={16} /> {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Skill Category 3 */}
            <motion.div 
              className="space-y-4 text-center"
              variants={fadeIn}
            >
              <h4 className="text-sky-500 font-medium flex items-center justify-center gap-2">
                <FaNodeJs size={20} className="text-sky-500" /> Backend Development
              </h4>
              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                variants={staggerContainer}
              >
                {[
                  { icon: FaNodeJs, name: "Node.js" },
                  { icon: FaLaravel, name: "Laravel" },
                  { icon: FaDatabase, name: "MySQL" },
                  { icon: SiKotlin, name: "Kotlin" },
                  { icon: FaJava, name: "Java" },
                  { icon: FaPython, name: "Python" },
                  { icon: SiStreamlit, name: "Streamlit" },
                ].map((skill, index) => (
                  <motion.span
                    key={index}
                    className="flex items-center bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-sm gap-1"
                    variants={skillItem}
                    whileHover={{ scale: 1.1 }}
                  >
                    <skill.icon size={16} /> {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}