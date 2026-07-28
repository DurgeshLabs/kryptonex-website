"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      data-cursor="hover"
      className={cn(
        "relative grid h-9 w-9 place-items-center rounded-md border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {mounted && (
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {isDark ? (
            <Moon className="h-[15px] w-[15px]" strokeWidth={1.75} />
          ) : (
            <Sun className="h-[15px] w-[15px]" strokeWidth={1.75} />
          )}
        </motion.span>
      )}
    </button>
  );
}
