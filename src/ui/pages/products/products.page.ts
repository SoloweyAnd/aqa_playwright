import { IProductInTable } from "types/products.types";
import { SalesPortalPage } from "../salesPortal.page";
import { productsSortField } from "types/api.types";
import { MANUFACTURERS } from "data/products/manufacturers.data";
import numeral from "numeral";

export class ProductsPage extends SalesPortalPage {
  //Header menu
  readonly addNewProductButton = this.page.getByRole("button", {
    name: "+ Add Product",
  });
  //Table
  readonly table = this.page.locator("#table-container");
  //Search
  readonly searchInput = this.page.locator('input[type="search"]');
  readonly searchButton = this.page.locator("#search-products");
  readonly chipButton = this.page.locator(".chip");
  readonly searchChipButton = this.page.locator(
    'div[data-chip-products="search"]'
  );

  //Table headers
  readonly tableHeader = this.page.locator("#table-container th div[current]");
  readonly priceHeader = this.tableHeader.filter({ hasText: "Price" });
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly manufacturerHeader = this.tableHeader.filter({
    hasText: "Manufacturer",
  });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

  //Table Body
  readonly tableRow = this.page.locator("#table-container tbody tr");
  readonly tableRowByName = (name: string) =>
    this.tableRow.filter({ has: this.page.getByText(name) });

  readonly nameCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(1)");
  readonly priceCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(2)");
  readonly manufacturerCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(3)");
  readonly createdOnCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(4)");

  readonly editButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Edit");
  readonly deleteButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Delete");
  readonly detailsButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Details");

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickDeleteProduct(productName: string) {
    await this.deleteButton(productName).click();
  }

  async clickTableAction(
    productName: string,
    action: "edit" | "details" | "delete"
  ) {
    const buttons = {
      edit: this.editButton(productName),
      details: this.detailsButton(productName),
      delete: this.deleteButton(productName),
    };

    await buttons[action].click();
  }

  async getProductData(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer] = await this.tableRowByName(productName)
      .locator("td")
      .allInnerTexts();
    return {
      name,
      price: numeral(price.trim()).value() ?? 0,
      manufacturer: manufacturer as MANUFACTURERS,
    };
  }

  async getTabelData() {
    const tableData: Array<IProductInTable> = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer] = await row
        .locator("td")
        .allInnerTexts();
      tableData.push({
        name,
        price: numeral(price.trim()).value() ?? 0,
        manufacturer: manufacturer as MANUFACTURERS,
      });
    }
    return tableData;
  }

  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value));
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async search(value: string | number) {
    await this.fillSearch(value);
    await this.clickSearch();
    await this.waitForOpened();
  }

  async clickTableHeader(header: productsSortField) {
    switch (header) {
      case "price":
        await this.priceHeader.click();
        break;
      case "name":
        await this.nameHeader.click();
        break;
      case "manufacturer":
        await this.manufacturerHeader.click();
        break;
      case "createdOn":
        await this.createdOnHeader.click();
        break;
    }
  }
}
