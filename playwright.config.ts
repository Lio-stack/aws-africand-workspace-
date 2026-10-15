import { defineConfig, devices } from "@playwright/test";

// Port dédié aux tests, distinct du 3000 utilisé en développement.
const PORT = 3100;
const isCI = !!process.env.CI;

// Viewports de référence (docs/motion-design.md §8).
const viewports = [
  { name: "mobile", viewport: { width: 375, height: 812 }, hasTouch: true },
  { name: "tablet", viewport: { width: 768, height: 1024 }, hasTouch: true },
  { name: "laptop", viewport: { width: 1280, height: 800 }, hasTouch: false },
  { name: "desktop", viewport: { width: 1440, height: 900 }, hasTouch: false },
];

const browsers = [
  { name: "chromium", device: devices["Desktop Chrome"] },
  { name: "webkit", device: devices["Desktop Safari"] },
];

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Les composants affichent leur état final : captures stables.
    reducedMotion: "reduce",
    locale: "fr-FR",
    timezoneId: "Africa/Abidjan",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  expect: {
    toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixelRatio: 0.01 },
  },
  projects: browsers.flatMap((browser) =>
    viewports.map((vp) => ({
      name: `${browser.name}-${vp.name}`,
      use: { ...browser.device, viewport: vp.viewport, hasTouch: vp.hasTouch },
    })),
  ),
  webServer: {
    // En CI, l'application est construite avant (npm run build).
    command: `${isCI ? "npm run start" : "npm run dev"} -- -p ${PORT}`,
    port: PORT,
    reuseExistingServer: !isCI,
    timeout: 120_000,
    // Espaces de démonstration accessibles pendant les tests (voir lib/demo/guard.ts).
    env: { ACW_DEMO: "1" },
  },
});
