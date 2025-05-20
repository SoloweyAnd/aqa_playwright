import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/ui-services.fixture";

test.describe("[E2E] [UI] [Customers] [Edit]", () => {
  let id = "";
  let token = "";
  test("Edit customer with smoke data", async ({
    signInUiService,
    homeUiService,
    customersUiService,
    editCustomerUiService,
    customersController,
    customersApiService,
  }) => {
    token = await signInUiService.signInAsLocalUser();
    const createdCustomer = await customersApiService.create(token);
    await homeUiService.openModule("Customers");
    await customersUiService.openEditCustomerPage(createdCustomer.email);
    const updatedCustomer = await editCustomerUiService.edit();
    const response = await customersController.getById(
      updatedCustomer._id,
      token
    );
    id = updatedCustomer._id;
    expect(response.status).toBe(STATUS_CODES.OK);
  });

  test.afterEach(async ({ customersController }) => {
    await customersController.delete(id, token);
  });
});
