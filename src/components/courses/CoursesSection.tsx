import { getCourses } from "@/lib/courses";
import { CourseTile } from "@/components/bento/CourseTile";
import { ErrorTile } from "@/components/ui/ErrorTile";
import type { Course } from "@/types/database";

/**
 * Async Server Component that fetches courses from Supabase and renders one
 * course tile per row. Rendered inside a <Suspense> boundary so a skeleton
 * streams first.
 *
 * Only the data fetch (the `await`) sits inside try/catch — failures there
 * render a graceful inline error tile. The success-path JSX is constructed
 * outside the try so render errors still propagate to the route error boundary.
 *
 * Returns a fragment (no wrapper element) so each CourseTile becomes a direct
 * child of the Bento grid.
 */
export async function CoursesSection() {
  let courses: Course[];

  try {
    courses = await getCourses();
  } catch (err) {
    const message = err instanceof Error ? err.message : undefined;
    return <ErrorTile message={message} />;
  }

  if (courses.length === 0) {
    return (
      <ErrorTile message="No courses found yet. Seed your Supabase `courses` table to see them here." />
    );
  }

  return (
    <>
      {courses.map((course, i) => (
        <CourseTile key={course.id} course={course} index={i} />
      ))}
    </>
  );
}
