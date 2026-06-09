"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { tileEntrance, hoverSpring } from "@/lib/motion";

type BentoTileProps = {
  children: ReactNode;
  /** Stagger order for the entrance animation (also works for streamed-in tiles). */
  index?: number;
  /** Extra classes — typically grid placement (col-span / row-span / col-start …). */
  className?: string;
  /** Accessible label for the article landmark. */
  ariaLabel?: string;
};

/**
 * Reusable Bento tile.
 * - Entrance: fade + rise (opacity / translateY) staggered by `index`.
 * - Hover: spring-physics scale-up (1.02) + a gradient border and sheen that
 *   fade in via opacity only. Every animated property is transform/opacity, so
 *   hover and entrance never trigger layout or paint off the compositor.
 */
export function BentoTile({
  children,
  index = 0,
  className = "",
  ariaLabel,
}: BentoTileProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      aria-label={ariaLabel}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 ${className}`}
      style={{
        willChange: "transform",
        boxShadow:
          "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 24px 48px -32px rgba(0,0,0,0.85)",
      }}
      variants={tileEntrance}
      custom={index}
      initial="hidden"
      animate="show"
      whileHover={reduce ? undefined : { scale: 1.02 }}
      transition={hoverSpring}
    >
      {/* Static gradient-mesh wash — subtle, always present behind content. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, rgba(255,45,155,0.07), transparent 50%), radial-gradient(120% 80% at 100% 100%, rgba(255,176,32,0.06), transparent 55%)",
        }}
      />
      {/* Hover sheen — opacity-only reveal. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, rgba(255,107,61,0.16), transparent 60%)",
        }}
      />
      {/* Hover gradient border — masked 1px ring, opacity-only reveal. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: "1px",
          background:
            "linear-gradient(130deg, rgba(255,45,155,0.7), rgba(255,176,32,0.6))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.article>
  );
}
