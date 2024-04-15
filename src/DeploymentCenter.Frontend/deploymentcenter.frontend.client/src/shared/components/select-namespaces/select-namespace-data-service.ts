import axios from "axios";
import { Namespace } from "./namespace";

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

export function useSelectNamespaceDataService(apiUrl: string) {
  return SelectNamespaceDataService(apiUrl);
}
