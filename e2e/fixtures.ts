import { test as base, expect } from "@playwright/test";

// Fixture automatique : tout test échoue si la page lève une erreur JS
// ou écrit une erreur dans la console. Un test peut déclarer des erreurs attendues
// (ex. le statut 404 d'une page volontairement inexistante) via `expectedConsoleErrors`.
export const test = base.extend<{ expectedConsoleErrors: RegExp[]; jsErrors: string[] }>({
  expectedConsoleErrors: [[], { option: true }],
  jsErrors: [
    async ({ page, expectedConsoleErrors }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        if (expectedConsoleErrors.some((pattern) => pattern.test(message.text()))) return;
        errors.push(`console.error: ${message.text()}`);
      });
      await use(errors);
      expect(errors, "Erreurs JavaScript détectées").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
