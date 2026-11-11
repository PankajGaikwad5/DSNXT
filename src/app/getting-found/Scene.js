"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { A, FONTS, IMAGES } from "./anim";

/*
 * Framing: captions own the top ~36% of the 9:16 frame. The camera's view is offset
 * so whatever it looks at lands ~64% down the frame, under the text.
 * Objects are never set invisible, only scaled to ~0, so every material compiles on
 * the first frame instead of stuttering when it first appears.
 */

const C = {
  ink: "#0a0a0a",
  ink2: "#141414",
  ink3: "#1d1d1d",
  paper: "#f3f0ea",
  paper2: "#e7e3db",
  mute: "#8b8781",
  dim: "#55524d",
  signal: "#e4200f",
  hot: "#ff3a26",
};

const TINY = 0.0001;
const LAPTOP_Z = -3.4;

/* ---------------- helpers ---------------- */

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, t) => a + (b - a) * t;
const bump = (p) => Math.sin(clamp01(p) * Math.PI);
const cubicIn = (x) => x * x * x;
const tiny = (s) => Math.max(TINY, s);

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return { c, g: c.getContext("2d"), t };
}

function canvasTexture(w, h, draw) {
  const k = makeCanvas(w, h);
  draw(k.g, w, h);
  k.t.needsUpdate = true;
  return k.t;
}

// Draws a project screenshot to fill the box, cropping from the top so the hero stays in view.
function drawShot(g, name, x, y, w, h) {
  const img = IMAGES[name];
  if (!img) {
    g.fillStyle = C.ink3;
    g.fillRect(x, y, w, h);
    return;
  }
  const s = Math.max(w / img.width, h / img.height);
  const sw = w / s;
  const sh = h / s;
  g.drawImage(img, (img.width - sw) / 2, 0, sw, sh, x, y, w, h);
}

/* ---------------- materials ---------------- */

const physical = (color, extra = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.38, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.22, ...extra });

const MAT = {
  ink2: physical(C.ink2),
  ink3: physical(C.ink3),
  alu: physical("#2a2a2c", { metalness: 0.6, roughness: 0.35 }),
  paper: physical(C.paper, { roughness: 0.5, clearcoat: 0.4 }),
  paper2: physical(C.paper2, { roughness: 0.55, clearcoat: 0.3 }),
  mute: physical(C.mute, { roughness: 0.5, clearcoat: 0.4 }),
  red: physical(C.signal, { roughness: 0.28, emissive: C.signal, emissiveIntensity: 0.35 }),
  globe: physical(C.ink2, { roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 }),
  desk: new THREE.MeshPhysicalMaterial({
    color: "#0e0e0e",
    roughness: 0.42,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
    transparent: true,
  }),
};

/* ---------------- camera ---------------- */

const look = new THREE.Vector3();

function Rig({ onReady }) {
  const { camera, size } = useThree();
  const frames = useRef(0);
  const lastSize = useRef("");
  useFrame((state) => {
    const key = `${size.width}x${size.height}`;
    if (key !== lastSize.current) {
      lastSize.current = key;
      // shift the picture down so the subject sits under the caption band
      camera.setViewOffset(size.width, size.height, 0, -0.14 * size.height, size.width, size.height);
    }
    const t = state.clock.elapsedTime;
    const c = A.cam;
    const k = A.shake * 0.05; // impact shake when the phone lands
    camera.position.set(
      c.x + Math.sin(t * 0.4) * 0.03 + Math.sin(t * 93) * k,
      c.y + Math.sin(t * 0.3) * 0.025 + Math.cos(t * 81) * k,
      c.z + Math.sin(t * 67) * k * 0.5,
    );
    camera.lookAt(look.set(c.tx, c.ty, c.tz));
    if (state.scene.fog) state.scene.fog.far = A.fogFar;
    if (frames.current < 6) {
      frames.current++;
      if (frames.current === 6) onReady?.();
    }
  });
  return null;
}

