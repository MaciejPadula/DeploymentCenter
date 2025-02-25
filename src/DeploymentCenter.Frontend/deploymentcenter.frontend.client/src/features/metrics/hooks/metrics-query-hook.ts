import useMetricsDataService, { UsagesDictionary } from "../services/metrics-service";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Cluster } from "../../../shared/models/cluster";

export function useMetricsQuery(props: {
  namespace: string;
  prefix?: string;
  cluster: Cluster;
  onNewMetric: (metrics: UsagesDictionary) => void;
}) {
  const metricsService = useMetricsDataService(props.cluster);

  const { mutateAsync: fetchMetrics } = useMutation({
    mutationFn: async () =>
      await metricsService.getPodsMetrics(props.namespace, props.prefix),
  });

  async function loadMetrics() {
    props.onNewMetric(await fetchMetrics());
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      await loadMetrics();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
