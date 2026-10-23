import LocationPage from "@/components/LocationPage";
import { AREAS, pageMeta } from "@/lib/seo";

const PATH = "/web-design-worldwide";
const DESCRIPTION =
  "Custom web design and Next.js development for clients worldwide, from Mumbai. Design Next works remotely with businesses in Qatar, the UAE, UK, US, Australia and Singapore. Free homepage preview before you pay.";

export const metadata = pageMeta({
  title: "Web Design Agency for International Clients",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "web design agency for international clients",
    "remote web design studio",
    "offshore web design India",
    "hire web designer from India",
    "Next.js agency",
    "web design Dubai",
    "web design UK",
    "custom website design worldwide",
  ],
});

const FAQS = [
  {
    q: "Can you work with clients in a different time zone?",
    a: "Yes. Design Next is based in Mumbai (IST), which overlaps comfortably with working hours in the Gulf, Asia and Europe, and calls can be arranged for clients in the Americas and Australia. Feedback is gathered on shared links, so nobody has to wait for a meeting.",
  },
  {
    q: "Have you built websites for clients outside India?",
    a: "Yes. Recent work includes a website for an Aboriginal artist in Australia selling to collectors worldwide, a digital showroom for a collectible design brand serving India and the Middle East, and a website currently being built for a client in Qatar.",
  },
  {
    q: "Can you build a website in more than one language?",
    a: "Yes. Multilingual sites are built with proper language versions and hreflang tags, so each audience is shown the right page in search.",
  },
  {
    q: "How does the free homepage preview work remotely?",
    a: "You send a short brief, and within 48 to 72 hours you receive a private link to a working homepage designed for your business. If you love it, the project continues; if not, you owe nothing.",
  },
];

export default function WorldwidePage() {
  return (
    <LocationPage
      path={PATH}
      crumb="Web design worldwide"
      label="Web design, worldwide"
      title={["Web design,", <span key="w" className="serif text-signal">worldwide.</span>]}
      lead="Design Next works remotely with businesses around the world, designing and hand-coding custom websites from Mumbai with the same care as for clients down the road."
      service={{ name: "Web design and development for international clients", description: DESCRIPTION }}
      reasons={[
        ["Studio craft, direct line", "You work with the person designing and building your site, without the layers of a large agency."],
        ["Built for a global audience", "Fast everywhere through global edge hosting, with multilingual and international SEO when you need it."],
        ["See it before you commit", "A free working homepage preview, sent on a private link, so distance never means risk."],
      ]}
      sectorsTitle="Who we work with abroad"
      sectors={[
        "Artists & galleries selling to collectors",
        "Design, furniture & luxury brands",
        "Architecture & interior studios",
        "Founders, consultants & creators",
        "Media, podcasts & publications",
      ]}
      projectSlugs={["timothy-yule", "karan-desai-home"]}
      areasTitle="Available to clients in"
      areas={[...AREAS.world, "India"]}
      faqs={FAQS}
    />
  );
}
