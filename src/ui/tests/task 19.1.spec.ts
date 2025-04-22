import test, { expect } from "@playwright/test";

test.describe("[UI] [herokuapp] Task-1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "Dynamic Controls" }).click();
  });

  test("Remove/Add checkbox flow", async ({ page }) => {
    const removeButton = page.getByRole("button", { name: "Remove" });
    await removeButton.waitFor({ state: "visible" });

    const mainHeading = page.getByRole("heading", { name: "Dynamic Controls" });
    await expect(mainHeading).toHaveText("Dynamic Controls");

    const pText = page.locator("div.example > p");
    await expect(pText).toHaveText(
      "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously."
    );

    const checkbox = page.locator("input[type='checkbox']");
    await expect(checkbox).toBeVisible();
    await checkbox.check();

    await removeButton.click();

    await expect(checkbox).toBeHidden();

    const message = page.locator("#message");
    await expect(message).toHaveText("It's gone!");

    const addButton = page.getByRole("button", { name: "Add" });
    await expect(addButton).toBeVisible();

    await addButton.click();

    await expect(checkbox).toBeVisible();

    await expect(message).toHaveText("It's back!");
  });
});
