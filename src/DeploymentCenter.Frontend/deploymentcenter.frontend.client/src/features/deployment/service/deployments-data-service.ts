import { Deployment } from "../deployments-list/models/deployment";
import { DeploymentVolume } from "../deployment-page/models/deployment-volume";
import { DeploymentDetails } from "../deployment-page/deployment-details";
import { Pod } from "../deployment-page/models/pod";
import { Container } from "../deployment-page/models/container";
import { HttpClient } from "../../../shared/services/http-client";
import { Cluster } from "../../../shared/models/cluster";
import { DeploymentData } from "../create-deployment/models/deployment-data";

function DeploymentsDataService(httpClient: HttpClient) {
  const controller = "api/Deployments";

  interface GetDeploymentsListResponse {
    deployments: Deployment[];
  }

  async function getDeployments(namespace: string): Promise<Deployment[]> {
    const response = await httpClient.get<GetDeploymentsListResponse>(
      `/${controller}/GetDeploymentsList?namespace=${namespace}`);
    return response.deployments;
  }

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
    await httpClient.post(`/${controller}/ScaleDeployment`, {
      namespace: namespace,
      deploymentName: deploymentName,
      replicasCount: replicasCount,
    });
  }

  async function removePod(namespace: string, podName: string) {
    await httpClient.post(
      `/${controller}/RemovePod?namespace=${namespace}&podName=${podName}`,
      null
    );
  }

  interface GetDeploymentVolumesResponse {
    volumes: DeploymentVolume[];
  }

  async function getDeploymentVolumes(
    namespace: string,
    deploymentName: string
  ): Promise<DeploymentVolume[]> {
    const response = await httpClient.get<GetDeploymentVolumesResponse>(
      `/${controller}/GetDeploymentVolumes?namespace=${namespace}&deploymentName=${deploymentName}`
    );
    return response.volumes;
  }

  interface ConnectVolumeRequest {
    namespace: string;
    deploymentName: string;
    volumeName: string;
    containerName: string;
    mountPath: string;
  }

  async function connectToVolume(
    namespace: string,
    deploymentName: string,
    volumeName: string,
    containerName: string,
    mountPath: string
  ) {
    await httpClient.post<ConnectVolumeRequest, unknown>(
      `/${controller}/ConnectVolume`,
      {
        namespace: namespace,
        deploymentName: deploymentName,
        volumeName: volumeName,
        containerName: containerName,
        mountPath: mountPath,
      }
    );
  }

  async function createDeployment(deployment: DeploymentData) {
    await httpClient.post(`/api/Deployments/CreateDeployment`, deployment);
  }

  return {
    getDeployments,
    getDeploymentDetails,
    getDeploymentPods,
    getDeploymentContainers,
    getPodLogs,
    restartDeployment,
    removeDeployment,
    scaleDeployment,
    removePod,
    getDeploymentVolumes,
    connectToVolume,
    createDeployment,
  };
}

export default function useDeploymentsDataService(cluster: Cluster) {
  return DeploymentsDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}