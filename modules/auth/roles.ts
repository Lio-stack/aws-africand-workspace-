import { z } from "zod";

// 7 rôles (ADR-009, architecture-fonctionnelle §2).
export const appRoles = [
  "expert",
  "company_admin",
  "company_member",
  "africand_ops",
  "africand_reviewer",
  "africand_finance",
  "superadmin",
] as const;

export type AppRole = (typeof appRoles)[number];

export const appRoleSchema = z.enum(appRoles);

export type Space = "experts" | "business" | "admin";

const SPACE_ROLES: Record<Space, readonly AppRole[]> = {
  experts: ["expert"],
  business: ["company_admin", "company_member"],
  admin: ["africand_ops", "africand_reviewer", "africand_finance", "superadmin"],
};

/** Rôles autorisés sur un espace. superadmin passe partout. */
export function canAccessSpace(roles: readonly AppRole[], space: Space): boolean {
  if (roles.includes("superadmin")) return true;
  return SPACE_ROLES[space].some((role) => roles.includes(role));
}

/** Matrice RBAC (gate phase 3 : testée en modules/auth/roles.test.ts). */
export function roleCan(roles: readonly AppRole[], action: string): boolean {
  if (roles.includes("superadmin")) return true;
  switch (action) {
    case "consultant.validate":
    case "company.validate":
    case "need.qualify":
    case "introduction.approve":
      return roles.some((r) => r === "africand_ops" || r === "africand_reviewer");
    case "contract.sign":
      return roles.includes("africand_ops");
    case "billing.read":
      return roles.includes("africand_finance");
    case "audit.read":
      return roles.some((r) => r === "africand_ops" || r === "africand_reviewer" || r === "africand_finance");
    case "need.create":
    case "shortlist.manage":
      return roles.some((r) => r === "company_admin" || r === "company_member");
    case "profile.manage":
      return roles.includes("expert");
    default:
      return false;
  }
}
