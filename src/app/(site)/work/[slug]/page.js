import Link from "next/link";
import { notFound } from "next/navigation";
import { Lines, Reveal } from "@/components/Motion";
import Image from "next/image";
import Arrow from "@/components/Arrow";
import InkHeader from "@/components/InkHeader";
import { PROJECTS, getProject } from "@/data/projects";
import { JsonLd, ORG_ID, breadcrumbs } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} | ${p.category} website`,
    description: `${p.summary} A custom website designed and built by Design Next for ${p.title}, ${p.location}.`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { images: [p.image] },
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = PROJECTS.indexOf(p);
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${p.title} website`,
          about: p.category,
          description: p.summary,
          image: `https://www.designnext.co${p.image}`,
          url: p.liveUrl,
          dateCreated: p.year,
          creator: { "@id": ORG_ID },
          locationCreated: { "@type": "Place", name: p.location },
        }}
      />
      <JsonLd data={breadcrumbs([{ name: "Work", path: "/work" }, { name: p.title, path: `/work/${p.slug}` }])} />
      <InkHeader className="pb-14 pt-40 md:pb-20 md:pt-52">
        <Link href="/work" className="t-label mb-10 inline-flex items-center gap-2 text-ink/60 hover:text-ink">
          <Arrow className="h-3 w-3 rotate-180" /> All work
        </Link>
        <Lines as="h1" className="t-mega max-w-[14ch]" lines={[p.title]} />
        <Reveal delay={0.25} className="mt-14 grid grid-cols-2 gap-8 border-t border-ink/15 pt-8 md:grid-cols-4">
          {[
            ["Discipline", p.category],
            ["Location", p.location],
            ["Year", p.year],
            ["Services", p.services.join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="t-label mb-2 text-ink/45">{k}</p>
              <p>{v}</p>
            </div>
          ))}
        </Reveal>
      </InkHeader>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="wrap">
          <Reveal className="relative aspect-[1366/690] overflow-hidden rounded-[12px] bg-paper-2">
            <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover object-top" />
          </Reveal>
        </div>
      </section>

      <section className="wrap grid gap-14 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-4">
          <p className="t-label mb-6 text-mute">What we did</p>
          <ul className="border-t border-white/10">
            {p.services.map((s) => (
              <li key={s} className="flex items-center justify-between border-b border-white/10 py-4 text-paper">
                {s}
                <span className="h-1 w-1 rounded-full bg-signal" />
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="t-label mb-6 text-mute">The story</p>
          <Reveal>
            <p className="t-h3 text-paper">{p.summary}</p>
            <p className="t-lead mt-8 text-mute">{p.story}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-paper transition-colors hover:border-signal hover:bg-signal"
            >
              Visit the live site <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      <Link href={`/work/${next.slug}`} data-cursor="Next" className="group relative block overflow-hidden border-t border-white/10">
        <div className="wrap relative py-28 md:py-40">
          <p className="t-label mb-6 text-mute">Next project</p>
          <p className="t-mega transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4">
            {next.short}
            <span className="text-signal">.</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
