import { useContext, useMemo } from "react";
import { ConfigurationContext } from "./ConfigurationContext";

export function useConfigurationContext() {
  return useContext(ConfigurationContext);
}

export function useConfiguredApiUrl(clusterName: string | null = null) {
  const cluster = useConfiguredCluster(clusterName);
  return useMemo(() => cluster?.apiUrl, [cluster]);
}

export function useConfiguredCluster(clusterName: string | null = null) {
  const { configuration } = useConfigurationContext();

  if (clusterName === null) {
    clusterName = configuration.cluster;
  }

  return useMemo(
    () =>
      configuration.clusters.find(
        (x) => x.name === clusterName
      ),
    [configuration, clusterName]
  );
}
