import { channel } from "diagnostics_channel";
import { defineConfig } from "playwright/test";

export default defineConfig({
  
  // testDir : "**/*.spec.ts",
  timeout: 1800000,
  outputDir : "./reportMonocart/files",
  reporter: [['list'], 
            // ['monocart-reporter', {name: 'Go Auction Results', outputFile: './reportMonocart/TestExecution.html'}],
            // ['allure-playwright', {detail: true, outputFolder: "resultAllure", suiteTitle: true }]
          ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    viewport: { width: 1500, height: 700 },
    screenshot: "only-on-failure",
    baseURL: 'http://localhost:3000',
    headless: true,
    launchOptions: {
      slowMo: 250
    },
    browserName: 'chromium',
    channel: 'chrome',
    contextOptions:{
      userAgent: '(SAM automation test)'
    },
    // storageState: 'playwright/.auth/user.json',
    actionTimeout: 10000,
    navigationTimeout: 60000
  },
  // globalSetup: require.resolve('./goAuctionTestBase/global-setup'),
  // globalTeardown: require.resolve('./goAuctionTestBase/global-teardown'),
  
  projects: [
    {
      name: 'SmokeTests',
      testDir: './tests/Smoke',
    }
  ],
  fullyParallel: false,
  forbidOnly: process.env.CI ? true : false,
  workers: process.env.CI ? 1 : 1,
  retries: process.env.CI ? 1 : 0
});
