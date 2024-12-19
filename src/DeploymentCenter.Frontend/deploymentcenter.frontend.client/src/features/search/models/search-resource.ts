export enum SearchResourceType {
  Unknown = 0,
  Deployment = 1,
  LoadBalancer = 2,
  Volume = 3,
}

export interface SearchResource {
  name: string;
  type: SearchResourceType;
  namespace?: string;
}