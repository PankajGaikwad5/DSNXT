import Image from "next/image";
import Link from "next/link";
import { Lines, Reveal } from "@/components/Motion";
import Video from "@/components/Video";
import ServiceArt from "@/components/ServiceArt";
import Arrow from "@/components/Arrow";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import InkHeader from "@/components/InkHeader";
import { SERVICES } from "@/data/services";
import { FAQS } from "@/data/faqs";
import { JsonLd, breadcrumbs, faqPage, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Web Design, Shopify & SEO Services",
  description:
    "Custom websites, Shopify stores, brand direction, SEO and monthly care plans from one independent studio in Mumbai, working worldwide. Fixed quotes and a free homepage preview.",
  path: "/services",
  keywords: [
    "web design services",
    "Next.js development services",
    "custom Shopify store design",
    "Shopify developer",
    "SEO services Mumbai",
    "monthly SEO services",
    "SEO audit",
    "Google Business Profile setup",
    "website redesign services",
    "landing page design",
    "website maintenance services",
    "website updates and support",
  ],
});

const TIERS = [
  {
    name: "Launch",
    time: "5 to 7 days",
    for: "Solo practices, consultants and artists",
    items: ["One or two page custom site", "Mobile-first, sub-second loading", "WhatsApp & call enquiries", "Google indexing & local SEO", "Free hosting on Vercel"],
  },
  {
    name: "Studio",
    time: "7 to 10 days",
    for: "Architects, interior studios, clinics, showrooms",
    featured: true,
    items: [
      "Full multi-page site",
      "Project galleries & case studies",
      "Motion and smooth scrolling",
      "Local & global SEO setup",
      "Enquiries routed to you directly",
      "Free hosting on Vercel",
    ],
  },
  {
    name: "Bespoke",
    time: "2 to 3 weeks",
    for: "Media, collectible brands, international teams",
    items: ["Everything in Studio", "Custom Shopify stores", "CMS and custom integrations", "Audio, video & catalogue systems", "WebGL / 3D moments", "Priority support after launch"],
  },
];

const MONTHLY = [
  {
    name: "Care",
    for: "Keep your site current",
    items: [
      "Text, image & project updates",
      "New pages and sections",
      "Bug fixes & small changes",
      "Security & dependency updates",
      "Speed & SEO check-ups",
      "Hosting & domain help",
    ],
  },
  {
    name: "Grow",
    for: "Keep improving in search",
    items: [
      "Everything in Care",
      "Ongoing SEO fixes",
      "New pages or guides each month",
      "AI search check-ups",
      "Google Business Profile upkeep",
      "A monthly search report",
    ],
  },
];

