"use server";

import { loginRequestSchema } from "./schema";

export type LoginRequestState =
  | { status: "idle" }
  | { status: "invalid"; email: string; error: string }
  | { status: "unavailable"; email: string };

// Validation serveur de la demande de code. L'envoi réel du code (Supabase Auth, OTP e-mail)
// arrive en phase 3 : aucun e-mail n'est envoyé et l'état retourné le dit explicitement.
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

  return { status: "unavailable", email: parsed.data.email };
}
