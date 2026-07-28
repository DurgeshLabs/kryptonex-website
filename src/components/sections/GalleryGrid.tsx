"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { GalleryPlate } from "@/components/ui/GalleryPlate";
import { gallery, galleryCategories } from "@/data";
import { useLockBodyScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types";

const SPAN: Record<GalleryItem["span"], string> = {
  sm: "sm:col-span-1 sm:row-span-1",
  md: "sm:col-span-1 sm:row-span-2",
  lg: "sm:col-span-2 sm:row-span-2",
  xl: "sm:col-span-2 sm:row-span-3",
};

/** Filterable masonry grid with a lightbox. Shared by the landing page and /gallery. */
export function GalleryGrid({ showFilters = true }: { showFilters?: boolean }) {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);
  useLockBodyScroll(Boolean(active));

  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <>
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", ...galleryCategories].map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={isActive}
                data-cursor="hover"
                className={cn(
                  "rounded-md border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                  isActive
                    ? "border-fg bg-fg text-bg"
                    : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      <motion.div
        layout
        className="grid auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[105px] sm:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              onClick={() => setActive(item)}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              aria-label={`View ${item.title}`}
              className={cn(
                "group relative col-span-1 row-span-2 overflow-hidden rounded-lg border border-line text-left transition-colors duration-300 hover:border-line-strong",
                SPAN[item.span],
              )}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                <GalleryPlate item={item} dense={item.span === "xl" || item.span === "lg"} />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent_55%)]" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="font-mono text-[9.5px] tracking-[0.16em] text-white/45 uppercase">
                  {item.category}
                </span>
                <p className="mt-1 text-[14.5px] font-medium tracking-[-0.018em] text-white">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9000] grid place-items-center p-5 no-print"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[min(94vw,880px)] overflow-hidden rounded-xl border border-line-strong"
            >
              <div className="relative aspect-[16/9]">
                <GalleryPlate item={active} dense />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),transparent_58%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase">
                    {active.category}
                  </span>
                  <h3 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-white">
                    {active.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[14px] leading-[1.6] text-white/65">
                    {active.caption}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-black/50 text-white/80 backdrop-blur transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
