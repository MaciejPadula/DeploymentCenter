import { useContext } from "react";
import { NamespaceContext } from "./NamespaceContext";

export function useNamespaceContext() {
  return useContext(NamespaceContext);
}