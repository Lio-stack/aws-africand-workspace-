import { expect, test } from "./fixtures";

test.describe("page inconnue", () => {
  // Le navigateur journalise le statut 404 du document : erreur attendue ici.
  test.use({ expectedConsoleErrors: [/status of 404/] });

  test("écran 404", async ({ page }) => {
    const response = await page.goto("/page-qui-n-existe-pas");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page introuvable" })).toBeVisible();
  });
});

test("espace Experts : la navigation latérale mène aux écrans et marque l'élément actif", async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 1024, "Navigation latérale visible à partir de 1024 px");
  await page.goto("/experts");
  const nav = page.getByRole("navigation", { name: "Navigation Experts" });
  await nav.getByRole("link", { name: "Compétences" }).click();
  await expect(page).toHaveURL(/\/experts\/competences$/);
  await expect(nav.getByRole("link", { name: "Compétences" })).toHaveAttribute("aria-current", "page");
});

test("profils Business : jamais de ville affichée, seulement le pays", async ({ page }) => {
  await page.goto("/business/profils");
  const list = page.getByRole("region", { name: "Profils anonymisés" });
  await expect(list).toContainText("Côte d'Ivoire");
  for (const city of ["Abidjan", "Dakar", "Casablanca", "Ouagadougou", "Lomé"]) {
    await expect(list).not.toContainText(city);
  }
});

test("introduction côté expert : entreprise anonyme avant consentement", async ({ page }) => {
  await page.goto("/experts/introductions");
  await expect(page.getByRole("heading", { name: "Due diligence financière" })).toBeVisible();
  await expect(page.getByText("Entreprise anonyme, secteur agro-industriel, Sénégal").first()).toBeVisible();
});

test("inscription consultant : erreurs explicites puis écran d'attente", async ({ page }) => {
  await page.goto("/inscription/consultant");
  await page.getByRole("button", { name: "Créer un compte" }).click();
  await expect(page.getByText("Le prénom est obligatoire.")).toBeVisible();
  await expect(page.getByText("Vous devez accepter les conditions pour continuer.")).toBeVisible();

  await page.getByLabel("Prénom").fill("Awa");
  await page.getByLabel("Nom", { exact: true }).fill("Ouattara");
  await page.getByLabel("Adresse e-mail professionnelle").fill("awa@exemple.com");
  await page.getByLabel("Pays de résidence").selectOption("Côte d'Ivoire");
  await page.getByLabel("Années d'expérience").selectOption("11 à 15 ans");
  await page.getByLabel("Domaine d'expertise principal").selectOption("Finance");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Créer un compte" }).click();
  await expect(page).toHaveURL(/\/compte\/attente$/);
});

test("paramètres admin : les règles de sécurité imposées ne sont pas désactivables", async ({ page }) => {
  await page.goto("/admin/parametres");
  await expect(page.getByRole("switch", { name: "MFA obligatoire pour l'équipe AfriCand" })).toBeDisabled();
  await expect(page.getByRole("switch", { name: "Restriction d'accès admin par adresse IP" })).toBeEnabled();
});
