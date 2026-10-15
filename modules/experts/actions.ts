"use server";

import { z } from "zod";

import { getAppSession } from "@/lib/auth/session";
import { consultantSignupSchema } from "@/modules/auth/schema";
import { roleCan } from "@/modules/auth/roles";

import { createCandidature, transitionStatus } from "./service";
import type { ConsultantStatus } from "./public";

export type CandidatureState =
  | { status: "idle" }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "ok"; id: string };

// Candidature publique : inscription sans compte (le compte se crée au premier OTP).
export async function submitCandidature(_previous: CandidatureState, formData: FormData): Promise<CandidatureState> {
  const parsed = consultantSignupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    country: formData.get("country"),
    experience: formData.get("experience"),
    domain: formData.get("domain"),
    linkedin: formData.get("linkedin") ?? "",
    terms: formData.get("terms"),
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      errors[String(issue.path[0] ?? "form")] = issue.message;
    });
    return { status: "invalid", errors };
  }
  try {
    const id = await createCandidature(parsed.data);
    return { status: "ok", id };
  } catch (error) {
    return { status: "invalid", errors: { form: error instanceof Error ? error.message : "Dépôt impossible." } };
  }
}

const qualifySchema = z.object({
  consultantId: z.string().uuid(),
  to: z.enum(["en_verification", "qualifie", "suspendu", "rejete"]),
});

// Transition réservée AfriCand (ops/reviewer) : rôle vérifié ici, jamais côté client.
export async function qualifyConsultant(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const session = await getAppSession();
  if (!session || !roleCan(session.roles, "consultant.validate")) {
    return { ok: false, error: "Action réservée à l'équipe AfriCand." };
  }
  const parsed = qualifySchema.safeParse({ consultantId: formData.get("consultantId"), to: formData.get("to") });
  if (!parsed.success) return { ok: false, error: "Paramètres invalides." };
  const from = (formData.get("from") as ConsultantStatus) ?? "candidat";
  try {
    await transitionStatus(parsed.data.consultantId, from, parsed.data.to, session.email);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Transition impossible." };
  }
}
