import axios from "axios";
import { DeploymentData } from "./setup-deployment/deployment-data";
import { ServiceData } from "./setup-service/service-data";

function ApplicationFormDataService(apiUrl: string) {
  async function createDeployment(deployment: DeploymentData) {
    await axios.post(
      `${apiUrl}/api/Deployments/CreateDeployment`,
      deployment
    );
  }

  async function createLoadBalancer(service: ServiceData) {
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
