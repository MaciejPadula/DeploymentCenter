import { Deployment } from "./deployment";

const apiUrl = 'http://172.28.0.4:5500';
const controller = 'api/Deployments';

export async function getDeployments(namespace: string): Promise<Deployment[]> {
  const response = await fetch(`${apiUrl}/${controller}/GetDeploymentsList?namespace=${namespace}`);
  const result = await response.json();
  return result.deployments;
}