import { generateCustomerData } from "./generateCustomer.data";

export const validCustomers = [
  {
    case: "Minimal valid data",
    data: generateCustomerData({
      name: "A",
      city: "B",
      street: "C",
      house: 1,
      flat: 1,
      phone: "+1234567890",
      notes: "",
    }),
  },
  {
    case: "Max length name (40 chars)",
    data: generateCustomerData({ name: "John".repeat(10) }),
  },
  {
    case: "City with space",
    data: generateCustomerData({ city: "New York" }),
  },
  {
    case: "Street with alphanumeric and space",
    data: generateCustomerData({ street: "Main Street 42" }),
  },
  {
    case: "House = 999",
    data: generateCustomerData({ house: 999 }),
  },
  {
    case: "Flat = 9999",
    data: generateCustomerData({ flat: 9999 }),
  },
  {
    case: "Phone with max length (20 chars)",
    data: generateCustomerData({ phone: "+12345678901234567890" }),
  },
  {
    case: "Notes with max allowed text (250 chars)",
    data: generateCustomerData({ notes: "a".repeat(250) }),
  },
  {
    case: "Name with exactly one space",
    data: generateCustomerData({ name: "John Doe" }),
  },
  {
    case: "Name with max allowed length and space",
    data: generateCustomerData({ name: "A".repeat(19) + " " + "B".repeat(20) }),
  },
  {
    case: "City with max length (20 chars)",
    data: generateCustomerData({ city: "A".repeat(20) }),
  },
  {
    case: "Street with max length (40 chars)",
    data: generateCustomerData({ street: "A1 ".repeat(13).trim() + "Z" }),
  },
  {
    case: "Notes with emojis and special chars except <, >",
    data: generateCustomerData({ notes: "Valid note 😊 #1 approved!" }),
  },
];
