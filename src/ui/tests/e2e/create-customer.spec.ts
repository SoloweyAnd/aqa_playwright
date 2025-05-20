import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/ui-services.fixture";

test.describe("[E2E] [UI] [Customers] [Create]", () => {
  let id = "";
  let token = "";
  test("Create customer with smoke data", async ({
    signInUiService,
    homeUiService,
    customersUiService,
    addNewCustomerUiService,
    customersController,
  }) => {
    token = await signInUiService.signInAsLocalUser();
    await homeUiService.openModule("Customers");
    await customersUiService.openAddNewCustomerPage();
    const createdCustomer = await addNewCustomerUiService.create();
    const response = await customersController.getById(
      createdCustomer._id,
      token
    );
    id = createdCustomer._id;
    expect(response.status).toBe(STATUS_CODES.OK);
  });

  test.afterEach(async ({ customersController }) => {
    await customersController.delete(id, token);
  });
});
