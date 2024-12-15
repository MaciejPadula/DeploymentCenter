import { copyObject } from "../../../../shared/helpers/object-helper";
import { ContainerVolume } from "./container-volume";
import { EnvironmentVariable } from "./environment-variable";
import { Port } from "./port";

export interface Container {
  name: string;
  image: string;
  environmentVariables: EnvironmentVariable[];
  volumes: ContainerVolume[];
  ports: Port[];
}

const emptyContainer: Container = {
  name: "",
  image: "",
  environmentVariables: [],
  volumes: [],
  ports: [],
};

export function getDefaultContainer(): Container {
  return copyObject(emptyContainer);
}