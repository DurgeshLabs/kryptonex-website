"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LinkButton } from "@/components/ui/LinkButton";
import { navigation } from "@/lib/site";
import { useLockBodyScroll } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));
  useLockBodyScroll(mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenGroup(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href?: string) =>
    Boolean(href) && (href === "/" ? pathname === "/" : pathname.startsWith(href!));

  const groupIsActive = (group: (typeof navigation)[number]) =>
    isActive(group.href) || Boolean(group.children?.some((c) => isActive(c.href)));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] no-print transition-colors duration-300",
          scrolled ? "glass border-b border-line" : "border-b border-transparent",
        )}
      >
        <div className="container-page">
          <nav className="flex h-16 items-center justify-between gap-6">
            <Link href="/" aria-label="Kryptonex — home" data-cursor="hover" className="shrink-0">
              <Logo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {navigation.map((group) => {
                const active = groupIsActive(group);

                if (!group.children) {
                  return (
                    <Link
                      key={group.label}
                      href={group.href!}
                      data-cursor="hover"
                      className={cn(
                        "rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
                        active ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {group.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setOpenGroup(group.label)}
                    onMouseLeave={() => setOpenGroup(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={openGroup === group.label}
                      onClick={() =>
                        setOpenGroup((g) => (g === group.label ? null : group.label))
                      }
                      data-cursor="hover"
                      className={cn(
                        "flex items-center gap-1 rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
                        active ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 opacity-50 transition-transform duration-200",
                          openGroup === group.label && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {openGroup === group.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 w-[290px] pt-2"
                        >
                          <div className="overflow-hidden rounded-lg border border-line bg-bg-elevated p-1.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)]">
                            {group.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                data-cursor="hover"
                                className={cn(
                                  "block rounded-md px-3 py-2.5 transition-colors",
                                  isActive(child.href)
                                    ? "bg-surface-2 text-fg"
                                    : "text-fg-muted hover:bg-surface hover:text-fg",
                                )}
                              >
                                <span className="block text-[13.5px] font-medium text-fg">
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="mt-0.5 block text-[12px] leading-snug text-fg-subtle">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Search"
                data-cursor="hover"
                className="hidden h-9 items-center gap-2 rounded-md border border-line bg-surface pr-2 pl-3 text-fg-subtle transition-colors hover:border-line-strong hover:text-fg md:flex"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="text-[12.5px]">Search</span>
                <kbd className="rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />

              <LinkButton href="/join" size="sm" className="hidden sm:inline-flex">
                Join Kryptonex
              </LinkButton>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                data-cursor="hover"
                className="grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-fg lg:hidden"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[65] lg:hidden no-print"
          >
            <div className="absolute inset-0 bg-bg/95 backdrop-blur-lg" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-16 max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line px-5 py-6"
            >
              <div className="container-page !px-0">
                {navigation.map((group) => (
                  <div key={group.label} className="border-b border-line py-1 last:border-0">
                    {group.href ? (
                      <Link
                        href={group.href}
                        className="block py-3.5 text-[16px] font-medium text-fg"
                      >
                        {group.label}
                      </Link>
                    ) : (
                      <>
                        <p className="pt-4 pb-2 font-mono text-[10.5px] tracking-[0.16em] text-fg-subtle uppercase">
                          {group.label}
                        </p>
                        <div className="pb-2">
                          {group.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2.5 text-[15px] text-fg-muted transition-colors hover:text-fg"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}

                <div className="mt-6 flex flex-col gap-2">
                  <LinkButton href="/join" size="lg" className="w-full">
                    Join Kryptonex
                  </LinkButton>
                  <LinkButton href="/events" variant="secondary" size="lg" className="w-full">
                    Upcoming events
                  </LinkButton>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
