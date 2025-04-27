import { SalesPortalPage } from "./salesPortal.page";
import { Page, Locator } from "@playwright/test";
import { ICredentials } from "types/credentials.types";

export class SignInPage extends SalesPortalPage {
  public emailInput: Locator;
  public passwordInput: Locator;
  public loginButton: Locator;
  public uniqueElement: Locator;
  public authUrl = "https://anatoly-karpovich.github.io/aqa-course-project/#";

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("#emailinput");
    this.passwordInput = page.locator("#passwordinput");
    this.loginButton = page.locator("button:has-text('Login')");
    this.uniqueElement = page.getByText("Sign in with");
    this.shouldWaitForSpinner = false;
  }

  async openAuthPage() {
    await this.page.goto(this.authUrl);
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async logIn(credentials: ICredentials) {
    await this.fillCredentials(credentials.username, credentials.password);
    await this.clickLoginButton();
  }
}
