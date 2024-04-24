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

  return {
    getDeploymentDetails,
    getDeploymentPods,
    getDeploymentContainers,
  };
}

export default function useDeploymentPageDataService(clusterUrl: string | undefined) {
  return DeploymentPageDataService(clusterUrl ?? "");
}
