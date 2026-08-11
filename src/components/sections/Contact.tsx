"use client";

import { useRef, useState } from "react";
import { Send, Mail, MapPin, Github, Linkedin, MessageCircle, AlertCircle, Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "../ui/SectionHeading";
import { onSpotlightMove } from "../ui/spotlight";
import { useReveal } from "../../lib/reveal";

const fieldClass =
  "w-full rounded-xl border border-black/[0.08] bg-white/60 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/15 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-gray-600 dark:focus:border-sky-400";

const labelClass =
  "mb-2 block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

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
    <section ref={rootRef} id="contact" className="py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">

        <SectionHeading
          index="04"
          eyebrow="Contact"
          title={<>Let&apos;s build something solid.</>}
          subtitle="Got an operational bottleneck, a legacy system that needs a modern front, or a role you think fits? Drop a line — I reply to everything."
        />

        <div className="grid gap-5 lg:grid-cols-5">

          {/* Info Cards */}
          <div className="space-y-3 lg:col-span-2">
            {channels.map((channel) => (
              <div
                key={channel.label}
                data-reveal
                onMouseMove={onSpotlightMove}
                className="surface surface-hover spotlight lift-sm overflow-hidden p-5"
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
              </div>
            ))}

            {/* Location */}
            <div
              data-reveal
              onMouseMove={onSpotlightMove}
              className="surface surface-hover spotlight lift-sm overflow-hidden p-5"
            >
              <MapPin className="mb-3 text-violet-500 dark:text-violet-400" size={18} />
              <div className="eyebrow mb-1.5 text-gray-400 dark:text-gray-600">Location</div>
              <div className="text-sm font-medium text-gray-950 dark:text-white">Jakarta, Indonesia</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-600">
                GMT+7 · open to remote
              </div>
            </div>

            {/* Socials */}
            <div data-reveal className="surface p-5">
              <div className="eyebrow mb-3 text-gray-400 dark:text-gray-600">Connect</div>
              <div className="flex gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-lg border border-black/[0.06] p-2.5 text-gray-600 transition-[color,border-color,transform] duration-200 hover:-translate-y-1 hover:border-sky-500/30 hover:text-gray-950 dark:border-white/[0.07] dark:text-gray-400 dark:hover:text-white"
                  >
                    <social.icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            data-reveal
            onSubmit={handleSubmit}
            className="surface overflow-hidden p-6 sm:p-8 lg:col-span-3"
          >
            {status === "success" && (
              <div
                role="status"
                className="mb-6 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-600 dark:text-emerald-400"
              >
                <Check size={16} />
                Message sent. I&apos;ll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-600 dark:text-red-400"
              >
                <AlertCircle size={16} />
                Something went wrong. Try email or WhatsApp instead.
              </div>
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

              <button
                type="submit"
                disabled={status === "sending"}
                aria-label={status === "sending" ? "Sending message" : "Send message"}
                aria-busy={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition-[transform,opacity] duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:shadow-white/10"
              >
                {status === "sending" ? (
                  <div
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-black/20 dark:border-t-black"
                  />
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 dark:text-gray-600">
                Usually replies within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
