import { notFound } from "next/navigation";

// Les espaces membres affichent des données de démonstration tant que l'authentification
// (phase 3) n'est pas branchée. En production, ils restent inaccessibles sauf si ACW_DEMO=1
// est défini explicitement (préproduction, tests e2e).
export function demoEnabled(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.ACW_DEMO === "1";
}

export function requireDemo(): void {
  if (!demoEnabled()) notFound();
}
