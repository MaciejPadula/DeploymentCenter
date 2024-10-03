import { ValidationResult } from "../models/validation-result";

export function requiredValidator(value: unknown): ValidationResult | null {
  if (value === null || value === undefined || value === "") {
    return {
      isValid: false,
      message: "Field is required",
    };
  }

  return null;
}
