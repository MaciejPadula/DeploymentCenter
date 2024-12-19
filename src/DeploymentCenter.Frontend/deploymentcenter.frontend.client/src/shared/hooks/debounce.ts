import { useEffect, useState } from "react";

export function useDebounceInput<T>(defaultValue: T, debounceTimeout: number = 300) {
  const [value, setValue] = useState<T>(defaultValue);

  const [debounced, setDebounced] = useState<T>(defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, debounceTimeout);

    return () => clearTimeout(timeout);
  }, [debounceTimeout, value]);

  return { value: debounced, setValue };
}