import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";
import { expect, test } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Sales Portal] [E2E]", async () => {
  test("Should create and delete customer", async ({
    customersPage,
    homePage,
    loginAsLocalUser,
    addNewCustomerPage,
    deleteModalPage,
  }) => {
    await loginAsLocalUser();

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
    await deleteModalPage.waitForOpened();
    await deleteModalPage.apllyDeleteButton.click();
    await deleteModalPage.waitForClosed();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
  });
});
