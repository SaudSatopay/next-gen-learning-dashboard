/**
 * Suspense fallback for the course tiles. Renders four placeholder cards with a
 * subtle pulsing animation. Crucially, each placeholder matches the real
 * CourseTile footprint (rounded-3xl, border, padding, single grid column) so
 * swapping in the loaded data causes zero layout shift.
 */
export function CourseGridSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          aria-hidden
          className="rounded-3xl border border-white/10 bg-surface/80 p-5"
        >
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 animate-pulse rounded-xl bg-white/10" />
              <div className="h-3 w-12 animate-pulse rounded-full bg-white/10" />
            </div>
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
            <div className="mt-auto space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-16 animate-pulse rounded-full bg-white/10" />
                <div className="h-2.5 w-8 animate-pulse rounded-full bg-white/10" />
              </div>
              <div className="h-1.5 w-full animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
