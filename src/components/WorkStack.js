"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { onScrollFrame, progress, mix } from "@/lib/scroll";
import WorkVideo from "./WorkVideo";

// Screenshots are ~1366Ã—690. Cards use the same ratio so the image always fills, uncropped.
const RATIO = 1366 / 690;

function Card({ project, index, total, cardRef }) {
  return (
    <div data-snap className="sticky top-0 flex h-[100svh] items-center justify-center [perspective:1600px]">
      <div
        ref={(el) => (cardRef.current[index] = el)}
        style={{ width: `min(100%, calc(72svh * ${RATIO}))` }}
        className="relative origin-[50%_0%] bg-ink will-change-transform"
      >
        <Link href={`/work/${project.slug}`} data-cursor="View" className="group block">
          <div style={{ aspectRatio: `${RATIO}` }} className="relative w-full overflow-hidden rounded-[12px] bg-ink-2">
            <div data-img className="absolute inset-0 will-change-transform">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-cover object-top transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
              />
              <WorkVideo
                src={project.video}
                className="transition-[opacity,transform] duration-[0.4s,1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
              />
            </div>
          </div>

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
        <div data-dim className="pointer-events-none absolute -inset-px bg-ink opacity-0" />
      </div>
    </div>
  );
}

export default function WorkStack({ projects }) {
  const wrap = useRef(null);
  const cards = useRef([]);

  // Cards are sticky, so measure each one's flow position from the (non-sticky) wrapper.
  useEffect(() => {
    return onScrollFrame((vh) => {
      if (!wrap.current) return;
      const top = wrap.current.getBoundingClientRect().top;
      const n = cards.current.length;
      cards.current.forEach((card, i) => {
        if (!card) return;
        const h = card.parentElement.offsetHeight;
        const t = top + i * h;
        const last = i === n - 1;
        // Entering: the card rises over the previous one; its image settles from a slight zoom.
        const enter = progress(t, h, ["start end", "start start"], vh);
        // Leaving: covered by the next card, it tips back and sinks into shadow.
        const leave = progress(t, h, ["start start", "end start"], vh);
        card.style.transform = last ? "" : `scale(${mix(1, 0.9, leave)}) rotateX(${mix(0, 7, leave)}deg)`;
        card.querySelector("[data-img]").style.transform = `scale(${mix(i === 0 ? 1 : 1.08, 1, enter)})`;
        card.querySelector("[data-dim]").style.opacity = last ? 0 : Math.min(1, leave / 0.8);
      });
    });
  }, []);

  return (
    <div ref={wrap} className="wrap">
      {projects.map((p, i) => (
        <Card key={p.slug} project={p} index={i} total={projects.length} cardRef={cards} />
      ))}
    </div>
  );
}
