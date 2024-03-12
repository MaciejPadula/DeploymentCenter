export function parseJson<T>(input: string | null, defaultValue: T): T {
  if (!input) {
    return defaultValue;
  }

  try {
    return JSON.parse(input) as T;
  } catch {
    return defaultValue;
  }
}

export function stringifyJson<T>(input: T): string {
  return JSON.stringify(input);
}