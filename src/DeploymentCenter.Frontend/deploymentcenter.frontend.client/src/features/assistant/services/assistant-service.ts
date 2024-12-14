import { HttpClient } from "../../../shared/services/http-client";
import { Cluster } from "../../../shared/models/cluster";

function AssistantService(httpClient: HttpClient) {
  const controller = "api/Assistant";

  interface AnalyzeDeploymentRequest {
    namespace: string;
    deploymentName: string;
    userQuestion: string;
  }

  interface AnalyzeDeploymentResponse {
    result: string;
  }

  async function analyzeDeployment(
    namespace: string,
    deploymentName: string,
    userQuestion: string
  ) {
    const response = await httpClient.post<
      AnalyzeDeploymentRequest,
      AnalyzeDeploymentResponse
    >(`/${controller}/AnalyzeDeployment`, {
      namespace: namespace,
      deploymentName: deploymentName,
      userQuestion: userQuestion,
    });

    return response.result;
  }

  interface AnalyzeLoadBalancerRequest {
    namespace: string;
    loadBalancerName: string;
    userQuestion: string;
  }

  interface AnalyzeLoadBalancerResponse {
    result: string;
  }

  async function analyzeLoadBalancer(
    namespace: string,
    loadBalancerName: string,
    userQuestion: string
  ) {
    const response = await httpClient.post<
      AnalyzeLoadBalancerRequest,
      AnalyzeLoadBalancerResponse
    >(`/${controller}/AnalyzeLoadBalancer`, {
      namespace: namespace,
      loadBalancerName: loadBalancerName,
      userQuestion: userQuestion,
    });

    return response.result;
  }

  return {
    analyzeDeployment,
    analyzeLoadBalancer,
  };
}

export default function useAssistantService(cluster: Cluster) {
  return AssistantService(new HttpClient(cluster.apiUrl, cluster.kubeconfig));
}
