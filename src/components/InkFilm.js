"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Video from "./Video";
import { MEDIA } from "@/data/site";

/** Full-bleed film that opens from a small window as it scrolls into place. */
export default function InkFilm() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

  return (
    <section ref={ref} data-snap className="relative h-[100svh] min-h-[640px] bg-ink">
      <motion.div style={{ clipPath }} className="absolute inset-0 overflow-hidden bg-paper">
        <Video src={MEDIA.inkVideo} poster={MEDIA.inkPoster} className="scale-110" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-paper via-paper/80 to-transparent" />
        <motion.div style={{ y: textY }} className="wrap absolute inset-0 flex flex-col justify-between py-24 text-ink md:py-28">
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
        </motion.div>
      </motion.div>
    </section>
  );
}
