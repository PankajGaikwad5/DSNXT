import { Lines } from "@/components/Motion";
import PreviewForm from "@/components/PreviewForm";
import InkField from "@/components/LazyInkField";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Free Homepage Preview: See Your New Website Before You Pay",
  description:
    "Send a short brief and get a real, working homepage designed for your business in 48 to 72 hours. No payment and no obligation.",
  path: "/preview",
  keywords: ["free website preview", "free website design mockup", "try before you buy web design"],
});

const STEPS = [
  ["01", "Send your brief", "Two minutes, four fields."],
  ["02", "We design your homepage", "Real and working, in 48 to 72 hours."],
  ["03", "You decide", "Love it and we continue. If not, you owe nothing."],
];

export default function PreviewPage() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-paper text-ink">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <InkField intensity="hero" zone={[0.2, 0.85, 0.3, 0.9]} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper to-transparent" />
      </div>

      <div className="wrap relative grid gap-16 pb-32 pt-40 md:pt-52 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="t-label mb-8 text-ink/60">Free homepage preview</p>
          <Lines
            as="h1"
            className="t-display"
            lines={["See it", <span key="p">before you <span className="serif text-signal">pay.</span></span>]}
          />
          <ol className="mt-14 space-y-6">
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="flex gap-6 border-t border-ink/15 pt-5">
                <span className="t-label pt-1.5 text-signal">{n}</span>
                <div>
                  <p className="text-xl tracking-[-0.02em]">{t}</p>
                  <p className="text-ink/60">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-16">
            <PreviewForm />
          </div>
          <p className="mt-16 text-ink/60">
            Prefer email?{" "}
            <a href={`mailto:${SITE.email}`} className="u-link text-ink">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
