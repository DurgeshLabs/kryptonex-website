"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { asset } from "@/lib/utils";

/**
 * A real photograph early on the page — the fastest way to show that this is an
 * actual community rather than a template. Swap the source as new event
 * photography lands.
 */
export function CommunityPhoto({ index }: { index?: string } = {}) {
  return (
    <Section id="community" bordered>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
      >
        <div className="max-w-2xl">
          <Eyebrow index={index}>The community</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.85rem,3.6vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.032em] text-fg">
            Thirty-odd people who kept showing up.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.65] text-fg-muted sm:text-[15.5px]">
            Every session, visit and competition is documented. This is what a term of that
            actually looks like.
          </p>
        </div>
      </motion.div>

      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12"
      >
        <div className="relative overflow-hidden rounded-lg border border-line">
          <Image
            src={asset("/photos/community-industry-visit.jpg")}
            alt="Kryptonex members and faculty on an industry visit, gathered outside the host facility"
            width={2400}
            height={1158}
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            className="h-auto w-full object-cover"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--bg)_58%,transparent),transparent_42%)]"
          />
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.06em] text-fg-subtle">
          <span>Industry visit</span>
          <span aria-hidden className="h-1 w-1 rotate-45 bg-line-strong" />
          <span>Members &amp; faculty, School of Technology and Research</span>
        </figcaption>
      </motion.figure>
    </Section>
  );
}
