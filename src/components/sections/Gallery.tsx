"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Maximize2, X } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { gallery } from "@/data";
import { cn, seeded } from "@/lib/utils";
import { useLockBodyScroll } from "@/lib/hooks";
import type { GalleryItem } from "@/types";

const SPAN: Record<GalleryItem["span"], string> = {
  sm: "sm:col-span-1 sm:row-span-1",
  md: "sm:col-span-1 sm:row-span-2",
  lg: "sm:col-span-2 sm:row-span-2",
  xl: "sm:col-span-2 sm:row-span-3",
};

/** Deterministic generated artwork — real photos replace these as the season is documented. */
function Plate({ item, dense = false }: { item: GalleryItem; dense?: boolean }) {
  // Values are rounded so the server-rendered SVG string matches the client's byte for byte.
  const round = (n: number) => Math.round(n * 100) / 100;
  const dots = Array.from({ length: dense ? 46 : 30 }, (_, i) => ({
    x: round(seeded(i + item.hue) * 100),
    y: round(seeded(i * 3 + item.hue + 991) * 100),
    r: round(seeded(i * 7 + item.hue + 313) * 1.8 + 0.5),
    o: round(0.1 + seeded(i + 77) * 0.3),
  }));

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(150deg, hsl(${item.hue} 62% 12%), hsl(${(item.hue + 40) % 360} 48% 7%) 65%, #060607)`,
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-60"
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={`hsl(${item.hue} 90% 72% / ${d.o})`}
          />
        ))}
        {dots.slice(0, dense ? 22 : 14).map((d, i) => {
          const t = dots[(i + 5) % dots.length];
          return (
            <line
              key={`l-${i}`}
              x1={d.x}
              y1={d.y}
              x2={t.x}
              y2={t.y}
              stroke={`hsl(${item.hue} 90% 70% / 0.09)`}
              strokeWidth="0.25"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="scanlines absolute inset-0 opacity-30" />
    </div>
  );
}

export function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);
  useLockBodyScroll(Boolean(active));

  return (
    <Section id="gallery">
      <SectionHeader
        eyebrow="Life at Kryptonex"
        title={
          <>
            Six months of documentation is{" "}
            <span className="gradient-text">our reputation.</span>
          </>
        }
        description="A photographer is assigned to every workshop, talk and CTF. Until the first season's photos land, these plates hold their place — swap them in src/data/gallery.json."
        action={
          <Badge tone="neon">
            <Camera className="h-3 w-3" />
            {gallery.length} slots
          </Badge>
        }
      />

      <Reveal className="mt-14">
        <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[110px] sm:grid-cols-4">
          {gallery.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              aria-label={`View ${item.title}`}
              className={cn(
                "group relative col-span-1 row-span-2 overflow-hidden rounded-xl border border-line text-left transition-all duration-500 hover:border-line-strong",
                SPAN[item.span],
              )}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Plate item={item} dense={item.span === "xl" || item.span === "lg"} />
              </motion.div>

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82),transparent_58%)]" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="font-mono text-[9.5px] tracking-[0.18em] text-white/45 uppercase">
                  {item.tag}
                </span>
                <p className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-white">
                  {item.title}
                </p>
                <p className="mt-1 max-h-0 overflow-hidden text-[12.5px] leading-snug text-white/60 opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>

              <span className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-lg border border-white/15 bg-black/40 text-white/70 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 className="h-3 w-3" />
              </span>
            </motion.button>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9000] grid place-items-center p-5 no-print"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActive(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[min(94vw,900px)] overflow-hidden rounded-2xl border border-line-strong"
            >
              <div className="relative aspect-[16/9]">
                <Plate item={active} dense />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),transparent_60%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase">
                    {active.tag}
                  </span>
                  <h3 className="mt-1.5 text-[clamp(1.5rem,3.4vw,2.2rem)] font-semibold tracking-[-0.03em] text-white">
                    {active.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-white/65">
                    {active.caption}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
