import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { getGuides } from "@/lib/guides";

const UPDATED = "2026-10-24";

const PAGES = [
  ["", 1, "weekly"],
  ["/work", 0.9, "monthly"],
  ["/services", 0.9, "monthly"],
  ["/web-design-mumbai", 0.9, "monthly"],
  ["/web-design-worldwide", 0.8, "monthly"],
  ["/web-design-dubai-qatar", 0.8, "monthly"],
  ["/web-design-usa", 0.8, "monthly"],
  ["/web-design-australia", 0.8, "monthly"],
  ["/website-development-company", 0.9, "monthly"],
  ["/about", 0.7, "monthly"],
  ["/founder", 0.7, "monthly"],
  ["/guides", 0.8, "weekly"],
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
    ...getGuides().map((g) => ({
      url: `${SITE.url}/guides/${g.slug}`,
      lastModified: g.updated,
      changeFrequency: "monthly",
      priority: 0.7,
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
