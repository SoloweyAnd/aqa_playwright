// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import _ from "lodash";
import { expect, test } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Sales Portal] [E2E]", async () => {
  test("Should login", async ({ loginAsLocalUser }) => {
    await loginAsLocalUser();
  });
});
