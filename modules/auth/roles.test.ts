import { describe, expect, it } from "vitest";

import { canAccessSpace, roleCan } from "./roles";

describe("matrice RBAC (gate phase 3)", () => {
  it("superadmin passe partout", () => {
    expect(canAccessSpace(["superadmin"], "experts")).toBe(true);
    expect(canAccessSpace(["superadmin"], "business")).toBe(true);
    expect(canAccessSpace(["superadmin"], "admin")).toBe(true);
    expect(roleCan(["superadmin"], "contrat.inexistant")).toBe(true);
  });

  it("isolation des espaces", () => {
    expect(canAccessSpace(["expert"], "experts")).toBe(true);
    expect(canAccessSpace(["expert"], "business")).toBe(false);
    expect(canAccessSpace(["expert"], "admin")).toBe(false);
    expect(canAccessSpace(["company_admin"], "business")).toBe(true);
    expect(canAccessSpace(["company_member"], "admin")).toBe(false);
    expect(canAccessSpace(["africand_ops"], "admin")).toBe(true);
    expect(canAccessSpace(["africand_ops"], "business")).toBe(false);
    expect(canAccessSpace([], "experts")).toBe(false);
  });

  it("validation réservée aux ops/reviewers", () => {
    expect(roleCan(["africand_ops"], "consultant.validate")).toBe(true);
    expect(roleCan(["africand_reviewer"], "company.validate")).toBe(true);
    expect(roleCan(["africand_finance"], "consultant.validate")).toBe(false);
    expect(roleCan(["expert"], "need.qualify")).toBe(false);
  });

  it("signature contrats : ops uniquement (+ superadmin)", () => {
    expect(roleCan(["africand_ops"], "contract.sign")).toBe(true);
    expect(roleCan(["africand_reviewer"], "contract.sign")).toBe(false);
  });

  it("facturation : finance uniquement ; audit : ops/reviewer/finance", () => {
    expect(roleCan(["africand_finance"], "billing.read")).toBe(true);
    expect(roleCan(["africand_ops"], "billing.read")).toBe(false);
    expect(roleCan(["africand_finance"], "audit.read")).toBe(true);
    expect(roleCan(["expert"], "audit.read")).toBe(false);
    expect(roleCan(["company_admin"], "audit.read")).toBe(false);
  });

  it("actions métier par espace", () => {
    expect(roleCan(["company_member"], "need.create")).toBe(true);
    expect(roleCan(["expert"], "need.create")).toBe(false);
    expect(roleCan(["expert"], "profile.manage")).toBe(true);
    expect(roleCan(["company_admin"], "profile.manage")).toBe(false);
  });

  it("action inconnue refusée par défaut", () => {
    expect(roleCan(["africand_ops"], "xxx")).toBe(false);
  });
});
