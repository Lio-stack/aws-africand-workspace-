import { test as base, expect } from "@playwright/test";

// Fixture automatique : tout test échoue si la page lève une erreur JS
// ou écrit une erreur dans la console.
export const test = base.extend<{ jsErrors: string[] }>({
  jsErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(`console.error: ${message.text()}`);
      });
      await use(errors);
      expect(errors, "Erreurs JavaScript détectées").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
