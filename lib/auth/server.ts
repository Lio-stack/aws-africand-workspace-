import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client serveur (Server Components, actions, route handlers). Rafraîchit la session via cookies.
export async function createClient() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Appelé depuis un Server Component : le middleware a déjà rafraîchi la session.
        }
      },
    },
  });
}
