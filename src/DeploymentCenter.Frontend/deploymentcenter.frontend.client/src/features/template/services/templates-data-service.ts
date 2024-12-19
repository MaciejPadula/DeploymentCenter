import { Cluster } from "../../../shared/models/cluster";
import { HttpClient } from "../../../shared/services/http-client";
import { TemplateFormDetails } from "../models/template-definition";
import { TemplateDetails } from "../models/template-details";

export function useTemplatesDataService(cluster: Cluster) {
  const httpClient = new HttpClient(cluster.apiUrl, cluster.kubeconfig);
  
  interface GetTemplatesResponse {
    templates: TemplateDetails[];
  }

  interface GetTemplateResponse {
    template: TemplateFormDetails;
  }

  interface ApplyTemplateRequest {
    templateName: string;
    variables: Record<string, string>;
  }

  return {
    async getTemplates(): Promise<TemplateDetails[]> {
      const response = await httpClient.get<GetTemplatesResponse>("/api/Templates/GetTemplates");
      return response.templates;
    },
    async getTemplate(name: string): Promise<TemplateFormDetails> {
      const response = await httpClient.get<GetTemplateResponse>(`/api/Templates/GetTemplate?templateName=${name}`);
      return response.template;
    },
    async applyTemplate(request: ApplyTemplateRequest): Promise<void> {
      await httpClient.post("/api/Templates/ApplyTemplate", request);
    }
  };
}
