import { ReactElement } from "react";

export type ResourcesFactory = () => Promise<ResourceRowModel[]>;

export interface ResourceRowModel {
  name: string;
  icon: ReactElement;
  clickHandler: () => void;
}