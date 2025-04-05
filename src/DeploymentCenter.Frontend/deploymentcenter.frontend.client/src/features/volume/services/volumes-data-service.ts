import { HttpClient } from "../../../shared/services/http-client";
import { Cluster } from "../../../shared/models/cluster";
import { Volume } from "../models/volume";
import { VolumeData } from "../create-volume/models/volume-data";

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

  async function createVolume(volume: VolumeData): Promise<void> {
    await httpClient.post(`/${controller}/CreateVolume`, {
      volumeName: volume.volumeName,
      volumePath: volume.volumePath,
      capacityInKibiBytes: volume.capacityInKibiBytes
    });
  }

  return {
    getVolumes,
    createVolume,
  };
}

export default function useVolumesDataService(cluster: Cluster) {
  return volumesDataService(
    new HttpClient(cluster.apiUrl, cluster.kubeconfig)
  );
}
