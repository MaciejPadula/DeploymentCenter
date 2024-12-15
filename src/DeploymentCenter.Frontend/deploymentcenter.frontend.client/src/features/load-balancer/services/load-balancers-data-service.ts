import { LoadBalancer } from "../load-balancers-list/models/load-balancer";
import { LoadBalancerPort } from "../load-balancer-page/load-balancer-port";
import { LoadBalancerDetails } from "../load-balancer-page/load-balancer-details";
import { HttpClient } from "../../../shared/services/http-client";
import { Cluster } from "../../../shared/models/cluster";
import { LoadBalancerData } from "../create-load-balancer/models/load-balancer-data";

const controller = "api/Services";

function loadBalancersDataService(httpClient: HttpClient) {
  interface GetLoadBalancersResponse {
    loadBalancers: LoadBalancer[];
  }

  async function getLoadBalancers(namespace: string): Promise<LoadBalancer[]> {
    const response = await httpClient.get<GetLoadBalancersResponse>(
      `/${controller}/GetLoadBalancersList?namespace=${namespace}`
    );
    return response.loadBalancers;
  }

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

  async function removeLoadBalancer(
    namespace: string,
    loadBalancerName: string
  ) {
    await httpClient.post(
      `/${controller}/RemoveLoadBalancer?namespace=${namespace}&loadBalancerName=${loadBalancerName}`,
      null
    );
  }

  async function createLoadBalancer(service: LoadBalancerData) {
    await httpClient.post(`/api/Services/CreateLoadBalancer`, service);
  }

  return {
    getLoadBalancers,
    getLoadBalancerDetails,
    getLoadBalancerIpAddresses,
    getLoadBalancerPorts,
    removeLoadBalancer,
    createLoadBalancer,
  };
}

export default function useLoadBalancersDataService(cluster: Cluster) {
  return loadBalancersDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
