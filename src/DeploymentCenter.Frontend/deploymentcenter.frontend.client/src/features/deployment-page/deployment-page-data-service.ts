import { DeploymentDetails } from "./deployment-details";
import { Pod } from "./pod";

const apiUrl = 'http://172.28.0.4:5500';
const controller = 'api/Deployments';

export async function getDeploymentDetails(namespace: string, deploymentName: string): Promise<DeploymentDetails> {
  const response = await fetch(`${apiUrl}/${controller}/GetDeploymentDetails?namespace=${namespace}&deploymentName=${deploymentName}`);
  return await response.json();
}

export async function getDeploymentPods(namespace: string, deploymentName: string): Promise<Pod[]> {
  const response = await fetch(`${apiUrl}/${controller}/GetDeploymentPods?namespace=${namespace}&deploymentName=${deploymentName}`);
  const result = await response.json();
  return result.pods;
}