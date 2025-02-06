import { HttpClient } from "../../../shared/services/http-client";
import { Cluster } from "../../../shared/models/cluster";
import { DeploymentMetrics } from "../models/deployment-metrics";
import { MetricsAvailability } from "../models/metrics-availability";

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

  async function getDeploymentMetrics(
    namespace: string,
    deploymentName: string
  ): Promise<DeploymentMetrics> {
    return await httpClient.get<DeploymentMetrics>(
      `/${controller}/GetDeploymentMetrics?namespace=${namespace}&deploymentName=${deploymentName}`
    );
  }

  type UsagesDictionary = { [key: string]: DeploymentMetrics };

  interface GetPodsMetricsResponse {
    usages: UsagesDictionary;
  }

  async function getPodsMetrics(
    namespace: string,
    podPrefix?: string
  ): Promise<UsagesDictionary> {
    const result = await httpClient.get<GetPodsMetricsResponse>(
      `/${controller}/GetPodsMetrics?namespace=${namespace}&podPrefix=${podPrefix}`
    );

    return result.usages;
  }

  interface AreMetricsAvailableResponse {
    status: MetricsAvailability;
  }

  async function areMetricsAvailable(): Promise<MetricsAvailability> {
    const response = await httpClient.get<AreMetricsAvailableResponse>(
      `/${controller}/AreMetricsAvailable`
    );
    return response.status;
  }

  return {
    areMetricsAvailable,
    getClusterMetrics,
    getDeploymentMetrics,
    getPodsMetrics,
  };
}

export default function useMetricsDataService(cluster: Cluster) {
  return metricsDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}
