import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { toTone, type ToneIndex } from "@/lib/palette";

/**
 * Badge tones map onto the brand ramp. `brand` is Red Brown, `gold` is Sand
 * Brown, `neutral` is the Medium Grey family — nothing sits outside the manual.
 */
export type BadgeTone = "neutral" | "brand" | "gold" | ToneIndex;

const NAMED: Record<string, ToneIndex> = { brand: 1, gold: 5 };

export function Badge({
  children,
  tone = "neutral",
  className,
  dot,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  dot?: boolean;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded border px-2 py-[3px] font-mono text-[10px] font-medium tracking-[0.1em] whitespace-nowrap uppercase";

  if (tone === "neutral") {
    return (
      <span className={cn(base, "border-line bg-surface text-fg-muted", className)}>
        {dot && <span className="h-1 w-1 rounded-full bg-current" />}
        {children}
      </span>
    );
  }

  const index = typeof tone === "number" ? toTone(tone) : NAMED[tone];

  return (
    <span
      className={cn(base, className)}
      style={{
        color: `var(--tone-${index}-fg)`,
        backgroundColor: `color-mix(in oklab, var(--tone-${index}) 12%, transparent)`,
        borderColor: `color-mix(in oklab, var(--tone-${index}) 32%, transparent)`,
      }}
    >
      {dot && <span className="h-1 w-1 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** Small monospace label that sits above a section heading. */
export function Eyebrow({
  children,
  className,
  index,
}: {
  children: ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase",
        className,
      )}
    >
      {index && <span className="text-accent tabular-nums">{index}</span>}
      {index && <span className="h-px w-6 brand-rule" />}
      <span className="text-fg-subtle">{children}</span>
    </p>
  );
}
