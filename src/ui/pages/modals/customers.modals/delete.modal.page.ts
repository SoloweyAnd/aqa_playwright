import { expect } from "@playwright/test";
import { Modal } from "./modal.page";

export class DeleteModalPage extends Modal {
  readonly uniqueElement = this.page.locator(`div[role="dialog"]`);

  readonly title = this.uniqueElement.locator(".modal-title");
  readonly apllyDeleteButton = this.uniqueElement.getByRole("button", {
    name: "Yes, Delete",
  });
  readonly cancelDeleteButton = this.uniqueElement.getByRole("button", {
    name: "Cancel",
  });
  readonly closeButton = this.uniqueElement.locator(
    'button[aria-label="Close"]'
  );

  async clickApplyDelete() {
    await this.apllyDeleteButton.click();
  }

  async clickCancelDelete() {
    await this.cancelDeleteButton.click();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
