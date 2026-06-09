"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";
import { STREAK_DAYS } from "@/lib/config";

const BAR_HEIGHTS = [42, 70, 55, 92, 64, 100, 80];

/** Daily learning-streak indicator: a gently flickering flame + 7-day mini chart. */
export function StreakIndicator() {
  const reduce = useReducedMotion();

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <motion.span
        className="bg-sunset grid h-10 w-10 place-items-center rounded-xl text-canvas"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 260, damping: 18, delay: 0.3 }
        }
      >
        <Flame className="h-5 w-5" strokeWidth={2.5} />
      </motion.span>

      <div className="leading-tight">
        <p className="font-mono text-xl font-semibold text-ink">
          {STREAK_DAYS}
          <span className="text-sm font-normal text-muted"> days</span>
        </p>
        <p className="text-xs text-muted">Learning streak</p>
      </div>

      <div className="ml-1 flex h-7 items-end gap-1" aria-hidden>
        {BAR_HEIGHTS.map((h, i) => (
          <motion.span
            key={i}
            className="bg-sunset w-1.5 rounded-full"
            style={{ height: `${(h / 100) * 28}px`, transformOrigin: "bottom" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : { delay: 0.5 + i * 0.06, type: "spring", stiffness: 200, damping: 18 }
            }
          />
        ))}
      </div>
    </div>
  );
}
