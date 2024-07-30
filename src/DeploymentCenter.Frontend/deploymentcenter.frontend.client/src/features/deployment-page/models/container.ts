import { copyObject } from "../../../shared/helpers/object-helper";
import { EnvironmentVariable } from "./environment-variable";
import { Port } from "./port";

export interface Container {
  name: string;
  image: string;
  environmentVariables: EnvironmentVariable[];
  ports: Port[];
}

const emptyContainer: Container = {
  name: "",
  image: "",
  environmentVariables: [],
  ports: [],
};

export function getDefaultContainer(): Container {
  return copyObject(emptyContainer);
}