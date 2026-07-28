export type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "text-white bg-[linear-gradient(120deg,var(--neon),var(--violet))] shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--neon)_70%,transparent)] hover:shadow-[0_16px_50px_-10px_color-mix(in_oklab,var(--neon)_85%,transparent)]",
  secondary:
    "text-fg bg-surface border border-line-strong hover:border-[color-mix(in_oklab,var(--neon)_45%,transparent)] hover:bg-surface-2",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface",
  gold: "text-[#1a1206] bg-[linear-gradient(120deg,var(--gold-soft),var(--gold))] shadow-[0_10px_40px_-14px_color-mix(in_oklab,var(--gold)_80%,transparent)]",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px] rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-[52px] px-7 text-[15px] rounded-xl gap-2.5",
};

export const buttonBase =
  "relative isolate inline-flex select-none items-center justify-center overflow-hidden font-medium tracking-[-0.01em] transition-all duration-200";
