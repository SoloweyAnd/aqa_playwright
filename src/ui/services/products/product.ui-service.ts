import { Page } from "@playwright/test";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsPage } from "ui/pages/products/products.page";
import { logStep } from "utils/reporter.utils";

export class ProductsUiService {
  private productsPage: ProductsPage;
  private addNewProductPage: AddNewProductPage;
  constructor(private page: Page) {
    this.productsPage = new ProductsPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
  }

  @logStep("Open Add New Product Page from Products Page")
  async openAddNewProductPage() {
    await this.productsPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }
}