/* ---------------- desk ---------------- */

function Desk() {
  const mesh = useRef();
  useFrame(() => {
    const f = A.desk.fade;
    MAT.desk.opacity = 1 - f;
    MAT.desk.depthWrite = f < 0.5;
    if (mesh.current) mesh.current.scale.setScalar(tiny(1 - Math.floor(f)));
  });
  return (
    <mesh ref={mesh} rotation-x={-Math.PI / 2} material={MAT.desk}>
      <planeGeometry args={[30, 30]} />
    </mesh>
  );
}

/* ---------------- 1 · the phone ---------------- */

const PHONE_W = 0.78;
const PHONE_L = 1.6;

const NOTES = [
  { kind: "mail", title: "Project enquiry", body: "Loved your work. Can we talk?" },
  { kind: "call", title: "Intro call booked", body: "Thursday, 11:00" },
  { kind: "mail", title: "New website brief", body: "Found you through your site." },
  { kind: "mail", title: "Re: Proposal", body: "Looks great. Let's start." },
];

function drawPhone(g, n, on) {
  const W = 512;
  const H = 1040;
  g.globalAlpha = 1;
  g.fillStyle = "#050505";
  g.fillRect(0, 0, W, H);
  if (on < 0.01) return;
  g.globalAlpha = on;
  const glow = g.createRadialGradient(W / 2, 120, 10, W / 2, 120, 520);
  glow.addColorStop(0, "rgba(228,32,15,0.22)");
  glow.addColorStop(1, "rgba(228,32,15,0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, W, H);

  g.textBaseline = "middle";
  g.textAlign = "center";
  g.fillStyle = C.paper;
  g.font = `700 118px ${FONTS.sans}`;
  g.fillText("09:41", W / 2, 170);
  g.fillStyle = C.mute;
  g.font = `500 22px ${FONTS.mono}`;
  g.fillText("MONDAY", W / 2, 242);

  // newest on top; older ones slide down as each new one arrives
  const k = Math.min(NOTES.length, Math.ceil(n - 0.001));
  if (k <= 0) return;
  const frac = clamp01(n - (k - 1));
  g.textAlign = "left";
  for (let i = 0; i < k; i++) {
    const newest = i === k - 1;
    const row = newest ? 0 : k - 1 - i - (1 - frac);
    const y = 300 + row * 168 - (newest ? (1 - frac) * 50 : 0);
    g.globalAlpha = on * (newest ? frac : 1);
    const note = NOTES[i];
    g.fillStyle = "rgba(243,240,234,0.96)";
    g.beginPath();
    g.roundRect(24, y, W - 48, 146, 26);
    g.fill();
    g.fillStyle = C.signal;
    g.beginPath();
    g.roundRect(46, y + 38, 70, 70, 17);
    g.fill();
    g.strokeStyle = C.paper;
    g.lineWidth = 5;
    g.lineJoin = "round";
    g.lineCap = "round";
    if (note.kind === "mail") {
      g.strokeRect(62, y + 58, 38, 30);
      g.beginPath();
      g.moveTo(62, y + 58);
      g.lineTo(81, y + 75);
      g.lineTo(100, y + 58);
      g.stroke();
    } else {
      g.beginPath();
      g.roundRect(64, y + 54, 34, 36, 6);
      g.moveTo(64, y + 66);
      g.lineTo(98, y + 66);
      g.stroke();
    }
    g.fillStyle = C.ink;
    g.font = `700 31px ${FONTS.sans}`;
    g.fillText(note.title, 134, y + 54);
    g.fillStyle = C.dim;
    g.font = `400 25px ${FONTS.sans}`;
    g.fillText(note.body, 134, y + 96);
    g.fillStyle = C.mute;
    g.font = `500 18px ${FONTS.mono}`;
    g.textAlign = "right";
    g.fillText("NOW", W - 46, y + 54);
    g.textAlign = "left";
  }
  g.globalAlpha = 1;
}

// One phone screen canvas for the whole page, redrawn only when what it shows changes.
let phoneCanvas = null;
const phoneScreen = () => (phoneCanvas ??= makeCanvas(512, 1040));

function Phone() {
  const group = useRef();
  const light = useRef();
  const last = useRef("");

  useFrame(() => {
    const p = A.phone;
    const g = group.current;
    if (!g) return;
    // drops in from above the camera, flat-ish, and lands hard; then each arrival gives a small lift and a red glow
    const air = 1 - p.drop;
    g.position.set(0, 0.025 + p.flash * 0.025 + air * 2.2, air * 0.6);
    g.rotation.set(-p.flash * 0.02 + air * 0.5, air * 0.35, air * -0.25);
    g.scale.setScalar(tiny(1 - cubicIn(p.out)));
    if (light.current) light.current.intensity = p.flash * 3 + p.on * 0.6;

    const key = `${p.notes.toFixed(3)}|${p.on.toFixed(2)}`;
    if (key !== last.current) {
      last.current = key;
      const screen = phoneScreen();
      drawPhone(screen.g, p.notes, p.on);
      screen.t.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <RoundedBox args={[PHONE_W, 0.05, PHONE_L]} radius={0.024} smoothness={4} material={MAT.ink2} />
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.0262, 0]}>
        <planeGeometry args={[PHONE_W - 0.05, PHONE_L - 0.06]} />
        <meshBasicMaterial map={phoneScreen().t} toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0, 0.5, 0]} color={C.hot} intensity={0} distance={2.5} decay={1.6} />
    </group>
  );
}

