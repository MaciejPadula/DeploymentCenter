import { Cluster } from "../../../shared/models/cluster";
import { HttpClient } from "../../../shared/services/http-client";
import { LoadBalancerData } from "../models/load-balancer-data";

function LoadBalancerFormDataService(httpClient: HttpClient) {
  async function createLoadBalancer(service: LoadBalancerData) {
    await httpClient.post(`/api/Services/CreateLoadBalancer`, service);
  }

  return {
    createLoadBalancer,
  };
}

export default function useLoadBalancerFormDataService(cluster: Cluster) {
  return LoadBalancerFormDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
