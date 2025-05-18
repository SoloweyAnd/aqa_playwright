import { Locator } from "@playwright/test";
import { ModuleName } from "types/home.types";
import { SalesPortalPage } from "./salesPortal.page";

export class HomePage extends SalesPortalPage {
  title = this.page.locator(".welcome-text");
  customersButton = this.page.getByRole("link", { name: "Customer" });
  productsButton = this.page.getByRole("link", { name: "Products" });
  ordersButton = this.page.getByRole("link", { name: "Orders" });

  uniqueElement = this.title;

  readonly metricLocators = {
    totalOrders: this.page.locator("//*[@id='total-orders-container']//p"),
    totalNewCustomers: this.page.locator(
      "//*[@id='total-customers-container']//p"
    ),
    totalCanceledOrders: this.page.locator(
      "//*[@id='canceled-orders-container']//p"
    ),
    totalRevenue: this.page.locator("//*[@id='total-revenue-container']//p"),
    averageOrderValue: this.page.locator(
      "//*[@id='avg-orders-value-container']//p"
    ),
  } as const;

  async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }

  async getMetricValues<T extends keyof typeof this.metricLocators>(
    keys: T[] | T
  ): Promise<Record<T, number>> {
    const metrics = Array.isArray(keys) ? keys : [keys];

    const results: Partial<Record<T, number>> = {};

    for (const key of metrics) {
      const text = await this.metricLocators[key].innerText();
      results[key] = Number(text);
    }

    return results as Record<T, number>;
  }
}
