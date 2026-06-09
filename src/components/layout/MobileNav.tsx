"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/config";
import { pillSpring } from "@/lib/motion";

const MOBILE_ITEMS = NAV_ITEMS.slice(0, 5);

/**
 * Bottom navigation bar for mobile (< md). Mirrors the sidebar with a
 * shared-layout active pill. Hidden on tablet and desktop.
 */
export function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-surface/80 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {MOBILE_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => setActive(item.id)}
                aria-current={isActive ? "page" : undefined}
                className="relative flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2 text-[0.65rem] outline-none"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-active"
                    transition={pillSpring}
                    className="absolute inset-0 rounded-xl bg-white/[0.07]"
                  />
                )}
                <Icon
                  className={`relative z-10 h-5 w-5 ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                />
                <span
                  className={`relative z-10 ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
