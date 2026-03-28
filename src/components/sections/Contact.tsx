"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── Variants (outside component — stable reference) ──────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Info cards column — stagger children
const infoColumnVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const infoCardVariants = {
  hidden: { opacity: 0, x: -24, scale: 0.98 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Social icons inside Socials card — stagger
const socialsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const socialItem = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Form panel
const formVariants = {
  hidden: { opacity: 0, x: 24, scale: 0.98 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Success banner
const successVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: formData.user_name,
          user_email: formData.user_email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setFormData({ user_name: "", user_email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const socials = [
    { icon: Github,   link: "https://github.com/ibrahimhaykal" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/ibrahimhaykalalatas/" },
    { icon: Mail,     link: "mailto:ibrahimhaykal@gmail.com" },
  ];

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header — standalone, reverses on scroll */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Let&apos;s discuss your operational challenges or next digital project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Info Cards — staggered slide-in from left */}
          <motion.div
            variants={infoColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4"
          >
            {/* Email */}
            <motion.div
              variants={infoCardVariants}
              whileHover={{ x: 4, transition: { duration: 0.2, delay: 0 } }}
              className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-xl p-5 border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-colors duration-300 group cursor-default"
            >
              <Mail className="text-sky-500 dark:text-sky-400 mb-2 group-hover:scale-110 transition-transform" size={20} />
              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-1 uppercase tracking-wide">Email</div>
              <a href="mailto:ibrahimhaykal@gmail.com" className="text-gray-900 dark:text-white text-sm font-medium hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                ibrahimhaykal@gmail.com
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              variants={infoCardVariants}
              whileHover={{ x: 4, transition: { duration: 0.2, delay: 0 } }}
              className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-xl p-5 border border-gray-200/50 dark:border-white/5 hover:border-green-500/30 transition-colors duration-300 group cursor-default"
            >
              <MessageCircle className="text-green-500 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform" size={20} />
              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-1 uppercase tracking-wide">WhatsApp</div>
              <a href="https://wa.me/6289628066432" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-white text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                +62 896 2806 6432
              </a>
            </motion.div>

            {/* Location */}
            <motion.div
              variants={infoCardVariants}
              whileHover={{ x: 4, transition: { duration: 0.2, delay: 0 } }}
              className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-xl p-5 border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-colors duration-300 group cursor-default"
            >
              <MapPin className="text-sky-500 dark:text-sky-400 mb-2 group-hover:scale-110 transition-transform" size={20} />
              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-1 uppercase tracking-wide">Location</div>
              <div className="text-gray-900 dark:text-white text-sm font-medium">Jakarta, Indonesia</div>
            </motion.div>

            {/* Socials — icons stagger inside card */}
            <motion.div
              variants={infoCardVariants}
              className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-xl p-5 border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 transition-colors duration-300"
            >
              <div className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-3 uppercase tracking-wide">Connect</div>
              <motion.div
                className="flex gap-3"
                variants={socialsContainer}
                // inherits initial/whileInView from parent infoColumnVariants
              >
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialItem}
                    whileHover={{ scale: 1.15, transition: { duration: 0.15, delay: 0 } }}
                    whileTap={{ scale: 0.9, transition: { duration: 0.1, delay: 0 } }}
                    className="p-2.5 bg-white/50 dark:bg-white/5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors duration-300"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Form — slide in from right */}
          <motion.form
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 dark:border-white/5 shadow-sm"
          >
            {status === "success" && (
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-2"
              >
                <span>🎉</span> Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="user_name" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">NAME</label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200/50 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">EMAIL</label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200/50 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or system requirements..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200/50 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02, transition: { duration: 0.18, delay: 0 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1, delay: 0 } }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg shadow-gray-900/10 dark:shadow-white/10"
              >
                {status === "sending" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}