/* ---------------- 2 · likes that go nowhere ---------------- */

const heartGeometry = (() => {
  const s = new THREE.Shape();
  s.moveTo(5, 5);
  s.bezierCurveTo(5, 5, 4, 0, 0, 0);
  s.bezierCurveTo(-6, 0, -6, 7, -6, 7);
  s.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
  s.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
  s.bezierCurveTo(16, 7, 16, 0, 10, 0);
  s.bezierCurveTo(7, 0, 5, 5, 5, 5);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 3,
    bevelEnabled: true,
    bevelThickness: 1.2,
    bevelSize: 1,
    bevelSegments: 5,
    curveSegments: 20,
  });
  g.center();
  g.rotateZ(Math.PI);
  g.scale(0.013, 0.013, 0.013);
  return g;
})();

const LIKES = (() => {
  const r = rng(77);
  return Array.from({ length: 9 }, (_, i) => ({
    x: (r() * 2 - 1) * 0.32,
    z: (r() * 2 - 1) * 0.5,
    drift: (r() * 2 - 1) * 0.35,
    spin: (r() * 2 - 1) * 2.2,
    rise: 1.05 + r() * 0.45,
    delay: (i / 9) * 0.62,
  }));
})();

function Likes() {
  const hearts = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    LIKES.forEach((h, i) => {
      const m = hearts.current[i];
      if (!m) return;
      const p = clamp01((A.likes.p - h.delay) / 0.38);
      // pop up off the screen, drift, then shrink away before reaching anything
      m.position.set(h.x + h.drift * p, 0.08 + h.rise * p, h.z * 0.6);
      m.rotation.set(-0.35, h.spin * p + Math.sin(t * 2 + i) * 0.15, Math.sin(t * 1.5 + i) * 0.12);
      const grow = clamp01(p / 0.18);
      const fade = 1 - clamp01((p - 0.55) / 0.45);
      m.scale.setScalar(tiny(p > 0 && p < 1 ? grow * fade * (0.8 + (i % 3) * 0.15) : 0));
    });
  });
  return LIKES.map((_, i) => (
    <mesh
      key={i}
      ref={(el) => (hearts.current[i] = el)}
      geometry={heartGeometry}
      material={i % 4 === 1 ? MAT.mute : MAT.paper2}
    />
  ));
}

