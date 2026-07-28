"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/lib/site";

export function JoinCta() {
  return (
    <Section id="join" bordered container={false} className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,var(--accent-dim),transparent_70%)]"
      />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-[clamp(2.2rem,5.6vw,4.2rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
            <span className="block text-fg-subtle">Not looking for members.</span>
            <span className="block text-fg">Looking for builders.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-[16px] leading-[1.65] text-fg-muted sm:text-[17px]">
            No experience required and no entrance test — just curiosity and the willingness to keep
            showing up. Open to every branch and every year at the {site.parent}.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href="/join" size="lg">
              Apply now
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/about" variant="secondary" size="lg">
              Read about us
            </LinkButton>
          </div>

          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
            {site.tagline}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
