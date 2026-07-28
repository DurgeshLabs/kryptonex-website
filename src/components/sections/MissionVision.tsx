"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";

const VALUES = [
  { label: "Build", body: "Ship something real, publicly, every season." },
  { label: "Learn", body: "In sequence, from the ground up, without shortcuts." },
  { label: "Share", body: "Writeups, sessions and code that outlive the author." },
  { label: "Lead", body: "Hand the community over stronger than you found it." },
];

export function MissionVision() {
  return (
    <Section id="mission" bordered>
      <Eyebrow index="04">Mission & vision</Eyebrow>

      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-[var(--border)] lg:grid-cols-2">
        {[
          {
            kicker: "Mission",
            statement: "Bridge the gap between college and industry.",
            body: "Give every member a structured path from their first session to work an employer can verify — through tracks, projects, competitions and direct contact with practitioners.",
          },
          {
            kicker: "Vision",
            statement: "Build India's strongest student innovation community.",
            body: "A community other campuses look to for how this is done — known for the quality of what its members ship and the people it sends into industry.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.kicker}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-bg p-8 sm:p-10 lg:p-12"
          >
            <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
              {item.kicker}
            </p>
            <p className="mt-6 text-[clamp(1.4rem,2.8vw,1.9rem)] leading-[1.22] font-medium tracking-[-0.03em] text-fg">
              {item.statement}
            </p>
            <p className="mt-5 max-w-md text-[14.5px] leading-[1.65] text-fg-muted">{item.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid gap-px overflow-hidden rounded-lg border border-line bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((value, i) => (
          <motion.div
            key={value.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="bg-bg px-6 py-7"
          >
            <h3 className="text-[15.5px] font-medium tracking-[-0.02em] text-fg">{value.label}</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-fg-muted">{value.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
