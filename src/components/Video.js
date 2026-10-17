"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping background video that only plays while on screen. Nothing is
 * downloaded, not even the poster, until it is about to scroll into view.
 */
export default function Video({ src, poster, className = "" }) {
  const ref = useRef(null);
  const visible = useRef(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting && !reduced;
        if (entry.isIntersecting) setNear(true);
        if (visible.current) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The first play() above runs before src is attached, so start it once it is.
  useEffect(() => {
    if (near && visible.current) ref.current?.play().catch(() => {});
  }, [near]);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      src={near ? src : undefined}
      poster={near ? poster : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
