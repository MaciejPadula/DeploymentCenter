import { Cluster } from "../../../shared/models/cluster";
import { HttpClient } from "../../../shared/services/http-client";
import { DeploymentData } from "../models/deployment-data";

function DeploymentFormDataService(httpClient: HttpClient) {
  async function createDeployment(deployment: DeploymentData) {
    await httpClient.post(`/api/Deployments/CreateDeployment`, deployment);
  }

  return {
    createDeployment,
  };
}

export default function useDeploymentFormDataService(cluster: Cluster) {
  return DeploymentFormDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
