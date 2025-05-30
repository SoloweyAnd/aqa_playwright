import { IProductInTable } from "types/products.types";
import { SalesPortalPage } from "../salesPortal.page";
import { productsSortField } from "types/api.types";
import { MANUFACTURERS } from "data/products/manufacturers.data";
import numeral from "numeral";
import { logStep } from "utils/reporter.utils";

export class ProductsPage extends SalesPortalPage {
  //Header menu
  private readonly addNewProductButton = this.page.getByRole("button", {
    name: "+ Add Product",
  });
  //Table
  private readonly table = this.page.locator("#table-products");
  //Search
  private readonly searchInput = this.page.locator('input[type="search"]');
  private readonly searchButton = this.page.locator("#search-products");
  private readonly chipButton = this.page.locator(".chip");
  private readonly searchChipButton = this.page.locator(
    'div[data-chip-products="search"]'
  );

  //Table headers
  private readonly tableHeader = this.page.locator(
    "#table-container th div[current]"
  );
  private readonly priceHeader = this.tableHeader.filter({ hasText: "Price" });
  private readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  private readonly manufacturerHeader = this.tableHeader.filter({
    hasText: "Manufacturer",
  });
  private readonly createdOnHeader = this.tableHeader.filter({
    hasText: "Created On",
  });

  //Table Body
  private readonly tableRow = this.page.locator("#table-container tbody tr");
  private readonly tableRowByName = (name: string) =>
    this.tableRow.filter({ has: this.page.getByText(name) });

  private readonly nameCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(1)");
  private readonly priceCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(2)");
  private readonly manufacturerCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(3)");
  private readonly createdOnCell = (name: string) =>
    this.tableRowByName(name).locator("td:nth-child(4)");

  private readonly editButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Edit");
  private readonly deleteButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Delete");
  private readonly detailsButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Details");

  readonly uniqueElement = this.addNewProductButton;

  @logStep("Click 'Add New Product' button")
  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  @logStep("Click 'Delete' button")
  async clickDeleteProduct(productName: string) {
    await this.deleteButton(productName).click();
  }

  @logStep("Click 'Edit' button")
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

  @logStep("Get product data")
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

  @logStep("Get table data")
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

  @logStep("Fill search input")
  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value));
  }

  @logStep("Click 'Search' button")
  async clickSearch() {
    await this.searchButton.click();
  }

  @logStep("Search product")
  async search(value: string | number) {
    await this.fillSearch(value);
    await this.clickSearch();
    await this.waitForOpened();
  }

  @logStep("Click table header")
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
