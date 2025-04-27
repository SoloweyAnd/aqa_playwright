import test, { expect } from "@playwright/test";
import { SignInPage } from "ui/pages/signIn.page";
import { HomePage } from "ui/pages/home.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { userCredentials } from "data/credentials.data";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should create customer with smoke data", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await signInPage.logIn(userCredentials);

    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();

    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
  });
});
