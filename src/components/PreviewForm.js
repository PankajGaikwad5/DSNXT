"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Arrow from "./Arrow";
import { WhatsAppIcon } from "./Icons";
import { SITE } from "@/data/site";

const FIELDS = [
  { name: "name", label: "Your name", placeholder: "Karan Desai", required: true },
  { name: "business", label: "Business", placeholder: "Karan Desai Architecture", required: true },
  { name: "what", label: "What you do", placeholder: "Luxury residential architecture" },
  { name: "contact", label: "Email or WhatsApp", placeholder: "you@studio.com", required: true },
];

export default function PreviewForm() {
  const [data, setData] = useState({});
  const [sent, setSent] = useState(false);

  const body = `Hi Design Next,\n\nI'd like a free homepage preview.\n\nName: ${data.name ?? ""}\nBusiness: ${data.business ?? ""}\nWhat we do: ${data.what ?? ""}\nContact: ${data.contact ?? ""}`;
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`Free preview: ${data.business ?? ""}`)}&body=${encodeURIComponent(body)}`;
  const whatsapp = `${SITE.whatsapp}?text=${encodeURIComponent(body)}`;

  return (
    <>
      {!sent ? (
        <form
          key="form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-2"
        >
          {FIELDS.map((f) => (
            <label key={f.name} className="group block border-b border-ink/20 pb-4 pt-6 focus-within:border-signal">
              <span className="t-label text-ink/45 group-focus-within:text-signal">
                {f.label}
                {f.required && " *"}
              </span>
              <input
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                className="mt-2 block w-full bg-transparent text-2xl tracking-[-0.03em] text-ink placeholder:text-ink/25 focus:outline-none md:text-3xl"
              />
            </label>
          ))}
          <button
            type="submit"
            className="group mt-10 inline-flex w-full items-center justify-between rounded-full bg-signal py-5 pl-8 pr-6 text-lg font-medium text-white transition-colors hover:bg-ink"
          >
            Request my preview <Arrow className="h-5 w-5" />
          </button>
          <p className="pt-3 text-sm text-ink/50">No payment, no obligation. We reply within one working day.</p>
        </form>
      ) : (
        <div key="done" className="enter-up py-6">
          <p className="t-h2">
            Almost there, <span className="serif text-signal">{data.name?.split(" ")[0]}.</span>
          </p>
          <p className="t-lead mt-6 max-w-md text-ink/60">Choose how to send your brief. It&apos;s already written for you.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={mailto} className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-paper hover:bg-signal">
              <Mail className="h-4 w-4" /> Send by email
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 hover:border-ink"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25d366]" /> Send on WhatsApp
            </a>
          </div>
          <button onClick={() => setSent(false)} className="u-link mt-10 text-sm text-ink/50">
            Edit details
          </button>
        </div>
      )}
    </>
  );
}
