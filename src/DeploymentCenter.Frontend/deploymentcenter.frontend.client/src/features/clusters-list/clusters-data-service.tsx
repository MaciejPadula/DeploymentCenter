import { HttpClient } from "../../shared/services/http-client";

function ClustersDataService(httpClient: HttpClient) {
  interface SecurePasswordRequest {
    plainText: string;
  }

  interface SecurePasswordResponse {
    securePassword: string;
  }

  async function securePassword(kubeconfig: string): Promise<string> {
    const result = await httpClient.post<
      SecurePasswordRequest,
      SecurePasswordResponse
    >(`/api/Security/SecurePassword`, {
      plainText: kubeconfig,
    });

    return result.securePassword;
  }

  return { securePassword };
}

export default function useClustersDataService(apiUrl: string | undefined) {
  if (!apiUrl) {
    return;
  }
  return ClustersDataService(new HttpClient(apiUrl, null));
}
