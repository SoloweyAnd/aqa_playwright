import { expect, Locator, Page } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/environment";
import { BasePage } from "./base.page";
import { logStep } from "utils/reporter.utils";

export abstract class SalesPortalPage extends BasePage {
  abstract uniqueElement: Locator;

  readonly spinner = this.page.locator(".spinner-border");
  readonly notification = this.page.locator(".toast-body");

  @logStep("Wait page opened")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinner();
  }

  @logStep("Wait spinner finished")
  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0);
  }

  @logStep("Wait notification")
  async waitForNotification(text: string) {
    await expect(this.notification.last()).toHaveText(text);
  }

  @logStep("Open portal")
  async openPortal() {
    this.page.goto(SALES_PORTAL_URL);
  }
}
