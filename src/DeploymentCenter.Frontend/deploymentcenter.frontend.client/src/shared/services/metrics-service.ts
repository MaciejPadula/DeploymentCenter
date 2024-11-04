import { HttpClient } from "./http-client";
import { Cluster } from "../models/cluster";
import { DeploymentMetrics } from "../models/deployment-metrics";

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

  return {
    getClusterMetrics,
    getDeploymentMetrics,
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
