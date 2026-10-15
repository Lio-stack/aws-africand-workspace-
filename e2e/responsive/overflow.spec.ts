import { expect, test } from "../fixtures";
import { allRoutes } from "../routes";

// Chaque écran : titre visible, aucun débordement horizontal, aucune erreur JS (fixture).
for (const route of allRoutes) {
  test(`écran ${route} : rendu sans débordement`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth };
    });
    expect(overflow.scrollWidth, "Débordement horizontal de la page").toBeLessThanOrEqual(overflow.clientWidth);
  });
}
