import "server-only";

import { createClient as createAdminClient } from "@supabase/supabase-js";

import type { AppRole } from "@/modules/auth/roles";

import { createClient } from "./server";

// Service role : UNIQUEMENT côté serveur, jamais exposé. Filtres applicatifs obligatoires (ADR-002).
export function createServiceClient() {
  return createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export interface AppSession {
  userId: string;
  email: string;
  roles: AppRole[];
  companyIds: string[];
  mfaVerified: boolean;
}

/** Session applicative : Auth + rôles + rattachements entreprise (refiltre obligatoire en aval). */
export async function getAppSession(): Promise<AppSession | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user?.email) return null;

  const admin = createServiceClient();
  const [{ data: appUser }, { data: roles }, { data: members }] = await Promise.all([
    admin.from("users").select("id").eq("id", user.id).maybeSingle(),
    admin.from("user_roles").select("role").eq("user_id", user.id),
    admin.from("company_members").select("company_id").eq("user_id", user.id).eq("status", "active"),
  ]);
  if (!appUser) return null;

  const aal = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  return {
    userId: user.id,
    email: user.email,
    roles: (roles ?? []).map((r) => r.role as AppRole),
    companyIds: (members ?? []).map((m) => m.company_id as string),
    mfaVerified: aal.data?.currentLevel === "aal2",
  };
}

/** Journalise un événement auth dans audit_logs (append-only). */
export async function auditAuth(category: string, action: string, object: string, meta: Record<string, unknown> = {}) {
  const admin = createServiceClient();
  await admin.from("audit_logs").insert({ actor: "auth", category, action, object, meta });
}
