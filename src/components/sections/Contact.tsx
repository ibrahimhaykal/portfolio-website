"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, MessageCircle, AlertCircle, Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "../ui/SectionHeading";
import { onSpotlightMove } from "../ui/spotlight";

// ─── Variants (outside component — stable reference) ──────────────────────────

// Info cards column — stagger children
const infoColumnVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const infoCardVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.98 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
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
  hidden: { opacity: 0, x: 20, scale: 0.98 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Status banner
const bannerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fieldClass =
  "w-full rounded-xl border border-black/[0.08] bg-white/60 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/15 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-gray-600 dark:focus:border-sky-400";

const labelClass =
  "mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500";

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
    { icon: Github,   link: "https://github.com/ibrahimhaykal",                 label: "Visit GitHub Profile" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/ibrahimhaykalalatas/", label: "Visit LinkedIn Profile" },
    { icon: Mail,     link: "mailto:ibrahimhaykal@gmail.com",                   label: "Send Email" },
  ];

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "ibrahimhaykal@gmail.com",
      href: "mailto:ibrahimhaykal@gmail.com",
      tone: "text-sky-500 dark:text-sky-400",
      hover: "hover:text-sky-600 dark:hover:text-sky-400",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+62 896 2806 6432",
      href: "https://wa.me/6289628066432",
      tone: "text-emerald-500 dark:text-emerald-400",
      hover: "hover:text-emerald-600 dark:hover:text-emerald-400",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        <SectionHeading
          index="04"
          eyebrow="Contact"
          title={<>Let&apos;s build something solid.</>}
          subtitle="Got an operational bottleneck, a legacy system that needs a modern front, or a role you think fits? Drop a line — I reply to everything."
        />

        <div className="grid gap-5 lg:grid-cols-5">

          {/* Info Cards — staggered slide-in from left */}
          <motion.div
            variants={infoColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-3 lg:col-span-2"
          >
            {channels.map((channel) => (
              <motion.div
                key={channel.label}
                variants={infoCardVariants}
                whileHover={{ x: 4, transition: { duration: 0.2, delay: 0 } }}
                onMouseMove={onSpotlightMove}
                className="surface surface-hover spotlight overflow-hidden p-5"
              >
                <channel.icon className={`${channel.tone} mb-3`} size={18} />
                <div className="eyebrow mb-1.5 text-gray-400 dark:text-gray-600">{channel.label}</div>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`text-sm font-medium text-gray-950 transition-colors dark:text-white ${channel.hover}`}
                >
                  {channel.value}
                </a>
              </motion.div>
            ))}

            {/* Location */}
            <motion.div
              variants={infoCardVariants}
              whileHover={{ x: 4, transition: { duration: 0.2, delay: 0 } }}
              onMouseMove={onSpotlightMove}
              className="surface surface-hover spotlight overflow-hidden p-5"
            >
              <MapPin className="mb-3 text-violet-500 dark:text-violet-400" size={18} />
              <div className="eyebrow mb-1.5 text-gray-400 dark:text-gray-600">Location</div>
              <div className="text-sm font-medium text-gray-950 dark:text-white">Jakarta, Indonesia</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-600">
                GMT+7 · open to remote
              </div>
            </motion.div>

            {/* Socials — icons stagger inside card */}
            <motion.div variants={infoCardVariants} className="surface p-5">
              <div className="eyebrow mb-3 text-gray-400 dark:text-gray-600">Connect</div>
              <motion.div
                className="flex gap-2"
                variants={socialsContainer}
                // inherits initial/whileInView from parent infoColumnVariants
              >
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    variants={socialItem}
                    whileHover={{ y: -3, transition: { duration: 0.15, delay: 0 } }}
                    whileTap={{ scale: 0.92, transition: { duration: 0.1, delay: 0 } }}
                    className="rounded-lg border border-black/[0.06] p-2.5 text-gray-600 transition-colors duration-300 hover:border-sky-500/30 hover:text-gray-950 dark:border-white/[0.07] dark:text-gray-400 dark:hover:text-white"
                  >
                    <social.icon size={17} />
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
            className="surface overflow-hidden p-6 sm:p-8 lg:col-span-3"
          >
            {status === "success" && (
              <motion.div
                variants={bannerVariants}
                initial="hidden"
                animate="visible"
                className="mb-6 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-600 dark:text-emerald-400"
              >
                <Check size={16} />
                Message sent. I&apos;ll get back to you soon.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                variants={bannerVariants}
                initial="hidden"
                animate="visible"
                className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-600 dark:text-red-400"
              >
                <AlertCircle size={16} />
                Something went wrong. Try email or WhatsApp instead.
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="user_name" className={labelClass}>Name</label>
                  <input
                    id="user_name"
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                    placeholder="Your name"
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="user_email" className={labelClass}>Email</label>
                  <input
                    id="user_email"
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                    placeholder="you@company.com"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the system, the problem, or the role..."
                  required
                  rows={6}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.015, transition: { duration: 0.18, delay: 0 } }}
                whileTap={{ scale: 0.985, transition: { duration: 0.1, delay: 0 } }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:shadow-white/10"
              >
                {status === "sending" ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-black/20 dark:border-t-black" />
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-600">
                Usually replies within 24 hours
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
