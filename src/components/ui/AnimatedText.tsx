"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Word-by-word mask reveal. Keeps text selectable and screen-reader friendly. */
export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block"
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Character scramble that settles into the final string when scrolled into view. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    const chars = "!<>-_\\/[]{}—=+*^?#01";
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < frame / 2) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      if (frame / 2 > text.length) {
        window.clearInterval(id);
        setDisplay(text);
      }
    }, 34);
    return () => window.clearInterval(id);
  }, [inView, reduce, text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}

/** Underline that draws in on hover. */
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
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-neon transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
    </a>
  );
}
