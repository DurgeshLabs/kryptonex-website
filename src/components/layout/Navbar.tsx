"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LinkButton } from "@/components/ui/LinkButton";
import { navItems, sectionIds } from "@/lib/site";
import { useActiveSection, useLockBodyScroll, useScrollToId } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);
  const scrollToId = useScrollToId();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  useLockBodyScroll(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // Let the mobile sheet unmount before scrolling so the offset is measured correctly.
    window.setTimeout(() => scrollToId(href), 10);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[70] no-print"
      >
        <div className="mx-auto w-full max-w-[1180px] px-4 pt-3 sm:px-8 sm:pt-4">
          <nav
            className={cn(
              "flex h-14 items-center justify-between rounded-2xl px-3 transition-all duration-500 sm:px-4",
              scrolled
                ? "glass shadow-[0_18px_50px_-24px_rgba(0,0,0,0.65)]"
                : "border border-transparent bg-transparent",
            )}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                go("#hero");
              }}
              aria-label="Kryptonex — back to top"
              data-cursor="hover"
              className="shrink-0"
            >
              <Logo />
            </a>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                const isActive = `#${active}` === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                    data-cursor="hover"
                    className={cn(
                      "relative rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-lg bg-surface-2"
                      />
                    )}
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Open command palette"
                data-cursor="hover"
                className="hidden h-9 items-center gap-2 rounded-full border border-line bg-surface pr-2 pl-3 text-fg-subtle transition-colors hover:border-line-strong hover:text-fg md:flex"
              >
                <span className="font-mono text-[11.5px] tracking-wide">Search</span>
                <kbd className="flex items-center gap-0.5 rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </button>

              <ThemeToggle />

              <LinkButton href="#recruitment" size="sm" className="hidden sm:inline-flex">
                Join <ArrowUpRight className="h-3.5 w-3.5" />
              </LinkButton>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                data-cursor="hover"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[65] lg:hidden no-print"
          >
            <div
              className="absolute inset-0 bg-bg/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto mt-24 w-[min(92vw,440px)] rounded-2xl border border-line bg-surface p-3"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </motion.a>
              ))}
              <div className="mt-2 border-t border-line pt-3">
                <LinkButton
                  href="#recruitment"
                  size="md"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Join Kryptonex
                </LinkButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
