import { Page } from "@playwright/test";
import { ICredentials } from "types/credentials.types";

export class SignInPage {
  page: Page;
  emailInput = "#emailinput";
  passwordInput = "#passwordinput";
  loginButton = "button:has-text('Login')";
  authUrl = "https://anatoly-karpovich.github.io/aqa-course-project/#";

  constructor(page: Page) {
    this.page = page;
  }

  async openAuthPage() {
    await this.page.goto(this.authUrl);
  }

  async fillCredentials(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async logIn(credentials: ICredentials) {
    await this.openAuthPage();
    await this.fillCredentials(credentials.username, credentials.password);
    await this.clickLoginButton();
  }
}
