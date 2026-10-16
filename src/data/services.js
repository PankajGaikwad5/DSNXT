import { MEDIA, unsplash } from "./site";

export const SERVICES = [
  {
    title: "Design",
    text: "Art direction, identity touch-ups and interfaces drawn from scratch for your audience.",
    tags: ["Art direction", "UI", "Motion"],
    art: "design",
    details: ["Positioning & sitemap", "Art direction", "Responsive UI design", "Motion & interaction"],
  },
  {
    title: "Development",
    text: "Hand-written Next.js that loads in a blink and scores 100 where it counts.",
    tags: ["Next.js", "WebGL", "CMS"],
    art: "development",
    details: ["Hand-coded Next.js", "Content management", "WebGL & 3D", "Hosting on the global edge"],
  },
  {
    title: "Search & growth",
    text: "Structured for Google from day one, with enquiries routed straight to you.",
    tags: ["SEO", "Analytics", "Leads"],
    art: "search",
    details: ["Technical & local SEO", "Search Console setup", "WhatsApp & email lead routing", "Analytics"],
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
  { value: "₹0", unit: "", label: "Until you love it" },
];
