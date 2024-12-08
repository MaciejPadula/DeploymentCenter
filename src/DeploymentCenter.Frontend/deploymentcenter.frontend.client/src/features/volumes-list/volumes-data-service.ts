import { HttpClient } from "../../shared/services/http-client";
import { Cluster } from "../../shared/models/cluster";
import { Volume } from "./volume";

const controller = "api/Volumes";

function volumesDataService(httpClient: HttpClient) {
  interface GetVolumesResponse {
    volumes: Volume[];
  }

  async function getVolumes(): Promise<Volume[]> {
    const response = await httpClient.get<GetVolumesResponse>(
      `/${controller}/GetVolumes`
    );
    return response.volumes;
  }

  return {
    getVolumes
  };
}

export default function useVolumesDataService(cluster: Cluster) {
  return volumesDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
