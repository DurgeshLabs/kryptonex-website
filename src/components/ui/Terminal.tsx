"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TerminalWindow({
  title = "kryptonex@str:~",
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-[#08080a] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[11.5px] text-zinc-500">{title}</span>
      </div>
      <div className={cn("p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

export type TerminalLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "ok" | "warn" | "info" | "muted" };

const toneClass = {
  ok: "text-emerald",
  warn: "text-gold",
  info: "text-neon-soft",
  muted: "text-zinc-500",
} as const;

/** Types out a scripted session line by line once in view. */
export function TypedTerminal({
  lines,
  className,
  speed = 18,
  linePause = 320,
  loop = false,
}: {
  lines: TerminalLine[];
  className?: string;
  speed?: number;
  linePause?: number;
  loop?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: !loop, margin: "-60px" });
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(0);
  const [partial, setPartial] = useState("");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVisible(lines.length);
      setPartial("");
      return;
    }

    let cancelled = false;
    let timer: number | undefined;

    const run = async () => {
      setVisible(0);
      setPartial("");
      for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        if (line.kind === "out") {
          await new Promise<void>((r) => {
            timer = window.setTimeout(r, 140);
          });
          if (cancelled) return;
          setVisible(i + 1);
          continue;
        }
        for (let c = 0; c <= line.text.length; c += 1) {
          await new Promise<void>((r) => {
            timer = window.setTimeout(r, speed);
          });
          if (cancelled) return;
          setPartial(line.text.slice(0, c));
        }
        await new Promise<void>((r) => {
          timer = window.setTimeout(r, linePause);
        });
        if (cancelled) return;
        setVisible(i + 1);
        setPartial("");
      }
    };

    void run();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [inView, lines, reduce, speed, linePause]);

  const current = lines[visible];

  return (
    <div ref={ref} className={cn("space-y-1.5", className)}>
      {lines.slice(0, visible).map((line, i) => (
        <div key={i} className="flex gap-2">
          {line.kind === "cmd" ? (
            <>
              <span className="shrink-0 text-neon select-none">$</span>
              <span className="text-zinc-200">{line.text}</span>
            </>
          ) : (
            <span className={cn("pl-4", toneClass[line.tone ?? "muted"])}>{line.text}</span>
          )}
        </div>
      ))}
      {current?.kind === "cmd" && (
        <div className="flex gap-2">
          <span className="shrink-0 text-neon select-none">$</span>
          <span className="caret text-zinc-200">{partial}</span>
        </div>
      )}
    </div>
  );
}
