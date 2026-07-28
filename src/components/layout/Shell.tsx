"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingDock } from "./FloatingDock";
import { BackToTop } from "./BackToTop";
import { CommandPalette } from "./CommandPalette";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { GradientBlobs, GridBackground } from "@/components/fx/Backgrounds";
import { LoadingScreen } from "@/components/fx/LoadingScreen";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { PageTransition } from "@/components/fx/PageTransition";

/** Global chrome: theme, backgrounds, cursor, nav, dock, palette, footer. */
export function Shell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      // "/" opens search, but not while typing in a field
      const target = e.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
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
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <GridBackground />
      <GradientBlobs />

      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <main id="main" className="noise relative">
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
      <FloatingDock onOpenPalette={() => setPaletteOpen(true)} />
      <BackToTop />
    </ThemeProvider>
  );
}
