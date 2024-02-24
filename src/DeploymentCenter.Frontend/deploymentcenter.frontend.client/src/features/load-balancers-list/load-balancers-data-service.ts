import { LoadBalancer } from "./load-balancer";

const apiUrl = 'http://172.28.0.4:5500';
const controller = 'api/Services';

export async function getLoadBalancers(namespace: string): Promise<LoadBalancer[]> {
  const response = await fetch(`${apiUrl}/${controller}/GetLoadBalancersList?namespace=${namespace}`);
  const result = await response.json();
  return result.loadBalancers;
}