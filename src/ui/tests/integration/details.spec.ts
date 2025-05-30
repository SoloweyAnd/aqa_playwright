import { VALID_COUNTRIES } from "data/customers/countries.data";
import { TAGS } from "data/tags.data";
import { expect, test } from "fixtures/ui-services.fixture";
import { convertToDateAndTime } from "utils/date.utils";

test.describe("[UI] [Customers] [Details]", async () => {
  test(
    "Should display valid customer data",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ homeUiService, customerDetailsPage, mock }) => {
      const expected = {
        email: "user@domain.com",
        name: "User",
        country: VALID_COUNTRIES.BELARUS,
        city: "Minsk",
        street: "Main",
        house: 5,
        flat: 1,
        phone: "+9912312331245132",
        createdOn: "2025-03-08T00:00:46.000Z",
        notes: "-",
      };
      const id = "67cb88af92fabac8b74e2f72";

      await mock.customerDetails({
        Customer: { _id: id, ...expected },
        ErrorMessage: null,
        IsSuccess: true,
      });

      await homeUiService.openAsLoggedInUser();
      await customerDetailsPage.open(id);
      await customerDetailsPage.waitForOpened();

      const actual = await customerDetailsPage.getDetails();
      expect(actual).toEqual({
        ...expected,
        createdOn: convertToDateAndTime(expected.createdOn),
      });
    }
  );
});
