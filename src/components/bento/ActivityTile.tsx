"use client";

import { motion } from "framer-motion";
import { BentoTile } from "@/components/bento/BentoTile";
import { ACTIVITY_WEEKS, ACTIVITY_DAYS, activityLevel } from "@/lib/config";
import { staggerContainer, cellEntrance } from "@/lib/motion";

/** Intensity ramp: faint → magenta → coral → amber. */
const LEVEL_BG = [
  "rgba(255,255,255,0.05)",
  "rgba(255,45,155,0.35)",
  "rgba(255,45,155,0.70)",
  "rgba(255,107,61,0.82)",
  "rgba(255,176,32,0.95)",
];

/**
 * Activity tile — a sunset-tinted contribution graph.
 * Cells are built deterministically (server & client render identically), then
 * pop in with a staggered transform/opacity ripple via Framer Motion.
 */
export function ActivityTile({ index = 0 }: { index?: number }) {
  const cells = [];
  for (let day = 0; day < ACTIVITY_DAYS; day++) {
    for (let week = 0; week < ACTIVITY_WEEKS; week++) {
      cells.push({ key: `${day}-${week}`, level: activityLevel(day, week) });
    }
  }

  return (
    <BentoTile
      index={index}
      ariaLabel="Activity"
      className="md:col-span-2 lg:row-span-2"
    >
      <div className="flex h-full flex-col gap-5 p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Activity</h2>
            <p className="mt-1 text-sm text-muted">
              248 lessons completed this season
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-muted">
            18 wks
          </span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid w-full gap-1"
          style={{
            gridTemplateColumns: `repeat(${ACTIVITY_WEEKS}, minmax(0, 1fr))`,
          }}
        >
          {cells.map((c) => (
            <motion.span
              key={c.key}
              variants={cellEntrance}
              className="aspect-square w-full rounded-[3px]"
              style={{ backgroundColor: LEVEL_BG[c.level] }}
            />
          ))}
        </motion.div>

        <div className="mt-auto flex items-center justify-end gap-2 text-xs text-muted">
          <span>Less</span>
          {LEVEL_BG.map((bg, i) => (
            <span
              key={i}
              className="h-3 w-3 rounded-[3px]"
              style={{ backgroundColor: bg }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </BentoTile>
  );
}
