import { ICustomerInTable } from "types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { COUNTRIES } from "data/customers/countries.data";
import { DeleteModalPage } from "../modals/customers/delete.modal.page";

export class CustomersPage extends SalesPortalPage {
  //Modals
  readonly deleteCustomerModal = new DeleteModalPage(this.page);
  //Header menu
  readonly addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });
  //Table headers
  readonly tableHeader = this.page.locator("#table-customers th div");
  readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });
  //Table Body
  readonly tableRow = this.page.locator("#table-customers tbody tr");
  readonly tableRowByEmail = (email: string) =>
    this.tableRow.filter({ has: this.page.getByText(email) });

  readonly emailCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(1)");
  readonly nameCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(1)");
  readonly countryCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(1)");
  readonly createdOnCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(1)");

  readonly editButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Edit");
  readonly deleteButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Delete");
  readonly detailsButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Details");

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async clickTableAction(
    customerEmail: string,
    action: "edit" | "details" | "delete"
  ) {
    const buttons = {
      edit: this.editButton(customerEmail),
      details: this.detailsButton(customerEmail),
      delete: this.deleteButton(customerEmail),
    };

    await buttons[action].click();
  }

  async getCustomerData(customerEmail: string): Promise<ICustomerInTable> {
    const [email, name, country] = await this.tableRowByEmail(customerEmail)
      .locator("td")
      .allInnerTexts();
    return {
      email,
      name,
      country: country as COUNTRIES,
    };
  }
}
