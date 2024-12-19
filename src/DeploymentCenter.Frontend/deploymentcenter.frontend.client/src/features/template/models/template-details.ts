export enum ResourceType {
  Unknown = 0,
  Deployment = 1,
  LoadBalancer = 2,
  Volume = 3,
}

export interface TemplateDetails {
  name: string;
  resourceTypes: ResourceType[];
}
