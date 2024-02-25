export interface Container {
  name: string;
  image: string;
  environmentVariables: Map<string, string>;
}