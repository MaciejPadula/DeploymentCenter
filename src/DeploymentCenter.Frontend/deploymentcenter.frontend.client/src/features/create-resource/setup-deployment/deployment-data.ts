import { Container } from "../../deployment-page/models/container";

export interface DeploymentData {
  namespace: string;
  name: string;
  applicationName: string;
  replicas: number;
  containers: Container[];
}

export function getEmptyDeploymentData(): DeploymentData {
  return {
    namespace: "",
    name: "",
    applicationName: "",
    replicas: 0,
    containers: [],
  };
}