import Link from "next/link";
import InkHeader from "@/components/InkHeader";
import CtaBand from "@/components/CtaBand";
import Arrow from "@/components/Arrow";
import { Lines, Reveal } from "@/components/Motion";
import { getGuides } from "@/lib/guides";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Web Design Guides for Business Owners",
  description:
    "Straight answers on web design, website costs, SEO, AI website builders and hiring a web designer, from Design Next, a web design studio in Mumbai.",
  path: "/guides",
  keywords: ["web design guide", "website tips for small business", "how to hire a web designer", "website SEO guide"],
});

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <div className="bg-paper text-ink">
      <JsonLd data={breadcrumbs([{ name: "Guides", path: "/guides" }])} />
      <InkHeader>
        <p className="t-label mb-8 text-ink/60">Guides</p>
        <Lines as="h1" className="t-mega max-w-[12ch]" lines={["Straight", <span key="g"><span className="serif text-signal">answers.</span></span>]} />
        <Reveal delay={0.3} className="mt-12 max-w-xl">
          <p className="t-lead text-ink/70">
            What a website should cost, how to hire a designer, and how to get found on Google and in AI answers.
          </p>
        </Reveal>
      </InkHeader>

      <section className="wrap pb-32 md:pb-44">
        <ul className="border-t border-ink/15">
          {[
            ...guides.map((g) => ({ href: `/guides/${g.slug}`, title: g.title, text: g.description, date: g.date })),
            {
              href: "/ai-website-builder-vs-web-designer",
              title: "AI website builder vs a professional web designer",
              text: "When an AI builder is enough, and when a business needs a professional.",
            },
          ].map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="group grid gap-4 border-b border-ink/15 py-8 md:grid-cols-12 md:items-center">
                <p className="t-label text-ink/45 md:col-span-2">{g.date ? fmt(g.date) : "Guide"}</p>
                <div className="md:col-span-9">
                  <h2 className="t-h3 transition-colors group-hover:text-signal">{g.title}</h2>
                  <p className="mt-3 max-w-2xl text-ink/60">{g.text}</p>
                </div>
                <span className="hidden justify-self-end md:col-span-1 md:block">
                  <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </div>
  );
}
