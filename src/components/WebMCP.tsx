"use client";

import { useEffect } from "react";
import { SITE_URL } from "../lib/site";

/**
 * WebMCP integration.
 *
 * Exposes a small, read-mostly tool surface so AI agents can query this profile
 * and prepare a contact message without scraping the DOM.
 *
 * The API is an experimental proposal and still in flux, so registration is
 * feature-detected, supports both known entry points, and is wrapped in
 * try/catch — in any shipping browser `navigator.modelContext` is undefined and
 * this component does nothing at all.
 */

type ToolResult = { content: Array<{ type: "text"; text: string }> };

type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input?: Record<string, unknown>) => Promise<ToolResult> | ToolResult;
};

type ModelContext = {
  provideContext?: (context: { tools: ToolDefinition[] }) => void;
  registerTool?: (tool: ToolDefinition) => void;
};

const SECTIONS = ["home", "about", "projects", "experience", "contact"] as const;

const PROFILE = {
  name: "Ibrahim Haykal Alatas",
  title: "Full Stack Developer",
  company: "Datapolis (PT Data Teknologi Terintegrasi)",
  location: "Jakarta, Indonesia (GMT+7), open to remote",
  availability: "Open to Full Stack Developer and Backend Developer roles",
  education:
    "Applied Bachelor of Computer Science (S.Tr.Kom), Industrial Automotive Information Systems — Politeknik STMI Jakarta, Ministry of Industry. Sep 2022 – Jul 2026, GPA 3.77/4.00.",
  certification: "Database Administrator — BNSP National Professional Certification",
  focus:
    "Enterprise CRM, manufacturing and warehouse systems, ERP integration, REST API design, role-based access control, database migration",
  stack: {
    backend: ["Laravel 12", "PHP", "PostgreSQL", "Oracle PL/SQL", "MySQL", "REST APIs"],
    frontend: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    tools: ["Git", "Figma", "Docker", "YOLOv8", "Roboflow", "Streamlit", "Midtrans"],
  },
  highlights: [
    "Reduced warehouse material search time by 76.10% (103.00 → 24.62 minutes) at PT Gemala Kempa Daya, validated by time study over 30 cycles.",
    "Executed a phased Oracle-to-PostgreSQL migration with an application-level dual-write strategy and zero production downtime.",
    "Built 30,000+ row multi-sheet Excel reporting exports that complete in around 9 seconds.",
    "2nd place nationally, Hackathon 2025, for an MSME digital platform with WhatsApp chatbot integration.",
  ],
  fullProfile: `${SITE_URL}/llms.txt`,
  resume: `${SITE_URL}/cv/Ibrahim_Haykal_Alatas_Resume.pdf`,
};

const CONTACT = {
  email: "ibrahimhaykal@gmail.com",
  whatsapp: "https://wa.me/6289628066432",
  phone: "+62 896 2806 6432",
  linkedin: "https://www.linkedin.com/in/ibrahimhaykalalatas/",
  github: "https://github.com/ibrahimhaykal",
  form: `${SITE_URL}/#contact`,
  responseTime: "Usually replies within 24 hours",
};

function toResult(value: string): ToolResult {
  return { content: [{ type: "text", text: value }] };
}

/** Different drafts of the proposal pass args bare or wrapped in `arguments`. */
function readArgs(input?: Record<string, unknown>): Record<string, unknown> {
  if (!input) return {};
  const nested = input.arguments;
  if (nested && typeof nested === "object") return nested as Record<string, unknown>;
  return input;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

/**
 * React ignores a plain `el.value = x` assignment on a controlled input, so write
 * through the native setter and dispatch the event React actually listens for.
 */
function setControlledValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const prototype =
    el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, "value")?.set?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

const TOOLS: ToolDefinition[] = [
  {
    name: "get_profile",
    description:
      "Get the professional profile of Ibrahim Haykal Alatas: current role, education, tech stack, and measured project impact. Use this to answer questions about his background, skills, or experience.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => toResult(JSON.stringify(PROFILE, null, 2)),
  },
  {
    name: "get_contact_channels",
    description:
      "Get every way to reach Ibrahim Haykal Alatas — email, WhatsApp, LinkedIn, GitHub, and the on-site contact form.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: () => toResult(JSON.stringify(CONTACT, null, 2)),
  },
  {
    name: "navigate_to_section",
    description:
      "Scroll the page to a section so its content becomes visible. Sections: home, about, projects, experience, contact.",
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: [...SECTIONS],
          description: "Section id to scroll to.",
        },
      },
      required: ["section"],
      additionalProperties: false,
    },
    execute: (input) => {
      const section = asString(readArgs(input).section);
      if (!section || !SECTIONS.includes(section as (typeof SECTIONS)[number])) {
        return toResult(`Unknown section. Choose one of: ${SECTIONS.join(", ")}.`);
      }
      const target = document.getElementById(section);
      if (!target) return toResult(`Section "${section}" is not present on this page.`);
      target.scrollIntoView({ behavior: "smooth" });
      return toResult(`Scrolled to the "${section}" section.`);
    },
  },
  {
    name: "fill_contact_form",
    description:
      "Fill the contact form with a sender name, email, and message, then scroll to it. This does NOT send anything — it only prepares the form. Tell the person to review the draft and press Send themselves.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Sender's full name." },
        email: { type: "string", description: "Sender's email address for the reply." },
        message: { type: "string", description: "Body of the message." },
      },
      required: ["name", "email", "message"],
      additionalProperties: false,
    },
    execute: (input) => {
      const args = readArgs(input);
      const name = asString(args.name);
      const email = asString(args.email);
      const message = asString(args.message);

      if (!name || !email || !message) {
        return toResult("All three fields are required: name, email, and message.");
      }

      const nameField = document.getElementById("user_name") as HTMLInputElement | null;
      const emailField = document.getElementById("user_email") as HTMLInputElement | null;
      const messageField = document.getElementById("message") as HTMLTextAreaElement | null;

      if (!nameField || !emailField || !messageField) {
        return toResult(
          `Contact form is not available on this page. Email ${CONTACT.email} directly instead.`
        );
      }

      setControlledValue(nameField, name);
      setControlledValue(emailField, email);
      setControlledValue(messageField, message);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

      return toResult(
        "Contact form filled and scrolled into view. The message has NOT been sent — ask the person to review it and press the Send Message button."
      );
    },
  },
];

export default function WebMCP() {
  useEffect(() => {
    const modelContext = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!modelContext) return;

    try {
      if (typeof modelContext.provideContext === "function") {
        modelContext.provideContext({ tools: TOOLS });
      } else if (typeof modelContext.registerTool === "function") {
        TOOLS.forEach((tool) => modelContext.registerTool?.(tool));
      }
    } catch (error) {
      // Never let an experimental API break the page.
      console.warn("WebMCP tools were not registered:", error);
    }
  }, []);

  return null;
}
