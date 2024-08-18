import { Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: string;
  readonly passwordInput: string;
  readonly loginButton: string;
  readonly errorMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = 'input[placeholder="Username"]';
    this.passwordInput = 'input[placeholder="Password"]';
    this.loginButton = 'input[type="submit"]';
    this.errorMessage = 'div[class="error-message-container"]';
  }

  async enterUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }
  async isErrorMessageAppear() {
    return await expect(this.page.locator(this.errorMessage)).toBeVisible();
  }
  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).innerText();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
