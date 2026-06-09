import type { ReactNode } from "react";

/**
 * The Bento grid container (semantic <section>).
 *
 * - Mobile: single column.
 * - Tablet (md): 2 columns.
 * - Desktop (lg): 4 columns with fixed-height rows; the Hero and Activity tiles
 *   span 2×2 and pack into the top, leaving a row of four course tiles below.
 *
 * Tiles handle their own entrance/hover animation, so this stays a plain
 * server component.
 */
export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="Dashboard overview"
      className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:auto-rows-[12.5rem] lg:grid-cols-4"
    >
      {children}
    </section>
  );
}
