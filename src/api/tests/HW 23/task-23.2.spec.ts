// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться done
//   - Создать кастомера и проверить 200й статус done
//   - Получить всех кастомеров done
//   - создать и проверить схему done
//   - проверить статус done
//   - проверить, что в массиве тела респонса есть созданный кастомер
//   - Проверить поля IsSuccess и ErrorMessage done
import { test, expect } from "fixtures/contollers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomer.data";
import { customersListSchema } from "data/customers/schemas/customer/customers.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { ICustomer } from "types/customer.types";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";

test.describe("[API] [Customer] [Get all customers]", () => {
  let token = "";
  let id = "";

  test("Verify created customer in list", async ({
    customersController,
    signInController,
  }) => {
    const response = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });

    const { status, headers } = response;
    token = headers["authorization"];
    expect.soft(status).toBe(STATUS_CODES.OK);

    const customerData = generateCustomerData();
    const customerResponse = await customersController.create(
      customerData,
      token
    );
    id = customerResponse.body.Customer._id;

    validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);

    const getAllCustomersResponse = await customersController.getAll(token);
    validateSchema(customersListSchema, getAllCustomersResponse.body);
    validateResponse(getAllCustomersResponse, STATUS_CODES.OK, true, null);
    expect
      .soft(
        _.omit(
          getAllCustomersResponse.body.Customers.find(
            (customer: ICustomer) => customer.email === customerData.email
          ),
          ["_id", "createdOn"]
        )
      )
      .toEqual(customerData);
  });
  test.afterEach(async ({ customersController }) => {
    if (!id) return;
    const response = await customersController.delete(id, token);
    expect.soft(response.status).toBe(STATUS_CODES.DELETED);
  });
});
