export enum SearchResourceType {
  Unknown = 0,
  Deployment = 1,
  LoadBalancer = 2,
  CronJob = 3,
}

export interface SearchResource {
  name: string;
  type: SearchResourceType;
  namespace?: string;
}

export interface ResouceInSearchDetails {
  resource: SearchResource;
  icon: string;
  url: string;
}