"use client";

import { useRef } from "react";
import { useInView, useScrollProgress, mix } from "@/lib/scroll";

export function Reveal({ children, delay = 0, y = 40, className = "", as = "div" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--reveal-y": `${y}px`, transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

/** Each line slides up from behind a mask. Pass lines as an array of nodes. */
export function Lines({ lines, className, delay = 0, as = "div" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            className={`line-up block ${inView ? "is-in" : ""}`}
            style={{ transitionDelay: `${delay + i * 0.09}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className }) {
  const ref = useRef(null);
  const spans = useRef([]);
  const words = text.split(" ");
  useScrollProgress(ref, ["start 85%", "end 45%"], (p) => {
    const n = spans.current.length;
    spans.current.forEach((s, i) => {
      if (s) s.style.opacity = mix(0.14, 1, Math.min(1, Math.max(0, p * n - i)));
    });
  });
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const accent = w.startsWith("*");
        return (
          <span
            key={i}
            ref={(el) => (spans.current[i] = el)}
            style={{ opacity: 0.14 }}
            className={accent ? "serif text-signal" : undefined}
          >
            {accent ? w.slice(1) : w}{" "}
          </span>
        );
      })}
    </p>
  );
}

/** Image/video parallax inside an overflow-hidden frame. */
export function Parallax({ children, className, amount = 12 }) {
  const ref = useRef(null);
  const inner = useRef(null);
  useScrollProgress(ref, ["start end", "end start"], (p) => {
    if (inner.current) inner.current.style.transform = `translateY(${mix(-amount, amount, p)}%) scale(${1 + amount / 50})`;
  });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={inner} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
