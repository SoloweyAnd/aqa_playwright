import { Locator } from "@playwright/test";
import { ModuleName } from "types/home.types";
import { SalesPortalPage } from "./salesPortal.page";

export class HomePage extends SalesPortalPage {
  title = this.page.locator(".welcome-text");
  customersButton = this.page.getByRole("link", { name: "Customer" });
  productsButton = this.page.getByRole("link", { name: "Products" });
  ordersButton = this.page.getByRole("link", { name: "Orders" });

  uniqueElement = this.title;

  ordersThisYearMetric = this.page.locator(
    "#total-orders-container .card-text.display-6.text-primary"
  );
  newCustomersMetric = this.page.locator(
    "#total-customers-container .card-text.display-6.text-primary"
  );
  canceledOrdersMetric = this.page.locator(
    "#canceled-orders-container .card-text.display-6.text-primary"
  );

  totalRevenueMetric = this.page.locator(
    "#total-revenue-container .card-text.display-6.text-primary"
  );
  avgOrderValueMetric = this.page.locator(
    "#avg-orders-value-container .card-text.display-6.text-primary"
  );

  async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }

  async getMetrics(): Promise<{
    totalOrders: number;
    totalNewCustomers: number;
    totalCanceledOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  }> {
    const [
      ordersText,
      customersText,
      canceledText,
      totalRevenue,
      avgOrderValue,
    ] = await Promise.all([
      this.ordersThisYearMetric.innerText(),
      this.newCustomersMetric.innerText(),
      this.canceledOrdersMetric.innerText(),
      this.totalRevenueMetric.innerText(),
      this.avgOrderValueMetric.innerText(),
    ]);

    return {
      totalOrders: +ordersText,
      totalNewCustomers: +customersText,
      totalCanceledOrders: +canceledText,
      totalRevenue: +totalRevenue,
      averageOrderValue: +avgOrderValue,
    };
  }
}
