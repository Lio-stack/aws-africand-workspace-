import { expect, test } from "./fixtures";

test("la page d'accueil du socle s'affiche en français", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1, name: "AfriCand Work Space" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Espaces" }).getByText(/^AWS /)).toHaveCount(3);
});
