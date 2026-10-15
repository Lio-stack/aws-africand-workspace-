import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rafraîchit la session Supabase à chaque requête (pattern @supabase/ssr).
// La protection fine (espace + rôle) vit dans les layouts via requireSpace().
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (process.env.ACW_DEMO === "1" && process.env.NODE_ENV !== "production") return response;
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/experts/:path*", "/business/:path*", "/admin/:path*", "/compte/:path*"],
};
