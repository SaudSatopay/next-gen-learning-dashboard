"use client";

import { useEffect } from "react";
import { TriangleAlert, RotateCcw } from "lucide-react";

/**
 * Route-level error boundary (must be a Client Component).
 * Backstop for any unexpected render/runtime error — the course fetch handles
 * its own failures inline, so this typically only fires on configuration issues.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-magenta/40 bg-magenta/10 text-magenta">
          <TriangleAlert className="h-7 w-7" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Something went wrong
        </h1>
        <p className="text-sm text-muted">
          The dashboard hit an unexpected error — usually a Supabase connection
          or configuration issue. Check your environment variables and retry.
        </p>
        <button
          type="button"
          onClick={reset}
          className="bg-sunset inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-canvas transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}
