import Image from "next/image";
import Link from "next/link";
import InkHeader from "./InkHeader";
import Faq from "./Faq";
import CtaBand from "./CtaBand";
import Arrow from "./Arrow";
import { Lines, Reveal } from "./Motion";
import { PROJECTS } from "@/data/projects";
import { JsonLd, breadcrumbs, faqPage, serviceSchema } from "@/lib/seo";

/** Shared layout for the Mumbai and worldwide landing pages. */
export default function LocationPage({ path, crumb, label, title, lead, service, reasons, sectorsTitle, sectors, projectSlugs, areasTitle, areas, faqs }) {
  const projects = projectSlugs.map((s) => PROJECTS.find((p) => p.slug === s)).filter(Boolean);
  return (
    <div className="bg-paper text-ink">
      <JsonLd data={serviceSchema({ ...service, path, areas })} />
      <JsonLd data={faqPage(faqs)} />
      <JsonLd data={breadcrumbs([{ name: crumb, path }])} />

      <InkHeader>
        <p className="t-label mb-8 text-ink/60">{label}</p>
        <Lines as="h1" className="t-mega max-w-[13ch]" lines={title} />
        <Reveal delay={0.3} className="mt-12 max-w-xl">
          <p className="t-lead text-ink/70">{lead}</p>
        </Reveal>
      </InkHeader>

      {/* Why */}
      <section className="wrap pb-24 md:pb-32">
        <div className="grid gap-px overflow-hidden rounded-[10px] bg-ink/10 md:grid-cols-3">
          {reasons.map(([h, t], i) => (
            <Reveal key={h} delay={i * 0.06} className="bg-paper p-8 md:p-10">
              <span className="t-label text-signal">0{i + 1}</span>
              <h2 className="t-h3 mt-10">{h}</h2>
              <p className="mt-4 text-ink/65">{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who for */}
      <section className="wrap grid gap-10 pb-24 md:grid-cols-12 md:pb-32">
        <h2 className="t-h2 md:col-span-5">{sectorsTitle}</h2>
        <ul className="border-t border-ink/15 md:col-span-7">
          {sectors.map((s) => (
            <li key={s} className="flex items-center justify-between border-b border-ink/15 py-5 text-xl tracking-[-0.02em]">
              {s}
              <span className="h-1 w-1 rounded-full bg-signal" />
            </li>
          ))}
        </ul>
      </section>

      {/* Work */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-h2">Recent work</h2>
            <Link href="/work" className="group inline-flex items-center gap-3">
              <span className="u-link">All projects</span>
              <Arrow />
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} data-cursor="View" className="group block">
                <div className="relative aspect-[1366/690] overflow-hidden rounded-[10px] bg-ink-2">
                  <Image
                    src={p.image}
                    alt={`${p.title} website by Design Next`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  />
                </div>
                <p className="mt-5 text-xl tracking-[-0.02em] transition-colors group-hover:text-signal">{p.title}</p>
                <p className="text-sm text-mute">
                  {p.category}, {p.location}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="wrap py-24 md:py-32">
        <h2 className="t-label mb-8 text-ink/50">{areasTitle}</h2>
        <ul className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <li key={a} className="rounded-full border border-ink/15 px-5 py-2.5">
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="wrap grid gap-10 pb-32 md:grid-cols-12 md:pb-44">
        <h2 className="t-h3 md:col-span-4">Questions</h2>
        <div className="md:col-span-8">
          <Faq items={faqs} tone="light" />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
