"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Dot + trailing ring cursor. Only mounts on fine-pointer devices, and toggles
 * `data-custom-cursor` on <body> so the native cursor is hidden only when active.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const [variant, setVariant] = useState<"default" | "hover" | "text">("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute("data-custom-cursor");
      return;
    }
    document.body.setAttribute("data-custom-cursor", "on");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      const interactive = el?.closest?.(
        '[data-cursor="hover"], a, button, [role="button"], input, select, summary',
      );
      const textish = el?.closest?.('[data-cursor="text"], p, h1, h2, h3, textarea');
      setVariant(interactive ? "hover" : textish ? "text" : "default");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.removeAttribute("data-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = variant === "hover" ? 52 : variant === "text" ? 30 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] no-print">
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        className="absolute top-0 left-0"
      >
        <span className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon" />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        className="absolute top-0 left-0"
      >
        <motion.span
          animate={{
            width: ringSize,
            height: ringSize,
            borderColor:
              variant === "hover"
                ? "color-mix(in oklab, var(--neon) 90%, transparent)"
                : "color-mix(in oklab, var(--fg) 32%, transparent)",
            backgroundColor:
              variant === "hover"
                ? "color-mix(in oklab, var(--neon) 12%, transparent)"
                : "transparent",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full border"
        />
      </motion.div>
    </div>
  );
}
