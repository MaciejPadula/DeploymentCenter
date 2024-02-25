export type ResourcesFactory = () => Promise<ResourceRowModel[]>;

export interface ResourceRowModel {
  name: string;
  namespace: string;
  icon: string;
  clickHandler: () => void;
}