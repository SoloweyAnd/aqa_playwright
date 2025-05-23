import { APIRequestContext, expect } from "@playwright/test";
import { ProductController } from "api/controllers/products.controller";
import { generateProductData } from "data/products/generateProduct.data";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct } from "types/products.types";
import { validateResponse } from "utils/validations/responseValidation";

export class ProductsApiService {
  controller: ProductController;
  constructor(request: APIRequestContext) {
    this.controller = new ProductController(request);
  }

  async create(token: string, customData?: IProduct) {
    const body = generateProductData(customData);
    const response = await this.controller.create(body, token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Product;
  }
}
2;
