export type ButtonVariant = "primary" | "secondary" | "gold" | "ghost" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Primary is the brand Red Brown — the shield colour — with white text, which
 * clears AA at this weight. Gold is the Sand Brown counterpart for moments that
 * need warmth without competing with the primary action.
 */
export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-strong text-white border border-transparent hover:brightness-115 active:brightness-95",
  secondary:
    "bg-transparent text-fg border border-line-strong hover:bg-surface hover:border-accent/50",
  gold: "bg-[var(--brand-gold)] text-[#2a1d06] border border-transparent hover:brightness-108",
  ghost: "bg-transparent text-fg-muted border border-transparent hover:text-fg hover:bg-surface",
  inverse: "bg-fg text-bg border border-transparent hover:opacity-90",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px] rounded-md gap-1.5",
  md: "h-10 px-4 text-[13.5px] rounded-md gap-2",
  lg: "h-12 px-6 text-[14.5px] rounded-md gap-2",
};

export const buttonBase =
  "relative inline-flex select-none items-center justify-center font-medium tracking-[-0.005em] transition-[background,border-color,color,opacity,filter] duration-200 disabled:pointer-events-none disabled:opacity-45";
