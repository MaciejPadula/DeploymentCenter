import { LoadBalancerDetails } from "./load-balancer-details";
import { LoadBalancerPort } from "./load-balancer-port";

const apiUrl = 'http://172.28.0.4:5500';
const controller = 'api/Services';

export async function getLoadBalancerDetails(namespace: string, loadBalancerName: string): Promise<LoadBalancerDetails> {
  const response = await fetch(`${apiUrl}/${controller}/GetLoadBalancerDetails?namespace=${namespace}&loadBalancerName=${loadBalancerName}`);
  return await response.json();
}

export async function getLoadBalancerIpAddresses(namespace: string, loadBalancerName: string): Promise<string[]> {
  const response = await fetch(`${apiUrl}/${controller}/GetLoadBalancerIpAddresses?namespace=${namespace}&loadBalancerName=${loadBalancerName}`);
  const result = await response.json();
  return result.ipAddresses;
}

export async function getLoadBalancerPorts(namespace: string, loadBalancerName: string): Promise<LoadBalancerPort[]> {
  const response = await fetch(`${apiUrl}/${controller}/GetLoadBalancerPorts?namespace=${namespace}&loadBalancerName=${loadBalancerName}`);
  const result = await response.json();
  return result.ports;
}