import { DeploymentData } from "./setup-deployment/deployment-data";
import { LoadBalancerData } from "./setup-load-balancer/load-balancer-data";
import { Cluster } from "../../shared/models/cluster";
import { HttpClient } from "../../shared/services/http-client";

function ApplicationFormDataService(httpClient: HttpClient) {
  async function createDeployment(deployment: DeploymentData) {
    await httpClient.post(`/api/Deployments/CreateDeployment`, deployment);
  }

  async function createLoadBalancer(service: LoadBalancerData) {
    await httpClient.post(`/api/Services/CreateLoadBalancer`, service);
  }

  return {
    createDeployment,
    createLoadBalancer,
  };
}

export default function useApplicationFormDataService(cluster: Cluster) {
  return ApplicationFormDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
