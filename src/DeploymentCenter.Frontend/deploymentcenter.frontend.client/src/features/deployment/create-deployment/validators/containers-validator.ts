import { ValidationResult } from "../../../../shared/models/validation-result";
import { DeploymentData } from "../models/deployment-data";

export function containersValidator(value: DeploymentData): ValidationResult {
  const fieldToCheck = value.containers;

  if (fieldToCheck.length === 0) {
    return {
      isValid: false,
      message: "At least one container is required",
    };
  }

  if (fieldToCheck.some((container) => !container.name)) {
    return {
      isValid: false,
      message: "Container name is required",
    };
  }

  if (fieldToCheck.some((container) => !container.image)) {
    return {
      isValid: false,
      message: "Container image is required",
    };
  }

  if (
    fieldToCheck.some((container) =>
      container.environmentVariables.some(
        (env) => (env.key && !env.value) || (!env.key && env.value)
      )
    )
  ) {
    return {
      isValid: false,
      message: "Environment variables must have both key and value",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}
