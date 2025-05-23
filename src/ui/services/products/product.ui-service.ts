import { Page } from "@playwright/test";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsPage } from "ui/pages/products/products.page";

export class ProductsUiService {
  private productsPage: ProductsPage;
  private addNewProductPage: AddNewProductPage;
  constructor(private page: Page) {
    this.productsPage = new ProductsPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
  }

  async openAddNewProductPage() {
    await this.productsPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }
}
