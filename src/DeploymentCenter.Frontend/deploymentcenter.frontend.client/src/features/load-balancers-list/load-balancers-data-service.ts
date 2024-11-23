import { LoadBalancer } from "./load-balancer";
import { HttpClient } from "../../shared/services/http-client";
import { Cluster } from "../../shared/models/cluster";

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

  return {
    getLoadBalancers,
  };
}

export default function useLoadBalancersDataService(cluster: Cluster) {
  return loadBalancersDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
