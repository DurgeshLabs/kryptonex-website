"use client";

/**
 * Page-wide backdrop: a single soft accent wash at the top of the page.
 * Deliberately quiet — the content carries the page, not the background.
 */
export function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,var(--accent-dim),transparent_70%)]" />
    </div>
  );
}
