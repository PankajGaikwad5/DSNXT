"use client";

import { useState } from "react";
import Arrow from "./Arrow";
import { SITE } from "@/data/site";

const NEEDS = ["New website", "Redesign", "Landing page", "Something else"];
const TIMING = ["As soon as possible", "Within 1 to 2 months", "Just exploring"];

function Chips({ label, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="t-label mb-4 text-ink/50">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(on ? "" : o)}
              aria-pressed={on}
              className={`rounded-full border px-5 py-2.5 text-[0.95rem] transition-colors duration-300 ${
                on ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({ label, name, type = "text", required, textarea, value, onChange }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="group block">
      <span className="t-label text-ink/50 transition-colors group-focus-within:text-signal">
        {label}
        {required && <span className="text-signal"> *</span>}
      </span>
      <Tag
        name={name}
        type={textarea ? undefined : type}
        required={required}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full resize-none border-b border-ink/20 bg-transparent pb-3 text-xl tracking-[-0.02em] text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}

export default function ContactForm() {
  const [f, setF] = useState({ need: "", timing: "", name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));

  const body = [
    `Hi Design Next,`,
    ``,
    f.message,
    ``,
    f.need && `Looking for: ${f.need}`,
    f.timing && `Timing: ${f.timing}`,
    `Name: ${f.name}`,
    f.company && `Company: ${f.company}`,
    `Email: ${f.email}`,
  ]
    .filter((l) => l !== false && l !== undefined)
    .join("\n");
  const subject = `New enquiry from ${f.name}${f.company ? `, ${f.company}` : ""}`;
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(body)}`;

  if (sent) {
    return (
      <div className="flex min-h-[28rem] flex-col justify-center">
        <p className="t-h2">
          Thank you, <span className="serif text-signal">{f.name.split(" ")[0]}.</span>
        </p>
        <p className="t-lead mt-6 max-w-md text-ink/65">
          Your message is written and ready. Send it the way you prefer and you&apos;ll hear back within one working day.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={mailto} className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-paper transition-colors hover:bg-signal">
            Send by email <Arrow />
          </a>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 transition-colors hover:border-ink">
            Send on WhatsApp <Arrow />
          </a>
        </div>
        <button onClick={() => setSent(false)} className="u-link mt-10 w-fit text-sm text-ink/50">
          Edit message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-12"
    >
      <Chips label="What do you need?" options={NEEDS} value={f.need} onChange={set("need")} />
      <Chips label="When?" options={TIMING} value={f.timing} onChange={set("timing")} />
      <div className="grid gap-10 sm:grid-cols-2">
        <Field label="Your name" name="name" required value={f.name} onChange={set("name")} />
        <Field label="Email" name="email" type="email" required value={f.email} onChange={set("email")} />
      </div>
      <Field label="Company or practice" name="company" value={f.company} onChange={set("company")} />
      <Field label="Tell me a little about it" name="message" textarea required value={f.message} onChange={set("message")} />
      <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
        <p className="text-sm text-ink/50">No obligation. Replies within one working day.</p>
        <button
          type="submit"
          className="group inline-flex items-center gap-3 rounded-full bg-signal py-4 pl-8 pr-6 text-[0.95rem] font-medium text-white transition-colors hover:bg-ink"
        >
          Send message <Arrow />
        </button>
      </div>
    </form>
  );
}
