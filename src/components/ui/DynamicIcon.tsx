import type { ComponentType } from "react";
import {
  Atom,
  Code,
  Sparkles,
  Database,
  BookOpen,
  Brain,
  Rocket,
  Palette,
  Terminal,
  LineChart,
  Layers,
  GraduationCap,
  Boxes,
  Flame,
} from "lucide-react";

type IconProps = { className?: string; size?: number; strokeWidth?: number };

/**
 * Curated, tree-shakeable map of `icon_name` (from Supabase) → Lucide component.
 * Using an explicit allow-list keeps the bundle small and avoids rendering
 * arbitrary strings; unknown names fall back to a sensible default.
 */
const ICONS: Record<string, ComponentType<IconProps>> = {
  Atom,
  Code,
  Sparkles,
  Database,
  BookOpen,
  Brain,
  Rocket,
  Palette,
  Terminal,
  LineChart,
  Layers,
  GraduationCap,
  Boxes,
  Flame,
};

export function DynamicIcon({ name, ...props }: { name: string } & IconProps) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon {...props} />;
}
