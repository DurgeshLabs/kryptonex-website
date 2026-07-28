"use client";

import { motion } from "framer-motion";
import {
  Binary,
  Bug,
  Clock,
  Fingerprint,
  Globe2,
  KeyRound,
  Radar,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge, Eyebrow } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { Counter } from "@/components/ui/Counter";
import { CodeRain, ScanSweep } from "@/components/fx/Backgrounds";
import { events } from "@/data";
import { formatDate } from "@/lib/utils";

const CATEGORIES: { icon: LucideIcon; name: string; blurb: string }[] = [
  { icon: Globe2, name: "Web", blurb: "Injection, auth bypass, SSRF" },
  { icon: KeyRound, name: "Crypto", blurb: "Cipher misuse and weak keys" },
  { icon: Fingerprint, name: "Forensics", blurb: "Disk, memory and network artefacts" },
  { icon: Binary, name: "Reversing", blurb: "Stripped binaries and hidden checks" },
  { icon: Bug, name: "Pwn", blurb: "Memory corruption and ROP" },
  { icon: Radar, name: "OSINT", blurb: "Open-source intelligence trails" },
];

const fortress = events.find((e) => e.flagship);

export function DigitalFortress() {
  return (
    <Section id="digital-fortress" container={false} className="relative overflow-hidden py-0">
      <div className="relative mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--gold)_22%,transparent)] bg-[#080604]">
          {/* Ambience */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_0%,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_15%_100%,color-mix(in_oklab,var(--crimson)_14%,transparent),transparent_60%)]" />
            <div className="absolute inset-0 cyber-grid opacity-40" />
            <CodeRain className="opacity-[0.13]" density={0.3} />
            <ScanSweep />
          </div>

          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <Eyebrow>Our flagship</Eyebrow>

              <h2 className="mt-7 text-[clamp(2.4rem,6.4vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
                <span className="block text-white">Digital</span>
                <span className="gold-text block">Fortress</span>
              </h2>

              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-zinc-400 sm:text-[17px]">
                Our flagship inter-college Capture-the-Flag. Eight hours, six categories, teams from
                colleges across Pune, one live scoreboard — and the event we want Kryptonex to be
                known for beyond our own campus.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <Badge tone="gold">
                  <Clock className="h-3 w-3" />8 hours
                </Badge>
                <Badge tone="gold">6 categories</Badge>
                <Badge tone="gold">Open to Pune colleges</Badge>
                {fortress && (
                  <Badge tone="crimson" dot>
                    {formatDate(fortress.date)}
                  </Badge>
                )}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <LinkButton href="#recruitment" variant="gold" size="lg">
                  <Trophy className="h-4 w-4" />
                  Compete or help run it
                </LinkButton>
                <LinkButton href="#contact" variant="secondary" size="lg">
                  Sponsor the event
                </LinkButton>
              </div>
            </motion.div>

            {/* Stat strip */}
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {[
                { value: 8, suffix: "h", label: "Continuous competition" },
                { value: 6, suffix: "", label: "Challenge categories" },
                { value: fortress?.expectedAttendees ?? 50, suffix: "+", label: "Competitors expected" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#0a0806] px-6 py-7"
                >
                  <p className="text-[clamp(2rem,4vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] text-gold-soft">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2.5 font-mono text-[10.5px] tracking-[0.16em] text-zinc-500 uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Categories */}
            <div className="mt-8">
              <h3 className="font-mono text-[10.5px] tracking-[0.18em] text-zinc-500 uppercase">
                The six categories
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-start gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-[color-mix(in_oklab,var(--gold)_30%,transparent)] hover:bg-white/[0.04]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[color-mix(in_oklab,var(--gold)_28%,transparent)] bg-[color-mix(in_oklab,var(--gold)_9%,transparent)] text-gold transition-transform duration-300 group-hover:scale-110">
                      <cat.icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-medium tracking-[-0.015em] text-zinc-100">
                        {cat.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-zinc-500">{cat.blurb}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
