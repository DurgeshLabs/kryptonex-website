import { seeded } from "@/lib/utils";
import { toTone } from "@/lib/palette";
import type { GalleryItem } from "@/types";

/**
 * Generated stand-in artwork for a gallery tile, tinted from the brand ramp.
 * Real photographs replace these as each event is documented — see README.
 */
export function GalleryPlate({ item, dense = false }: { item: GalleryItem; dense?: boolean }) {
  const tone = toTone(item.tone);
  const round = (n: number) => Math.round(n * 100) / 100;
  const dots = Array.from({ length: dense ? 44 : 28 }, (_, i) => ({
    x: round(seeded(i + item.tone * 37) * 100),
    y: round(seeded(i * 3 + item.tone * 37 + 991) * 100),
    r: round(seeded(i * 7 + item.tone * 37 + 313) * 1.6 + 0.4),
    o: round(0.14 + seeded(i + 77) * 0.34),
  }));

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(155deg, color-mix(in oklab, var(--tone-${tone}) 62%, #0d0809), color-mix(in oklab, var(--tone-${tone}) 26%, #0d0809) 58%, #0d0809)`,
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={`color-mix(in oklab, var(--tone-${tone}-fg) ${Math.round(d.o * 100)}%, transparent)`}
          />
        ))}
        {dots.slice(0, dense ? 20 : 12).map((d, i) => {
          const t = dots[(i + 5) % dots.length];
          return (
            <line
              key={`l-${i}`}
              x1={d.x}
              y1={d.y}
              x2={t.x}
              y2={t.y}
              stroke={`color-mix(in oklab, var(--tone-${tone}-fg) 14%, transparent)`}
              strokeWidth="0.22"
            />
          );
        })}
      </svg>
    </div>
  );
}
