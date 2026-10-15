import { describe, expect, it } from "vitest";

import { companySignupSchema, consultantSignupSchema, loginRequestSchema } from "./schema";

describe("loginRequestSchema", () => {
  it("accepte une adresse valide et retire les espaces", () => {
    const result = loginRequestSchema.safeParse({ email: "  nom@entreprise.com " });
    expect(result.success && result.data.email).toBe("nom@entreprise.com");
  });

  it("refuse un champ vide avec un message explicite", () => {
    const result = loginRequestSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Saisissez votre adresse e-mail.");
  });

  it("refuse une adresse mal formée", () => {
    const result = loginRequestSchema.safeParse({ email: "nom@entreprise" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/adresse e-mail valide/);
  });
});


describe("schémas d'inscription", () => {
  const consultant = {
    firstName: "Awa",
    lastName: "Ouattara",
    email: "awa@exemple.com",
    country: "Côte d'Ivoire",
    experience: "11 à 15 ans",
    domain: "Finance",
    linkedin: "",
    terms: "on",
  };

  it("accepte une inscription consultant complète", () => {
    expect(consultantSignupSchema.safeParse(consultant).success).toBe(true);
  });

  it("exige l'acceptation des conditions", () => {
    const result = consultantSignupSchema.safeParse({ ...consultant, terms: undefined });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/accepter les conditions/);
  });

  it("refuse une URL LinkedIn incomplète", () => {
    expect(consultantSignupSchema.safeParse({ ...consultant, linkedin: "linkedin.com/in/x" }).success).toBe(false);
  });

  it("exige le RCCM pour une entreprise", () => {
    const result = companySignupSchema.safeParse({
      companyName: "Entreprise SA",
      country: "Sénégal",
      organizationType: "PME",
      registration: "",
      firstName: "Kofi",
      lastName: "Annan",
      role: "DG",
      email: "dg@entreprise.sn",
      terms: "on",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["registration"]);
  });
});
