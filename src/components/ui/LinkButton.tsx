"use client";

import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollToId } from "@/lib/hooks";
import {
  buttonBase,
  buttonSizes,
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  children: ReactNode;
}

/** Anchor styled as a Button. In-page `#hash` targets get offset-aware smooth scrolling. */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  magnetic = true,
  className,
  children,
  onClick,
  ...props
}: LinkButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduce = useReducedMotion();
  const scrollToId = useScrollToId();
  const isHash = href.startsWith("#");
  const isExternal = /^https?:\/\//.test(href);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      onMouseMove={(e) => {
        if (!magnetic || reduce) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      onClick={(e) => {
        if (isHash) {
          e.preventDefault();
          scrollToId(href);
          history.replaceState(null, "", href);
        }
        onClick?.(e);
      }}
      data-cursor="hover"
      className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}
      {...(props as React.ComponentProps<typeof motion.a>)}
    >
      {children}
    </motion.a>
  );
}
