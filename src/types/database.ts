/**
 * Shape of a row in the Supabase `courses` table.
 * Used to type the payload returned from Server Component data fetching.
 */
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}
