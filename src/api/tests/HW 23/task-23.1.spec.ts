// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах
import { test, expect } from "fixtures/contollers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { userSchema } from "data/customers/schemas/user/user.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";

test.describe("[API] [User] [Login]", () => {
  let token = "";

  test("Login with valid credentials using SignInController fixture", async ({
    signInController,
  }) => {
    const response = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });

    const { status, body, headers } = response;
    token = headers["authorization"];

    const expectedUser = {
      _id: "680b28ddd006ba3d475fe254",
      username: "Andrei",
      firstName: "Andrei",
      lastName: "Salaveika",
      roles: ["USER"],
      createdOn: "2025/04/25 06:17:01",
    };

    validateSchema(userSchema, body);
    expect.soft(status).toBe(STATUS_CODES.OK);
    expect.soft(token).toBeTruthy();
    expect.soft(body.User).toMatchObject(expectedUser);
    expect.soft(body.ErrorMessage).toBe(null);
    expect.soft(body.IsSuccess).toBe(true);
  });
});
