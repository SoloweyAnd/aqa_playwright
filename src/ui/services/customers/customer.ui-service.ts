import { Page } from "@playwright/test";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";

export class CustomersUiService {
  private customersPage: CustomersPage;
  private addNewCustomerPage: AddNewCustomerPage;
  private editCustomerPage: EditCustomerPage;
  private customerDetailsPage: CustomersPage;
  constructor(private page: Page) {
    this.customersPage = new CustomersPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.editCustomerPage = new EditCustomerPage(page);
    this.customerDetailsPage = new CustomersPage(page);
  }
  async openAddNewCustomerPage() {
    await this.customersPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

  async openEditCustomerPage(email: string) {
    await this.customersPage.clickTableAction(email, "edit");
    await this.editCustomerPage.waitForOpened();
  }

  async openCustomerDetailsPage(email: string) {
    await this.customersPage.clickTableAction(email, "details");
    await this.customerDetailsPage.waitForOpened();
  }
}
