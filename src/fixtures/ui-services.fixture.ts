import { CustomersUiService } from "ui/services/customers/customer.ui-service";
import { HomeUiService } from "ui/services/home.ui-service";
import { SignInUiService } from "ui/services/signIn.ui-service";
import { test as base } from "fixtures/pages.fixture";
import { AddNewCustomerUiService } from "ui/services/customers/add-new-customer.ui-service";
import { EditCustomerUiService } from "ui/services/customers/edit-customer.ui-service";
import { AddNewProductUiService } from "ui/services/products/add-new-product.ui-service";
import { ProductsUiService } from "ui/services/products/product.ui-service";
interface IUIServices {
  homeUiService: HomeUiService;
  signInUiService: SignInUiService;
  customersUiService: CustomersUiService;
  addNewCustomerUiService: AddNewCustomerUiService;
  editCustomerUiService: EditCustomerUiService;
  productsUiService: ProductsUiService;
  addNewProductUiService: AddNewProductUiService;
}

export const test = base.extend<IUIServices>({
  homeUiService: async ({ page }, use) => await use(new HomeUiService(page)),
  signInUiService: async ({ page }, use) =>
    await use(new SignInUiService(page)),
  customersUiService: async ({ page }, use) =>
    await use(new CustomersUiService(page)),
  addNewCustomerUiService: async ({ page }, use) =>
    await use(new AddNewCustomerUiService(page)),
  editCustomerUiService: async ({ page }, use) =>
    await use(new EditCustomerUiService(page)),
  productsUiService: async ({ page }, use) =>
    await use(new ProductsUiService(page)),
  addNewProductUiService: async ({ page }, use) =>
    await use(new AddNewProductUiService(page)),
});

export { expect } from "@playwright/test";
