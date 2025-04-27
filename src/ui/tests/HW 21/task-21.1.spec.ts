// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import test, { expect } from "@playwright/test";
import { SignInPage } from "ui/pages/signIn.page";
import { userCredentials } from "data/credentials.data";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should create customer with smoke data", async ({ page }) => {
    const signInPage = new SignInPage(page);

    await signInPage.openAuthPage();
    await signInPage.waitForOpened();
    await signInPage.logIn(userCredentials);
  });
});
