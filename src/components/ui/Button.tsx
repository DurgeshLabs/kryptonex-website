"use client";

import { forwardRef, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  buttonBase,
  buttonSizes,
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  children: ReactNode;
}

/** Magnetic, ripple-on-press button. Motion is dropped when the user prefers reduced motion. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", magnetic = true, className, children, onClick, ...props },
  forwardedRef,
) {
  const localRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || reduce) return;
    const el = localRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      style={{ x, y }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={(e) => {
        const el = localRef.current;
        if (el && !reduce) {
          const r = el.getBoundingClientRect();
          const id = Date.now();
          setRipples((prev) => [
            ...prev.slice(-3),
            { id, x: e.clientX - r.left, y: e.clientY - r.top },
          ]);
          window.setTimeout(() => setRipples((prev) => prev.filter((p) => p.id !== id)), 620);
        }
        onClick?.(e);
      }}
      data-cursor="hover"
      className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute -z-10 h-40 w-40 rounded-full bg-white/25"
          style={{
            left: r.x - 80,
            top: r.y - 80,
            animation: "kx-pulse-ring 620ms ease-out forwards",
          }}
        />
      ))}
      {children}
    </motion.button>
  );
});
