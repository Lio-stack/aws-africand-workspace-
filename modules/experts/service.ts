import "server-only";

import { createServiceClient, auditAuth } from "@/lib/auth/session";

import {
  PUBLIC_PROFILE_COLUMNS,
  assertNoPii,
  NEXT_STATUS,
  type ConsultantStatus,
  type PublicProfile,
} from "./public";

// Phase 4 · Service Experts (serveur uniquement, service role + filtres applicatifs).
// GATE : aucune PII ne sort vers le Business — colonnes publiques en liste fermée.

/** Recherche anonymisée (Business) : profils qualifiés uniquement, colonnes publiques seules. */
export async function searchPublicProfiles(query: string, limit = 20): Promise<PublicProfile[]> {
  const admin = createServiceClient();
  const { data, error } = await admin
    .from("qualified_consultants")
    .select(PUBLIC_PROFILE_COLUMNS.join(","))
    .ilike("title", `%${query}%`)
    .limit(limit);
  if (error) throw new Error(`Recherche profils impossible : ${error.message}`);
  const rows = (data ?? []) as unknown as PublicProfile[];
  rows.forEach((row) => assertNoPii(row as unknown as Record<string, unknown>, "searchPublicProfiles"));
  return rows;
}

/** Dossier complet (expert propriétaire ou admin) : PII incluse, jamais vers le Business. */
export async function getOwnDossier(userId: string) {
  const admin = createServiceClient();
  const { data: consultant, error } = await admin.from("consultants").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw new Error(`Dossier inaccessible : ${error.message}`);
  if (!consultant) return null;
  const [{ data: skills }, { data: experiences }, { data: references }, { data: profile }] = await Promise.all([
    admin.from("consultant_skills").select("domain,name,years,level").eq("consultant_id", consultant.id),
    admin.from("consultant_experiences").select("role,organization,organization_public,period,description").eq("consultant_id", consultant.id),
    admin.from("consultant_references").select("name,relation,status").eq("consultant_id", consultant.id),
    admin.from("consultant_public_profiles").select("code,title,country,summary,completion").eq("consultant_id", consultant.id).maybeSingle(),
  ]);
  return { consultant, skills: skills ?? [], experiences: experiences ?? [], references: references ?? [], profile };
}

/** Candidature publique (inscription) : statut candidat, audit. */
export async function createCandidature(input: {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  experience: string;
  domain: string;
  userId?: string;
}) {
  const admin = createServiceClient();
  const { data, error } = await admin
    .from("consultants")
    .insert({
      user_id: input.userId ?? null,
      status: "candidat",
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      country: input.country,
      title: input.domain,
      bio: `${input.experience} d'expérience`,
    })
    .select("id")
    .single();
  if (error) throw new Error(`Candidature impossible : ${error.message}`);
  await auditAuth("validation", "candidature.deposee", data.id, { email: input.email });
  return data.id as string;
}

/**
 * Transition de statut (AfriCand ops/reviewer uniquement — vérifier le rôle avant d'appeler).
 * La qualification publie le profil anonymisé (code EXP-XXX).
 */
export async function transitionStatus(consultantId: string, from: ConsultantStatus, to: ConsultantStatus, actor: string) {
  if (!NEXT_STATUS[from].includes(to)) throw new Error(`Transition interdite : ${from} → ${to}.`);
  const admin = createServiceClient();
  const { error } = await admin.from("consultants").update({ status: to }).eq("id", consultantId).eq("status", from);
  if (error) throw new Error(`Transition impossible : ${error.message}`);
  if (to === "qualifie") {
    const { data: consultant } = await admin.from("consultants").select("title,country").eq("id", consultantId).single();
    let code = "";
    for (let attempt = 0; attempt < 5; attempt++) {
      code = `EXP-${String(Math.floor(100 + Math.random() * 900))}`;
      const { error: upsertError } = await admin.from("consultant_public_profiles").upsert(
        {
          consultant_id: consultantId,
          code,
          title: (consultant?.title as string) ?? "",
          country: (consultant?.country as string) ?? "",
          summary: "",
          completion: 60,
        },
        { onConflict: "consultant_id" },
      );
      if (!upsertError) break;
      if (!/duplicate|unique/i.test(upsertError.message)) throw new Error(`Publication impossible : ${upsertError.message}`);
      code = "";
    }
    if (!code) throw new Error("Publication impossible : code unique introuvable.");
  }
  await auditAuth("validation", `consultant.${to}`, consultantId, { actor, from });
}
