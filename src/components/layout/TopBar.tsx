import { Search, Bell } from "lucide-react";
import { STUDENT_NAME } from "@/lib/config";

/** Slim sticky header: brand (mobile), page label (desktop), search + avatar. */
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/10 bg-canvas/70 px-5 py-3.5 backdrop-blur-xl sm:px-8">
      {/* Brand — shown on mobile where the sidebar is hidden. */}
      <div className="flex items-center gap-2 md:hidden">
        <span className="bg-sunset grid h-8 w-8 place-items-center rounded-lg font-display text-base font-bold text-canvas">
          L
        </span>
        <span className="font-display text-base font-semibold text-ink">
          Lumina
        </span>
      </div>

      {/* Page label — desktop. */}
      <span className="hidden font-display text-base font-medium text-ink md:block">
        Dashboard
      </span>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden items-center sm:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search courses…"
            aria-label="Search courses"
            className="w-44 rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-ink transition-[width,border-color] placeholder:text-muted focus:w-56 focus:border-magenta/40 focus:outline-none"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-muted transition-colors hover:text-ink"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-magenta" />
        </button>

        <span className="bg-sunset grid h-10 w-10 place-items-center rounded-full font-display text-sm font-bold text-canvas">
          {STUDENT_NAME.charAt(0)}
        </span>
      </div>
    </header>
  );
}
