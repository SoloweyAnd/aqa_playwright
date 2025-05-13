import { generateCustomerData } from "./generateCustomer.data";
import { STATUS_CODES } from "data/statusCodes";
import { INVALID_COUNTRIES } from "data/customers/countries.data";
import { ERROR_MESSAGES } from "data/errorMessages";

export const createCustomerTestDataNegative = [
  {
    testName: "Should not create customer with missing email",
    data: generateCustomerData({ email: "" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with missing name",
    data: generateCustomerData({ name: "" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with missing country",
    data: generateCustomerData({ country: "" as unknown as INVALID_COUNTRIES }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with missing city",
    data: generateCustomerData({ city: "" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with missing street",
    data: generateCustomerData({ street: "" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with missing house",
    data: generateCustomerData({ house: "" as unknown as number }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with missing flat",
    data: generateCustomerData({ flat: "" as unknown as number }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with missing phone",
    data: generateCustomerData({ phone: "" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid email",
    data: generateCustomerData({ email: "test" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid name",
    data: generateCustomerData({ name: "A@" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid country",
    data: generateCustomerData({ country: INVALID_COUNTRIES.INVALID_COUNTRY }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid city",
    data: generateCustomerData({ city: "12345" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid street",
    data: generateCustomerData({ street: "!@#" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid house",
    data: generateCustomerData({ house: 1000 }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid flat",
    data: generateCustomerData({ flat: 10000 }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid phone",
    data: generateCustomerData({ phone: "123456" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },

  {
    testName: "Should not create customer with invalid notes",
    data: generateCustomerData({ notes: "<script>bad</script>" }),
    isSuccess: false,
    errorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
    status: STATUS_CODES.BAD_REQUEST,
  },
];
