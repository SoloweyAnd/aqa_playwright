import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "types/credentials.types";

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.getByRole("button", { name: "Login" });
  uniqueElement = this.loginButton;

  async fillCredentials({ username, password }: ICredentials) {
    username && (await this.emailInput.fill(username));
    password && (await this.passwordInput.fill(password));
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
