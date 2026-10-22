"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A tiny stand-in for framer-motion's scroll hooks. One passive scroll/resize
 * listener drives every subscriber once per frame, and subscribers write styles
 * straight to the DOM, so scrolling never re-renders React.
 */

const subs = new Set();
let frame = 0;

function flush() {
  frame = 0;
  const vh = window.innerHeight;
  subs.forEach((fn) => fn(vh));
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

/** Calls fn(viewportHeight) on the next frame and on every scrolled or resized frame. */
export function onScrollFrame(fn) {
  if (subs.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  subs.add(fn);
  // First run on the next frame, so mounting never forces a layout mid-hydration.
  schedule();
  return () => {
    subs.delete(fn);
    if (subs.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

const EDGES = { start: 0, center: 0.5, end: 1 };
const edge = (s) => (s in EDGES ? EDGES[s] : parseFloat(s) / 100);

/**
 * framer-style offsets: ["start end", "end start"] reads "progress is 0 when the
 * target's start meets the viewport's end, 1 when its end meets the viewport's start".
 * `top` is the target's top relative to the viewport.
 */
export function progress(top, height, offset, vh) {
  const at = (o) => {
    const [t, v] = o.split(" ");
    return top + edge(t) * height - edge(v) * vh;
  };
  const a = at(offset[0]);
  const b = at(offset[1]);
  return clamp((0 - a) / (b - a));
}

export const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
export const mix = (from, to, p) => from + (to - from) * p;

/** Calls cb(progress) as the element scrolls through `offset`. Not for sticky elements. */
export function useScrollProgress(ref, offset, cb) {
  const fn = useRef(cb);
  fn.current = cb;
  const [a, b] = offset;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onScrollFrame((vh) => {
      const r = el.getBoundingClientRect();
      fn.current(progress(r.top, r.height, [a, b], vh));
    });
  }, [ref, a, b]);
}

/** True once the element has come within `margin` of the viewport. */
export function useInView(ref, margin = "-10% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}
