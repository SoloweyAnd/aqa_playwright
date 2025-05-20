import { IProduct } from "types/products.types";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewProductPage extends SalesPortalPage {
  nameInput = this.page.locator("#inputName");
  priceInput = this.page.locator("#inputPrice");
  amountInput = this.page.locator("#inputAmount");
  notesInput = this.page.locator("#textareaNotes");
  manufacturerInput = this.page.locator("#inputManufacturer");

  saveNewProductButton = this.page.locator("#save-new-product");

  uniqueElement = this.saveNewProductButton;

  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.nameInput.fill(product.name));
    product.manufacturer &&
      (await this.manufacturerInput.selectOption(product.manufacturer));
    product.price && (await this.priceInput.fill(product.price.toString()));
    product.amount && (await this.amountInput.fill(product.amount.toString()));
    product.notes && (await this.notesInput.fill(product.notes));
  }

  async clickSave() {
    await this.saveNewProductButton.click();
  }
}
