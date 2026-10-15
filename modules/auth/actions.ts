"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/auth/server";
import { auditAuth, createServiceClient } from "@/lib/auth/session";
import { canAccessSpace, type AppRole, type Space } from "./roles";
import { loginRequestSchema } from "./schema";

export type LoginRequestState =
  | { status: "idle" }
  | { status: "invalid"; email: string; error: string }
  | { status: "unavailable"; email: string };

// ADR-011 : e-mail + code OTP (MVP). Envoie réel via Supabase Auth.
export async function requestLoginCode(
  _previous: LoginRequestState,
  formData: FormData,
): Promise<LoginRequestState> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw : "";
  const parsed = loginRequestSchema.safeParse({ email });

  if (!parsed.success) {
    return { status: "invalid", email, error: parsed.error.issues[0]?.message ?? "Adresse e-mail invalide." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: { shouldCreateUser: true },
  });
  if (error) {
    await auditAuth("auth", "otp.request.failed", parsed.data.email, { reason: error.message });
    return { status: "unavailable", email: parsed.data.email };
  }
  await auditAuth("auth", "otp.requested", parsed.data.email, {});
  redirect(`/connexion/code?email=${encodeURIComponent(parsed.data.email)}`);
}

const verifySchema = z.object({
  email: z.string().trim().min(1),
  token: z.string().trim().regex(/^\d{6}$/, "Saisissez les 6 chiffres du code reçu."),
});

export type VerifyState =
  | { status: "idle" }
  | { status: "invalid"; error: string }
  | { status: "ok"; next: string };

/** Vérifie le code OTP, crée la fiche applicative au premier login, journalise. */
export async function verifyLoginCode(_previous: VerifyState, formData: FormData): Promise<VerifyState> {
  const parsed = verifySchema.safeParse({
    email: formData.get("email"),
    token: String(formData.get("token") ?? "").replace(/\s/g, ""),
  });
  if (!parsed.success) {
    return { status: "invalid", error: parsed.error.issues[0]?.message ?? "Code invalide." };
  }
  const { email, token } = parsed.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error || !data.user) {
    await auditAuth("auth", "otp.verify.failed", email, { reason: error?.message ?? "unknown" });
    return { status: "invalid", error: "Code incorrect ou expiré. Demandez un nouveau code." };
  }

  const admin = createServiceClient();
  const { data: existing } = await admin.from("users").select("id").eq("id", data.user.id).maybeSingle();
  if (!existing) {
    await admin.from("users").insert({ id: data.user.id, email, display_name: "" });
  }
  const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", data.user.id);
  const list = (roles ?? []).map((r) => r.role as AppRole);
  await auditAuth("auth", "otp.verified", email, { roles: list });

  const next: string = canAccessSpace(list, "admin" as Space)
    ? "/admin"
    : canAccessSpace(list, "business" as Space)
      ? "/business"
      : canAccessSpace(list, "experts" as Space)
        ? "/experts"
        : "/compte/attente";
  return { status: "ok", next };
}
