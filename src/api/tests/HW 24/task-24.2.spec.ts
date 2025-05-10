import { test, expect } from "fixtures/contollers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { STATUS_CODES } from "data/statusCodes";
import { customerSchema } from "data/customers/schemas/customer/customer.schema";
import { invalidRequestCustomerSchema } from "data/customers/schemas/customer/invalidRequestCustomer.schema";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";
import { validCustomers } from "data/customers/validCustomers.data";
import { invalidCustomers } from "data/customers/invalidCustomers.data";

test.describe("[API] [Customer] [Create Customer - DDT]", () => {
  let token = "";

  test.beforeAll(async ({ signInController }) => {
    const response = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    token = response.headers["authorization"];
  });

  for (const { case: caseName, data } of validCustomers) {
    test(`Positive case - ${caseName}`, async ({ customersController }) => {
      const response = await customersController.create(data, token);

      const createdId = response.body.Customer._id;

      validateSchema(customerSchema, response.body);
      validateResponse(response, STATUS_CODES.CREATED, true, null);

      const deleteCustomer = await customersController.delete(createdId, token);
      expect.soft(deleteCustomer.status).toBe(STATUS_CODES.DELETED);
    });
  }

  for (const {
    case: caseName,
    data,
    expectedErrorMessage,
  } of invalidCustomers) {
    test(`Negative case - ${caseName}`, async ({ customersController }) => {
      const response = await customersController.create(data, token);

      validateSchema(invalidRequestCustomerSchema, response.body);
      validateResponse(
        response,
        STATUS_CODES.BAD_REQUEST,
        false,
        expectedErrorMessage
      );
    });
  }
});
