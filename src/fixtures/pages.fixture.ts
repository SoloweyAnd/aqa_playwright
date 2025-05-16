import { test as base } from "fixtures/mock.fixture";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { DeleteModalPage } from "ui/pages/modals/customers/delete.modal.page";
import { SideMenuComponent } from "ui/pages/sideMenu.page";
import { SignInPage } from "ui/pages/signIn.page";
import { CustomerDetailsPage } from "ui/pages/customers/customer-details.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";

interface ISalesPortalPages {
  homePage: HomePage;
  customersPage: CustomersPage;
  addNewCustomerPage: AddNewCustomerPage;
  signInPage: SignInPage;
  deleteModalPage: DeleteModalPage;
  sideMenu: SideMenuComponent;
  customerDetailsPage: CustomerDetailsPage;
  editCustomerPage: EditCustomerPage;
}

export const test = base.extend<ISalesPortalPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  customersPage: async ({ page }, use) => {
    await use(new CustomersPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  deleteModalPage: async ({ page }, use) => {
    await use(new DeleteModalPage(page));
  },

  sideMenu: async ({ page }, use) => {
    await use(new SideMenuComponent(page));
  },
  customerDetailsPage: async ({ page }, use) => {
    await use(new CustomerDetailsPage(page));
  },
  editCustomerPage: async ({ page }, use) => {
    await use(new EditCustomerPage(page));
  },
});

export { expect } from "@playwright/test";
