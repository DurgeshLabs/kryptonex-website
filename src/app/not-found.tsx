"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { TerminalWindow, TypedTerminal, type TerminalLine } from "@/components/ui/Terminal";
import { Eyebrow } from "@/components/ui/Badge";
import { CodeRain } from "@/components/fx/Backgrounds";

const LINES: TerminalLine[] = [
  { kind: "cmd", text: "curl -I $REQUESTED_PATH" },
  { kind: "out", text: "HTTP/2 404", tone: "warn" },
  { kind: "out", text: "no flag here. this path does not exist.", tone: "muted" },
  { kind: "cmd", text: "cd /" },
  { kind: "out", text: "returning to known-good state…", tone: "ok" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <CodeRain className="opacity-[0.18] mask-fade-b" density={0.4} />
        <div className="scanlines absolute inset-0 opacity-40" />
      </div>

      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-7 text-[clamp(3.4rem,12vw,8rem)] leading-[0.85] font-semibold tracking-[-0.055em]">
            <span className="gradient-text">404</span>
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-fg-muted sm:text-[17px]">
            This path isn&apos;t in scope. Nothing here to enumerate — the page you asked for
            doesn&apos;t exist, or it moved.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="/" size="lg">
              <Home className="h-4 w-4" />
              Back to Kryptonex
            </LinkButton>
            <LinkButton href="/#events" variant="secondary" size="lg">
              <ArrowLeft className="h-4 w-4" />
              See the events
            </LinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <TerminalWindow title="kryptonex@str:~$ recon">
            <TypedTerminal lines={LINES} />
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}
