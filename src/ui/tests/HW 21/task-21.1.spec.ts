// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import _ from "lodash";
import { expect, test } from "fixtures/ui-services.fixture";
import { TAGS } from "data/tags.data";

test.describe("[UI] [Sales Portal] [E2E]", { tag: [TAGS.UI] }, async () => {
  test("Should login", async ({ homeUiService }) => {
    await homeUiService.openAsLoggedInUser();
  });
});
2;
