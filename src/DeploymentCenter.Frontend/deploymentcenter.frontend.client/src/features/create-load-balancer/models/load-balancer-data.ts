import { FormGroup } from "../../../libs/forms/form-group";

export interface LoadBalancerData extends FormGroup {
  applicationName: string;
  namespace: string;
  name: string;
  ports: LoadBalancerPort[];
  externalIps: string[];
}

export interface LoadBalancerPort {
  hostPort: number;
  targetPort: number;
}

export function getEmptyLoadBalancerData(): LoadBalancerData {
  return {
    applicationName: "",
    namespace: "",
    name: "",
    ports: [],
    externalIps: [],
  };
}

export function getDefaultPort(): LoadBalancerPort {
  return { hostPort: 0, targetPort: 0 };
}

export function getDefaultIpAddress(): string {
  return "0.0.0.0";
}
