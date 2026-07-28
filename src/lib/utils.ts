import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deploy base path, normalised the same way `next.config.ts` does: a user/org
 * GitHub Pages site reports "/" but Next treats that as no base path at all.
 */
const RAW_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const BASE_PATH = RAW_BASE_PATH === "/" ? "" : RAW_BASE_PATH.replace(/\/$/, "");

/** Prefix a public asset path with the deploy basePath (needed for GitHub Pages). */
export function asset(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Format an ISO `YYYY-MM-DD` string without timezone drift. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function formatShortDate(iso: string) {
  const [, m, d] = iso.split("-").map(Number);
  if (!m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}`;
}

export function getYear(iso: string) {
  return Number(iso.slice(0, 4));
}

/**
 * Deterministic pseudo-random in [0,1).
 *
 * Integer hash rather than a Math.sin trick: transcendental functions are only
 * precision-bounded by spec, so a sin-based generator can differ in the last
 * bits between the Node render and the browser render and trip a hydration
 * mismatch. Output is quantised so the serialised markup matches exactly.
 */
export function seeded(seed: number) {
  let h = (Math.trunc(seed) + 0x9e3779b9) | 0;
  h = Math.imul(h ^ (h >>> 16), 0x21f0aaad);
  h = Math.imul(h ^ (h >>> 15), 0x735a2d97);
  h = (h ^ (h >>> 15)) >>> 0;
  return Math.round((h / 4294967296) * 10000) / 10000;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Today's date as `YYYY-MM-DD` in the viewer's local timezone. */
export function todayISO() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
