import LocationPage from "@/components/LocationPage";
import { AREAS, pageMeta } from "@/lib/seo";

const PATH = "/shopify-developer";
const DESCRIPTION =
  "Pankaj Gaikwad of Design Next is a freelance Shopify developer and designer. Custom Shopify themes, new stores, redesigns and urgent fixes for brands worldwide, from one person who designs and codes the work.";

export const metadata = pageMeta({
  title: "Shopify Developer & Designer for Custom Themes and Urgent Fixes",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "Shopify developer",
    "Shopify designer",
    "freelance Shopify developer",
    "hire Shopify developer",
    "custom Shopify theme",
    "custom Shopify theme developer",
    "Shopify theme customisation",
    "Shopify store design",
    "urgent Shopify developer",
    "fix Shopify store",
    "Shopify expert",
    "Pankaj Gaikwad",
  ],
});

const FAQS = [
  {
    q: "Can I hire you as a freelance Shopify developer?",
    a: "Yes. Pankaj Gaikwad, the founder of Design Next, personally designs and codes every Shopify store, so you work directly with the person doing the job. Design Next works with brands in India and worldwide, on full builds or smaller pieces of work.",
  },
  {
    q: "What is a custom Shopify theme?",
    a: "It's a storefront designed and coded for your brand rather than a purchased theme with your logo on it. You get a design nobody else has, only the code your store needs, and sections built around how you actually sell.",
  },
  {
    q: "Can you fix my Shopify store urgently?",
    a: "Yes. For a broken theme, a failed update, a checkout or layout problem, or a change needed before a launch or sale, message Design Next on WhatsApp with your store link and what's gone wrong. You'll talk directly to the developer and get a clear quote before any work starts.",
  },
  {
    q: "Can you change or improve the Shopify theme I already have?",
    a: "Yes. You don't need to start again. Design Next can add sections, change layouts, speed up a slow store or fix a theme someone else built, and will tell you honestly if a rebuild would cost less over time.",
  },
  {
    q: "Can you move my store to Shopify from another platform?",
    a: "Usually, yes. Design Next reviews your current store first and tells you what can move across cleanly, then sets up redirects from your old page addresses to help protect your Google rankings.",
  },
  {
    q: "How much does a Shopify developer cost?",
    a: "It depends on the work, so each job gets one fixed quote after a short call or message. Your store's Shopify plan is separate and is billed to you directly by Shopify.",
  },
];

export default function ShopifyDeveloperPage() {
  return (
    <LocationPage
      path={PATH}
      crumb="Shopify developer"
      label="Shopify developer & designer"
      title={["Shopify,", <span key="s">designed and <span className="serif text-signal">coded.</span></span>]}
      lead="I'm Pankaj Gaikwad, a freelance Shopify developer and designer at Design Next. I build custom themes and new stores, and fix the ones that need help now, for brands in India and around the world."
      service={{ name: "Shopify development and design", description: DESCRIPTION }}
      reasons={[
        ["One designer-developer", "The person who designs your store writes the code, so nothing gets lost between a designer and a Shopify developer."],
        ["Custom, not a reskin", "Themes built from scratch for your brand, with only the code your store needs."],
        ["Help when it's urgent", "Store broken before a launch or sale? Message on WhatsApp and talk directly to the developer."],
      ]}
      sectorsTitle="What I do on Shopify"
      sectors={[
        "Custom Shopify themes",
        "New store design and build",
        "Changes to your existing theme",
        "Urgent fixes and theme repairs",
        "Speed and SEO improvements",
        "Moves to Shopify from other platforms",
        "Monthly care for your store",
      ]}
      projectSlugs={["cuddles-by-mia-co", "karan-desai-home"]}
      areasTitle="Working with brands in"
      areas={["India", ...AREAS.world]}
      faqs={FAQS}
    />
  );
}
