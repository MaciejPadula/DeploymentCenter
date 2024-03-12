import axios from "axios";
import { Namespace } from "./namespace";
import { useConfigurationContext } from "../../contexts/context-helpers";

function SelectNamespaceDataService(apiUrl: string) {
  const controller = "api/Namespaces";

  interface GetNamespacesResponse {
    namespaces: Namespace[];
  }

  async function getNamespaces(): Promise<Namespace[]> {
    const response = await axios.get<GetNamespacesResponse>(
      `${apiUrl}/${controller}/GetNamespaces`
    );
    return response.data.namespaces;
  }

  return {
    getNamespaces,
  };
}

export function useSelectNamespaceDataService() {
  const { configuration } = useConfigurationContext();
  return SelectNamespaceDataService(configuration.agent.apiUrl);
}
