import { ValidationResult } from "../models/validation-result";

export function greaterThanValidator(
  value: number,
  minValue: number
): ValidationResult | null {
  if (value <= minValue) {
    return {
      isValid: false,
      message: `Value must be greater than ${minValue}`,
    };
  }

  return null;
}
