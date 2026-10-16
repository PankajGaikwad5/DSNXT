import Link from "next/link";
import { Lines, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";
import InkHeader from "@/components/InkHeader";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work: Custom Websites for Architects, Artists & Brands",
  description:
    "Selected websites designed and hand-coded by Design Next in Mumbai: architecture and interior studios, collectible design, fine art, podcasts and non-profits.",
  path: "/work",
  keywords: ["web design portfolio Mumbai", "website design examples", "architect website design", "artist portfolio website"],
});

// Rhythm from width and offset; every tile keeps the screenshots' own ratio so images fill uncropped.
const LAYOUT = [
  "md:col-span-12",
  "md:col-span-8 md:col-start-5",
  "md:col-span-8 md:col-start-1",
  "md:col-span-10 md:col-start-3",
  "md:col-span-8 md:col-start-1",
  "md:col-span-8 md:col-start-5",
  "md:col-span-12",
];

export default function WorkPage() {
  return (
    <div className="bg-paper text-ink">
      <InkHeader>
        <p className="t-label mb-8 text-ink/60">Selected work, 2024 to 2026</p>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Lines as="h1" className="t-mega" lines={["Work that", <span key="w" className="serif text-signal">works.</span>]} />
          <Reveal delay={0.3}>
            <p className="t-lead max-w-sm text-ink/60">
              Seven sites for people who make beautiful things, each one designed and coded from scratch.
            </p>
          </Reveal>
        </div>
      </InkHeader>

      <section className="wrap grid gap-x-6 gap-y-20 pb-32 md:grid-cols-12 md:gap-y-28 md:pb-44">
        {PROJECTS.map((p, i) => {
          const cols = LAYOUT[i % LAYOUT.length];
          return (
            <Reveal key={p.slug} className={cols}>
              <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
                <div className="relative aspect-[1366/690] overflow-hidden rounded-[10px] bg-paper-2">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 70vw, 100vw"
                    className="object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  />
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h2 className="t-h3 transition-colors group-hover:text-signal">{p.title}</h2>
                    <p className="mt-1.5 text-ink/60">{p.summary}</p>
                  </div>
                  <span className="t-label text-ink/40 sm:shrink-0 sm:pt-2">
                    {p.category} · {p.year}
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>

      <CtaBand kicker="Your turn" lines={["Want to be", <span key="n" className="serif text-signal">next?</span>]} />
    </div>
  );
}
