// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

// // Требования:
// //     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
// //     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
import { test, expect } from "@playwright/test";

test.describe("[UI] [1.1. Smoke] Registration", () => {
  const validCredentials = {
    username: "tomsmith",
    password: "SuperPassword",
  };

  const invalidUserCredentials = {
    username: "to",
    password: "abc",
  };

  async function submitUser(page, username: string, password: string) {
    await page.locator("#userNameOnRegister").fill(username);
    await page.locator("#passwordOnRegister").fill(password);
    await page.locator("#register").click();
  }

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  test("Register with valid credentials", async ({ page }) => {
    await submitUser(
      page,
      validCredentials.username,
      validCredentials.password
    );
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Successfully registered! Please, click Back to return on login page"
    );
  });

  test("Register with invalid user name", async ({ page }) => {
    await submitUser(
      page,
      invalidUserCredentials.username,
      validCredentials.password
    );
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Username should contain at least 3 characters"
    );
  });

  test("Register with invalid password", async ({ page }) => {
    await submitUser(
      page,
      validCredentials.username,
      invalidUserCredentials.password
    );
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Password should contain at least 8 characters"
    );
  });

  test("Register with empty username", async ({ page }) => {
    await submitUser(page, "", validCredentials.password);
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Username is required"
    );
  });

  test("Register with empty password", async ({ page }) => {
    await submitUser(page, validCredentials.username, "");
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Password is required"
    );
  });
});
