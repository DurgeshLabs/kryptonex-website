import { seeded } from "@/lib/utils";
import type { GalleryItem } from "@/types";

/**
 * Generated stand-in artwork for a gallery tile. Real photographs replace these
 * as each event is documented — see README.
 */
export function GalleryPlate({ item, dense = false }: { item: GalleryItem; dense?: boolean }) {
  const round = (n: number) => Math.round(n * 100) / 100;
  const dots = Array.from({ length: dense ? 44 : 28 }, (_, i) => ({
    x: round(seeded(i + item.hue) * 100),
    y: round(seeded(i * 3 + item.hue + 991) * 100),
    r: round(seeded(i * 7 + item.hue + 313) * 1.6 + 0.4),
    o: round(0.08 + seeded(i + 77) * 0.24),
  }));

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(155deg, hsl(${item.hue} 45% 11%), hsl(${(item.hue + 36) % 360} 38% 6%) 70%, #060607)`,
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={`hsl(${item.hue} 80% 70% / ${d.o})`} />
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
              stroke={`hsl(${item.hue} 80% 68% / 0.07)`}
              strokeWidth="0.22"
            />
          );
        })}
      </svg>
    </div>
  );
}
