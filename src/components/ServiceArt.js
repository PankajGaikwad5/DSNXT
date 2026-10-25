"use client";

/*
 * Small real-time 3D scenes for the three services, rendered like product shots:
 * isometric camera, matte paper / ink / red materials, studio reflections, soft shadows.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const COLORS = { paper: "#f6f3ee", page: "#fbfaf7", line: "#d6d1c7", ink: "#151515", red: "#e4200f" };
const smooth = (t) => t * t * (3 - 2 * t);
const clamp01 = (t) => Math.min(1, Math.max(0, t));

function materials() {
  const m = (color, roughness = 0.55, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
  return {
    paper: m(COLORS.paper, 0.6),
    page: m(COLORS.page, 0.5),
    line: m(COLORS.line, 0.7),
    ink: m(COLORS.ink, 0.4),
    red: m(COLORS.red, 0.35),
  };
}

function slab(w, h, d, mat, r = 0.06) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, h / 2, w / 2, d / 2)), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/* Design: a page that lifts apart into its layers and settles back. */
function buildDesign(scene, M) {
  const root = new THREE.Group();
  const layers = [];
  const layer = (parts) => {
    const g = new THREE.Group();
    parts.forEach(([w, h, d, mat, x, z]) => {
      const s = slab(w, h, d, mat);
      s.position.set(x, h / 2, z);
      g.add(s);
    });
    root.add(g);
    layers.push(g);
    return g;
  };

  layer([[6.2, 0.16, 4.2, M.page, 0, 0]]);
  layer([
    [0.7, 0.08, 0.22, M.ink, -2.45, -1.7],
    [0.45, 0.06, 0.12, M.line, 1.4, -1.7],
    [0.45, 0.06, 0.12, M.line, 2.0, -1.7],
    [0.45, 0.06, 0.12, M.line, 2.6, -1.7],
  ]);
  layer([
    [2.7, 0.12, 0.42, M.ink, -1.4, -0.95],
    [1.5, 0.12, 0.42, M.ink, -2.0, -0.4],
    [1.05, 0.12, 0.42, M.red, -0.6, -0.4],
  ]);
  const img = layer([[2.5, 0.14, 2.6, M.ink, 1.55, 0.25]]);
  const sun = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 48), M.red);
  sun.position.set(1.55, 0.18, -0.2);
  sun.castShadow = true;
  img.add(sun);
  layer([
    [2.7, 0.06, 0.12, M.line, -1.4, 0.3],
    [2.4, 0.06, 0.12, M.line, -1.55, 0.6],
    [1.7, 0.06, 0.12, M.line, -1.9, 0.9],
    [1.2, 0.16, 0.42, M.red, -2.15, 1.5],
  ]);

  root.position.y = -0.3;
  scene.add(root);

  return (t) => {
    // 8s loop: rest → lift apart → hold → settle
    const p = (t % 8) / 8;
    const e = p < 0.15 ? 0 : p < 0.4 ? smooth((p - 0.15) / 0.25) : p < 0.7 ? 1 : p < 0.92 ? 1 - smooth((p - 0.7) / 0.22) : 0;
    layers.forEach((g, i) => {
      const lag = clamp01(e * 1.25 - i * 0.06);
      g.position.y = i * 0.17 + smooth(lag) * i * 0.85;
    });
    root.rotation.y = Math.sin(t * 0.35) * 0.22;
  };
}

