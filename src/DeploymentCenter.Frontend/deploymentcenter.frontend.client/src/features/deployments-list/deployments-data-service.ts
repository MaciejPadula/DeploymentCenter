import { Deployment } from "./deployment";

export function getDeployments(namespace: string): Promise<Deployment[]> {
  return fetch(`http://172.28.0.4:5500/api/Deployments/GetDeploymentsList?namespace=${namespace}`)
    .then(response => response.json())
    .then(x => x.deployments);
}