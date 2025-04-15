export enum DeploymentStatus {
  Unknown = 0,
  Healthy = 1,
  Error = 2,
}

export interface Deployment {
  name: string;
  status: DeploymentStatus;
}