import { Page } from "@playwright/test";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { logStep } from "utils/reporter.utils";

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
  @logStep("Open Add New Customer Page from Customers Page")
  async openAddNewCustomerPage() {
    await this.customersPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep("Open Edit Customer Page from Customers Page")
  async openEditCustomerPage(email: string) {
    await this.customersPage.clickTableAction(email, "edit");
    await this.editCustomerPage.waitForOpened();
  }

  @logStep("Open Customer Details Page from Customers Page")
  async openCustomerDetailsPage(email: string) {
    await this.customersPage.clickTableAction(email, "details");
    await this.customerDetailsPage.waitForOpened();
  }
}
