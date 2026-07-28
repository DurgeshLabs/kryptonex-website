import {
  Brain,
  Briefcase,
  Code2,
  FileText,
  GitBranch,
  Globe,
  HeartHandshake,
  MessageSquare,
  Palette,
  Rocket,
  Shield,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/** Maps the `icon` string used in the data files to a Lucide component. */
const REGISTRY: Record<string, LucideIcon> = {
  shield: Shield,
  brain: Brain,
  code: Code2,
  rocket: Rocket,
  palette: Palette,
  git: GitBranch,
  trophy: Trophy,
  briefcase: Briefcase,
  file: FileText,
  hands: HeartHandshake,
  star: Star,
  message: MessageSquare,
  globe: Globe,
};

export function DomainIcon({ name, className }: { name: string; className?: string }) {
  const Icon = REGISTRY[name] ?? Code2;
  return <Icon className={className} strokeWidth={1.6} />;
}