/* Development: a grid of blocks built up in a wave from the centre. */
function buildDevelopment(scene, M) {
  const N = 9;
  const gap = 0.92;
  const geo = new RoundedBoxGeometry(0.8, 1, 0.8, 2, 0.1);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.5 });
  const mesh = new THREE.InstancedMesh(geo, mat, N * N);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const color = new THREE.Color();
  const reds = new Set([12, 30, 40, 50, 58, 67]);
  const inks = new Set([4, 20, 24, 36, 44, 56, 60, 76]);
  const cells = [];
  for (let i = 0; i < N * N; i++) {
    const x = (i % N) - (N - 1) / 2;
    const z = Math.floor(i / N) - (N - 1) / 2;
    cells.push({ x: x * gap, z: z * gap, d: Math.hypot(x, z) });
    mesh.setColorAt(i, color.set(reds.has(i) ? COLORS.red : inks.has(i) ? COLORS.ink : COLORS.paper));
  }
  scene.add(mesh);
  const o = new THREE.Object3D();

  return (t) => {
    cells.forEach((c, i) => {
      const w = Math.sin(c.d * 0.85 - t * 1.8);
      const h = 0.25 + 1.9 * Math.pow(Math.max(0, w), 2.2);
      o.position.set(c.x, h / 2 - 0.6, c.z);
      o.scale.set(1, h, 1);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.rotation.y = t * 0.08;
  };
}

/* Search & growth: one red bar climbs past the field, carrying a pin. */
function buildSearch(scene, M) {
  const cols = 7;
  const rows = 5;
  const gap = 0.9;
  const geo = new RoundedBoxGeometry(0.7, 1, 0.7, 2, 0.08);
  const field = new THREE.InstancedMesh(geo, M.paper, cols * rows);
  field.castShadow = true;
  field.receiveShadow = true;
  const base = [];
  for (let i = 0; i < cols * rows; i++) base.push(0.4 + ((i * 37) % 11) / 11 * 1.3);
  scene.add(field);

  const star = slab(0.7, 1, 0.7, M.red, 0.08);
  const sx = 0;
  const sz = 0.9;
  star.position.set(sx, 0, sz);
  scene.add(star);

  const pin = new THREE.Group();
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), M.red);
  head.position.y = 0.62;
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.55, 32), M.red);
  tip.rotation.x = Math.PI;
  tip.position.y = 0.32;
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), M.page);
  dot.position.set(0, 0.64, 0.24);
  [head, tip].forEach((m) => (m.castShadow = true));
  pin.add(head, tip, dot);
  scene.add(pin);

  const o = new THREE.Object3D();
  return (t) => {
    for (let i = 0; i < cols * rows; i++) {
      const x = ((i % cols) - (cols - 1) / 2) * gap;
      const z = (Math.floor(i / cols) - (rows - 1) / 2) * gap;
      const hidden = Math.abs(x - sx) < 0.1 && Math.abs(z - sz) < 0.1;
      const h = hidden ? 0.001 : base[i] + Math.sin(t * 0.9 + i) * 0.15;
      o.position.set(x, h / 2 - 0.6, z);
      o.scale.set(1, h, 1);
      o.updateMatrix();
      field.setMatrixAt(i, o.matrix);
    }
    field.instanceMatrix.needsUpdate = true;

    const p = (t % 8) / 8;
    const g = p < 0.1 ? 0 : p < 0.55 ? smooth((p - 0.1) / 0.45) : p < 0.85 ? 1 : 1 - smooth((p - 0.85) / 0.15);
    const h = 0.5 + g * 3.2;
    star.scale.y = h;
    star.position.y = h / 2 - 0.6;
    pin.position.set(sx, h - 0.6 + 0.05 + Math.sin(t * 2.4) * 0.06, sz);
    pin.rotation.y = t * 1.2;
    pin.scale.setScalar(0.6 + 0.4 * g);
  };
}

const BUILDERS = { design: buildDesign, development: buildDevelopment, search: buildSearch };

/*
 * Every scene draws through one shared, offscreen renderer and is copied into its own
 * 2D canvas. One WebGL context means the studio environment and every shader are built
 * once, during idle time after the page loads, instead of when a section scrolls in.
 */
let gl = null; // { renderer, env, M } once built, false if WebGL is unavailable
const pool = {}; // idle scenes per kind, reused so their shaders stay compiled
const views = new Set();
const bufSize = new THREE.Vector2();
let raf = 0;

function getRenderer() {
  if (gl !== null) return gl;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return (gl = false);
  }
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  return (gl = { renderer, env, M: materials() });
}

