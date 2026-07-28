"use client";

import { useRef, useEffect } from "react";

interface Node {
  wx: number; wy: number; wz: number;
  col: number[]; hub: boolean; size: number;
  tw: number; tws: number; gen: number;
}
interface Proj { x: number; y: number; p: number }
interface Pulse {
  a: Node; b: Node; aGen: number; bGen: number;
  t: number; speed: number; hops: number; maxHops: number;
  hist: { x: number; y: number }[]; dead: boolean;
}
interface Dust { x: number; y: number; r: number; ph: number; sp: number }

const FOCAL = 330, CAMH = 58, NEAR = 18, FAR = 900, LINK = 132;
const COLORS = [
  [205, 228, 255], [205, 228, 255], [170, 205, 255], [255, 255, 255],
  [235, 245, 255], [120, 170, 255], [150, 200, 255], [100, 150, 245],
];

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function ri(n: number) { return (Math.random() * n) | 0; }

function respawn(n: Partial<Node>, W: number, atFar: boolean): Node {
  const wz = atFar ? rand(FAR * 0.72, FAR) : rand(NEAR, FAR);
  const visHalf = (W * 0.5) * wz / FOCAL;
  return Object.assign(n, {
    wx: rand(-visHalf, visHalf) * 1.12,
    wz, wy: rand(-26, 26),
    col: COLORS[ri(COLORS.length)],
    hub: Math.random() < 0.3,
    size: Math.random() < 0.3 ? rand(1.6, 2.8) : rand(0.6, 1.3),
    tw: rand(0, 6.28), tws: rand(0.5, 1.4),
    gen: ((n as Node).gen || 0) + 1,
  }) as Node;
}

