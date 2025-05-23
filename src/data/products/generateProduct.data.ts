import { faker } from "@faker-js/faker";
import { IProduct } from "types/products.types";

import { getRandromEnumValue } from "utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers.data";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: `SolTest ${faker.string.alpha({ length: 10, casing: "mixed" })}`,
    manufacturer: getRandromEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 1, max: 999 }),
    notes: `Notes ${faker.string.alpha({ length: 10 })}`,
    ...params,
  };
}
1;
