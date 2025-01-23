import { Pod } from "../models/pod";
import { HttpClient } from "../../../shared/services/http-client";
import { Cluster } from "../../../shared/models/cluster";

function PodsDataService(httpClient: HttpClient) {
  const controller = "api/Pods";

  interface GetDeploymentPodsResponse {
    pods: Pod[];
  }

  async function getPods(
    namespace: string,
    namePrefix: string
  ): Promise<Pod[]> {
    const response = await httpClient.get<GetDeploymentPodsResponse>(
      `/${controller}/GetPods?namespace=${namespace}&namePrefix=${namePrefix}`
    );
    return response.pods;
  }

  interface GetPodLogs {
    logText: string;
  }

  async function getPodLogs(
    namespace: string,
    podName: string
  ): Promise<string> {
    const response = await httpClient.get<GetPodLogs>(
      `/${controller}/GetPodLogs?namespace=${namespace}&podName=${podName}`
    );
    return response.logText;
  }

  async function removePod(namespace: string, podName: string) {
    await httpClient.post(
      `/${controller}/RemovePod?namespace=${namespace}&podName=${podName}`,
      null
    );
  }

  return {
    getPods,
    getPodLogs,
    removePod,
  };
}

export default function usePodsDataService(cluster: Cluster) {
  return PodsDataService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}