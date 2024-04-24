import { useContext } from "react";
import { ConfigurationContext } from "./ConfigurationContext";

export function useConfigurationContext() {
  return useContext(ConfigurationContext);
}

export function useConfiguredApiUrl() {
  const { configuration } = useConfigurationContext();

  const cluster = configuration.clusters.find(
    (x) => x.name === configuration.cluster
  );

  return cluster?.apiUrl;
}