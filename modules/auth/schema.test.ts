import { describe, expect, it } from "vitest";

import { loginRequestSchema } from "./schema";

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
