import { test as base } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { ProductController } from "api/controllers/products.controller";
import { SignInController } from "api/controllers/signIn.controller";

interface ISalesPortalControllers {
  customersController: CustomersController;
  signInController: SignInController;
  productController: ProductController;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({ request }, use) => {
    await use(new CustomersController(request));
  },
  signInController: async ({ request }, use) => {
    await use(new SignInController(request));
  },
  productController: async ({ request }, use) => {
    await use(new ProductController(request));
  },
});

export { expect } from "@playwright/test";
