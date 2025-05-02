import { test, expect } from "fixtures/pages.fixture";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";

test.describe("[UI] [Sales Portal] [E2E]", async () => {
  test("Should create and delete customer", async ({
    customersPage,
    homePage,
    signInPage,
    addNewCustomerPage,
    deleteModalPage,
  }) => {
    await signInPage.openAuthPage();
    await signInPage.waitForOpened();
    await signInPage.logIn({ username: USER_LOGIN, password: USER_PASSWORD });

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

    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    const actualCustomerData = await customersPage.getCustomerData(data.email);
    expect(actualCustomerData).toEqual(
      _.pick(data, ["email", "name", "country"])
    );

    await customersPage.clickTableAction(data.email, "delete");
    await expect(deleteModalPage.uniqueElement).toBeVisible();
    await deleteModalPage.apllyDeleteButton.click();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
  });
});