export default function CircuitBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const densityFactor = isMobile ? 0.5 : 1;

    let W = 0, H = 0, dpr = 1, time = 0, last = performance.now(), raf = 0, playing = true;
    let visible = true;
    let camX = 0, horizon = 0;
    let nodes: Node[] = [], pulses: Pulse[] = [], dust: Dust[] = [];
    let bgLayer: HTMLCanvasElement | null = null, fgLayer: HTMLCanvasElement | null = null;

    // Dégradés statiques pré-rendus hors écran — reconstruits uniquement au resize
    function buildLayers() {
      const hz = H * 0.42;

      bgLayer = document.createElement("canvas");
      bgLayer.width = W * dpr; bgLayer.height = H * dpr;
      const bc = bgLayer.getContext("2d");
      if (bc) {
        bc.setTransform(dpr, 0, 0, dpr, 0, 0);
        const bg = bc.createRadialGradient(W * 0.46, H * 0.5, 0, W * 0.46, H * 0.5, Math.max(W, H) * 0.78);
        bg.addColorStop(0, "#0c1838"); bg.addColorStop(0.55, "#081026"); bg.addColorStop(1, "#04081a");
        bc.fillStyle = bg; bc.fillRect(0, 0, W, H);

        bc.globalCompositeOperation = "lighter";
        const warm = bc.createRadialGradient(W * 0.95, H * 0.32, 0, W * 0.95, H * 0.32, W * 0.32);
        warm.addColorStop(0, "rgba(255,160,95,.11)"); warm.addColorStop(1, "rgba(0,0,0,0)");
        bc.fillStyle = warm; bc.fillRect(0, 0, W, H);

        const cool = bc.createRadialGradient(W * 0.4, hz, 0, W * 0.4, hz, W * 0.5);
        cool.addColorStop(0, "rgba(60,110,220,.13)"); cool.addColorStop(1, "rgba(0,0,0,0)");
        bc.fillStyle = cool; bc.fillRect(0, 0, W, H);
      }

      fgLayer = document.createElement("canvas");
      fgLayer.width = W * dpr; fgLayer.height = H * dpr;
      const fc = fgLayer.getContext("2d");
      if (fc) {
        fc.setTransform(dpr, 0, 0, dpr, 0, 0);
        const vg = fc.createRadialGradient(W * 0.5, H * 0.52, Math.min(W, H) * 0.26, W * 0.5, H * 0.52, Math.max(W, H) * 0.72);
        vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(2,5,14,.6)");
        fc.fillStyle = vg; fc.fillRect(0, 0, W, H);

        const tf = fc.createLinearGradient(0, 0, 0, H * 0.24);
        tf.addColorStop(0, "rgba(4,8,22,.65)"); tf.addColorStop(1, "rgba(4,8,22,0)");
        fc.fillStyle = tf; fc.fillRect(0, 0, W, H * 0.24);
      }
    }

    function genNodes() {
      const N = Math.round(120 * densityFactor);
      nodes = [];
      for (let i = 0; i < N; i++) nodes.push(respawn({}, W, Math.random() < 0.5));
    }

    function genDust() {
      const N = Math.round(70 * densityFactor);
      dust = [];
      for (let i = 0; i < N; i++)
        dust.push({ x: Math.random(), y: Math.random(), r: rand(0.4, 1.5), ph: rand(0, 6.28), sp: rand(0.4, 1.2) });
    }

    function project(n: Node): Proj {
      const p = FOCAL / n.wz;
      return { x: W * 0.5 + camX + n.wx * p, y: horizon + (CAMH - n.wy) * p, p };
    }

    function findNeighbor(node: Node, exclude: Node | null): Node | null {
      const cands: Node[] = [];
      for (const o of nodes) {
        if (o === node || o === exclude) continue;
        const dx = node.wx - o.wx; if (dx > LINK || dx < -LINK) continue;
        const dz = node.wz - o.wz; if (dz > LINK || dz < -LINK) continue;
        const dy = node.wy - o.wy;
        if (dx * dx + dy * dy + dz * dz <= LINK * LINK) cands.push(o);
      }
      if (!cands.length) return null;
      if (Math.random() < 0.6) { cands.sort((a, b) => a.wz - b.wz); return cands[0]; }
      return cands[ri(cands.length)];
    }

    function spawnPulse() {
      let tries = 0;
      while (tries++ < 8) {
        const a = nodes[ri(nodes.length)];
        const b = findNeighbor(a, null);
        if (b) {
          pulses.push({ a, b, aGen: a.gen, bGen: b.gen, t: 0, speed: rand(0.02, 0.045), hops: 0, maxHops: 4 + ri(6), hist: [], dead: false });
          return;
        }
      }
    }

    const FRAME_MS = 33.34;
    let lastDraw = 0;

    function draw(now: number) {
      raf = requestAnimationFrame(draw);
      if (!ctx) return;
      if (!visible || !playing || prefersReduced) { last = now; return; }
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      let dt = (now - last) / 16.67;
      last = now;
      if (dt > 3) dt = 3;
      time += dt;

      horizon = H * 0.42;
      const camXt = Math.sin(time * 0.003) * 24;
      camX += (camXt - camX) * 0.05 * dt;

      // Background (calque statique pré-rendu)
      ctx.globalCompositeOperation = "source-over";
      if (bgLayer) ctx.drawImage(bgLayer, 0, 0, W, H);

      // Move nodes
      for (const n of nodes) {
        n.wz -= 0.75 * dt;
        if (n.wz <= NEAR) respawn(n, W, true);
        n.wx += Math.sin(time * 0.01 + n.tw) * 0.025 * dt;
      }

      const pr = nodes.map(project);
      const idx = new Map<Node, number>();
      nodes.forEach((n, i) => idx.set(n, i));

      // Spatial grid for link queries
      const grid = new Map<number, number[]>();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const k = (Math.floor(n.wx / LINK) + 100) * 10000 + Math.floor(n.wz / LINK);
        const arr = grid.get(k);
        if (arr) arr.push(i); else grid.set(k, [i]);
      }

      // Links (grid-accelerated)
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i], pi = pr[i];
        if (pi.x < -60 || pi.x > W + 60) continue;
        const cx = Math.floor(ni.wx / LINK) + 100, cz = Math.floor(ni.wz / LINK);
        for (let dcx = -1; dcx <= 1; dcx++) {
          for (let dcz = -1; dcz <= 1; dcz++) {
            const ncell = grid.get((cx + dcx) * 10000 + (cz + dcz));
            if (!ncell) continue;
            for (let jj = 0; jj < ncell.length; jj++) {
              const j = ncell[jj];
              if (j <= i) continue;
              const nj = nodes[j];
              const dx = ni.wx - nj.wx, dy = ni.wy - nj.wy, dz = ni.wz - nj.wz;
              const d2 = dx * dx + dy * dy + dz * dz;
              if (d2 > LINK * LINK) continue;
              const pj = pr[j];
              const d = Math.sqrt(d2);
              const depth = Math.min(pi.p, pj.p);
              const a = (1 - d / LINK) * Math.min(1, depth * 1.1) * 0.46;
              if (a <= 0.025) continue;
              ctx.strokeStyle = `rgba(110,165,235,${a})`;
              ctx.lineWidth = Math.min(1.3, 0.4 + depth);
              ctx.beginPath(); ctx.moveTo(pi.x, pi.y); ctx.lineTo(pj.x, pj.y); ctx.stroke();
            }
          }
        }
      }

      // Pulses
      const target = Math.round(8 * densityFactor);
      let guard = 0;
      while (pulses.length < target && guard++ < 4) spawnPulse();

      for (let k = pulses.length - 1; k >= 0; k--) {
        const pu = pulses[k];
        if (pu.a.gen !== pu.aGen || pu.b.gen !== pu.bGen) pu.dead = true;
        if (!pu.dead) {
          pu.t += pu.speed * 0.8 * dt;
          if (pu.t >= 1) {
            const next = findNeighbor(pu.b, pu.a);
            pu.hops++;
            if (next && pu.hops < pu.maxHops) {
              pu.a = pu.b; pu.aGen = pu.b.gen;
              pu.b = next; pu.bGen = next.gen; pu.t -= 1;
            } else pu.dead = true;
          }
        }
        if (!pu.dead) {
          const ia = idx.get(pu.a), ib = idx.get(pu.b);
          if (ia == null || ib == null) { pu.dead = true; }
          else {
            const pa = pr[ia], pb = pr[ib];
            const x = pa.x + (pb.x - pa.x) * pu.t, y = pa.y + (pb.y - pa.y) * pu.t;
            pu.hist.push({ x, y }); if (pu.hist.length > 13) pu.hist.shift();
          }
        } else {
          if (pu.hist.length) pu.hist.shift();
        }

        const L = pu.hist.length;
        for (let h = 0; h < L; h++) {
          const f = h / (L - 1 || 1);
          const pt = pu.hist[h];
          const a = Math.pow(f, 1.3) * 0.95;
          if (a <= 0.03) continue;
          const r = 0.7 + f * 2.1;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, 6.2832);
          const li = 70 + f * 25;
          ctx.fillStyle = `hsla(208,100%,${li}%,${a})`;
          if (h === L - 1 && pu.a.wz < FAR * 0.5) { ctx.shadowBlur = 12; ctx.shadowColor = "rgba(150,210,255,1)"; }
          ctx.fill();
          if (ctx.shadowBlur) ctx.shadowBlur = 0;
        }
        if (pu.dead && pu.hist.length === 0) pulses.splice(k, 1);
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i], p = pr[i];
        if (p.x < -30 || p.x > W + 30 || p.y < -30 || p.y > H + 30) continue;
        const depthA = Math.min(1, p.p * 1.2);
        const tw = 0.6 + 0.4 * Math.sin(time * 0.05 * n.tws + n.tw);
        const r = Math.max(0.5, n.size * p.p * 1.6);
        const a = depthA * (n.hub ? 0.95 : 0.6) * tw;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832);
        ctx.fillStyle = `rgba(${n.col[0]},${n.col[1]},${n.col[2]},${a})`;
        if (n.hub && p.p > 0.5) { ctx.shadowBlur = 10 * p.p + 4; ctx.shadowColor = `rgba(${n.col[0]},${n.col[1]},${n.col[2]},.9)`; }
        ctx.fill(); ctx.shadowBlur = 0;
      }

      // Dust
      dust.forEach((d) => {
        d.y -= 0.0006 * dt; if (d.y < 0) d.y = 1;
        const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * 0.05 * d.sp + d.ph));
        ctx.beginPath(); ctx.arc(d.x * W, d.y * H, d.r, 0, 6.2832);
        ctx.fillStyle = `rgba(170,205,255,${tw * 0.4})`; ctx.fill();
      });

      // Vignette + fondu haut (calque statique pré-rendu)
      ctx.globalCompositeOperation = "source-over";
      if (fgLayer) ctx.drawImage(fgLayer, 0, 0, W, H);
    }

    function resize() {
      const r = wrap!.getBoundingClientRect();
      W = r.width; H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      canvas!.style.width = W + "px"; canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildLayers();
      genNodes(); genDust(); pulses = [];
    }

    function onVisibility() { playing = !document.hidden; }

    resize();
    raf = requestAnimationFrame(draw);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 120); });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(wrap);

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" style={{ willChange: "transform", transform: "translateZ(0)", contain: "strict" }}>
      <canvas ref={canvasRef} className="block w-full h-full" style={{ willChange: "transform" }} />
    </div>
  );
}