function buildScene(kind) {
  const { env, M } = gl;
  const scene = new THREE.Scene();
  scene.environment = env;
  scene.environmentIntensity = 0.55;

  const sunLight = new THREE.DirectionalLight("#ffffff", 2.2);
  sunLight.position.set(5, 12, 6);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  Object.assign(sunLight.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 40 });
  sunLight.shadow.bias = -0.0005;
  sunLight.shadow.radius = 5;
  scene.add(sunLight);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.12 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.6;
  ground.receiveShadow = true;
  scene.add(ground);

  const update = BUILDERS[kind](scene, M);
  const camera = new THREE.OrthographicCamera();
  camera.position.set(10, 9, 10);
  camera.lookAt(0, 0.6, 0);
  return { kind, scene, camera, update };
}

/** Draws s into the bottom-left w×h pixels of the shared buffer. */
function draw(s, w, h) {
  const { renderer } = gl;
  const size = renderer.getSize(bufSize);
  if (size.x < w || size.y < h) renderer.setSize(Math.max(size.x, w), Math.max(size.y, h), false);
  renderer.setViewport(0, 0, w, h);
  renderer.setScissor(0, 0, w, h);
  renderer.setScissorTest(true);
  renderer.render(s.scene, s.camera);
}

function acquire(kind) {
  return pool[kind]?.pop() || buildScene(kind);
}

function release(s) {
  (pool[s.kind] ||= []).push(s);
}

function frame(now) {
  raf = views.size ? requestAnimationFrame(frame) : 0;
  const canvas = gl.renderer.domElement;
  views.forEach((v) => {
    if (!v.isLive()) return;
    const { width: w, height: h } = v.canvas;
    v.scene.update((now - v.start) / 1000);
    draw(v.scene, w, h);
    v.ctx.clearRect(0, 0, w, h);
    v.ctx.drawImage(canvas, 0, canvas.height - h, w, h, 0, 0, w, h);
  });
}

// Heavy steps run one at a time, each in its own idle slot, so no single frame stalls.
let queue = Promise.resolve();
const idle = () =>
  new Promise((r) => (window.requestIdleCallback ? requestIdleCallback(r, { timeout: 1500 }) : setTimeout(r, 60)));
function schedule(fn) {
  return (queue = queue.then(idle).then(fn).catch(() => {}));
}

let warming = null;
/** Builds the renderer and compiles every scene ahead of time. Safe to call repeatedly. */
export function warm() {
  if (warming) return warming;
  schedule(getRenderer);
  Object.keys(BUILDERS).forEach((kind) =>
    schedule(() => {
      if (!gl || pool[kind]?.length) return;
      const s = buildScene(kind);
      s.update(0);
      // A tiny draw compiles the colour and shadow programs up front.
      draw(s, 4, 4);
      release(s);
    })
  );
  return (warming = queue);
}

/** Builds and runs one scene inside el. Returns its cleanup. */
function mountScene(el, kind, isLive) {
  if (!getRenderer()) return;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  el.appendChild(canvas);
  const s = acquire(kind);
  const view = { canvas, ctx: canvas.getContext("2d"), scene: s, isLive, start: performance.now() };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const aspect = w / h;
    const f = aspect < 1.25 ? (4.4 * 1.25) / aspect : 4.4;
    Object.assign(s.camera, { left: -f * aspect, right: f * aspect, top: f, bottom: -f });
    s.camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  views.add(view);
  if (!raf) raf = requestAnimationFrame(frame);

  return () => {
    views.delete(view);
    ro.disconnect();
    canvas.remove();
    release(s);
  };
}

export default function ServiceArt({ kind, paused = false }) {
  const host = useRef(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = host.current;
    let visible = false;
    let queued = false;
    let cancelled = false;
    let stop = null;
    warm();
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !queued) {
          queued = true;
          // Behind the warm-up in the queue, so mounting is only a cheap copy into a canvas.
          schedule(() => {
            if (!cancelled) stop = mountScene(el, kind, () => visible && !pausedRef.current) || null;
          });
        }
      },
      { rootMargin: "800px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      stop?.();
    };
  }, [kind]);

  return <div ref={host} className="absolute inset-0 bg-paper" aria-hidden="true" />;
}
