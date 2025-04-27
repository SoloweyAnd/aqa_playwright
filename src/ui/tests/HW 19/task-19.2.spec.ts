// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
//  - дождаться исчезновения спиннеров
//  - проверить действительно ли пользователь с логином Anatoly вошел в систему
//  - Проверить скриншотом боковое навигационное меню с выбранной страницей Home

import test, { expect } from "@playwright/test";

test.describe("[UI] [anatoly-karpovich] Task-2", () => {
  const credentials = {
    email: "test@gmail.com",
    password: "12345678",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/");
  });

  async function submitUser(page, email: string, password: string) {
    await page.locator("#emailinput").fill(email);
    await page.locator("#passwordinput").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForFunction(
      () => {
        return document.querySelectorAll(".spinner-border").length === 0;
      },
      { timeout: 5000 }
    );
  }

  test("Login with valid credentials", async ({ page }) => {
    await submitUser(page, credentials.email, credentials.password);

    await expect(
      page.getByRole("heading", { name: "Welcome to Sales Management Portal" })
    ).toBeVisible();

    await expect(page.locator("#dropdownUser1")).toBeVisible();

    await expect(page.locator("#sidebar")).toHaveScreenshot();
  });
});
