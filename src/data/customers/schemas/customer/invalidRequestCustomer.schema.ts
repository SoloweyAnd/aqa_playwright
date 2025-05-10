export const invalidRequestCustomerSchema = {
  type: "object",
  properties: {
    IsSuccess: { type: "boolean" },
    ErrorMessage: { type: "string" },
  },
  required: ["IsSuccess", "ErrorMessage"],
};
