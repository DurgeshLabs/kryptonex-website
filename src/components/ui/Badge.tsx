import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "violet" | "gold" | "emerald" | "crimson" | "amber";

const tones: Record<Tone, string> = {
  neutral: "text-fg-muted border-line bg-surface",
  accent:
    "text-accent border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent)_9%,transparent)]",
  violet:
    "text-violet border-[color-mix(in_oklab,var(--violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--violet)_9%,transparent)]",
  gold: "text-gold border-[color-mix(in_oklab,var(--gold)_32%,transparent)] bg-[color-mix(in_oklab,var(--gold)_9%,transparent)]",
  emerald:
    "text-emerald border-[color-mix(in_oklab,var(--emerald)_30%,transparent)] bg-[color-mix(in_oklab,var(--emerald)_9%,transparent)]",
  crimson:
    "text-crimson border-[color-mix(in_oklab,var(--crimson)_32%,transparent)] bg-[color-mix(in_oklab,var(--crimson)_9%,transparent)]",
  amber:
    "text-amber border-[color-mix(in_oklab,var(--amber)_32%,transparent)] bg-[color-mix(in_oklab,var(--amber)_9%,transparent)]",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  dot,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border px-2 py-[3px] font-mono text-[10px] font-medium tracking-[0.1em] whitespace-nowrap uppercase",
        tones[tone],
        className,
      )}
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
    <p className={cn("flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase", className)}>
      {index && <span className="text-fg-subtle/60 tabular-nums">{index}</span>}
      {index && <span className="h-px w-6 bg-line-strong" />}
      <span className="text-fg-subtle">{children}</span>
    </p>
  );
}