/* ---------------- 3 · the thread back to the laptop ---------------- */

const THREAD_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0.03, -0.82),
  new THREE.Vector3(0.34, 0.025, -1.4),
  new THREE.Vector3(-0.3, 0.025, -2.05),
  new THREE.Vector3(0.06, 0.03, -2.6),
  new THREE.Vector3(0, 0.05, LAPTOP_Z + 0.52),
]);

function Thread() {
  const tube = useMemo(() => new THREE.TubeGeometry(THREAD_CURVE, 220, 0.014, 8, false), []);
  const mat = useRef();
  const pulses = useRef([]);
  useEffect(() => () => tube.dispose(), [tube]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { p, out } = A.thread;
    tube.setDrawRange(0, Math.floor((tube.index.count * p) / 3) * 3);
    if (mat.current) mat.current.opacity = 1 - out;
    pulses.current.forEach((m, k) => {
      if (!m) return;
      const on = p >= 0.999 && out < 0.5;
      m.scale.setScalar(on ? 1 : TINY);
      // signal flows from the website back to the phone
      if (on) m.position.copy(THREAD_CURVE.getPoint(1 - ((t * 0.55 + k / 3) % 1)));
    });
  });

  return (
    <>
      <mesh geometry={tube}>
        <meshBasicMaterial ref={mat} color={C.signal} transparent toneMapped={false} />
      </mesh>
      {[0, 1, 2].map((k) => (
        <mesh key={k} ref={(el) => (pulses.current[k] = el)}>
          <sphereGeometry args={[0.026, 14, 10]} />
          <meshBasicMaterial color={C.paper} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

/* ---------------- 4 · the laptop and the work on it ---------------- */

const SCREEN_WORK = ["KDAD", "pkd", "KDH", "timyule", "cuddles", "shukhabar"];

function websiteTexture() {
  return canvasTexture(1024, 640, (g, W) => {
    g.fillStyle = C.paper;
    g.fillRect(0, 0, W, 640);
    g.fillStyle = C.signal;
    g.fillRect(48, 36, 28, 28);
    g.fillStyle = C.dim;
    g.font = `500 20px ${FONTS.mono}`;
    g.textBaseline = "middle";
    g.textAlign = "right";
    g.fillText("WORK   STUDIO   CONTACT", W - 48, 50);
    g.textAlign = "left";
    g.fillStyle = C.ink;
    g.font = `700 64px ${FONTS.sans}`;
    g.fillText("Selected work", 48, 136);
    const gap = 20;
    const cw = (W - 48 * 2 - gap * 2) / 3;
    const ch = cw / 2;
    SCREEN_WORK.forEach((name, i) => {
      const c = i % 3;
      const r = Math.floor(i / 3);
      drawShot(g, name, 48 + c * (cw + gap), 196 + r * (ch + 54), cw, ch);
      g.fillStyle = C.dim;
      g.font = `500 16px ${FONTS.mono}`;
      g.fillText(`0${i + 1}`, 48 + c * (cw + gap), 196 + r * (ch + 54) + ch + 22);
    });
  });
}

function keyboardTexture() {
  return canvasTexture(512, 340, (g, W, H) => {
    g.fillStyle = "#1c1c1e";
    g.fillRect(0, 0, W, H);
    g.fillStyle = "#101011";
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 13; c++) g.fillRect(28 + c * 35.5, 26 + r * 33, 30, 27);
    }
    g.fillRect(160, 216, 192, 100);
  });
}

function Laptop() {
  const screenMat = useRef();
  const light = useRef();
  const site = useMemo(() => websiteTexture(), []);
  const keys = useMemo(() => keyboardTexture(), []);
  const dark = useMemo(() => new THREE.Color("#262626"), []);
  const white = useMemo(() => new THREE.Color("#ffffff"), []);

  useFrame((state) => {
    const on = A.laptop.on;
    screenMat.current?.color.copy(dark).lerp(white, on);
    if (light.current) light.current.intensity = on * (6 + Math.sin(state.clock.elapsedTime * 2) * 0.6);
  });

  return (
    <group position={[0, 0, LAPTOP_Z]}>
      <RoundedBox args={[1.5, 0.05, 1.0]} radius={0.02} smoothness={4} position={[0, 0.025, 0]} material={MAT.alu} />
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.0505, -0.06]}>
        <planeGeometry args={[1.32, 0.78]} />
        <meshBasicMaterial map={keys} toneMapped={false} />
      </mesh>
      <group position={[0, 0.05, -0.5]} rotation-x={-0.2}>
        <RoundedBox args={[1.5, 0.98, 0.035]} radius={0.016} smoothness={4} position={[0, 0.49, 0.0175]} material={MAT.alu} />
        <mesh position={[0, 0.49, 0.0355]}>
          <planeGeometry args={[1.42, 0.89]} />
          <meshBasicMaterial ref={screenMat} map={site} toneMapped={false} />
        </mesh>
      </group>
      <pointLight ref={light} position={[0, 0.6, 0.6]} color={C.hot} intensity={0} distance={4} decay={1.8} />
    </group>
  );
}

