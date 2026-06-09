"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { NAV_ITEMS } from "@/lib/config";
import { pillSpring } from "@/lib/motion";

/**
 * Collapsible primary navigation.
 * - Desktop (lg): full width with labels; collapsible to icon-only via the toggle.
 * - Tablet (md): always icon-only (the expanded width only applies at lg).
 * - Mobile: hidden — replaced by <MobileNav />.
 *
 * Labels are cleanly hidden (display:none) whenever the rail is icon-only — i.e.
 * when collapsed, or below the lg breakpoint — and the icons center themselves.
 * `overflow-hidden` only clips the brief width transition. The active item is a
 * shared-layout pill (layoutId) that springs into place on click.
 */
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  // Show labels only when expanded AND on desktop; tablet stays icon-only.
  const labelCls = collapsed ? "hidden" : "hidden lg:inline";
  // Center icons when icon-only; left-align once labels are visible.
  const rowCls = collapsed ? "justify-center" : "justify-center lg:justify-start";

  return (
    <nav
      aria-label="Primary"
      className={`sticky top-0 hidden h-screen shrink-0 flex-col self-start overflow-hidden border-r border-white/10 bg-surface/40 backdrop-blur-xl transition-[width] duration-300 ease-out md:flex ${
        collapsed ? "w-[76px]" : "w-[76px] lg:w-[244px]"
      }`}
    >
      {/* Brand */}
      <div className={`flex h-[72px] shrink-0 items-center gap-3 px-4 ${rowCls}`}>
        <span className="bg-sunset grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-lg font-bold text-canvas">
          L
        </span>
        <span className={`font-display text-lg font-semibold text-ink ${labelCls}`}>
          Lumina
        </span>
      </div>

      {/* Nav items */}
      <ul className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-magenta/50 ${rowCls}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={pillSpring}
                    className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.06]"
                  />
                )}
                <Icon
                  className={`relative z-10 h-5 w-5 shrink-0 transition-colors ${
                    isActive ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                />
                <span
                  className={`relative z-10 whitespace-nowrap ${labelCls} ${
                    isActive ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden shrink-0 border-t border-white/10 p-3 lg:block">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-magenta/50 ${rowCls}`}
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5 shrink-0" />
          ) : (
            <PanelLeftClose className="h-5 w-5 shrink-0" />
          )}
          <span className={`whitespace-nowrap ${labelCls}`}>Collapse</span>
        </button>
      </div>
    </nav>
  );
}
