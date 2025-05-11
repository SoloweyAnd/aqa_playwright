import { generateCustomerData } from "./generateCustomer.data";
import { STATUS_CODES } from "data/statusCodes";

export const createCustomerTestDataPositive = [
  {
    testName: "Should create customer with minimal valid data",
    data: generateCustomerData({
      name: "A",
      city: "B",
      street: "C",
      house: 1,
      flat: 1,
      phone: "+1234567890",
      notes: "",
    }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName: "Should create customer with max length name (40 chars)",
    data: generateCustomerData({ name: "John".repeat(10) }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName: "Should create customer with max length city (20 chars)",
    data: generateCustomerData({ city: "New York" }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName: "Should create customer with max length street (40 chars)",
    data: generateCustomerData({ street: "Main Street 42" }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName: "Should create customer with max length phone (20 chars)",
    data: generateCustomerData({ phone: "+12345678901234567890" }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },

  {
    testName: "Should create customer with house number with 3 digits",
    data: generateCustomerData({ house: 999 }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },

  {
    testName: "Should create customer with flat number with 4 digits",
    data: generateCustomerData({ flat: 9999 }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },

  {
    testName: "Should create customer with max length notes (250 chars)",
    data: generateCustomerData({ notes: "a".repeat(250) }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName: "Should create customer with name with exactly one space",
    data: generateCustomerData({ name: "John Doe" }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName:
      "Should create customer with name with max allowed length and space",
    data: generateCustomerData({ name: "A".repeat(19) + " " + "B".repeat(20) }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName: "Should create customer with city with max allowed length",
    data: generateCustomerData({ city: "A".repeat(20) }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
  {
    testName: "Should create customer with street with max allowed length",
    data: generateCustomerData({ street: "A".repeat(40) }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },

  {
    testName: "Should create customer with notes with max allowed length",
    data: generateCustomerData({ notes: "Valid note 😊 #1 approved!" }),
    isSuccess: true,
    errorMessage: null,
    status: STATUS_CODES.CREATED,
  },
];
