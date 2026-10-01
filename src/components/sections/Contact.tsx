"use client";

import { useRef, useState } from "react";
import { Send, Mail, MapPin, AlertCircle, Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "../ui/SectionHeading";
import { useReveal } from "../../lib/reveal";
import { useLang } from "../../lib/i18n";

const EMPTY = { user_name: "", user_email: "", message: "" };

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  useReveal(rootRef);

  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setForm(EMPTY);
    } catch (error) {
      console.error("Email sending error:", error);
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 3000);
  };

  const field = (name: keyof typeof EMPTY, label: string, placeholder: string, type = "text") => (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">{label}</label>
      {name === "message" ? (
        <textarea id={name} name={name} rows={6} required placeholder={placeholder} value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="field resize-none" />
      ) : (
        <input id={name} name={name} type={type} required placeholder={placeholder} value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="field" />
      )}
    </div>
  );

  return (
    <section ref={rootRef} id="contact" className="py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          index="04"
          eyebrow={t("Contact", "Kontak")}
          title={t("Let's build something solid.", "Ayo bangun sesuatu yang solid.")}
          subtitle={t(
            "Got an operational bottleneck, a legacy system that needs a modern front, or a role you think fits? Drop a line. I reply to everything.",
            "Punya hambatan operasional, sistem lama yang butuh tampilan modern, atau posisi yang menurutmu cocok? Kirim pesan. Semua pasti saya balas."
          )}
        />

        <div className="grid gap-5 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            <div data-reveal className="card p-5">
              <p className="label mb-2 flex items-center gap-2"><Mail size={14} /> Email</p>
              <a href="mailto:ibrahimhaykal@gmail.com" className="text-sm font-medium underline-offset-4 hover:underline">
                ibrahimhaykal@gmail.com
              </a>
            </div>
            <div data-reveal className="card p-5">
              <p className="label mb-2 flex items-center gap-2"><MapPin size={14} /> {t("Location", "Lokasi")}</p>
              <p className="text-sm font-medium">Jakarta, Indonesia · GMT+7</p>
              <p className="mt-1 text-xs text-muted">{t("Open to remote", "Bisa kerja remote")}</p>
            </div>
          </div>

          <form data-reveal onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8 lg:col-span-3">
            {status === "success" && (
              <p role="status" className="chip w-full !py-3 text-sm">
                <Check size={16} /> {t("Message sent. I'll get back to you soon.", "Pesan terkirim. Saya akan segera membalas.")}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="chip w-full !py-3 text-sm">
                <AlertCircle size={16} /> {t("Something went wrong. Email me directly instead.", "Ada yang salah. Kirim email langsung saja.")}
              </p>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              {field("user_name", t("Name", "Nama"), t("Your name", "Nama kamu"))}
              {field("user_email", "Email", "you@company.com", "email")}
            </div>
            {field("message", t("Message", "Pesan"), t("Tell me about the system, the problem, or the role...", "Ceritakan sistemnya, masalahnya, atau posisinya..."))}
            <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"}
              className="btn btn-primary w-full !py-3.5 disabled:opacity-60">
              <Send size={16} /> {status === "sending" ? t("Sending...", "Mengirim...") : t("Send Message", "Kirim Pesan")}
            </button>
            <p className="text-center text-xs text-muted">{t("Usually replies within 24 hours", "Biasanya membalas dalam 24 jam")}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
