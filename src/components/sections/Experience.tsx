"use client";
import React from 'react';
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function Experience() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const underlineVariants = {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: { duration: 0.8, delay: 0.5 }
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="experience" className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Animated Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative inline-block">
            <h2 className="flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.2
                }}
                className="bg-sky-100 rounded-full p-2 mr-3"
              >
                <Briefcase className="text-sky-500" size={28} />
              </motion.span>
              <span className="relative">
                Experience Journey
                <motion.span 
                  className="absolute -bottom-2 left-0 h-0.5 bg-sky-500/20"
                  variants={underlineVariants}
                />
              </span>
            </h2>
            <motion.p 
              className="text-gray-600 mt-4 max-w-lg mx-auto"
              variants={fadeInUp}
            >
              My professional journey and educational background
            </motion.p>
            
            {/* Decorative corners with spring animation */}
            <motion.div 
              className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-sky-500/20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.5
              }}
            />
            <motion.div 
              className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-sky-500/20"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.5
              }}
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Work Experience */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <motion.h3 
              className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
              variants={itemVariants}
            >
              <span className="bg-sky-100 rounded-full p-1.5">
                <Briefcase className="text-sky-500" size={20} />
              </span>
              Work Experience
            </motion.h3>
            <motion.div 
              className="space-y-8"
              variants={staggerChildren}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="relative pl-6 border-l-2 border-sky-200 hover:border-sky-500 transition-all duration-300 p-4 rounded-lg hover:shadow-md bg-white"
                >
                  <motion.div 
                    className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-sky-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-800">{exp.title}</h4>
                    <div className="text-sky-500 font-medium">{exp.company}</div>
                    <div className="text-gray-600 text-sm">{exp.period}</div>
                    <motion.ul 
                      className="list-disc list-inside text-gray-600 space-y-2"
                      variants={staggerChildren}
                    >
                      {exp.description.map((item, i) => (
                        <motion.li 
                          key={i}
                          variants={itemVariants}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Education */}
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <motion.h3 
              className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
              variants={itemVariants}
            >
              <span className="bg-sky-100 rounded-full p-1.5">
                <GraduationCap className="text-sky-500" size={20} />
              </span>
              Education
            </motion.h3>
            <motion.div 
              className="space-y-8"
              variants={staggerChildren}
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="relative pl-6 border-l-2 border-sky-200 hover:border-sky-500 transition-all duration-300 p-4 rounded-lg hover:shadow-md bg-white"
                >
                  <motion.div 
                    className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-sky-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-800">{edu.degree}</h4>
                    <div className="text-sky-500 font-medium">{edu.school}</div>
                    <div className="text-gray-600 text-sm">{edu.period}</div>
                    <motion.p 
                      className="text-gray-600"
                      variants={fadeInUp}
                    >
                      {edu.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}