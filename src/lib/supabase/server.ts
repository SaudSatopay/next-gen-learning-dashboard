import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a request-scoped Supabase client for use in Server Components.
 *
 * Uses `@supabase/ssr` with Next.js cookies so any auth session is read on the
 * server. For this dashboard we only perform anonymous public reads (guarded by
 * RLS), but we follow the official SSR pattern so the setup is production-ready.
 *
 * `cookies()` is async in Next.js 16 and must be awaited.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (see .env.example).",
    );
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Invoked from a Server Component render — safe to ignore.
          // (No session writes are needed for anonymous public reads.)
        }
      },
    },
  });
}
