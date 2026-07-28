import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "neon" | "violet" | "gold" | "emerald" | "crimson";

const tones: Record<Tone, string> = {
  neutral: "text-fg-muted border-line bg-surface",
  neon: "text-neon border-[color-mix(in_oklab,var(--neon)_35%,transparent)] bg-[color-mix(in_oklab,var(--neon)_10%,transparent)]",
  violet:
    "text-violet border-[color-mix(in_oklab,var(--violet)_35%,transparent)] bg-[color-mix(in_oklab,var(--violet)_10%,transparent)]",
  gold: "text-gold border-[color-mix(in_oklab,var(--gold)_38%,transparent)] bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]",
  emerald:
    "text-emerald border-[color-mix(in_oklab,var(--emerald)_35%,transparent)] bg-[color-mix(in_oklab,var(--emerald)_10%,transparent)]",
  crimson:
    "text-crimson border-[color-mix(in_oklab,var(--crimson)_38%,transparent)] bg-[color-mix(in_oklab,var(--crimson)_10%,transparent)]",
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
        {children}
      </span>
    </div>
  );
}
