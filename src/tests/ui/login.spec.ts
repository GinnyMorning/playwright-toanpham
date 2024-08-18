import { testBase, expect } from "../../test-setup";

testBase(
  "User can log in with valid credentials",
  { tag: "@Smoke" },
  async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(loginPage.page).toHaveURL(
      "https://www.saucedemo.com/inventory.html"
    );
  }
);
