import { useContext } from "react";
import { ConfigurationContext } from "./ConfigurationContext";

export function useConfigurationContext() {
  return useContext(ConfigurationContext);
}