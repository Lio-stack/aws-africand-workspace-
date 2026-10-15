import { describe, expect, it } from "vitest";

import { PUBLIC_PROFILE_COLUMNS, assertNoPii } from "./public";

describe("gate phase 4 : aucune PII vers le Business", () => {
  it("colonnes publiques en liste fermée, sans PII", () => {
    expect([...PUBLIC_PROFILE_COLUMNS]).toEqual(["code", "title", "country", "summary", "completion"]);
    expect(() => assertNoPii({ code: "EXP-101", title: "M&A", country: "CI", summary: "", completion: 60 }, "test")).not.toThrow();
  });

  it("toute PII détectée fait échouer", () => {
    for (const col of ["first_name", "last_name", "email", "phone", "city", "organization", "contact", "name"]) {
      expect(() => assertNoPii({ code: "EXP-101", [col]: "x" }, "test")).toThrow(/PII exposée/);
    }
  });

  it("ville interdite côté Business (pays uniquement, ADR-012)", () => {
    expect(PUBLIC_PROFILE_COLUMNS).not.toContain("city");
    expect(PUBLIC_PROFILE_COLUMNS).toContain("country");
  });
});
