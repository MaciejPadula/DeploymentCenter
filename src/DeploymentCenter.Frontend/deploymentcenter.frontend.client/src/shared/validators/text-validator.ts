import { ValidationResult } from "../models/validation-result";

export function textValidator(value: string): ValidationResult | null {
  if (value.length < 3) {
    return {
      isValid: false,
      message: "Name must be at least 3 characters long",
    };
  }
  return null;
}
