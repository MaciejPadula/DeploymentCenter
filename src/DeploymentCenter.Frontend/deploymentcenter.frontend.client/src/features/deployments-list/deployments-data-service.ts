import { Deployment } from "./deployment";
import { HttpClient } from "../../shared/services/http-client";
import { Cluster } from "../../shared/models/cluster";

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

  return {
    getDeployments,
  };
}

export default function useDeploymentsDataService(cluster: Cluster | undefined) {
  if (!cluster) {
    throw new Error("Cluster is required");
  }
  return DeploymentsDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}