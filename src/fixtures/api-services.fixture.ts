import { CustomersApiService } from "api/services/customers.api-service";
import { ProductsApiService } from "api/services/products.api-service";
import { SignInApiService } from "api/services/signIn.api-service";
import { test as base } from "fixtures/contollers.fixture";

interface IApiServices {
  customersApiService: CustomersApiService;
  productsApiService: ProductsApiService;
  signInApiService: SignInApiService;
}

export const test = base.extend<IApiServices>({
  customersApiService: async ({ request }, use) => {
    await use(new CustomersApiService(request));
  },
  productsApiService: async ({ request }, use) => {
    await use(new ProductsApiService(request));
  },
  signInApiService: async ({ request }, use) => {
    await use(new SignInApiService(request));
  },
});

export { expect } from "@playwright/test";
