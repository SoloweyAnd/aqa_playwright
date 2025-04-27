// Разработать е2е теста со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя ваши учетные данные
//  - Создать покупателя (модуль Customers)
//  - Верифицировать появившуюся нотификацию done
//  - Верифицировать созданного покупателя в таблице (сравнить все имеющиеся поля, покупатель должен быть самым верхним)

import test, { expect } from "@playwright/test";
import { SignInPage } from "ui/pages/signIn.page";
import { HomePage } from "ui/pages/home.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/notifications.data";
import { userCredentials } from "data/credentials.data";
import { expectCustomerInTable } from "data/customers/compareCustomer.data";

test.describe("[UI] [Sales Portal] [E2E]", async () => {
  test("Should create customer", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await signInPage.openAuthPage();
    await signInPage.waitForOpened();
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

    await expectCustomerInTable(page, data);
  });
});
