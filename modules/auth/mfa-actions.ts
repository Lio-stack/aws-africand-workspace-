"use server";

import { z } from "zod";

import { createClient } from "@/lib/auth/server";
import { auditAuth } from "@/lib/auth/session";

// MFA TOTP obligatoire pour l'équipe AfriCand (ADR-011). Mécanisme TOTP vs SMS : ouvert.
export type MfaState =
  | { status: "idle" }
  | { status: "enrolled"; factorId: string; secret: string; uri: string }
  | { status: "invalid"; error: string }
  | { status: "ok" };

/** Étape 1 : crée un facteur TOTP, renvoie le secret à saisir dans l'app d'authentification. */
export async function enrollMfa(): Promise<MfaState> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
  if (error || !data) return { status: "invalid", error: "Enrôlement impossible : reconnectez-vous." };
  return { status: "enrolled", factorId: data.id, secret: data.totp.secret, uri: data.totp.uri };
}

const codeSchema = z.object({
  factorId: z.string().min(1),
  code: z.string().regex(/^\d{6}$/, "Saisissez le code à 6 chiffres affiché dans votre application."),
});

/** Étape 2 : confirme l'enrôlement avec un premier code (puis exige aal2 côté admin). */
export async function confirmMfaEnroll(_previous: MfaState, formData: FormData): Promise<MfaState> {
  const parsed = codeSchema.safeParse({ factorId: formData.get("factorId"), code: String(formData.get("code") ?? "").replace(/\s/g, "") });
  if (!parsed.success) {
    return { status: "invalid", error: parsed.error.issues[0]?.message ?? "Code invalide." };
  }
  const supabase = await createClient();
  const challenge = await supabase.auth.mfa.challenge({ factorId: parsed.data.factorId });
  if (challenge.error) return { status: "invalid", error: "Défi MFA impossible : recommencez." };
  const { error } = await supabase.auth.mfa.verify({
    factorId: parsed.data.factorId,
    challengeId: challenge.data.id,
    code: parsed.data.code,
  });
  if (error) {
    await auditAuth("auth", "mfa.enroll.failed", "", {});
    return { status: "invalid", error: "Code incorrect. Vérifiez l'heure de votre téléphone." };
  }
  await auditAuth("auth", "mfa.enrolled", "", { factorId: parsed.data.factorId });
  return { status: "ok" };
}
