import axios from "axios";
import { DeploymentData } from "./setup-deployment/deployment-data";
import { LoadBalancerData } from "./setup-load-balancer/load-balancer-data";

function ApplicationFormDataService(apiUrl: string) {
  async function createDeployment(deployment: DeploymentData) {
    await axios.post(
      `${apiUrl}/api/Deployments/CreateDeployment`,
      deployment
    );
  }

  async function createLoadBalancer(service: LoadBalancerData) {
    await axios.post(
      `${apiUrl}/api/Services/CreateLoadBalancer`,
      service
    );
  }

  return {
    createDeployment,
    createLoadBalancer,
  };
}

export default function useApplicationFormDataService(
  clusterUrl: string | undefined
) {
  return ApplicationFormDataService(clusterUrl ?? "");
}
