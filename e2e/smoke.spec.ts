import { expect, test } from "./fixtures";

test("la racine redirige vers la connexion, en français", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/connexion$/);
  await expect(page).toHaveTitle("Connexion · ACW");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});
