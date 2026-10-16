"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Screenshots are ~1366×690. Cards use the same ratio so the image always fills, uncropped.
const RATIO = 1366 / 690;

function Card({ project, index, total }) {
  const ref = useRef(null);
  const last = index === total - 1;
  const first = index === 0;

  // Entering: the card rises over the previous one; its image settles from a slight zoom.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imgScale = useTransform(enter, [0, 1], [first ? 1 : 1.08, 1]);

  // Leaving: covered by the next card, it tips back and sinks into shadow.
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(leave, [0, 1], [1, last ? 1 : 0.9]);
  const rotateX = useTransform(leave, [0, 1], [0, last ? 0 : 7]);
  const dim = useTransform(leave, [0, 0.8], [0, last ? 0 : 1]);

  return (
    <div ref={ref} data-snap className="sticky top-0 flex h-[100svh] items-center justify-center [perspective:1600px]">
      <motion.div
        style={{ scale, rotateX, width: `min(100%, calc(72svh * ${RATIO}))` }}
        className="relative origin-[50%_0%] bg-ink will-change-transform"
      >
        <Link href={`/work/${project.slug}`} data-cursor="View" className="group block">
          <motion.div
            style={{ aspectRatio: `${RATIO}` }}
            className="relative w-full overflow-hidden rounded-[12px] bg-ink-2"
          >
            <motion.div style={{ scale: imgScale }} className="absolute inset-0 will-change-transform">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-cover object-top transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
              />
            </motion.div>
          </motion.div>

          <div className="flex items-end justify-between gap-6 pt-5 md:pt-7">
            <div className="min-w-0">
              <p className="t-label mb-3 text-mute">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                <span className="ml-4 text-dim">
                  {project.category}, {project.year}
                </span>
              </p>
              <h3 className="t-h2 text-paper transition-colors duration-500 group-hover:text-signal">{project.short}</h3>
            </div>
            <span className="hidden shrink-0 items-center gap-2 pb-2 text-sm text-paper/70 transition-colors group-hover:text-paper sm:inline-flex">
              View project
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-45" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </span>
          </div>
        </Link>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute -inset-px bg-ink" />
      </motion.div>
    </div>
  );
}

export default function WorkStack({ projects }) {
  return (
    <div className="wrap">
      {projects.map((p, i) => (
        <Card key={p.slug} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}