const ONE_OFF = [
  "SEO audit",
  "Speed & Core Web Vitals fixes",
  "Google Business Profile setup",
  "AI search readiness",
  "Social media templates",
  "Fixes on WordPress, Wix, Squarespace & Shopify",
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Web design, Shopify and SEO", description: "Custom websites, Shopify stores, brand direction, SEO and monthly care plans from Design Next.", path: "/services", areas: ["Mumbai", "India", "Worldwide"] })} />
      <JsonLd data={faqPage(FAQS)} />
      <JsonLd data={breadcrumbs([{ name: "Services", path: "/services" }])} />
      <InkHeader>
        <p className="t-label mb-8 text-ink/60">Services</p>
        <Lines
          as="h1"
          className="t-mega max-w-[12ch]"
          lines={["One desk.", <span key="s">No <span className="serif text-signal">hand-offs.</span></span>]}
        />
        <Reveal delay={0.3} className="mt-12 max-w-xl">
          <p className="t-lead text-ink/70">
            The person who designs your site is the person who builds it. Nothing gets lost between a designer, a developer
            and an SEO agency, and you always talk to the one doing the work.
          </p>
        </Reveal>
      </InkHeader>

      {/* Disciplines */}
      <section className="wrap space-y-24 py-32 md:space-y-40 md:py-44">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="grid gap-10 md:grid-cols-12 md:items-center">
            <Reveal className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[4px] bg-ink-2">
                {s.art ? (
                  <ServiceArt kind={s.art} />
                ) : s.video ? (
                  <Video src={s.video} poster={s.poster} className="grade" />
                ) : (
                  <Image src={s.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="grade object-cover" />
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1} className={`md:col-span-5 ${i % 2 ? "md:order-1" : "md:col-start-8"}`}>
              <p className="t-label mb-6 text-signal">0{i + 1}</p>
              <h2 className="t-h2">{s.title}</h2>
              <p className="t-lead mt-6 text-mute">{s.text}</p>
              <ul className="mt-10 border-t border-white/10">
                {s.details.map((d) => (
                  <li key={d} className="flex items-center justify-between border-b border-white/10 py-4">
                    <span>{d}</span>
                    <span className="h-1 w-1 rounded-full bg-signal" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Tiers, light */}
      <section className="bg-paper py-32 text-ink md:py-44">
        <div className="wrap">
          <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="t-label mb-6 text-ink/50">Engagements</p>
              <Lines as="h2" className="t-display" lines={["Fixed quotes.", <span key="t" className="serif">No surprises.</span>]} />
            </div>
            <p className="t-lead text-ink/65 md:col-span-4 md:col-start-9">
              Every build starts with a free homepage preview. You get one clear price after our call, and it never
              grows.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 0.08}
                className={`flex flex-col rounded-[6px] p-7 md:p-9 ${t.featured ? "bg-ink text-paper" : "bg-paper-2"}`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="t-h3">{t.name}</h3>
                  {t.featured && <span className="rounded-full bg-signal px-3 py-1 text-xs text-white">Most chosen</span>}
                </div>
                <p className={`mt-2 ${t.featured ? "text-mute" : "text-ink/60"}`}>{t.for}</p>
                <p className="mt-10 text-4xl font-medium tracking-[-0.05em] lg:text-5xl">{t.time}</p>
                <p className={`t-label mt-2 ${t.featured ? "text-dim" : "text-ink/45"}`}>From approval to launch</p>
                <ul className={`mt-10 flex-1 border-t ${t.featured ? "border-white/10" : "border-ink/10"}`}>
                  {t.items.map((it) => (
                    <li key={it} className={`border-b py-3.5 ${t.featured ? "border-white/10" : "border-ink/10"}`}>
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/preview"
                  className={`group mt-10 inline-flex items-center justify-between rounded-full px-6 py-4 transition-colors ${
                    t.featured ? "bg-signal text-white hover:bg-signal-hot" : "bg-ink text-paper hover:bg-signal"
                  }`}
                >
                  Start with a free preview <Arrow />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Monthly plans: ongoing work after launch, priced apart from the build */}
          <div id="maintenance" className="mt-4 grid scroll-mt-28 gap-10 rounded-[6px] border border-ink/15 p-7 md:grid-cols-12 md:p-9">
            <div className="md:col-span-5">
              <p className="t-label text-signal">After launch</p>
              <h3 className="t-h3 mt-4">Monthly plans</h3>
              <p className="mt-4 text-ink/65">
                Optional, and for any site, whether we built it or not. Each plan is quoted after a short call, charged
                separately from the build, and everything we make stays yours. Only need a change now and then? We can quote
                per request instead.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-paper transition-colors hover:bg-signal"
              >
                Ask about monthly plans <Arrow />
              </Link>
            </div>
            <div className="grid content-start gap-10 sm:grid-cols-2 sm:gap-8 md:col-span-6 md:col-start-7">
              {MONTHLY.map((p) => (
                <div key={p.name}>
                  <h4 className="t-h3">{p.name}</h4>
                  <p className="mt-2 text-ink/60">{p.for}</p>
                  <ul className="mt-6 border-t border-ink/10">
                    {p.items.map((it) => (
                      <li key={it} className="border-b border-ink/10 py-3.5">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* One-off jobs: smaller work that doesn't need a build or a plan */}
          <div className="mt-4 grid gap-10 rounded-[6px] border border-ink/15 p-7 md:grid-cols-12 md:p-9">
            <div className="md:col-span-5">
              <p className="t-label text-signal">Smaller jobs</p>
              <h3 className="t-h3 mt-4">One-off work</h3>
              <p className="mt-4 text-ink/65">
                Not ready for a new site? Start with one focused job on the site you already have, quoted before we begin.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-paper transition-colors hover:bg-signal"
              >
                Ask for a quote <Arrow />
              </Link>
            </div>
            <ul className="grid content-start gap-x-8 border-t border-ink/10 sm:grid-cols-2 md:col-span-6 md:col-start-7">
              {ONE_OFF.map((c) => (
                <li key={c} className="border-b border-ink/10 py-3.5">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-12 py-32 md:grid-cols-12 md:py-44">
        <div className="md:col-span-4">
          <p className="t-label mb-6 text-mute">FAQ</p>
          <Lines as="h2" className="t-h2" lines={["Good", <span key="q" className="serif">questions.</span>]} />
        </div>
        <div className="md:col-span-8">
          <Faq items={FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
