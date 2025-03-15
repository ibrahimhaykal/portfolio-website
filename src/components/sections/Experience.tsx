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

  // For the experiences section
  const experiences = [
    {
      title: "Web Developer",
      company: "Nirmala Technology",
      period: "2024 - Present",
      description: [
        "Building and maintaining modern company websites",
        "Creating responsive designs that work on all devices",
        "Working closely with teams to deliver great results",
      ],
    },
  ];

  // For the education section
  const education = [
    {
      degree: "Information System",
      school: "Polytechnic STMI Jakarta",
      period: "2022 - 2026 (Expected)",
      description: "Focusing on web development and digital systems management",
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
    <section id="experience" className="py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
      {/* Enhanced Animated Header */}
      <motion.div 
        className="text-center mb-12 sm:mb-16"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="relative inline-block px-6 sm:px-0">
          <h2 className="flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.2
              }}
              className="bg-sky-100 dark:bg-sky-900/30 rounded-full p-1 sm:p-2 mr-2 sm:mr-3 flex-shrink-0 transition-colors duration-300"
            >
              <Briefcase className="text-sky-500 dark:text-sky-400 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-colors duration-300" />
            </motion.span>
            <span className="relative">
              Experience Journey
              <motion.span 
                className="absolute -bottom-2 left-0 h-0.5 bg-sky-500/20 dark:bg-sky-400/20 transition-colors duration-300"
                variants={underlineVariants}
              />
            </span>
          </h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mt-3 sm:mt-4 max-w-xs sm:max-w-sm md:max-w-lg mx-auto text-sm sm:text-base transition-colors duration-300"
            variants={fadeInUp}
          >
            My professional path and learning journey
          </motion.p>
          
          {/* Decorative corners with spring animation */}
          <motion.div 
            className="absolute -top-3 sm:-top-4 md:-top-6 -left-3 sm:-left-4 md:-left-6 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-t-2 border-l-2 border-sky-500/20 dark:border-sky-400/20 transition-colors duration-300"
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
            className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 -right-3 sm:-right-4 md:-right-6 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border-b-2 border-r-2 border-sky-500/20 dark:border-sky-400/20 transition-colors duration-300"
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
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 transition-colors duration-300"
              variants={itemVariants}
            >
              <span className="bg-sky-100 dark:bg-sky-900/30 rounded-full p-1.5 transition-colors duration-300">
                <Briefcase className="text-sky-500 dark:text-sky-400 transition-colors duration-300" size={20} />
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
                  className="relative pl-6 border-l-2 border-sky-200 dark:border-sky-800 hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300 p-4 rounded-lg hover:shadow-md bg-white dark:bg-gray-800"
                >
                  <motion.div 
                    className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-sky-500 dark:bg-sky-400 transition-colors duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">{exp.title}</h4>
                    <div className="text-sky-500 dark:text-sky-400 font-medium transition-colors duration-300">{exp.company}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">{exp.period}</div>
                    <motion.ul 
                      className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 transition-colors duration-300"
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
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 transition-colors duration-300"
              variants={itemVariants}
            >
              <span className="bg-sky-100 dark:bg-sky-900/30 rounded-full p-1.5 transition-colors duration-300">
                <GraduationCap className="text-sky-500 dark:text-sky-400 transition-colors duration-300" size={20} />
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
                  className="relative pl-6 border-l-2 border-sky-200 dark:border-sky-800 hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300 p-4 rounded-lg hover:shadow-md bg-white dark:bg-gray-800"
                >
                  <motion.div 
                    className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-sky-500 dark:bg-sky-400 transition-colors duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">{edu.degree}</h4>
                    <div className="text-sky-500 dark:text-sky-400 font-medium transition-colors duration-300">{edu.school}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">{edu.period}</div>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 transition-colors duration-300"
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