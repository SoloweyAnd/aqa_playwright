import { expect, test } from "fixtures/ui-services.fixture";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { TAGS } from "data/tags.data";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test(
    "Should check created customer in table",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ homeUiService, page }) => {
      //Precondition
      const homePage = new HomePage(page);
      const customersPage = new CustomersPage(page);
      const addNewCustomerPage = new AddNewCustomerPage(page);

      await homeUiService.openAsLoggedInUser();

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
      //Act
      await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

      //Assert
      const actualCustomerData = await customersPage.getCustomerData(
        data.email
      );
      expect(actualCustomerData).toEqual(
        _.pick(data, ["email", "name", "country"])
      );
      await customersPage.clickDeleteCustomer(data.email);
    }
  );

  test("Should check filtered by country table data", async ({
    customersPage,
    homePage,
  }) => {
    await homePage.openPortal();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickFilter();
    await customersPage.filterModal.waitForOpened();
    const countriesToCheck = ["USA", "Belarus", "Germany"];
    await customersPage.filterModal.checkFilters(...countriesToCheck);
    await customersPage.filterModal.clickApply();
    await customersPage.filterModal.waitForClosed();
    await customersPage.waitForOpened();
    const actualTableData = await customersPage.getTabeData();
    expect(
      actualTableData.every((row) => countriesToCheck.includes(row.country)),
      `Expect table to contain only customers from ${countriesToCheck.join(
        ", "
      )}`
    ).toBe(true);
  });
});
