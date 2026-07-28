"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
  ArrowUp,
  CalendarDays,
  Command,
  Flag,
  Home,
  Route,
  Users,
} from "lucide-react";
import { useScrollToId } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface DockAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

/** macOS-style magnifying dock. Hidden on small screens where it would crowd the thumb zone. */
export function FloatingDock({ onOpenPalette }: { onOpenPalette: () => void }) {
  const scrollToId = useScrollToId();
  const mouseX = useMotionValue(Infinity);

  const actions: DockAction[] = [
    { id: "home", label: "Home", icon: Home, onClick: () => scrollToId("hero") },
    { id: "roadmap", label: "Tracks", icon: Route, onClick: () => scrollToId("roadmap") },
    { id: "events", label: "Events", icon: CalendarDays, onClick: () => scrollToId("events") },
    {
      id: "fortress",
      label: "Digital Fortress",
      icon: Flag,
      onClick: () => scrollToId("digital-fortress"),
    },
    { id: "team", label: "Council", icon: Users, onClick: () => scrollToId("team") },
    { id: "search", label: "Command palette (⌘K)", icon: Command, onClick: onOpenPalette },
    {
      id: "top",
      label: "Back to top",
      icon: ArrowUp,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
  ];

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-5 z-[60] hidden justify-center md:flex no-print"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass flex items-end gap-1.5 rounded-2xl px-3 pt-2 pb-2.5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.8)]"
      >
        {actions.map((action) => (
          <DockItem key={action.id} action={action} mouseX={mouseX} />
        ))}
      </div>
    </motion.div>
  );
}

function DockItem({
  action,
  mouseX,
}: {
  action: DockAction;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - bounds.x - bounds.width / 2;
  });

  const sizeRaw = useTransform(distance, [-130, 0, 130], [40, 60, 40]);
  const size = useSpring(sizeRaw, { stiffness: 300, damping: 22, mass: 0.2 });
  const Icon = action.icon;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={action.onClick}
      aria-label={action.label}
      data-cursor="hover"
      style={reduce ? { width: 42, height: 42 } : { width: size, height: size }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "group/dock relative grid shrink-0 place-items-center rounded-xl border border-line bg-surface text-fg-muted transition-colors",
        "hover:border-[color-mix(in_oklab,var(--neon)_45%,transparent)] hover:text-neon",
      )}
    >
      <Icon className="h-[45%] w-[45%]" />
      <span className="pointer-events-none absolute -top-9 rounded-md border border-line bg-bg-elevated px-2 py-1 text-[11px] whitespace-nowrap text-fg opacity-0 transition-opacity group-hover/dock:opacity-100">
        {action.label}
      </span>
    </motion.button>
  );
}
