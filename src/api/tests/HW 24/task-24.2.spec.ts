import { test, expect } from "fixtures/contollers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { STATUS_CODES } from "data/statusCodes";
import { customerSchema } from "data/customers/schemas/customer/customer.schema";
import { invalidRequestCustomerSchema } from "data/customers/schemas/customer/invalidRequestCustomer.schema";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";
import { createCustomerTestDataPositive } from "data/customers/validCustomers.data";
import { createCustomerTestDataNegative } from "data/customers/invalidCustomers.data";

test.describe("[API] [Customer] [Create Customer - DDT]", () => {
  let token = "";

  test.beforeAll(async ({ signInController }) => {
    const response = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    token = response.headers["authorization"];
  });

  for (const {
    testName,
    data,
    isSuccess,
    status,
    errorMessage,
  } of createCustomerTestDataPositive) {
    test(`Positive case - ${testName}`, async ({ customersController }) => {
      const response = await customersController.create(data, token);

      const createdId = response.body.Customer._id;

      validateSchema(customerSchema, response.body);
      validateResponse(response, status, isSuccess, errorMessage);

      const deleteCustomer = await customersController.delete(createdId, token);
      expect.soft(deleteCustomer.status).toBe(STATUS_CODES.DELETED);
    });
  }

  for (const {
    testName,
    data,
    isSuccess,
    status,
    errorMessage,
  } of createCustomerTestDataNegative) {
    test(`Negative case - ${testName}`, async ({ customersController }) => {
      const response = await customersController.create(data, token);

      validateSchema(invalidRequestCustomerSchema, response.body);
      validateResponse(response, status, isSuccess, errorMessage);
    });
  }
});
