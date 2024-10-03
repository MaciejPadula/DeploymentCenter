import { ValidationResult } from "../models/validation-result";

export function numberValidator(value: unknown): ValidationResult | null {
  if (isNaN(Number(value))) {
    return { isValid: false, message: "Value must be a number" };
  }

  return null;
}
