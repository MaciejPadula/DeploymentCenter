import { ReactElement } from "react";

export type ResourcesFactory = () => Promise<ResourceRowModel[]>;

export interface ResourceRowModel {
  clusterName?: string;
  name: string;
  namespace?: string;
  icon: string;
  clickHandler?: () => void;
  action?: ReactElement;
  secondaryText?: ReactElement;
  additionalElement?: ReactElement;
}