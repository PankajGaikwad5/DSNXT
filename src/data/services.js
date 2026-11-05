import { MEDIA, unsplash } from "./site";

export const SERVICES = [
  {
    title: "Websites",
    text: "Designed from scratch and hand-written in Next.js. Loads in a blink and scores 100 where it counts.",
    tags: ["Next.js", "WebGL", "CMS"],
    art: "development",
    details: [
      "Custom design & development",
      "Redesigns & landing pages",
      "Rebuilds from Wix, Squarespace & AI tools",
      "Content management",
      "Motion, WebGL & 3D",
      "Hosting on the global edge",
    ],
  },
  {
    title: "Shopify stores",
    text: "Custom storefronts with no off-the-shelf theme, or a catalogue and enquiry flow if your clients buy through a conversation.",
    tags: ["Shopify", "Ecommerce", "Catalogues"],
    image: "/work/cuddles.webp",
    details: ["Store design & build", "Custom Shopify themes", "Catalogue & enquiry sites", "Payments & checkout setup"],
  },
  {
    title: "Brand direction",
    text: "Colour, type and image style that make your site unmistakably yours, with templates so your social posts match.",
    tags: ["Art direction", "Type", "Templates"],
    art: "design",
    details: ["Positioning & sitemap", "Art direction", "Colour, type & image style", "Brand refresh for the web", "Social media templates"],
  },
  {
    title: "Search & growth",
    text: "Structured for Google and AI search from day one, then looked after every month if you want it.",
    tags: ["SEO", "AI search", "Analytics"],
    art: "search",
    details: [
      "Technical & local SEO",
      "AI search readiness",
      "SEO audits & speed fixes",
      "Google Business Profile setup",
      "Search Console & analytics",
      "WhatsApp & email enquiry routing",
    ],
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "A short call",
    time: "Day 0",
    text: "Fifteen minutes on your business, your clients and what's not working today.",
    image: unsplash("1519389950473-47ba0277781c", 1200),
  },
  {
    step: "02",
    title: "Your free preview",
    time: "48 to 72 hours",
    text: "We design and build a real homepage for you. You decide if we continue.",
    video: MEDIA.sketchVideo,
    poster: MEDIA.sketchPoster,
  },
  {
    step: "03",
    title: "Launch",
    time: "7 to 10 days",
    text: "The full site, tuned for speed and search, live on your domain and fully yours.",
    image: unsplash("1531297484001-80022131f5a1", 1200),
  },
];

export const STATS = [
  { value: "0.3", unit: "s", label: "Average load time" },
  { value: "100", unit: "", label: "Lighthouse performance" },
  { value: "10", unit: "d", label: "Typical time to launch" },
  { value: "Free", unit: "", label: "Until you love it" },
];
