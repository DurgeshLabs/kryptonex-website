"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer } from "@/lib/hooks";

/**
 * Flat surface card. Hover adds a faint cursor-tracking wash rather than a glow —
 * enough to feel responsive without reading as decoration.
 */
export function Card({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={ref}
      onMouseMove={
        interactive && fine
          ? (e) => {
              const r = ref.current?.getBoundingClientRect();
              if (!r) return;
              setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }
          : undefined
      }
      onMouseLeave={() => setPos(null)}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-300",
        interactive && "hover:border-line-strong",
        className,
      )}
    >
      {interactive && pos && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(340px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

/** Row-style card used in lists — border on all sides, accent rail on hover. */
export function ListCard({
  children,
  className,
  accent,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-300 hover:border-line-strong",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 transition-transform duration-400 group-hover:scale-y-100"
        style={{ background: accent ?? "var(--accent)" }}
      />
      {children}
    </div>
  );
}