// Work popping off the screen, people clicking it, emails flying out.
const TILE_WORK = ["KDAD", "timyule", "cuddles"];

function tileTexture(name) {
  return canvasTexture(720, 400, (g, W, H) => {
    g.fillStyle = C.paper2;
    g.fillRect(0, 0, W, H);
    [26, 48, 70].forEach((x, k) => {
      g.fillStyle = k === 0 ? C.signal : "#bdb6aa";
      g.beginPath();
      g.arc(x, 20, 7, 0, Math.PI * 2);
      g.fill();
    });
    drawShot(g, name, 0, 40, W, H - 40);
  });
}

const TILE_SPOTS = [
  [-0.22, 1.3, -2.75],
  [0.24, 0.82, -2.6],
  [-0.18, 0.34, -2.45],
];
const SCREEN_CENTER = new THREE.Vector3(0, 0.53, LAPTOP_Z - 0.55);

const cursorGeometry = (() => {
  const s = new THREE.Shape();
  const k = 0.36;
  s.moveTo(0, 0);
  s.lineTo(0, -0.5 * k);
  s.lineTo(0.13 * k, -0.38 * k);
  s.lineTo(0.23 * k, -0.58 * k);
  s.lineTo(0.31 * k, -0.54 * k);
  s.lineTo(0.21 * k, -0.34 * k);
  s.lineTo(0.38 * k, -0.34 * k);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2 });
})();

function envelopeTexture() {
  return canvasTexture(340, 220, (g, W, H) => {
    g.fillStyle = C.paper;
    g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(85,82,77,0.55)";
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(10, 12);
    g.lineTo(W / 2, H * 0.58);
    g.lineTo(W - 10, 12);
    g.stroke();
    g.fillStyle = C.signal;
    g.beginPath();
    g.arc(W / 2, H * 0.58, 18, 0, Math.PI * 2);
    g.fill();
  });
}

