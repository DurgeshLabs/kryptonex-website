"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Fixed page-wide grid + vignette. Sits behind everything at z-0. */
export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 cyber-grid mask-radial opacity-70" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 50% -10%, color-mix(in oklab, var(--neon) 13%, transparent), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 85% 15%, color-mix(in oklab, var(--violet) 10%, transparent), transparent 65%)",
        }}
      />
    </div>
  );
}

/** Slow-drifting gradient blobs. Parallaxed against page scroll. */
export function GradientBlobs() {
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 320]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={reduce ? undefined : { y: y1 }}
        className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full opacity-[0.42] blur-[130px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--neon),transparent_68%)]" />
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: y2 }}
        className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full opacity-[0.3] blur-[150px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--violet),transparent_68%)]" />
      </motion.div>
      <motion.div
        style={reduce ? undefined : { y: y1 }}
        className="absolute bottom-0 left-1/3 h-[440px] w-[440px] rounded-full opacity-[0.16] blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)]" />
      </motion.div>
    </div>
  );
}

/** Horizontal scan line that sweeps a section — subtle, once every few seconds. */
export function ScanSweep({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="animate-sweep absolute inset-x-0 h-24 bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--neon)_9%,transparent),transparent)]" />
    </div>
  );
}

/** Falling glyph column effect. Deliberately low-contrast so it never fights the copy. */
export function CodeRain({ className, density = 0.6 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const glyphs = "01アイウエオカキクケコサシスセソKRYPTONEX{}[]<>#$%&*";
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -60);
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 58) return;
      last = now;

      const { width, height } = canvas.getBoundingClientRect();
      ctx.fillStyle = "rgba(5,5,5,0.16)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;

      for (let i = 0; i < columns; i += 1) {
        if (Math.random() > density) continue;
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.97 ? "rgba(111,168,255,0.55)" : "rgba(61,139,255,0.2)";
        ctx.fillText(char, i * fontSize, y);
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce, density]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-[0.32]", className)}
    />
  );
}
