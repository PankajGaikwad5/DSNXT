import ContactForm from "@/components/ContactForm";
import { Clock, CopyEmail } from "@/components/ContactBits";
import { Lines, Reveal } from "@/components/Motion";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact a Web Design Studio in Mumbai",
  description: "Start a website project with Design Next in Mumbai. Tell us what you need and get a reply within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="bg-paper text-ink">
      <div className="wrap grid gap-20 pb-32 pt-40 md:pt-48 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="t-label mb-8 text-ink/50">Contact</p>
            <Lines as="h1" className="t-display" lines={["Let's", <span key="t" className="serif text-signal">talk.</span>]} />
            <p className="t-lead mt-8 max-w-sm text-ink/65">
              Tell me what you&apos;re working on. If it&apos;s a good fit, you&apos;ll get a free homepage preview to judge
              before anything is agreed.
            </p>

            <Reveal delay={0.2} className="mt-14 border-t border-ink/15">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 py-5">
                <div>
                  <p className="t-label mb-1.5 text-ink/45">Email</p>
                  <a href={`mailto:${SITE.email}`} className="u-link text-lg">
                    {SITE.email}
                  </a>
                </div>
                <CopyEmail email={SITE.email} />
              </div>
              <div className="border-b border-ink/15 py-5">
                <p className="t-label mb-1.5 text-ink/45">Instagram</p>
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="u-link text-lg">
                  @designnext.co
                </a>
              </div>
              <div className="flex items-end justify-between border-b border-ink/15 py-5">
                <div>
                  <p className="t-label mb-1.5 text-ink/45">Studio</p>
                  <p className="text-lg">Mumbai, India</p>
                </div>
                <p className="text-lg text-ink/60">
                  <Clock /> IST
                </p>
              </div>
            </Reveal>
          </div>
        </aside>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[14px] bg-white/60 p-6 ring-1 ring-ink/10 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
