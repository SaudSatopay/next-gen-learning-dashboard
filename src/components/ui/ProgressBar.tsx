"use client";

import { useEffect } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Custom animated progress bar.
 * The fill animates from 0 → `value` using `scaleX` (a transform, so it stays on
 * the compositor — no width/layout animation). The percentage label counts up in
 * sync. Both respect prefers-reduced-motion.
 */
export function ProgressBar({
  value,
  delay = 0.25,
}: {
  value: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  const count = useMotionValue(reduce ? clamped : 0);
  const label = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(count, clamped, {
      duration: 1,
      delay,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [clamped, count, delay, reduce]);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted">
          Progress
        </span>
        <motion.span className="font-mono text-xs text-ink/90">{label}</motion.span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="bg-sunset h-full w-full rounded-full"
          style={{ transformOrigin: "left center" }}
          initial={{ scaleX: reduce ? clamped / 100 : 0 }}
          animate={{ scaleX: clamped / 100 }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 60, damping: 18, delay }
          }
        />
      </div>
    </div>
  );
}
