import { CustomersApiService } from "api/services/customers.api-service";
import { ProductsApiService } from "api/services/products.api-service";
import { test as base } from "fixtures/contollers.fixture";

interface IApiServices {
  customersApiService: CustomersApiService;
  productsApiService: ProductsApiService;
}

export const test = base.extend<IApiServices>({
  customersApiService: async ({ request }, use) => {
    await use(new CustomersApiService(request));
  },
  productsApiService: async ({ request }, use) => {
    await use(new ProductsApiService(request));
  },
});

export { expect } from "@playwright/test";
