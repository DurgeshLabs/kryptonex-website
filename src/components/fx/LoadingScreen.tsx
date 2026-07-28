"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const BOOT = [
  "initialising kryptonex.core",
  "mounting /str/security-tracks",
  "verifying ethics policy ......... ok",
  "linking ctf scoreboard",
  "ready",
];

/**
 * First-visit boot screen. Runs once per tab (sessionStorage) so returning to
 * the page mid-session doesn't replay it.
 */
export function LoadingScreen() {
  const reduce = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem("kx-booted") === "1") return;
    setShow(true);
    document.body.style.overflow = "hidden";

    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 1650);
      setProgress(Math.round(t * 100));
      setLine(Math.min(BOOT.length - 1, Math.floor(t * BOOT.length)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("kx-booted", "1");
        window.setTimeout(() => setShow(false), 260);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] grid place-items-center bg-[#050505] no-print"
        >
          <div className="absolute inset-0 cyber-grid opacity-40" />
          <div className="relative flex w-[min(90vw,420px)] flex-col items-center gap-7">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid h-16 w-16 place-items-center rounded-2xl border border-line bg-surface"
            >
              <ShieldCheck className="h-7 w-7 text-neon" strokeWidth={1.5} />
            </motion.div>

            <div className="w-full space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
                <span>Kryptonex</span>
                <span className="tabular-nums text-neon">{progress}%</span>
              </div>
              <div className="h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-[linear-gradient(90deg,var(--neon),var(--violet))]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              <p className="h-4 font-mono text-[11.5px] text-zinc-600">{BOOT[line]}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
