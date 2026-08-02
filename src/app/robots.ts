import type { MetadataRoute } from "next";
import { AI_CRAWLERS, SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const aiAgents = [...AI_CRAWLERS.search, ...AI_CRAWLERS.training];

  return {
    rules: [
      // Every AI agent is listed explicitly — some of them ignore wildcard groups
      // and only honour a rule block that names them.
      ...aiAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
