import LocationPage from "@/components/LocationPage";
import { pageMeta } from "@/lib/seo";

const PATH = "/web-design-dubai-qatar";
const DESCRIPTION =
  "Custom web design and development for businesses in Dubai, Qatar and the Gulf. Design Next designs and hand-codes fast, bilingual-ready websites for brands in Doha, Dubai, Abu Dhabi and Riyadh, with a free homepage preview.";

export const metadata = pageMeta({
  title: "Web Design for Dubai, Qatar & the Gulf",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "web design Dubai",
    "web design Qatar",
    "website development Doha",
    "web design agency UAE",
    "website developer Saudi Arabia",
    "Arabic English website design",
    "hire web designer from India",
  ],
});

const FAQS = [
  {
    q: "Do you work with businesses in Qatar and the UAE?",
    a: "Yes. Design Next works with brands in the Gulf, including a website currently being built for a client in Qatar and a digital showroom for a collectible design brand serving India and the Middle East.",
  },
  {
    q: "Can you build an Arabic and English website?",
    a: "Yes. Bilingual sites are built with proper right-to-left Arabic layouts, separate language versions and hreflang tags, so each audience sees the right page in search.",
  },
  {
    q: "How do time zones work between Mumbai and the Gulf?",
    a: "Mumbai is only 1.5 hours ahead of Dubai and 2.5 hours ahead of Doha and Riyadh, so working hours overlap almost completely. Calls happen during your day.",
  },
  {
    q: "Why hire a studio in India instead of a local Gulf agency?",
    a: "You get senior, hand-coded work at a fair fixed price, with direct access to the person building your site and a free working homepage preview before you commit.",
  },
];

export default function GulfPage() {
  return (
    <LocationPage
      path={PATH}
      crumb="Web design Dubai & Qatar"
      label="Dubai, Qatar & the Gulf"
      title={["Web design for", <span key="g">the <span className="serif text-signal">Gulf.</span></span>]}
      lead="Design Next designs and builds custom websites for businesses in the UAE, Qatar and Saudi Arabia, working remotely from Mumbai in almost the same working day."
      service={{ name: "Web design and development for Dubai, Qatar and the Gulf", description: DESCRIPTION }}
      reasons={[
        ["Same working day", "Mumbai is 1.5 to 2.5 hours from Dubai, Doha and Riyadh, so we work during your hours."],
        ["Bilingual-ready", "Arabic and English versions with right-to-left layouts and international SEO."],
        ["Premium, without the markup", "Senior, hand-coded work at one fixed quote, after a free homepage preview."],
      ]}
      sectorsTitle="Who we work with in the Gulf"
      sectors={[
        "Luxury, design & furniture brands",
        "Architecture & interior studios",
        "Hospitality, clinics & services",
        "Founders, consultants & startups",
        "Art, galleries & culture",
      ]}
      projectSlugs={["karan-desai-home", "karan-desai"]}
      areasTitle="Working with clients in"
      areas={["Dubai", "Doha", "Abu Dhabi", "Sharjah", "Riyadh", "Jeddah", "Muscat", "Manama", "Kuwait City"]}
      faqs={FAQS}
    />
  );
}
