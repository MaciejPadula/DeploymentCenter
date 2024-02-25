import axios from "axios";
import { Deployment } from "./deployment";

const apiUrl = 'http://172.28.0.4:5500';
const controller = 'api/Deployments';

interface GetDeploymentsListResponse {
  deployments: Deployment[];
}

export async function getDeployments(namespace: string): Promise<Deployment[]> {
  const response = await axios.get<GetDeploymentsListResponse>(`${apiUrl}/${controller}/GetDeploymentsList?namespace=${namespace}`);
  return response.data.deployments;
}