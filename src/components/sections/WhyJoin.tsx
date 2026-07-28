"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Flag,
  Layers,
  Mic,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Card, TiltCard } from "@/components/ui/Card";
import { Section, SectionHeader, Stagger, staggerItem } from "@/components/ui/Section";
import { stats } from "@/data";

interface Benefit {
  icon: LucideIcon;
  title: string;
  body: string;
  stat: string;
  accent: string;
  span?: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: BookOpen,
    title: "Security tracks",
    body: "A structured learning ladder — from Linux and networking through web security, forensics and malware analysis. In order, with nothing skipped.",
    stat: `${stats.tracks} topics`,
    accent: "var(--neon)",
    span: "lg:col-span-2",
  },
  {
    icon: Mic,
    title: "Industry speakers",
    body: "Guest sessions from real practitioners — SOC analysts, bug bounty hunters and red teamers — on how the field actually works.",
    stat: `${stats.speakers} talks`,
    accent: "var(--violet)",
  },
  {
    icon: Flag,
    title: "CTF competitions",
    body: "Regular Capture-the-Flag events, including our flagship inter-college CTF. Learn by breaking, in a safe and ethical arena.",
    stat: `${stats.competitions} CTFs`,
    accent: "var(--gold)",
  },
  {
    icon: Layers,
    title: "Hands-on workshops",
    body: "Lab machines, vulnerable targets and your own terminal. Every workshop ends with something you actually built or broke.",
    stat: `${stats.workshops} workshops`,
    accent: "var(--emerald)",
  },
  {
    icon: Users,
    title: "A real council",
    body: "Six teams — leadership, technical, events, marketing, sponsorship and documentation — so there is a way in whatever your strength is.",
    stat: `${stats.members} members`,
    accent: "var(--crimson)",
    span: "lg:col-span-2",
  },
];

export function WhyJoin() {
  return (
    <Section id="why-join">
      <SectionHeader
        eyebrow="Why join us"
        title={
          <>
            Everything you need to go from{" "}
            <span className="text-fg-subtle">curious</span> to{" "}
            <span className="gradient-text">capable.</span>
          </>
        }
        description="No experience required — just curiosity and a willingness to learn. We'll take you from zero to shipping real security skills."
      />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((benefit) => (
          <motion.div key={benefit.title} variants={staggerItem} className={benefit.span}>
            <TiltCard className="h-full" intensity={6}>
              <Card className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `color-mix(in oklab, ${benefit.accent} 32%, transparent)`,
                      backgroundColor: `color-mix(in oklab, ${benefit.accent} 10%, transparent)`,
                      color: benefit.accent,
                    }}
                  >
                    <benefit.icon className="h-[19px] w-[19px]" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-fg-subtle uppercase">
                    {benefit.stat}
                  </span>
                </div>
                <h3 className="mt-6 text-[17.5px] font-medium tracking-[-0.02em] text-fg">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-fg-muted">{benefit.body}</p>
              </Card>
            </TiltCard>
          </motion.div>
        ))}

        <motion.div variants={staggerItem}>
          <TiltCard className="h-full" intensity={6}>
            <Card
              className="flex h-full flex-col justify-between overflow-hidden p-7"
              spotlight={false}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--neon)_16%,transparent),transparent_60%)]"
              />
              <div className="relative">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--neon)_35%,transparent)] bg-[color-mix(in_oklab,var(--neon)_12%,transparent)] text-neon">
                  <ShieldCheck className="h-[19px] w-[19px]" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-[17.5px] font-medium tracking-[-0.02em] text-fg">
                  Ethically grounded
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-fg-muted">
                  Everything happens in sanctioned labs, CTF ranges, or inside a bug bounty
                  programme&apos;s published scope. The ethics are the first thing we teach, not a
                  footnote.
                </p>
              </div>
              <p className="relative mt-6 font-mono text-[11px] tracking-[0.16em] text-neon uppercase">
                Break · Understand · Defend
              </p>
            </Card>
          </TiltCard>
        </motion.div>
      </Stagger>
    </Section>
  );
}
