export type ResourcesFactory = () => Promise<ResourceRowModel[]>;

export interface ResourceRowModel {
  clusterName: string;
  name: string;
  namespace: string;
  icon: string;
  clickHandler: () => void;
}