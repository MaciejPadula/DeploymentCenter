import axios from "axios";
import { LoadBalancer } from "./load-balancer";

const apiUrl = 'http://172.28.0.4:5500';
const controller = 'api/Services';

interface GetLoadBalancersResponse {
  loadBalancers: LoadBalancer[];
}

export async function getLoadBalancers(namespace: string): Promise<LoadBalancer[]> {
  const response = await axios.get<GetLoadBalancersResponse>(`${apiUrl}/${controller}/GetLoadBalancersList?namespace=${namespace}`);
  return response.data.loadBalancers;
}