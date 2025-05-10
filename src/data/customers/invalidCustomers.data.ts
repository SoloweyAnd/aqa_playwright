import { INVALID_COUNTRIES } from "data/customers/countries.data";
import { generateInvalidCustomer } from "./generateInvalidCustomer.data";

export const invalidCustomers = [
  generateInvalidCustomer("Missing email", { email: "" }),

  generateInvalidCustomer("Missing name", { name: "" }),

  generateInvalidCustomer("Missing country", {
    country: "" as unknown as INVALID_COUNTRIES,
  }),

  generateInvalidCustomer("Missing city", { city: "" }),

  generateInvalidCustomer("Missing street", { street: "" }),

  generateInvalidCustomer("Missing house", { house: "" as unknown as number }),

  generateInvalidCustomer("Missing flat", { flat: "" as unknown as number }),

  generateInvalidCustomer("Missing phone", { phone: "" }),

  generateInvalidCustomer("Invalid email", { email: "test" }),

  generateInvalidCustomer("Invalid name", { name: "A@" }),

  generateInvalidCustomer("Invalid country", {
    country: INVALID_COUNTRIES.INVALID_COUNTRY,
  }),

  generateInvalidCustomer("Invalid city", { city: "12345" }),

  generateInvalidCustomer("Invalid street", { street: "!@#" }),

  generateInvalidCustomer("Invalid house", { house: 1000 }),

  generateInvalidCustomer("Invalid flat", { flat: 10000 }),

  generateInvalidCustomer("Invalid phone", { phone: "123456" }),

  generateInvalidCustomer("Invalid notes", { notes: "<script>bad</script>" }),
];
