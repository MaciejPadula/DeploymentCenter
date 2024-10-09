import { Container } from "./models/container";
import { DeploymentDetails } from "./deployment-details";
import { Pod } from "./models/pod";
import { HttpClient } from "../../shared/services/http-client";
import { Cluster } from "../../shared/models/cluster";

function DeploymentPageDataService(httpClient: HttpClient) {
  const controller = "api/Deployments";

  async function getDeploymentDetails(
    namespace: string,
    deploymentName: string
  ): Promise<DeploymentDetails> {
    return await httpClient.get<DeploymentDetails>(
      `/${controller}/GetDeploymentDetails?namespace=${namespace}&deploymentName=${deploymentName}`,
    );
  }

  interface GetDeploymentPodsResponse {
    pods: Pod[];
  }

  async function getDeploymentPods(
    namespace: string,
    deploymentName: string
  ): Promise<Pod[]> {
    const response = await httpClient.get<GetDeploymentPodsResponse>(
      `/${controller}/GetDeploymentPods?namespace=${namespace}&deploymentName=${deploymentName}`
    );
    return response.pods;
  }

  interface GetDeploymentContainersResponse {
    containers: Container[];
  }

  async function getDeploymentContainers(
    namespace: string,
    deploymentName: string
  ): Promise<Container[]> {
    const response = await httpClient.get<GetDeploymentContainersResponse>(
      `/${controller}/GetDeploymentContainers?namespace=${namespace}&deploymentName=${deploymentName}`
    );
    return response.containers;
  }

  interface GetPodLogs {
    logText: string;
  }

  async function getPodLogs(
    namespace: string,
    podName: string
  ): Promise<string> {
    const response = await httpClient.get<GetPodLogs>(
      `/${controller}/GetPodLogs?namespace=${namespace}&podName=${podName}`
    );
    return response.logText;
  }

  interface GetDeploymentMetricsResponse {
    cpuUsage: number;
    memoryUsage: number;
  }

  async function getDeploymentMetrics(
    namespace: string,
    deploymentName: string
  ): Promise<GetDeploymentMetricsResponse> {
    return await httpClient.get<GetDeploymentMetricsResponse>(
      `/${controller}/GetDeploymentMetrics?namespace=${namespace}&deploymentName=${deploymentName}`
    );
  }

  return {
    getDeploymentDetails,
    getDeploymentPods,
    getDeploymentContainers,
    getPodLogs,
    getDeploymentMetrics,
  };
}

export default function useDeploymentPageDataService(
  cluster: Cluster | undefined
) {
  if (cluster == undefined) {
    throw new Error("Cluster is undefined");
  }
  return DeploymentPageDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}
