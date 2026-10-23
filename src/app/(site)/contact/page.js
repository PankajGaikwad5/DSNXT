import ContactForm from "@/components/ContactForm";
import { Clock, CopyEmail } from "@/components/ContactBits";
import { Lines, Reveal } from "@/components/Motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";

function Row({ Icon, label, action, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 py-5">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div>
          <p className="t-label mb-1 text-ink/45">{label}</p>
          {children}
        </div>
      </div>
      {action}
    </div>
  );
}

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
              <Row Icon={Mail} label="Email" action={<CopyEmail email={SITE.email} />}>
                <a href={`mailto:${SITE.email}`} className="u-link text-lg">
                  {SITE.email}
                </a>
              </Row>
              <Row
                Icon={Phone}
                label="Phone & WhatsApp"
                action={
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-[0.95rem] font-medium text-white transition-opacity hover:opacity-85"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                }
              >
                <a href={`tel:${SITE.tel}`} className="u-link text-lg">
                  {SITE.phone}
                </a>
              </Row>
              <Row Icon={InstagramIcon} label="Instagram">
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="u-link text-lg">
                  @designnext.co
                </a>
              </Row>
              <Row
                Icon={MapPin}
                label="Studio"
                action={
                  <p className="text-lg text-ink/60">
                    <Clock /> IST
                  </p>
                }
              >
                <p className="text-lg">Mumbai, India</p>
              </Row>
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
