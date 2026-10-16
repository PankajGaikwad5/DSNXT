import Link from "next/link";
import InkHeader from "@/components/InkHeader";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { Lines, Reveal } from "@/components/Motion";
import { FAQ_GROUPS } from "@/data/faqs";
import { JsonLd, breadcrumbs, faqPage, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Web Design FAQ: Cost, Timelines, SEO & AI Builders",
  description:
    "Straight answers about custom website design with Design Next: cost, timelines, SEO, Next.js, ownership, and whether to use an AI website builder or hire a professional studio.",
  path: "/faq",
  keywords: ["web design FAQ", "how much does a website cost", "AI website builder vs web designer", "Next.js website", "website SEO questions"],
});

export default function FaqPage() {
  const all = FAQ_GROUPS.flatMap((g) => g.items);
  return (
    <div className="bg-paper text-ink">
      <JsonLd data={faqPage(all)} />
      <JsonLd data={breadcrumbs([{ name: "FAQ", path: "/faq" }])} />

      <InkHeader>
        <p className="t-label mb-8 text-ink/60">FAQ</p>
        <Lines as="h1" className="t-mega max-w-[12ch]" lines={["Questions,", <span key="a" className="serif text-signal">answered.</span>]} />
        <Reveal delay={0.3} className="mt-12 max-w-xl">
          <p className="t-lead text-ink/70">
            Everything people usually ask before starting a website with Design Next, a web design and development studio
            in Mumbai.
          </p>
        </Reveal>
      </InkHeader>

      <section className="wrap space-y-24 pb-32 md:space-y-32 md:pb-44">
        {FAQ_GROUPS.map((g) => (
          <div key={g.title} className="grid gap-10 md:grid-cols-12">
            <h2 className="t-h3 md:col-span-4">{g.title}</h2>
            <div className="md:col-span-8">
              <Faq items={g.items} tone="light" />
            </div>
          </div>
        ))}
        <p className="max-w-xl text-ink/65">
          Weighing up an AI builder? Read{" "}
          <Link href="/ai-website-builder-vs-web-designer" className="u-link text-ink">
            AI website builder vs a professional web designer
          </Link>
          .
        </p>
      </section>

      <CtaBand />
    </div>
  );
}
