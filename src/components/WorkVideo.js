"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A project's screen recording, layered over its screenshot. It plays while its project
 * is the one in focus (mostly on screen and not covered). Recordings start buffering
 * about a screen ahead, one at a time, so the next one is ready when it arrives. Only one
 * plays at a time, and it fades in only once frames are actually playing, so the
 * screenshot is never replaced by black.
 */

const items = new Set();
let current = null;
let timer = 0;

function allowed() {
  const c = navigator.connection;
  if (c && (c.saveData || /2g/.test(c.effectiveType || ""))) return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True when the middle of el's on-screen part isn't covered by something else. */
function onTop(el) {
  const r = el.getBoundingClientRect();
  const x = (Math.max(r.left, 0) + Math.min(r.right, window.innerWidth)) / 2;
  const y = (Math.max(r.top, 0) + Math.min(r.bottom, window.innerHeight)) / 2;
  return el.contains(document.elementFromPoint(x, y));
}

function focus() {
  timer = 0;
  let best = null;
  items.forEach((it) => {
    if (it.ratio >= 0.6 && (!best || it.ratio >= best.ratio) && onTop(it.host)) best = it;
  });
  if (best === current) return;
  current?.stop();
  best?.play();
}

// Checked while scrolling, at most every 100ms. Waiting for the smooth scroll and its
// snap to come to rest first held the recording back by seconds.
function check() {
  if (!timer) timer = setTimeout(focus, 100);
}

// Background buffering: one recording at a time so they don't split the bandwidth.
// The one in focus skips the queue entirely.
const waiting = [];
let loading = null;

function pump() {
  if (loading) return;
  loading = waiting.shift() || null;
  if (!loading) return;
  if (loading.attached) {
    loading = null;
    return pump();
  }
  const v = loading.video;
  const done = () => {
    v.removeEventListener("canplaythrough", done);
    v.removeEventListener("error", done);
    clearTimeout(t);
    loading = null;
    pump();
  };
  const t = setTimeout(done, 5000);
  v.addEventListener("canplaythrough", done);
  v.addEventListener("error", done);
  loading.attach();
}

function enqueue(it) {
  if (it.attached || waiting.includes(it)) return;
  waiting.push(it);
  pump();
}

function dequeue(it) {
  const i = waiting.indexOf(it);
  if (i !== -1) waiting.splice(i, 1);
}

function register(it) {
  if (items.size === 0) window.addEventListener("scroll", check, { passive: true });
  items.add(it);
}

function unregister(it) {
  items.delete(it);
  dequeue(it);
  if (items.size === 0) {
    window.removeEventListener("scroll", check);
    clearTimeout(timer);
    timer = 0;
  }
}

/** className replaces the default fade, for callers that also animate transform. */
export default function WorkVideo({ src, className = "transition-opacity duration-400" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src || !allowed()) return;
    const host = v.closest("a") || v.parentElement;

    const it = {
      host,
      video: v,
      ratio: 0,
      attached: false,
      attach() {
        if (it.attached) return;
        it.attached = true;
        v.preload = "auto";
        v.src = src;
      },
      play() {
        current = it;
        // The one in focus never waits its turn in the queue.
        dequeue(it);
        it.attach();
        v.play().catch(() => {});
      },
      stop() {
        if (current === it) current = null;
        v.pause();
        setOn(false);
      },
    };

    const io = new IntersectionObserver(
      ([e]) => {
        it.ratio = e.intersectionRatio;
        check();
      },
      { threshold: [0, 0.35, 0.6, 0.8, 1] }
    );

    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        enqueue(it);
        near.disconnect();
      },
      { rootMargin: "100% 0px" }
    );

    io.observe(host);
    near.observe(host);
    register(it);

    return () => {
      io.disconnect();
      near.disconnect();
      unregister(it);
      if (current === it) current = null;
      v.pause();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={() => current?.host.contains(ref.current) && setOn(true)}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-top ${
        on ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
