"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { Counter } from "@/components/ui/Counter";
import { communityStats } from "@/data";

export function CommunityNumbers() {
  return (
    <Section id="numbers" bordered>
      <div className="flex flex-col gap-3">
        <Eyebrow index="07">Community</Eyebrow>
        <h2 className="max-w-xl text-[clamp(1.85rem,3.6vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.032em] text-fg">
          The community in numbers
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-[var(--border)] md:grid-cols-3 lg:grid-cols-6">
        {communityStats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="bg-bg px-5 py-8 sm:px-6 sm:py-9"
          >
            <p className="text-[clamp(1.9rem,3.6vw,2.6rem)] leading-none font-semibold tracking-[-0.045em] text-fg">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 font-mono text-[10px] leading-tight tracking-[0.14em] text-fg-subtle uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
