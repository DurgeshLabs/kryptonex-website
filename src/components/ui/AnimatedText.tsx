"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Line-by-line mask reveal. Keeps the text selectable and readable to screen readers. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line) => (
          <span key={line} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden>
        {lines.map((line, i) => (
          <span key={`${line}-${i}`} className="block overflow-hidden">
            <motion.span
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
              className={cn("block", lineClassName)}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

/** Inline link with an underline that draws in on hover. */
export function AnimatedLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      data-cursor="hover"
      className={cn(
        "group/link relative inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg",
        className,
      )}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
    </a>
  );
}
