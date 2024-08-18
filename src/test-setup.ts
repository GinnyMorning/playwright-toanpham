import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "./pageObjects/login.page";
import { loadConfig } from "./utils/config-loader";

const env = process.env.TEST_ENV || "sandbox";
const globalConfig = loadConfig(env);

const testBase = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto(`${globalConfig.baseUrl}`);
    await use(loginPage);
  },
});

const testWithLogedIn = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto(`${globalConfig.baseUrl}`);
    await loginPage.login(
      `${globalConfig.username}`,
      `${globalConfig.password}`
    );
    await use(page);
  },
});

export { testBase, testWithLogedIn, expect, globalConfig };
