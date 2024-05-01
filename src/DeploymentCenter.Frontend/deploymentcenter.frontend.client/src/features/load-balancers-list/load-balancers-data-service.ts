import axios from "axios";
import { LoadBalancer } from "./load-balancer";

const controller = "api/Services";

function loadBalancersDataService(apiUrl: string) {
  interface GetLoadBalancersResponse {
    loadBalancers: LoadBalancer[];
  }

  async function getLoadBalancers(namespace: string): Promise<LoadBalancer[]> {
    const response = await axios.get<GetLoadBalancersResponse>(
      `${apiUrl}/${controller}/GetLoadBalancersList?namespace=${namespace}`
    );
    return response.data.loadBalancers;
  }

  return {
    getLoadBalancers,
  };
}

export default function useLoadBalancersDataService(
  clusterUrl: string | undefined
) {
  return loadBalancersDataService(clusterUrl ?? "");
}
