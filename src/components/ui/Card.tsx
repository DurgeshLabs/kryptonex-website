"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Base surface card with a cursor-tracking spotlight. */
export function Card({
  children,
  className,
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!spotlight || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300",
        "hover:border-line-strong",
        className,
      )}
    >
      {spotlight && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--neon) 12%, transparent), transparent 62%)`,
          }}
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px hairline opacity-60"
      />
      {children}
    </div>
  );
}

/** 3D tilt-on-hover wrapper. Skipped entirely under reduced-motion. */
export function TiltCard({
  children,
  className,
  intensity = 9,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const glareOpacity = useTransform([sx, sy] as const, ([x, y]: number[]) =>
    Math.min(0.14, Math.hypot(x - 0.5, y - 0.5) * 0.28),
  );
  const glareShift = useTransform(sx, [0, 1], ["-30%", "30%"]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div style={{ perspective: 1100 }} className={cn("group/tilt", className)}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="relative h-full w-full [&>*]:h-full"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden
            style={{ opacity: glareOpacity, x: glareShift }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(300px_circle_at_50%_0%,white,transparent_65%)]"
          />
        )}
      </motion.div>
    </div>
  );
}
