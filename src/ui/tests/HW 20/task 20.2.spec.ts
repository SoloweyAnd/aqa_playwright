import test, { expect, Page } from "@playwright/test";

test.describe("[UI] [Shopping Cart] [E2E]", () => {
  const products = [
    "Product 2",
    "Product 4",
    "Product 6",
    "Product 8",
    "Product 10",
  ];

  const promocodes = [
    "HelloThere",
    "15-PERCENT-FOR-CSS",
    "HOT-COURSE",
    "10-PERCENT-FOR-REDEEM",
    "NO-PYTHON",
    "JAVA-FOR-BOOMERS",
    "5-PERCENT-FOR-UTILS",
  ];

  test("Successful checkout with 5 products", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");

    for (const product of products) {
      await getAddToCartButton(product, page).click();
    }

    const prices = await Promise.all(
      products.map((p) => getProductPrice(page, p))
    );
    const total = prices.reduce((sum, price) => sum + price, 0);

    await expect(page.locator("#badge-number")).toHaveText(
      products.length.toString()
    );
    await page.getByRole("button", { name: "Shopping Cart" }).click();
    await expect(page.locator("#total-price")).toHaveText(`$${total}.00`);

    await expect(page.locator("h5")).toHaveText(products);

    const amounts = page.locator('[data-id="product-amount-in-shopping-cart"]');
    await expect.soft(amounts).toHaveCount(products.length);
    for (let i = 0; i < products.length; i++) {
      await expect(amounts.nth(i)).toHaveText("1");
    }

    for (const promo of promocodes) {
      await applyPromoCode(promo, page);
    }

    await expect(page.locator("#total-price")).toHaveText(
      "$1412.50 (-$4237.5)"
    );

    await page.getByRole("button", { name: "Checkout" }).click();
    await expect(page.locator("span.text-muted")).toHaveText("$1412.50");
  });

  function getAddToCartButton(productName: string, page: Page) {
    return page
      .locator("div.card-body")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add to card" });
  }

  async function getProductPrice(
    page: Page,
    productName: string
  ): Promise<number> {
    const priceText = await page
      .locator("div.card-body")
      .filter({ hasText: productName })
      .locator("span")
      .innerText();
    return Number(priceText.replace("$", ""));
  }

  async function applyPromoCode(code: string, page: Page) {
    await page.fill("#rebate-input", code);
    await page.getByRole("button", { name: "Redeem" }).click();
    const spinner = page.locator(".spinner-border");
    await expect(spinner).toBeVisible();
    await expect(spinner).toBeHidden();
  }
});
