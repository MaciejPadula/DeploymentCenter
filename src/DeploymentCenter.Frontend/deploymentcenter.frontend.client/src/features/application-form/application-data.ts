import { copyObject } from "../../shared/helpers/object-helper";
import { DeploymentData } from "./deployment-data";

export interface ApplicationData {
  name: string;
  deployment: DeploymentData;
}

const emptyApplicationData = {
  name: "",
  deployment: {
    namespace: "",
    name: "",
    applicationName: "",
    replicas: 0,
    containers: [],
  },
};

export function getEmptyApplicationData(): ApplicationData {
  return copyObject(emptyApplicationData);
}
