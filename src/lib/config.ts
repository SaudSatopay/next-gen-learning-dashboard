import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Trophy,
  CalendarDays,
  Settings,
  type LucideIcon,
} from "lucide-react";

/** Greeting + streak shown in the Hero tile. (Static mock — not part of the DB schema.) */
export const STUDENT_NAME = "Saud";
export const STREAK_DAYS = 12;

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

/** Sidebar / bottom-nav destinations. */
export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "settings", label: "Settings", icon: Settings },
];

/** Contribution-graph dimensions (Activity tile). */
export const ACTIVITY_WEEKS = 18;
export const ACTIVITY_DAYS = 7;

/**
 * Deterministic 0–4 intensity for a given cell.
 * Deterministic on purpose: server and client must render identical markup,
 * so we avoid Math.random()/Date.now() which would cause hydration mismatches.
 */
export function activityLevel(day: number, week: number): number {
  const n = Math.abs((day * 31 + week * 17) ^ ((week << 2) + day * 3));
  const v = n % 10;
  if (v < 3) return 0;
  if (v < 5) return 1;
  if (v < 7) return 2;
  if (v < 9) return 3;
  return 4;
}
