import { faker } from "@faker-js/faker";
import { ICustomer } from "types/customer.types";
import { VALID_COUNTRIES } from "data/customers/countries.data";
import { getRandromEnumValue } from "utils/enum.utils";

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: `test${Date.now()}${faker.number.int(1000)}@gmail.com`,
    name: `Test ${faker.string.alpha({ length: 10, casing: "mixed" })}`,
    country: getRandromEnumValue(VALID_COUNTRIES),
    city: `City ${faker.string.alpha({ length: 10 })}`,
    street: `Street ${faker.string.alphanumeric(20)}`,
    house: faker.number.int({ min: 1, max: 999 }),
    flat: faker.number.int({ min: 1, max: 9999 }),
    phone: `+${faker.number.int({
      min: 1000000000,
      max: 99999999999999999999,
    })}`,
    notes: `Notes ${faker.string.alpha({ length: 50 })}`,
    ...params,
  };
}
