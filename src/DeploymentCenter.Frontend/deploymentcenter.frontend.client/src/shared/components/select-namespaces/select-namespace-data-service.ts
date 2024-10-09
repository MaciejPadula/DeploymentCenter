import { Namespace } from "./namespace";
import { HttpClient } from "../../services/http-client";
import { Cluster } from "../../models/cluster";

function SelectNamespaceDataService(httpClient: HttpClient) {
  const controller = "api/Namespaces";

  interface GetNamespacesResponse {
    namespaces: Namespace[];
  }

  async function getNamespaces(): Promise<Namespace[]> {
    const response = await httpClient.get<GetNamespacesResponse>(
      `/${controller}/GetNamespaces`
    );
    return response.namespaces;
  }

  return {
    getNamespaces,
  };
}

export function useSelectNamespaceDataService(
  cluster: Cluster | undefined
) {
  if (!cluster) {
    throw new Error("Cluster is required");
  }
  return SelectNamespaceDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}
