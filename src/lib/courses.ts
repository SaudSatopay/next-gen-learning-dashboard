import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Course } from "@/types/database";

/**
 * Fetches active courses from Supabase.
 *
 * Runs only on the server (it awaits `cookies()` via the SSR client), so the
 * database credentials never reach the client bundle. Throws on failure so the
 * caller can render a graceful error state / trigger the route error boundary.
 */
export async function getCourses(): Promise<Course[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load courses from Supabase: ${error.message}`);
  }

  return (data ?? []) as Course[];
}