function Work() {
  const tiles = useRef([]);
  const cursors = useRef([]);
  const mails = useRef([]);
  const projects = useMemo(() => TILE_WORK.map(tileTexture), []);
  const envelope = useMemo(() => envelopeTexture(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    TILE_SPOTS.forEach(([x, y, z], i) => {
      const side = i % 2 ? 1 : -1;
      const tile = tiles.current[i];
      const st = A.tiles[i];
      const o = cubicIn(clamp01(st.out));
      if (tile) {
        tile.position.set(lerp(SCREEN_CENTER.x, x, st.p), lerp(SCREEN_CENTER.y, y, st.p) + Math.sin(t * 1.2 + i) * 0.015, lerp(SCREEN_CENTER.z + 0.06, z, st.p) + o * 0.5);
        tile.rotation.set(-0.06, side * 0.12 + Math.sin(t * 0.7 + i) * 0.03, side * -0.02);
        tile.scale.setScalar(tiny(lerp(0.25, 1, st.p) * (1 + bump(st.pulse) * 0.07) * (1 - o)));
      }

      // cursor glides in from the side and clicks the tile's lower-right area
      const cur = cursors.current[i];
      const cs = A.cursors[i];
      if (cur) {
        const tx = x + 0.13;
        const ty = y - 0.06;
        cur.position.set(lerp(side * 1.5, tx, cs.p), lerp(Math.max(0.25, y - 0.5), ty, cs.p), z + 0.09 + 0.02 * (1 - bump(st.pulse)));
        cur.rotation.set(0, 0, 0.12);
        cur.scale.setScalar(tiny((cs.p > 0.001 ? 1 : 0) * (1 - bump(st.pulse) * 0.18) * (1 - cs.out)));
      }

      // the email that the click produces flies up and out of frame
      const mail = mails.current[i];
      const mp = A.mails[i].p;
      if (mail) {
        mail.position.set(lerp(x, x + side * 1.7, mp), lerp(y, y + 1.3, mp), lerp(z + 0.1, z + 1.5, mp));
        mail.rotation.set(-0.2 * mp, side * mp * 0.9, side * mp * 0.5);
        mail.scale.setScalar(tiny(mp > 0 && mp < 1 ? Math.min(1, mp * 7) : 0));
      }
    });
  });

  return (
    <>
      {TILE_SPOTS.map((_, i) => (
        <group key={`t${i}`} ref={(el) => (tiles.current[i] = el)}>
          <RoundedBox args={[0.68, 0.38, 0.03]} radius={0.012} smoothness={3} material={MAT.paper2} />
          <mesh position={[0, 0, 0.0155]}>
            <planeGeometry args={[0.66, 0.366]} />
            <meshBasicMaterial map={projects[i]} toneMapped={false} />
          </mesh>
        </group>
      ))}
      {TILE_SPOTS.map((_, i) => (
        <mesh key={`c${i}`} ref={(el) => (cursors.current[i] = el)} geometry={cursorGeometry} material={MAT.paper} />
      ))}
      {TILE_SPOTS.map((_, i) => (
        <group key={`m${i}`} ref={(el) => (mails.current[i] = el)}>
          <RoundedBox args={[0.34, 0.22, 0.012]} radius={0.005} smoothness={2} material={MAT.paper} />
          <mesh position={[0, 0, 0.0065]}>
            <planeGeometry args={[0.34, 0.22]} />
            <meshBasicMaterial map={envelope} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ---------------- 5 · the planet ---------------- */

const R = 2.4;
const GLOBE_CENTER = new THREE.Vector3(0, -R - 0.06, LAPTOP_Z);
const DOTS = 5200;
const ARCS = 22;

function arcCurve(dir) {
  const na = dir.clone().normalize();
  const nb = new THREE.Vector3(0, 1, 0);
  const w = Math.acos(THREE.MathUtils.clamp(na.dot(nb), -1, 1));
  const h = 0.06 + 0.22 * (w / Math.PI);
  const s = Math.sin(w);
  const pts = [];
  for (let k = 0; k <= 48; k++) {
    const t = k / 48;
    const d = na
      .clone()
      .multiplyScalar(Math.sin((1 - t) * w) / s)
      .add(nb.clone().multiplyScalar(Math.sin(t * w) / s));
    // ends exactly at the laptop's base on the pole
    pts.push(d.multiplyScalar(R * (1.006 + h * Math.sin(Math.PI * t)) + t * 0.08));
  }
  return new THREE.CatmullRomCurve3(pts);
}

function Globe() {
  const group = useRef();
  const dots = useRef();
  const ring = useRef();
  const pulses = useRef([]);

  const { curves, tubes, delays } = useMemo(() => {
    const r = rng(9);
    const curves = [];
    const delays = [];
    for (let i = 0; i < ARCS; i++) {
      const th = 0.45 + r() * 1.05; // angle from the pole
      const ph = (r() * 2 - 1) * 1.5; // around the side facing camera
      curves.push(arcCurve(new THREE.Vector3(Math.sin(th) * Math.sin(ph), Math.cos(th), Math.sin(th) * Math.cos(ph))));
      delays.push((i / ARCS) * 0.62);
    }
    return { curves, tubes: curves.map((c) => new THREE.TubeGeometry(c, 120, 0.009, 6, false)), delays };
  }, []);

  useEffect(() => {
    const m = new THREE.Matrix4();
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const rr = Math.sqrt(1 - y * y);
      const th = i * golden;
      m.makeTranslation(Math.cos(th) * rr * R * 1.002, y * R * 1.002, Math.sin(th) * rr * R * 1.002);
      dots.current.setMatrixAt(i, m);
    }
    dots.current.instanceMatrix.needsUpdate = true;
    return () => tubes.forEach((t) => t.dispose());
  }, [tubes]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = A.globe;
    if (!group.current) return;
    // grows from its own centre, so its top only reaches the laptop when fully grown
    group.current.scale.setScalar(tiny(g.p));
    ring.current.rotation.set(1.25, 0.15, t * 0.2);
    tubes.forEach((tube, i) => {
      const p = clamp01((g.arcs - delays[i]) / 0.38);
      tube.setDrawRange(0, Math.floor((tube.index.count * p) / 3) * 3);
      const pulse = pulses.current[i];
      if (!pulse) return;
      const on = p >= 0.999;
      pulse.scale.setScalar(on ? 1 : TINY);
      if (on) pulse.position.copy(curves[i].getPoint((t * 0.5 + i * 0.13) % 1));
    });
  });

  return (
    <group ref={group} position={GLOBE_CENTER}>
      <mesh material={MAT.globe}>
        <sphereGeometry args={[R, 96, 64]} />
      </mesh>
      <instancedMesh ref={dots} args={[null, null, DOTS]}>
        <sphereGeometry args={[0.011, 6, 4]} />
        <meshBasicMaterial color={C.mute} toneMapped={false} />
      </instancedMesh>
      <mesh ref={ring}>
        <torusGeometry args={[R * 1.32, 0.008, 8, 200]} />
        <meshBasicMaterial color={C.signal} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      {tubes.map((tube, i) => (
        <mesh key={i} geometry={tube}>
          <meshBasicMaterial color={C.signal} toneMapped={false} />
        </mesh>
      ))}
      {curves.map((_, i) => (
        <mesh key={`p${i}`} ref={(el) => (pulses.current[i] = el)}>
          <sphereGeometry args={[0.022, 10, 8]} />
          <meshBasicMaterial color={C.paper} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- stage ---------------- */

export default function Scene({ onReady }) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      camera={{ fov: 35, position: [0, 3.9, 2.9], near: 0.05, far: 80 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[C.ink]} />
      <fog attach="fog" args={[C.ink, 4, 13]} />
      <Rig onReady={onReady} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[-2.5, 5, 4]} intensity={2.2} />
      <directionalLight position={[3, 1.5, -5]} intensity={1.6} color={C.hot} />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} color={C.signal} position={[5, 1, -2]} rotation-y={-Math.PI / 2} scale={[5, 6, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[3, 5, 1]} />
        <Lightformer form="ring" intensity={1.2} position={[-2, 3, 5]} scale={1.6} />
      </Environment>

      <Desk />
      <Phone />
      <Likes />
      <Thread />
      <Laptop />
      <Work />
      <Globe />
    </Canvas>
  );
}
