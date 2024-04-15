import axios from "axios";
import { LoadBalancerDetails } from "./load-balancer-details";
import { LoadBalancerPort } from "./load-balancer-port";

function LoadBalancerPageDataService(apiUrl: string) {
  const controller = "api/Services";

  async function getLoadBalancerDetails(
    namespace: string,
    loadBalancerName: string
  ): Promise<LoadBalancerDetails> {
    const response = await axios.get<LoadBalancerDetails>(
      `${apiUrl}/${controller}/GetLoadBalancerDetails?namespace=${namespace}&loadBalancerName=${loadBalancerName}`
    );
    return response.data;
  }

  interface GetLoadBalancerIpAddressesResponse {
    ipAddresses: string[];
  }

  async function getLoadBalancerIpAddresses(
    namespace: string,
    loadBalancerName: string
  ): Promise<string[]> {
    const response = await axios.get<GetLoadBalancerIpAddressesResponse>(
      `${apiUrl}/${controller}/GetLoadBalancerIpAddresses?namespace=${namespace}&loadBalancerName=${loadBalancerName}`
    );
    return response.data.ipAddresses;
  }

  interface GetLoadBalancerPortsResponse {
    ports: LoadBalancerPort[];
  }

  async function getLoadBalancerPorts(
    namespace: string,
    loadBalancerName: string
  ): Promise<LoadBalancerPort[]> {
    const response = await axios.get<GetLoadBalancerPortsResponse>(
      `${apiUrl}/${controller}/GetLoadBalancerPorts?namespace=${namespace}&loadBalancerName=${loadBalancerName}`
    );
    return response.data.ports;
  }

  return {
    getLoadBalancerDetails,
    getLoadBalancerIpAddresses,
    getLoadBalancerPorts,
  };
}

export default function useLoadBalancerPageDataService(clusterUrl: string | undefined) {
  return LoadBalancerPageDataService(clusterUrl ?? "");
}
