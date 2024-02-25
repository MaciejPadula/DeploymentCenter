import axios from "axios";
import { Namespace } from "./namespace";

const apiUrl = "http://172.28.0.4:5500";
const controller = "api/Namespaces";

interface GetNamespacesResponse {
  namespaces: Namespace[];
}

export async function getNamespaces(): Promise<Namespace[]> {
  const response = await axios.get<GetNamespacesResponse>(
    `${apiUrl}/${controller}/GetNamespaces`
  );
  return response.data.namespaces;
}
