import { HttpClient } from "../../services/http-client";
import { Cluster } from "../../models/cluster";

const controller = "api/Metrics";

function metricsDataService(httpClient: HttpClient) {
  interface GetClusterMetricsResponse {
    cpuUsage: number;
    memoryUsage: number;
    maxCpuUsage: number;
    maxMemoryUsage: number;
  }

  async function getClusterMetrics(): Promise<GetClusterMetricsResponse> {
    const response = await httpClient.get<GetClusterMetricsResponse>(
      `/${controller}/GetClusterMetrics`
    );
    return response;
  }

  return {
    getClusterMetrics,
  };
}

export default function useMetricsDataService(
  cluster: Cluster | undefined
) {
  if (!cluster) {
    throw new Error("Cluster is required");
  }
  return metricsDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}
