export interface DeploymentDetails {
  deploymentName: string;
  namespace: string;
  applicationName: string;
  aliveReplicas: number;
  allReplicas: number;
}