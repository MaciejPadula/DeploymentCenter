import { FormGroup } from "../../../libs/forms/form-group";

export interface ServiceData extends FormGroup {
  applicationName: string;
  namespace: string;
  name: string;
  ports: ServicePort[];
  externalIps: string[];
}

export interface ServicePort {
  hostPort: number;
  targetPort: number;
}

export function getEmptyServiceData(): ServiceData {
  return {
    applicationName: "",
    namespace: "",
    name: "",
    ports: [{hostPort: 3306, targetPort: 3306}],
    externalIps: ['172.22.0.1'],
  };
}