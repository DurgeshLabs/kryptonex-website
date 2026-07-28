"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Navbar } from "./Navbar";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { CommandPalette } from "./CommandPalette";
import { BackToTop } from "./BackToTop";
import { PageBackdrop } from "@/components/fx/Backgrounds";
import { ScrollProgress } from "@/components/fx/ScrollProgress";

export function Shell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      const target = e.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem value={{ light: "light", dark: "dark" }}>
      <ScrollProgress />
      <PageBackdrop />

      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <AnnouncementBar />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <main id="main">{children}</main>

      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
