import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../../shared/helpers/local-storage-helper";
import { ValidationResult } from "../../shared/models/validation-result";
import { FormGroup } from "./form-group";
import { copyObject } from "../../shared/helpers/object-helper";

type ValidatorFunction<T> = (field: T) => ValidationResult;

export function useFormService<T extends FormGroup>(
  storageKey: string,
  defaultValueFactory: () => T
) {
  const [currentValue, setCurrentValue] = useState<T>(
    getFromLocalStorage<T>(storageKey, defaultValueFactory())
  );

  const validators = useMemo(
    () => new Map<string, (value: T) => ValidationResult>(),
    []
  );

  const addValidator = useCallback(
    (fieldName: string, validator: ValidatorFunction<T>) => {
      if (validators.has(fieldName)) {
        console.warn(`Validator for field ${fieldName} already exists`);
      }

      validators.set(fieldName, validator as ValidatorFunction<T>);
    },
    [validators]
  );

  const validationResult = useMemo(() => {
    const results = new Map<string, ValidationResult>();

    validators.forEach((validator, key) => {
      results.set(key, validator(currentValue));
    });

    return results;
  }, [currentValue, validators]);

  const isValid = useMemo(() => {
    return Array.from(validationResult.values()).every((x) => x.isValid);
  }, [validationResult]);

  useEffect(() => {
    setInLocalStorage(storageKey, currentValue);
  }, [currentValue, storageKey]);

  function updateData(updater: (data: T) => void) {
    const newData = copyObject(currentValue);
    updater(newData);
    setCurrentValue(newData);
  }

  function resetData() {
    setCurrentValue(defaultValueFactory());
  }

  function revalidate() {
    setCurrentValue({ ...currentValue });
  }

  return {
    currentValue,
    updateData,
    resetData,
    revalidate,
    addValidator,
    validationResult,
    isValid,
  };
}
