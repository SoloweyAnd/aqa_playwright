import { generateCustomerData } from "./generateCustomer.data";
import { ICustomer } from "types/customer.types";
import { ERROR_MESSAGES } from "data/errorMessages";

export function generateInvalidCustomer(
  caseName: string,
  override: Partial<ICustomer>
) {
  return {
    case: caseName,
    data: { ...generateCustomerData(), ...override },
    expectedErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
  };
}
