import { logStep } from "utils/reporter.utils";
import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "types/credentials.types";

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.getByRole("button", { name: "Login" });
  uniqueElement = this.loginButton;

  @logStep("Fill credentials")
  async fillCredentials({ username, password }: ICredentials) {
    username && (await this.emailInput.fill(username));
    password && (await this.passwordInput.fill(password));
  }

  @logStep("Click login button")
  async clickLoginButton() {
    await this.loginButton.click();
  }
}
