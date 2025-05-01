// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import test, { expect } from "@playwright/test";
import { SignInPage } from "ui/pages/signIn.page";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";

test.describe("[UI] [Sign in Page]", async () => {
  test("Login with valid credentials", async ({ page }) => {
    const signInPage = new SignInPage(page);

    await signInPage.openAuthPage();
    await signInPage.waitForOpened();
    await signInPage.logIn({ username: USER_LOGIN, password: USER_PASSWORD });
  });
});
