import gsap from "gsap";

/*
 * The reel's single source of truth. GSAP tweens the plain numbers in A on one
 * timeline; the 3D scene reads them every frame. Captions are tweened directly.
 *
 * One continuous camera move through one world, ~17s:
 * hook: the phone slams onto the desk → it fills with enquiries → likes float up and
 * fade to nothing → a red thread from the phone back to the laptop → work pops off
 * the screen, people click, emails fly → the desk falls away and the laptop sits on
 * top of a planet, arcs arriving from all over it.
 */

export const FONTS = { sans: "sans-serif", serif: "serif", mono: "monospace" };

// Real project screenshots from /public/work, preloaded by Reel before the scene starts.
export const WORK = ["KDAD", "pkd", "KDH", "timyule", "cuddles", "shukhabar"];
export const IMAGES = {};

export const A = {
  cam: { x: 0, y: 2.55, z: 1.75, tx: 0, ty: 0, tz: 0 },
  shake: 0,
  fogFar: 13,
  phone: { drop: 0, on: 0, notes: 0, flash: 0, out: 0 },
  likes: { p: 0 },
  thread: { p: 0, out: 0 },
  laptop: { on: 0 },
  tiles: [0, 1, 2].map(() => ({ p: 0, pulse: 0, out: 0 })),
  cursors: [0, 1, 2].map(() => ({ p: 0, out: 0 })),
  mails: [0, 1, 2].map(() => ({ p: 0 })),
  desk: { fade: 0 },
  globe: { p: 0, arcs: 0 },
};

const INITIAL = JSON.parse(JSON.stringify(A));

function reset(target, source) {
  for (const k of Object.keys(source)) {
    if (typeof source[k] === "object") reset(target[k], source[k]);
    else target[k] = source[k];
  }
}

// Whole lines snap up (nothing is masked, so nothing can be clipped), hold, then fade out.
function caption(tl, el, tIn, tOut, fast = false) {
  const lines = el.querySelectorAll(".gf-line");
  tl.set(el, { autoAlpha: 1 }, tIn);
  tl.fromTo(
    lines,
    { autoAlpha: 0, y: fast ? 0 : 22, scale: fast ? 1.08 : 1 },
    { autoAlpha: 1, y: 0, scale: 1, duration: fast ? 0.22 : 0.38, ease: "power3.out", stagger: fast ? 0.04 : 0.06 },
    tIn,
  );
  if (tOut == null) return;
  tl.to(lines, { autoAlpha: 0, y: -14, duration: 0.2, ease: "power2.in", stagger: 0.02 }, tOut);
  tl.set(el, { autoAlpha: 0 }, tOut + 0.28);
}

export function buildTimeline({ caps, endBrand }) {
  reset(A, INITIAL);
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: "power3.inOut" } });

  // 0 · hook: the phone slams down, the frame shakes, it lights up with work
  caption(tl, caps[0], 0, 2.2, true);
  tl.to(A.phone, { drop: 1, duration: 0.38, ease: "power3.in" }, 0.02)
    .to(A, { shake: 1, duration: 0.04 }, 0.4)
    .to(A, { shake: 0, duration: 0.4, ease: "power2.out" }, 0.44)
    .to(A.phone, { on: 1, duration: 0.25, ease: "power2.out" }, 0.42)
    .to(A.cam, { y: 3.05, z: 2.15, duration: 1.4, ease: "expo.out" }, 0.4);
  [0.6, 1.05, 1.5, 1.95].forEach((t, i) => {
    tl.to(A.phone, { notes: i + 1, duration: 0.32, ease: "power3.out" }, t)
      .to(A.phone, { flash: 1, duration: 0.08, ease: "power2.out" }, t)
      .to(A.phone, { flash: 0, duration: 0.4, ease: "power2.in" }, t + 0.08);
  });

  // 1 · calls, emails, enquiries
  caption(tl, caps[1], 2.35, 4.45);

  // 2 · not from social media: likes float up off the phone and fade into nothing
  caption(tl, caps[2], 4.6, 6.75);
  tl.to(A.cam, { y: 2.7, z: 3.3, ty: 0.6, duration: 0.7 }, 4.45).to(A.likes, { p: 1, duration: 2.3, ease: "none" }, 4.55);

  // 3 · from my website: a thread runs from the phone back to the laptop
  caption(tl, caps[3], 6.9, 9.05);
  tl.to(A.thread, { p: 1, duration: 0.85, ease: "power2.inOut" }, 6.75)
    .to(A.cam, { x: 1.0, y: 1.7, z: 1.3, tx: 0, ty: 0.1, tz: -1.4, duration: 0.8 }, 6.7)
    .to(A.cam, { x: 1.15, y: 1.85, z: 0.7, ty: 0.55, tz: -3.4, duration: 1.0 }, 7.45)
    .to(A.laptop, { on: 1, duration: 0.4, ease: "power2.out" }, 7.75);

  // 4 · people saw my work
  caption(tl, caps[4], 9.2, 11.6);
  tl.to(A.cam, { x: 0.25, y: 1.0, z: 1.4, ty: 0.82, tz: -2.6, duration: 0.8 }, 9.0).to(
    A.tiles,
    { p: 1, duration: 0.5, ease: "back.out(1.4)", stagger: 0.12 },
    9.15,
  );
  [9.7, 10.15, 10.6].forEach((t, i) => {
    tl.to(A.cursors[i], { p: 1, duration: 0.35, ease: "power3.out" }, t)
      .to(A.tiles[i], { pulse: 1, duration: 0.25, ease: "power1.inOut" }, t + 0.32)
      .to(A.mails[i], { p: 1, duration: 0.8, ease: "power2.in" }, t + 0.4);
  });

  // 5 · from all over the world: the desk falls away, the laptop is on top of a planet
  caption(tl, caps[5], 11.75, 13.95);
  tl.to(A.tiles, { out: 1, duration: 0.3, ease: "power3.in", stagger: 0.04 }, 11.5)
    .to(A.cursors, { out: 1, duration: 0.25, ease: "power3.in" }, 11.45)
    .to(A.phone, { out: 1, duration: 0.3, ease: "power3.in" }, 11.55)
    .to(A.thread, { out: 1, duration: 0.3 }, 11.55)
    .to(A.desk, { fade: 1, duration: 0.4 }, 11.6)
    .to(A, { fogFar: 45, duration: 0.7, ease: "power2.out" }, 11.6)
    .to(A.globe, { p: 1, duration: 1.0, ease: "expo.out" }, 11.9)
    .to(A.cam, { x: 0, y: 1.6, z: 5.4, ty: -0.2, tz: -3.4, duration: 1.2 }, 11.6)
    .to(A.globe, { arcs: 1, duration: 1.6, ease: "none" }, 12.4)
    .to(A.cam, { y: 5.5, z: 8.0, ty: -1.4, duration: 2.4, ease: "sine.inOut" }, 12.9);

  // 6 · end card
  caption(tl, caps[6], 14.1);
  tl.fromTo(endBrand, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 14.6);
  tl.to({}, { duration: 2.4 }, 14.9);

  return tl;
}
