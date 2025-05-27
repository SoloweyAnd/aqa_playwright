// Разработать е2е теста со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя ваши учетные данные
//  - Создать покупателя (модуль Customers)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданного покупателя в таблице (сравнить все имеющиеся поля, покупатель должен быть самым верхним)

import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";
import { expect, test } from "fixtures/ui-services.fixture";
import { TAGS } from "data/tags.data";

test.describe("[UI] [Sales Portal] [E2E]", async () => {
  test(
    "Should create customer",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ customersPage, homePage, homeUiService, addNewCustomerPage }) => {
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

      await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

      const actualCustomerData = await customersPage.getCustomerData(
        data.email
      );
      expect(actualCustomerData).toEqual(
        _.pick(data, ["email", "name", "country"])
      );
    }
  );
});
