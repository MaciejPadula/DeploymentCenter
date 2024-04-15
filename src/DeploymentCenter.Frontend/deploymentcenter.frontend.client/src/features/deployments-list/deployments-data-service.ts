import axios from "axios";
import { Deployment } from "./deployment";

function DeploymentsDataService(apiUrl: string) {
  const controller = "api/Deployments";

  interface GetDeploymentsListResponse {
    deployments: Deployment[];
  }

  async function getDeployments(namespace: string): Promise<Deployment[]> {
    const response = await axios.get<GetDeploymentsListResponse>(
      `${apiUrl}/${controller}/GetDeploymentsList?namespace=${namespace}`
    );
    return response.data.deployments;
  }

  return {
    getDeployments,
  };
}

export default function useDeploymentsDataService(clusterUrl: string | undefined) {
  return DeploymentsDataService(clusterUrl ?? "");
}