"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Points roughly tracing landmass, plus a marker on Pune. */
const LAND: [number, number][] = [
  // lat, lon — coarse continental sampling
  [60, -150], [64, -140], [55, -125], [48, -122], [40, -120], [34, -118], [30, -110],
  [45, -100], [50, -95], [58, -95], [64, -85], [55, -75], [45, -75], [40, -74],
  [33, -84], [25, -80], [19, -99], [14, -87], [9, -79], [4, -74], [-2, -60],
  [-10, -55], [-16, -48], [-23, -46], [-30, -58], [-35, -58], [-42, -65], [-52, -70],
  [-1, -78], [-12, -77], [-24, -70], [-33, -71],
  [60, 10], [59, 18], [55, 12], [52, 13], [51, 0], [48, 2], [45, 9], [41, 12],
  [40, -4], [37, -6], [38, 24], [41, 29], [50, 30], [55, 37], [60, 30], [65, 25],
  [36, 3], [31, 10], [30, 31], [15, 32], [9, 38], [0, 37], [-6, 39], [-18, 47],
  [-26, 28], [-34, 18], [-23, 15], [-9, 13], [4, 9], [6, 3], [12, -8], [14, -17],
  [25, 45], [24, 54], [30, 48], [35, 51], [33, 44], [41, 44], [43, 76], [48, 68],
  [55, 60], [58, 82], [62, 105], [55, 83], [52, 104], [55, 130], [60, 150], [62, 129],
  [43, 132], [39, 125], [37, 127], [35, 139], [43, 141], [31, 121], [23, 113],
  [39, 116], [30, 104], [25, 102], [22, 96], [17, 96], [14, 100], [11, 107],
  [1, 104], [3, 101], [-6, 107], [-8, 115], [-2, 118], [-6, 141], [7, 125], [15, 121],
  [28, 77], [19, 73], [18.52, 73.86], [13, 80], [23, 72], [26, 91], [22, 88],
  [31, 74], [25, 67], [34, 69], [7, 80],
  [-12, 131], [-19, 146], [-28, 153], [-34, 151], [-38, 145], [-32, 116], [-25, 134],
  [-37, 175], [-44, 171],
];

const PUNE: [number, number] = [18.52, 73.86];

/**
 * Wireframe globe: rotates on its own, follows drag, and pins Pune.
 * Pure canvas — no WebGL dependency, and it disappears under reduced-motion.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let size = 0;
    let running = true;
    let rotation = -1.1;
    let velocity = 0.0022;
    let dragging = false;
    let lastX = 0;
    const tilt = 0.42;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      size = Math.min(rect.width, rect.height);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (latDeg: number, lonDeg: number, radius: number) => {
      const lat = (latDeg * Math.PI) / 180;
      const lon = (lonDeg * Math.PI) / 180 + rotation;
      const x = Math.cos(lat) * Math.sin(lon);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon);
      // tilt around X
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
      return { x: x * radius, y: -y2 * radius, z: z2 };
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!running) return;

      const rect = canvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const R = size * 0.42;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.save();
      ctx.translate(cx, cy);

      // Halo
      const halo = ctx.createRadialGradient(0, 0, R * 0.6, 0, 0, R * 1.5);
      halo.addColorStop(0, "rgba(61,139,255,0.16)");
      halo.addColorStop(1, "rgba(61,139,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Limb
      ctx.strokeStyle = "rgba(140,180,255,0.24)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.stroke();

      // Graticule
      ctx.strokeStyle = "rgba(140,180,255,0.10)";
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 4) {
          const p = project(lat, lon, R);
          if (p.z < 0) {
            ctx.stroke();
            ctx.beginPath();
            continue;
          }
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = project(lat, lon, R);
          if (p.z < 0) {
            ctx.stroke();
            ctx.beginPath();
            continue;
          }
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Land dots
      for (const [lat, lon] of LAND) {
        const p = project(lat, lon, R);
        if (p.z < 0) continue;
        const depth = 0.35 + p.z * 0.65;
        ctx.fillStyle = `rgba(160,196,255,${0.28 + depth * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * depth, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pune marker + pulse
      const pune = project(PUNE[0], PUNE[1], R);
      if (pune.z >= 0) {
        const pulse = (Math.sin(performance.now() / 620) + 1) / 2;
        ctx.fillStyle = `rgba(224,69,63,${0.24 - pulse * 0.14})`;
        ctx.beginPath();
        ctx.arc(pune.x, pune.y, 6 + pulse * 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(230,110,90,0.95)";
        ctx.beginPath();
        ctx.arc(pune.x, pune.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(209,165,80,0.9)";
        ctx.font = '600 11px ui-monospace, "JetBrains Mono", monospace';
        ctx.fillText("PUNE", pune.x + 10, pune.y + 3);
      }

      ctx.restore();

      if (!dragging) {
        velocity += (0.0022 - velocity) * 0.04;
      }
      rotation += velocity;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      velocity = dx * 0.00035;
      rotation += dx * 0.005;
    };
    const onUp = () => {
      dragging = false;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
    });
    io.observe(canvas);

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("h-full w-full touch-none select-none", className)}
    />
  );
}
