import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import InkHeader from "@/components/InkHeader";
import CtaBand from "@/components/CtaBand";
import Arrow from "@/components/Arrow";
import { WhatsAppIcon } from "@/components/Icons";
import { Lines } from "@/components/Motion";
import { SITE } from "@/data/site";
import { getGuide, getGuides } from "@/lib/guides";
import { JsonLd, ORG_ID, PERSON_ID, breadcrumbs, faqPage, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

const shareImage = (g) => ({ url: `${SITE.url}/guides/${g.slug}/og`, width: 1200, height: 630, alt: g.title });

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const meta = pageMeta({ title: g.title, description: g.description, path: `/guides/${g.slug}`, keywords: g.keywords, image: shareImage(g) });
  return {
    ...meta,
    authors: [{ name: "Pankaj Gaikwad", url: `${SITE.url}/founder` }],
    openGraph: { ...meta.openGraph, type: "article", publishedTime: g.date, modifiedTime: g.updated, authors: [`${SITE.url}/founder`] },
  };
}

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const minutes = Math.max(1, Math.round(g.body.split(/\s+/).length / 220));
  const more = getGuides().filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <article className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: g.title,
          description: g.description,
          image: shareImage(g).url,
          inLanguage: "en-IN",
          datePublished: g.date,
          dateModified: g.updated,
          keywords: g.keywords.join(", "),
          wordCount: g.body.split(/\s+/).length,
          mainEntityOfPage: `${SITE.url}${path}`,
          author: { "@type": "Person", "@id": PERSON_ID, name: "Pankaj Gaikwad", url: `${SITE.url}/founder` },
          publisher: { "@id": ORG_ID },
        }}
      />
      {g.faqs.length > 0 && <JsonLd data={faqPage(g.faqs)} />}
      <JsonLd data={breadcrumbs([{ name: "Guides", path: "/guides" }, { name: g.title, path }])} />

      <InkHeader className="pb-14 pt-40 md:pb-20 md:pt-52">
        <Link href="/guides" className="t-label mb-10 inline-flex items-center gap-2 text-ink/60 hover:text-ink">
          <Arrow className="h-3 w-3 rotate-180" /> All guides
        </Link>
        <Lines as="h1" className="t-display max-w-[20ch]" lines={[g.title]} />
        <p className="t-label mt-10 text-ink/50">
          By <Link href="/founder" className="u-link text-ink">Pankaj Gaikwad</Link>
          {g.updated && <> · Updated {fmt(g.updated)}</>} · {minutes} min read
        </p>
      </InkHeader>

      <section className="wrap pb-20 md:pb-28">
        <div className="prose-guide max-w-[68ch]" dangerouslySetInnerHTML={{ __html: g.html }} />

        {/* Readers who finish a guide are the warmest leads on the site, so ask them here. */}
        <aside className="mt-16 max-w-[68ch] rounded-[14px] bg-ink p-8 text-paper md:p-10">
          <p className="t-label text-signal">Want this done for you?</p>
          <p className="t-h3 mt-4">Get a free homepage preview for your business in 72 hours.</p>
          <p className="mt-3 text-mute">No payment and no obligation. Or just ask a question, I reply within one working day.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/preview" className="group inline-flex items-center gap-3 rounded-full bg-signal py-3.5 pl-6 pr-5 font-medium text-white transition-colors hover:bg-paper hover:text-ink">
              Get my free preview <Arrow />
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 font-medium text-white transition-opacity hover:opacity-85">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 transition-colors hover:border-paper">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </aside>

        {more.length > 0 && (
          <nav className="mt-20 max-w-[68ch]" aria-label="More guides">
            <p className="t-label mb-6 text-ink/50">More guides</p>
            <ul className="border-t border-ink/15">
              {more.map((x) => (
                <li key={x.slug}>
                  <Link href={`/guides/${x.slug}`} className="group flex items-center justify-between gap-6 border-b border-ink/15 py-5">
                    <span className="text-xl tracking-[-0.02em] transition-colors group-hover:text-signal">{x.title}</span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>

      <CtaBand />
    </article>
  );
}
