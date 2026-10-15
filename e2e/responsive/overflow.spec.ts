import { expect, test } from "../fixtures";

// Pages vérifiées à chaque viewport (compléter au fil des phases).
const routes = ["/connexion"];

for (const route of routes) {
  test(`aucun débordement horizontal sur ${route}`, async ({ page }) => {
    await page.goto(route);

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      const width = root.clientWidth;
      const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .filter((el) => el.getBoundingClientRect().right > width + 1)
        .slice(0, 10)
        .map((el) => `${el.tagName.toLowerCase()}${el.className ? `.${String(el.className).split(" ").join(".")}` : ""}`);
      return { scrollWidth: root.scrollWidth, clientWidth: width, offenders };
    });

    expect(overflow.offenders, "Éléments qui dépassent la largeur de la fenêtre").toEqual([]);
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
  });
}
