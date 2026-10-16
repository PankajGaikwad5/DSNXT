import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";

const UPDATED = "2026-10-17";

const PAGES = [
  ["", 1, "weekly"],
  ["/work", 0.9, "monthly"],
  ["/services", 0.9, "monthly"],
  ["/web-design-mumbai", 0.9, "monthly"],
  ["/web-design-worldwide", 0.8, "monthly"],
  ["/ai-website-builder-vs-web-designer", 0.8, "monthly"],
  ["/faq", 0.7, "monthly"],
  ["/preview", 0.8, "monthly"],
  ["/contact", 0.7, "yearly"],
];

export default function sitemap() {
  return [
    ...PAGES.map(([path, priority, changeFrequency]) => ({
      url: `${SITE.url}${path}`,
      lastModified: UPDATED,
      changeFrequency,
      priority,
    })),
    ...PROJECTS.map((p) => ({
      url: `${SITE.url}/work/${p.slug}`,
      lastModified: UPDATED,
      changeFrequency: "yearly",
      priority: 0.6,
      images: [`${SITE.url}${p.image}`],
    })),
  ];
}
