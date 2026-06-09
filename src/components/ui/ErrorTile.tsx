import { TriangleAlert } from "lucide-react";

/**
 * Graceful inline error state, shown in place of the course tiles when the
 * Supabase fetch fails. Spans the full course row so the grid stays balanced.
 */
export function ErrorTile({ message }: { message?: string }) {
  return (
    <section
      aria-live="polite"
      className="col-span-1 rounded-3xl border border-magenta/30 bg-surface/80 p-8 text-center md:col-span-2 lg:col-span-4"
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-magenta/40 bg-magenta/10 text-magenta">
          <TriangleAlert className="h-6 w-6" />
        </span>
        <h2 className="font-display text-lg font-semibold text-ink">
          Couldn&rsquo;t load your courses
        </h2>
        <p className="text-sm text-muted">
          {message ??
            "We couldn’t reach the database right now. Check the Supabase connection and try again."}
        </p>
      </div>
    </section>
  );
}
