import { VALID_COUNTRIES } from "data/customers/countries.data";
import { expect, test } from "fixtures/businessSteps.fixture";
import { convertToDateAndTime } from "utils/date.utils";

test.describe("[UI] [Customers] [Details]", async () => {
  test("Should display valid customer data", async ({
    loginAsLocalUser,

    customerDetailsPage,
    mock,
  }) => {
    const expected = {
      email: "solTest@promail.com",
      name: "Andrei",
      country: "Great Britain" as VALID_COUNTRIES,
      city: "Test City",
      street: "Test Street",
      house: 2,
      flat: 1,
      phone: "+312021005289",
      createdOn: "2025-05-15T11:43:01.000Z",
      notes: "test notes",
    };
    const id = "6825d345d006ba3d47615ae0";

    await mock.customerDetails({
      Customer: { _id: id, ...expected },
      ErrorMessage: null,
      IsSuccess: true,
    });

    await loginAsLocalUser();
    await customerDetailsPage.open(id);
    await customerDetailsPage.waitForOpened();

    const actual = await customerDetailsPage.getDetails();
    expect(actual).toEqual({
      ...expected,
      createdOn: convertToDateAndTime(expected.createdOn),
    });
  });
});
