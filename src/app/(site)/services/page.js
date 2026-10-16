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
  title: "Web Design, Next.js Development & SEO Services",
  description:
    "Custom website design, hand-coded Next.js development and technical and local SEO from one independent studio in Mumbai. Fixed quotes, a free homepage preview, launch in 7 to 10 days.",
  path: "/services",
  keywords: ["web design services", "Next.js development services", "SEO services Mumbai", "website redesign services", "landing page design"],
});

const TIERS = [
  {
    name: "Launch",
    time: "5 to 7 days",
    for: "Solo practices, consultants and artists",
    items: ["One or two page custom site", "Mobile-first, sub-second loading", "WhatsApp & call enquiries", "Google indexing & local SEO"],
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
    ],
  },
  {
    name: "Bespoke",
    time: "2 to 3 weeks",
    for: "Media, collectible brands, international teams",
    items: ["Everything in Studio", "CMS and custom integrations", "Audio, video & catalogue systems", "WebGL / 3D moments", "Priority support after launch"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Web design, development and SEO", description: "Custom website design, Next.js development and technical SEO from Design Next.", path: "/services", areas: ["Mumbai", "India", "Worldwide"] })} />
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
              Every engagement starts with a free homepage preview. You get one clear price after our call, and it never
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
