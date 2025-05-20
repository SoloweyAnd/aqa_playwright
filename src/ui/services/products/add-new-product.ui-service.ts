import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { IProduct, IProductResponse } from "types/products.types";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsPage } from "ui/pages/products/products.page";
import { generateProductData } from "data/products/generateProduct.data";

export class AddNewProductUiService {
  private addNewProductPage: AddNewProductPage;
  private productsPage: ProductsPage;
  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsPage = new ProductsPage(page);
  }

  async create(productData?: IProduct) {
    const data = generateProductData(productData);
    await this.addNewProductPage.fillInputs(data);
    const response = await this.addNewProductPage.interceptResponse<
      IProductResponse,
      any
    >(
      apiConfig.ENDPOINTS.PRODUCTS,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual({
      ...data,
    });
    await this.productsPage.waitForOpened();
    return response.body.Product;
  }
}
