import { DeploymentData } from "./deployment-data";

export interface ApplicationData {
  name: string;
  deployment: DeploymentData;
}

const emptyApplicationData = {
  name: '',
  deployment: {
    namespace: '',
    name: '',
    applicationName: '',
    replicas: 0,
    containers: []
  }
};

export function getEmptyApplicationData(): ApplicationData {
  return JSON.parse(JSON.stringify(emptyApplicationData)) as ApplicationData;
}