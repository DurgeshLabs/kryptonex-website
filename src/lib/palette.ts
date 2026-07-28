/**
 * Brand-constrained category palette.
 *
 * Every swatch is a step on a six-stop ramp interpolated between the two DPGU
 * anchors — Red Brown #b22b2f and Sand Brown #d1a550. Categories are therefore
 * distinguishable without any colour leaving the brand arc. Use `swatch(n)` for
 * the surface treatment and `--tone-N-fg` for anything that carries text.
 */
export const TONE_COUNT = 6;

export type ToneIndex = 1 | 2 | 3 | 4 | 5 | 6;

/** Inline styles for an icon chip / avatar in a given tone. */
export function toneChip(tone: ToneIndex) {
  return {
    color: `var(--tone-${tone}-fg)`,
    backgroundColor: `color-mix(in oklab, var(--tone-${tone}) 12%, transparent)`,
    borderColor: `color-mix(in oklab, var(--tone-${tone}) 34%, transparent)`,
  } as const;
}

/** The raw ramp colour — for rails, underlines and fills. */
export function toneColor(tone: ToneIndex) {
  return `var(--tone-${tone})`;
}

/** The text-safe ramp colour for the active theme. */
export function toneText(tone: ToneIndex) {
  return `var(--tone-${tone}-fg)`;
}

/** Maps any integer onto the ramp so data files can carry a plain number. */
export function toTone(n: number): ToneIndex {
  const i = ((Math.trunc(n) - 1) % TONE_COUNT + TONE_COUNT) % TONE_COUNT;
  return (i + 1) as ToneIndex;
}
