import { LoadBalancerDetails } from "./load-balancer-details";
import { LoadBalancerPort } from "./load-balancer-port";
import { HttpClient } from "../../shared/services/http-client";
import { Cluster } from "../../shared/models/cluster";

function LoadBalancerPageDataService(httpClient: HttpClient) {
  const controller = "api/Services";

  async function getLoadBalancerDetails(
    namespace: string,
    loadBalancerName: string
  ): Promise<LoadBalancerDetails> {
    return await httpClient.get<LoadBalancerDetails>(
      `/${controller}/GetLoadBalancerDetails?namespace=${namespace}&loadBalancerName=${loadBalancerName}`
    );
  }

  interface GetLoadBalancerIpAddressesResponse {
    ipAddresses: string[];
  }

  async function getLoadBalancerIpAddresses(
    namespace: string,
    loadBalancerName: string
  ): Promise<string[]> {
    const response = await httpClient.get<GetLoadBalancerIpAddressesResponse>(
      `/${controller}/GetLoadBalancerIpAddresses?namespace=${namespace}&loadBalancerName=${loadBalancerName}`
    );
    return response.ipAddresses;
  }

  interface GetLoadBalancerPortsResponse {
    ports: LoadBalancerPort[];
  }

  async function getLoadBalancerPorts(
    namespace: string,
    loadBalancerName: string
  ): Promise<LoadBalancerPort[]> {
    const response = await httpClient.get<GetLoadBalancerPortsResponse>(
      `/${controller}/GetLoadBalancerPorts?namespace=${namespace}&loadBalancerName=${loadBalancerName}`
    );
    return response.ports;
  }

  return {
    getLoadBalancerDetails,
    getLoadBalancerIpAddresses,
    getLoadBalancerPorts,
  };
}

export default function useLoadBalancerPageDataService(cluster: Cluster | undefined) {
  if (!cluster) {
    throw new Error("Cluster is required");
  }
  return LoadBalancerPageDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}
