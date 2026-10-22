"use client";

import { useRef } from "react";
import Video from "./Video";
import { MEDIA } from "@/data/site";
import { useScrollProgress, mix } from "@/lib/scroll";

/** Full-bleed film that opens from a small window as it scrolls into place. */
export default function InkFilm() {
  const ref = useRef(null);
  const frame = useRef(null);
  const text = useRef(null);
  useScrollProgress(ref, ["start end", "start start"], (p) => {
    const i = mix(18, 0, p);
    if (frame.current) frame.current.style.clipPath = `inset(${i}% ${i}% ${i}% ${i}% round ${mix(10, 0, p)}px)`;
    if (text.current) text.current.style.transform = `translateY(${mix(30, 0, p)}%)`;
  });

  return (
    <section ref={ref} data-snap className="relative h-[100svh] min-h-[640px] bg-ink">
      <div
        ref={frame}
        style={{ clipPath: "inset(18% 18% 18% 18% round 10px)" }}
        className="absolute inset-0 overflow-hidden bg-paper"
      >
        <Video src={MEDIA.inkVideo} poster={MEDIA.inkPoster} className="scale-110" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-paper via-paper/80 to-transparent" />
        <div
          ref={text}
          style={{ transform: "translateY(30%)" }}
          className="wrap absolute inset-0 flex flex-col justify-between py-24 text-ink md:py-28"
        >
          <p className="t-label text-ink/70">(03) How we think</p>
          <div>
            <p className="t-display max-w-[11ch]">
              Every pixel, <span className="serif">on purpose</span>.
            </p>
            <p className="t-lead mt-6 max-w-md text-ink/70">
              No templates, no page builders, no filler. Each site starts on a blank page and is shaped around one
              business and the people it wants to win.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
