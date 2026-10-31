import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "guides");

/**
 * Guides are Markdown files in content/guides. The file name is the URL slug, and a
 * front matter block sets the details:
 *
 * ---
 * title: How to choose a web designer
 * description: One or two sentences for Google and AI answers.
 * date: 2026-10-24
 * updated: 2026-10-24        (optional)
 * keywords: web designer, hire web designer   (optional, comma-separated)
 * ---
 *
 * Optional "## Questions" section: every "### question" under it becomes FAQ schema.
 */
function parse(file) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf-8").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  for (const line of (match ? match[1] : "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  const body = match ? match[2] : raw;
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title || file,
    description: meta.description || "",
    date: meta.date || "",
    updated: meta.updated || meta.date || "",
    keywords: meta.keywords ? meta.keywords.split(",").map((k) => k.trim()) : [],
    body,
  };
}

function faqsFrom(body) {
  const section = body.split(/^## Questions\s*$/m)[1];
  if (!section) return [];
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [q, ...rest] = block.split("\n");
      const a = rest.join("\n").split(/^## /m)[0];
      // Schema answers are plain text, so drop Markdown links and emphasis.
      const plain = a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "");
      return { q: q.trim(), a: plain.replace(/\s+/g, " ").trim() };
    })
    .filter((f) => f.q && f.a);
}

function load() {
  return fs.existsSync(DIR)
    ? fs
        .readdirSync(DIR)
        .filter((f) => f.endsWith(".md"))
        .map(parse)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
    : [];
}

// Read once in production; re-read in dev so added or removed guides show without a restart.
const GUIDES = process.env.NODE_ENV === "production" ? load() : null;

export function getGuides() {
  return GUIDES ?? load();
}

export function getGuide(slug) {
  const g = getGuides().find((x) => x.slug === slug);
  if (!g) return null;
  return { ...g, html: marked.parse(g.body), faqs: faqsFrom(g.body) };
}
