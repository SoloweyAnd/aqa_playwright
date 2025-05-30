import { IProduct } from "types/products.types";
import { SalesPortalPage } from "../salesPortal.page";
import { logStep } from "utils/reporter.utils";

export class AddNewProductPage extends SalesPortalPage {
  private readonly nameInput = this.page.locator("#inputName");
  private readonly priceInput = this.page.locator("#inputPrice");
  private readonly amountInput = this.page.locator("#inputAmount");
  private readonly notesInput = this.page.locator("#textareaNotes");
  private readonly manufacturerInput = this.page.locator("#inputManufacturer");

  private readonly saveNewProductButton =
    this.page.locator("#save-new-product");

  uniqueElement = this.saveNewProductButton;

  @logStep("Fill new product inputs")
  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.nameInput.fill(product.name));
    product.manufacturer &&
      (await this.manufacturerInput.selectOption(product.manufacturer));
    product.price && (await this.priceInput.fill(product.price.toString()));
    product.amount && (await this.amountInput.fill(product.amount.toString()));
    product.notes && (await this.notesInput.fill(product.notes));
  }

  @logStep("Click save new product button")
  async clickSave() {
    await this.saveNewProductButton.click();
  }
}
