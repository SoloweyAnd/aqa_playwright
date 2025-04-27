import { expect, Page } from "@playwright/test";
import { ICustomer } from "types/customer.types";

export async function expectCustomerInTable(page: Page, customer: ICustomer) {
  const table = page.locator("table");
  const matchingRows = table.locator("tbody tr").filter({
    hasText: customer.email,
  });

  const count = await matchingRows.count();
  expect(count).toBeGreaterThan(0);

  const firstMatchingRow = matchingRows.first();
  const cells = await firstMatchingRow.locator("td").allInnerTexts();

  const [email, name, country] = cells;

  const actual = { email, name, country };
  const expected = {
    email: expect.stringContaining(customer.email),
    name: expect.stringContaining(customer.name),
    country: expect.stringContaining(customer.country),
  };

  expect(actual).toMatchObject(expected);
}
