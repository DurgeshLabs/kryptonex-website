"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { faqs } from "@/data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Getting started", "Learning", "Events", "Logistics"] as const;
type Category = (typeof CATEGORIES)[number];

export function Faq() {
  const [category, setCategory] = useState<Category>("All");

  const items = useMemo(
    () =>
      faqs
        .filter((f) => category === "All" || f.category === category)
        .map((f) => ({ id: f.id, title: f.question, content: f.answer, meta: f.category })),
    [category],
  );

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="FAQ"
            title={
              <>
                Questions we get{" "}
                <span className="text-fg-subtle">before every intake.</span>
              </>
            }
            description="If yours isn't here, write to the council — we answer everything."
          />

          <Reveal delay={0.1} className="mt-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={isActive}
                    data-cursor="hover"
                    className={cn(
                      "relative rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                      isActive
                        ? "border-transparent text-bg"
                        : "border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="faq-filter"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="absolute inset-0 -z-10 rounded-full bg-fg"
                      />
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 hidden lg:block">
            <LinkButton href="#contact" variant="secondary" size="md">
              Ask the council
            </LinkButton>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <Accordion items={items} defaultOpen={items[0]?.id} />
        </Reveal>
      </div>
    </Section>
  );
}
