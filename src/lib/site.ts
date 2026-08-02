/** Single source of truth for anything that needs an absolute URL. */
export const SITE_URL = "https://ibrahimhaykal.my.id";

export const SITE_NAME = "Ibrahim Haykal Alatas";

export const SITE_TITLE = "Ibrahim Haykal Alatas | Full Stack Developer";

export const SITE_DESCRIPTION =
  "Ibrahim Haykal Alatas is a Full Stack Developer in Jakarta, Indonesia, building enterprise CRM and manufacturing systems with Laravel and React. Experienced in REST API design, role-based access control, ERP integration, warehouse digitalization, and zero-downtime database migration.";

/**
 * AI crawlers explicitly allowed in robots.txt.
 * Split by purpose so the policy is auditable — both groups are currently allowed.
 */
export const AI_CRAWLERS = {
  /** Fetch pages to answer live user queries (AI search / retrieval). */
  search: [
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "Claude-User",
    "Claude-SearchBot",
    "ClaudeBot",
    "Applebot",
    "Amazonbot",
    "DuckAssistBot",
    "Bingbot",
    // Google: Googlebot feeds Search + AI Overviews, Google-Extended gates Gemini
    // grounding, Google-CloudVertexBot handles Vertex AI site ingestion.
    "Googlebot",
    "Googlebot-Image",
    "GoogleOther",
    "Google-CloudVertexBot",
  ],
  /** Collect pages for model training / dataset building. */
  training: [
    "GPTBot",
    "Google-Extended",
    "Applebot-Extended",
    "anthropic-ai",
    "CCBot",
    "meta-externalagent",
    "FacebookBot",
    "Bytespider",
    "cohere-ai",
    "Diffbot",
    "omgili",
    "Timpibot",
  ],
} as const;
