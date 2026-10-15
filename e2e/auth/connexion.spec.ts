import { expect, test } from "../fixtures";

test.describe("écran 04 · Connexion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/connexion");
  });

  test("affiche le formulaire de connexion par e-mail", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Connexion" })).toBeVisible();
    await expect(page.getByText("Accédez à votre compte ACW")).toBeVisible();
    await expect(page.getByLabel("Adresse e-mail")).toBeVisible();
    await expect(page.getByRole("button", { name: "Recevoir mon code" })).toBeVisible();
  });

  test("signale un champ vide", async ({ page }) => {
    await page.getByRole("button", { name: "Recevoir mon code" }).click();

    // Next.js ajoute son propre role="alert" (annonceur de route) : on cible l'erreur du champ.
    const error = page.locator("#email-error");
    await expect(error).toHaveRole("alert");
    await expect(error).toHaveText("Saisissez votre adresse e-mail.");
    await expect(page.getByLabel("Adresse e-mail")).toHaveAttribute("aria-invalid", "true");
  });

  test("signale une adresse invalide", async ({ page }) => {
    await page.getByLabel("Adresse e-mail").fill("nom@entreprise");
    await page.getByRole("button", { name: "Recevoir mon code" }).click();

    await expect(page.locator("#email-error")).toContainText("adresse e-mail valide");
  });

  test("indique honnêtement qu'aucun code n'est envoyé tant que l'authentification n'est pas active", async ({
    page,
  }) => {
    await page.getByLabel("Adresse e-mail").fill("nom@entreprise.com");
    await page.getByRole("button", { name: "Recevoir mon code" }).click();

    const status = page.getByRole("status");
    await expect(status).toContainText("aucun code n'a été envoyé");
    await expect(status).toContainText("nom@entreprise.com");
  });

  test("les actions principales respectent la cible tactile de 44 px", async ({ page }) => {
    const button = await page.getByRole("button", { name: "Recevoir mon code" }).boundingBox();
    const input = await page.getByLabel("Adresse e-mail").boundingBox();

    expect(button?.height).toBeGreaterThanOrEqual(44);
    expect(input?.height).toBeGreaterThanOrEqual(44);
  });
});
