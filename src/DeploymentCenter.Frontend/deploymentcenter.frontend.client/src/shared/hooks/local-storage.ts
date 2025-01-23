import { useState } from "react";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../helpers/local-storage-helper";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(getFromLocalStorage(key, defaultValue));

  function setLocalStorageValue(val: T) {
    setInLocalStorage(key, val);
    setValue(val);
  }

  return {
    value,
    setValue: setLocalStorageValue,
  };
}
