import { ValidationResult } from "../models/validation-result";

const kubernetesNameRegex = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;

export function kubernetesNameValidator(value: string): ValidationResult | null {
  if (!kubernetesNameRegex.test(value) || value.length > 253) {
    return { isValid: false, message: "Invalid Kubernetes name" };
  }

  return { isValid: true, message: "" };
}