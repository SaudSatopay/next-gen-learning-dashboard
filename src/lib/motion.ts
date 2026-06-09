import type { Variants, Transition } from "framer-motion";

/**
 * Shared Framer Motion presets.
 * Every animation here moves only `transform` (x / y / scale) or `opacity`,
 * so nothing triggers layout or paint — animations stay on the compositor.
 */

/** Spring for hover elevation — exact values requested by the brief. */
export const hoverSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

/** Tighter spring for the sliding sidebar active-pill (layoutId). */
export const pillSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
};

/**
 * Bento tile entrance: fade in while rising on the Y-axis.
 * `custom` receives the tile index and drives the staggered delay,
 * which also works for tiles that stream in later (e.g. course cards).
 */
export const tileEntrance: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Container that staggers its children (used by the activity contribution grid). */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.012, delayChildren: 0.15 } },
};

/** Single contribution cell pop-in. */
export const cellEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};
