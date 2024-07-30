import { Container } from "./models/container";
import { DeploymentDetails } from "./deployment-details";
import { Pod } from "./models/pod";
import axios from "axios";

function DeploymentPageDataService(apiUrl: string) {
  const controller = "api/Deployments";

  async function getDeploymentDetails(
    namespace: string,
    deploymentName: string
  ): Promise<DeploymentDetails> {
    const response = await axios.get<DeploymentDetails>(
      `${apiUrl}/${controller}/GetDeploymentDetails?namespace=${namespace}&deploymentName=${deploymentName}`
    );
    return response.data;
  }

  interface GetDeploymentPodsResponse {
    pods: Pod[];
  }

  async function getDeploymentPods(
    namespace: string,
    deploymentName: string
  ): Promise<Pod[]> {
    const response = await axios.get<GetDeploymentPodsResponse>(
      `${apiUrl}/${controller}/GetDeploymentPods?namespace=${namespace}&deploymentName=${deploymentName}`
    );
    return response.data.pods;
  }

  interface GetDeploymentContainersResponse {
    containers: Container[];
  }

  async function getDeploymentContainers(
    namespace: string,
    deploymentName: string
  ): Promise<Container[]> {
    const response = await axios.get<GetDeploymentContainersResponse>(
      `${apiUrl}/${controller}/GetDeploymentContainers?namespace=${namespace}&deploymentName=${deploymentName}`
    );
    return response.data.containers;
  }

  interface GetPodLogs {
    logText: string;
  }

  async function getPodLogs(
    namespace: string,
    podName: string
  ): Promise<string> {
    const response = await axios.get<GetPodLogs>(
      `${apiUrl}/${controller}/GetPodLogs?namespace=${namespace}&podName=${podName}`
    );
    return response.data.logText;
  }

  interface GetDeploymentMetricsResponse {
    cpuUsage: number;
    memoryUsage: number;
  }

  async function getDeploymentMetrics(
    namespace: string,
    deploymentName: string
  ): Promise<GetDeploymentMetricsResponse> {
    const response = await axios.get<GetDeploymentMetricsResponse>(
      `${apiUrl}/${controller}/GetDeploymentMetrics?namespace=${namespace}&deploymentName=${deploymentName}`
    );

    return response.data;
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
  clusterUrl: string | undefined
) {
  return DeploymentPageDataService(clusterUrl ?? "");
}
