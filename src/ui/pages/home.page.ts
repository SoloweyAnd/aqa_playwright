import { Locator } from "@playwright/test";
import { ModuleName } from "types/home.types";
import { SalesPortalPage } from "./salesPortal.page";

export class HomePage extends SalesPortalPage {
  title = this.page.locator(".welcome-text");
  customersButton = this.page.getByRole("link", { name: "Customer" });
  productsButton = this.page.getByRole("link", { name: "Products" });
  ordersButton = this.page.getByRole("link", { name: "Orders" });

  uniqueElement = this.title;

  totalOrders = this.page.locator("//*[@id='total-orders-container']//p");
  totalCustomers = this.page.locator("//*[@id='total-customers-container']//p");
  canceledOrders = this.page.locator("//*[@id='canceled-orders-container']//p");
  totalRevenue = this.page.locator("//*[@id='total-revenue-container']//p");
  avgOrdersValue = this.page.locator(
    "//*[@id='avg-orders-value-container']//p"
  );

  async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }
}
