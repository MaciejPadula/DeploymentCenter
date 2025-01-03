import { FormGroup } from "../../../../libs/forms/form-group";
import { Container } from "../../deployment-page/models/container";

export interface DeploymentData extends FormGroup {
  namespace: string;
  name: string;
  applicationName: string;
  replicas: number | undefined;
  containers: Container[];
}

export function getEmptyDeploymentData(): DeploymentData {
  return {
    namespace: "",
    name: "",
    applicationName: "",
    replicas: undefined,
    containers: [],
  };
}
