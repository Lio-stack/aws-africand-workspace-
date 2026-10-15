// Constantes et garde-fous PII testables sans serveur (importable partout, y compris tests).
// GATE phase 4 : aucune PII ne sort vers le Business — colonnes publiques en liste fermée.

export const PUBLIC_PROFILE_COLUMNS = ["code", "title", "country", "summary", "completion"] as const;

const PII_COLUMNS = ["first_name", "last_name", "email", "phone", "city", "organization", "contact", "name"];

export type PublicProfile = {
  code: string;
  title: string;
  country: string;
  summary: string;
  completion: number;
};

export type ConsultantStatus = "candidat" | "en_verification" | "qualifie" | "suspendu" | "rejete";

export const NEXT_STATUS: Record<ConsultantStatus, ConsultantStatus[]> = {
  candidat: ["en_verification", "rejete"],
  en_verification: ["qualifie", "rejete", "suspendu"],
  qualifie: ["suspendu"],
  suspendu: ["qualifie"],
  rejete: [],
};

/** Garde-fou : une charge ne doit contenir aucune colonne PII. */
export function assertNoPii(payload: Record<string, unknown>, context: string): void {
  const leaked = PII_COLUMNS.filter((col) => col in payload);
  if (leaked.length > 0) throw new Error(`PII exposée (${context}) : ${leaked.join(", ")}`);
}
