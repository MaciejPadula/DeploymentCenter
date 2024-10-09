import { ValidationResult } from "../../shared/models/validation-result";

export class ValidatorBuilder<T> {
  private readonly validators: ((x: T) => ValidationResult | null)[] = [];

  public withValidation(validator: (x: T) => ValidationResult | null): ValidatorBuilder<T> {
    this.validators.push(validator);
    return this;
  }

  public build(): (x: T) => ValidationResult {
    return (x: T) => {
      for (const validator of this.validators) {
        const result = validator(x);
        if (result) {
          return result;
        }
      }

      return {
        isValid: true,
        message: "",
      };
    };
  }
}