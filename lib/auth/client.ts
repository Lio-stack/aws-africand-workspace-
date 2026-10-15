import { createBrowserClient } from "@supabase/ssr";

// Client navigateur (composants "use client" uniquement, jamais de service role).
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
