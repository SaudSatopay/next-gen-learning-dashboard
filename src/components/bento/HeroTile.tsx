import { ArrowUpRight } from "lucide-react";
import { BentoTile } from "@/components/bento/BentoTile";
import { StreakIndicator } from "@/components/ui/StreakIndicator";
import { STUDENT_NAME, STREAK_DAYS } from "@/lib/config";

/**
 * Large greeting tile. Server component — composes the static greeting/copy and
 * passes it into the animated client tiles (BentoTile, StreakIndicator).
 */
export function HeroTile({ index = 0 }: { index?: number }) {
  return (
    <BentoTile
      index={index}
      ariaLabel="Welcome"
      className="md:col-span-2 lg:row-span-2"
    >
      {/* Decorative corner glow. */}
      <span
        aria-hidden
        className="bg-sunset pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-20 blur-2xl"
      />

      <div className="flex h-full flex-col justify-between gap-6 p-7 sm:p-8">
        <div>
          <p className="mb-2 text-sm font-medium text-muted">Welcome back,</p>
          <h1 className="font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl">
            <span className="text-gradient">{STUDENT_NAME}</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            You&rsquo;re on a {STREAK_DAYS}-day streak. Two lessons left to hit
            today&rsquo;s goal — let&rsquo;s keep the momentum going.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <StreakIndicator />
          <button
            type="button"
            className="group/btn bg-sunset inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-canvas transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Resume learning
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </BentoTile>
  );
}
