import { SITE } from "@/data/site";

// Search engines and AI assistants are all welcome: being quotable by answer engines is the point.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/alt-noir", "/alt-editorial"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/alt-noir", "/alt-editorial"] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
