export type ResourcesFactory = () => Promise<ResourceRowModel[]>;

export interface ResourceRowModel {
  name: string;
  icon: string;
  clickHandler: () => void;
}