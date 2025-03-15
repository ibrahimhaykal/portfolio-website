"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.4
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleDownloadCV = () => {
    // Ganti path ini sesuai dengan lokasi file CV Anda
    const cvPath = '/cv/ibrahim-haykal-cv.pdf';
    
    // Buat element anchor temporary
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Ibrahim-Haykal-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="pt-32 pb-16 px-4 overflow-hidden dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <motion.div
            className="relative group order-1 md:order-none"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full blur-md opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="relative w-64 h-64 md:w-96 md:h-96 bg-sky-500 rounded-full mx-auto overflow-hidden z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/profile/profile-pic.png"
                alt="Profile"
                layout="fill"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="space-y-6 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.p
                className="text-sky-500 font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Welcome to my portfolio website
              </motion.p>
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300"
                variants={itemVariants}
              >
                Hi, I&apos;m{" "}
                <motion.span
                  className="text-sky-500"
                  animate={{
                    color: ["#0ea5e9", "#3b82f6", "#0ea5e9"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Ibrahim Haykal
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300"
                variants={itemVariants}
              >
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
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start space-x-4"
              variants={containerVariants}
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-sky-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
                onClick={() => router.push('/contact')}
              >
                <Mail size={20} />
                <span>Contact Me</span>
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="border border-sky-500 text-sky-500 px-6 py-3 rounded-lg flex items-center space-x-2 dark:hover:bg-sky-900/20 transition-colors duration-300"
                onClick={handleDownloadCV}
              >
                <Download size={20} />
                <span>Download CV</span>
              </motion.button>
            </motion.div>
            {/* Social Links */}
            <motion.div
              className="flex justify-center md:justify-start space-x-4 pt-4"
              variants={containerVariants}
            >
              {[
                { icon: Github, link: "https://github.com/ibrahimhaykal", target: "_blank", rel: "noopener noreferrer" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/ibrahimhaykalalatas/", target: "_blank", rel: "noopener noreferrer" },
                { icon: Mail, link: "#", target: "_blank", rel: "noopener noreferrer" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.target}
                  rel={item.rel}
                  className="text-gray-600 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition-colors duration-300"
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <item.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}