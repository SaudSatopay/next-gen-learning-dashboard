import { BentoTile } from "@/components/bento/BentoTile";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Course } from "@/types/database";

/**
 * A single course tile (rendered from a Supabase row).
 * Server component: it composes the dynamic icon, title and the client-side
 * animated progress bar. `index` drives both the entrance stagger and the
 * progress-bar start delay so cards ripple in as they stream from the server.
 */
export function CourseTile({
  course,
  index = 0,
}: {
  course: Course;
  index?: number;
}) {
  return (
    <BentoTile index={index} ariaLabel={course.title}>
      <div className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-coral">
            <DynamicIcon name={course.icon_name} className="h-5 w-5" />
          </span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            Course
          </span>
        </div>

        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {course.title}
        </h3>

        <div className="mt-auto">
          <ProgressBar value={course.progress} delay={0.2 + index * 0.08} />
        </div>
      </div>
    </BentoTile>
  );
}
