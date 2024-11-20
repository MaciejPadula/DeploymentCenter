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
      `/${controller}/GetDeploymentDetails?namespace=${namespace}&deploymentName=${deploymentName}`
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

  async function restartDeployment(namespace: string, deploymentName: string) {
    await httpClient.post(
      `/${controller}/RestartDeployment?namespace=${namespace}&deploymentName=${deploymentName}`,
      null
    );
  }

  async function removeDeployment(namespace: string, deploymentName: string) {
    await httpClient.post(
      `/${controller}/RemoveDeployment?namespace=${namespace}&deploymentName=${deploymentName}`,
      null
    );
  }

  async function scaleDeployment(
    namespace: string,
    deploymentName: string,
    replicasCount: number
  ) {
    await httpClient.post(
      `/${controller}/ScaleDeployment`,
      {
        namespace: namespace,
        deploymentName: deploymentName,
        replicasCount: replicasCount,
      }
    );
  }

  async function removePod(namespace: string, podName: string) {
    await httpClient.post(
      `/${controller}/RemovePod?namespace=${namespace}&podName=${podName}`,
      null
    );
  }

  return {
    getDeploymentDetails,
    getDeploymentPods,
    getDeploymentContainers,
    getPodLogs,
    restartDeployment,
    removeDeployment,
    scaleDeployment,
    removePod,
  };
}

export default function useDeploymentPageDataService(
  cluster: Cluster | undefined
) {
  if (cluster == undefined) {
    return null;
  }
  return DeploymentPageDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
