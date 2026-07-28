"use client";

import { motion } from "framer-motion";
import { ArrowRight, GitBranch, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal, Section, SectionHeader } from "@/components/ui/Section";
import { TerminalWindow, TypedTerminal, type TerminalLine } from "@/components/ui/Terminal";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/lib/site";

const BOOT_LINES: TerminalLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "kryptonex — cybersecurity community @ STR, DPGU", tone: "info" },
  { kind: "cmd", text: "cat mission.txt" },
  { kind: "out", text: "Break it. Understand it. Defend it.", tone: "ok" },
  { kind: "cmd", text: "ls tracks/" },
  { kind: "out", text: "linux  networking  crypto  web  forensics  malware  cloud", tone: "muted" },
  { kind: "cmd", text: "./join --experience none" },
  { kind: "out", text: "accepted. welcome to the council.", tone: "ok" },
];

const EVOLUTION = [
  {
    icon: GitBranch,
    label: "Where we started",
    tone: "gold" as const,
    body: "STR's first Tech & Innovation Club — GitSetGo (Git & GitHub), Codeforces vs LeetCode, Tech Rush, and industry visits to FABLAB and COEP. A real foundation in coding, problem-solving and building.",
    tags: ["GitSetGo", "Tech Rush", "Industry visits"],
  },
  {
    icon: ShieldCheck,
    label: "Where we're headed",
    tone: "neon" as const,
    body: "One ownable mission: security. A 12-topic learning ladder from Linux through networks, web, forensics and malware, hands-on ethical-hacking sessions, regular CTFs, and our flagship Digital Fortress.",
    tags: ["12 tracks", "Regular CTFs", "Digital Fortress"],
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeader
        eyebrow="What is Kryptonex"
        title={
          <>
            Instead of being <span className="text-fg-subtle">#50 at everything</span>, we&apos;re
            becoming <span className="gradient-text">#1 at one thing.</span>
          </>
        }
        description={`Kryptonex is ${site.universityShort}'s dedicated cybersecurity club. We started as the first official Tech & Innovation Club at the ${site.parent} — and this year we're evolving with a sharp, ownable focus: cybersecurity, ethical hacking, and Capture-the-Flag.`}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <Reveal>
          <TerminalWindow title="kryptonex@str:~$ ./introduce" className="h-full">
            <TypedTerminal lines={BOOT_LINES} />
          </TerminalWindow>
        </Reveal>

        <div className="grid gap-6">
          {EVOLUTION.map((item, i) => (
            <Reveal key={item.label} delay={0.08 * i}>
              <Card className="h-full p-7">
                <div className="flex items-center gap-3">
                  <span
                    className={
                      item.tone === "gold"
                        ? "grid h-10 w-10 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] text-gold"
                        : "grid h-10 w-10 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--neon)_35%,transparent)] bg-[color-mix(in_oklab,var(--neon)_10%,transparent)] text-neon"
                    }
                  >
                    <item.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[17px] font-medium tracking-[-0.02em] text-fg">
                    {item.label}
                  </h3>
                </div>
                <p className="mt-4 text-[14.5px] leading-relaxed text-fg-muted">{item.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} tone={item.tone}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <motion.div className="relative mt-8 overflow-hidden rounded-2xl border border-line bg-[linear-gradient(120deg,color-mix(in_oklab,var(--neon)_10%,transparent),transparent_55%,color-mix(in_oklab,var(--violet)_10%,transparent))] p-7 sm:p-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="max-w-2xl text-[17px] leading-snug font-medium tracking-[-0.02em] text-fg sm:text-[19px]"
              style={{ textWrap: "balance" }}
            >
              Same energy, sharper mission. We&apos;re not leaving our roots — we&apos;re building on
              them to own the one thing that sets us apart.
            </p>
            <a
              href="#roadmap"
              data-cursor="hover"
              className="group inline-flex shrink-0 items-center gap-2 text-[14px] font-medium text-neon"
            >
              See the ladder
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </Reveal>
    </Section>
  );
}
