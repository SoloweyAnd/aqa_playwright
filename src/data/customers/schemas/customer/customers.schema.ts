import { VALID_COUNTRIES } from "data/customers/countries.data";

export const customersListSchema = {
  type: "object",
  properties: {
    Customers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          country: { type: "string", enum: Object.values(VALID_COUNTRIES) },
          city: { type: "string" },
          street: { type: "string" },
          house: { type: "number" },
          flat: { type: "number" },
          phone: { type: "string" },
          createdOn: { type: "string" },
          notes: { type: "string" },
        },
        required: [
          "_id",
          "email",
          "name",
          "country",
          "city",
          "street",
          "house",
          "flat",
          "phone",
          "createdOn",
        ],
      },
    },
    sorting: {
      type: "object",
      properties: {
        sortField: { type: "string" },
        sortOrder: { type: "string", enum: ["asc", "desc"] },
      },
      required: ["sortField", "sortOrder"],
    },
    IsSuccess: { type: "boolean" },
    ErrorMessage: { type: ["string", "null"] },
  },
  required: ["Customers", "sorting", "IsSuccess", "ErrorMessage"],
};
