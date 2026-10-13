import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  // Start the local preview only for local runs. In CI, BASE_URL points to a
  // deployed mirror, so waiting for localhost would make every mirror job time out.
  ...(process.env.BASE_URL
    ? {}
    : {
        webServer: {
          command: "npm run preview -- --port 4173",
          url: "http://localhost:4173",
          reuseExistingServer: !process.env.CI,
          timeout: 120000,
        },
      }),
});
