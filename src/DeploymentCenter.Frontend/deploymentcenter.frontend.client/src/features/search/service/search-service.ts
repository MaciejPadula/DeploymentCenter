import { Cluster } from "../../../shared/models/cluster";
import { HttpClient } from "../../../shared/services/http-client";
import { SearchResource } from "../models/search-resource";

export function useSearchService(cluster: Cluster) {
  const httpClient = new HttpClient(cluster.apiUrl, cluster.kubeconfig);

  interface SearchResourcesResponse {
    resources: SearchResource[];
  }
  
  return {
    async search(phrase: string): Promise<SearchResourcesResponse> {
      const response = await httpClient.get<SearchResourcesResponse>(`/api/Search/SearchResources?query=${phrase}`);
      return response;
    }
  }
}