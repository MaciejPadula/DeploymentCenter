import { parseJson, stringifyJson } from "./json-helper";

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  return parseJson(localStorage.getItem(key), defaultValue);
}

export function setInLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, stringifyJson(value));
}

export function clearLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}