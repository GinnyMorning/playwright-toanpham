import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.TEST_ENV || "sandbox"}`),
});

const ENV = process.env.TEST_ENV || "sandbox";

const environments = {
  sandbox: {
    baseURL: "https://www.saucedemo.com/",
    timeout: 30000,
  },
  staging: {
    baseURL: "https://staging.example.com",
    timeout: 30000,
  },
  production: {
    baseURL: "https://production.example.com",
    timeout: 30000,
  },
};

const config = environments[ENV] || environments["sandbox"];

export default defineConfig({
  // Global settings
  globalSetup: path.resolve(__dirname, "./src/global-setup"),
  globalTeardown: path.resolve(__dirname, "./src/global-teardown"),

  // Test configuration
  testDir: "./src/tests",
  timeout: config.timeout,
  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: config.baseURL,
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  reporter: [["list"], ["html", { open: "never" }]],

  workers: process.env.CI ? 1 : undefined,
});
