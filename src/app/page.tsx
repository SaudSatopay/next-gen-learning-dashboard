import { Suspense } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { HeroTile } from "@/components/bento/HeroTile";
import { ActivityTile } from "@/components/bento/ActivityTile";
import { CoursesSection } from "@/components/courses/CoursesSection";
import { CourseGridSkeleton } from "@/components/courses/CourseGridSkeleton";

/**
 * Dashboard route — a Server Component.
 *
 * The static shell (sidebar, hero, activity) renders immediately. The
 * data-dependent course tiles are wrapped in <Suspense>, so a pulsing skeleton
 * streams first and the live Supabase data streams in when ready. Accessing
 * cookies() inside the Supabase client keeps this route dynamic, so every
 * request reflects the latest data.
 */
export default function Page() {
  return (
    <DashboardShell>
      <BentoGrid>
        <HeroTile index={0} />
        <ActivityTile index={1} />
        <Suspense fallback={<CourseGridSkeleton />}>
          <CoursesSection />
        </Suspense>
      </BentoGrid>
    </DashboardShell>
  );
}
