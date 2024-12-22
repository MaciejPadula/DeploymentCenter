import { ReactNode } from "react";
import { NotFound } from "../components/error/not-found/NotFound";
import { Cluster } from "../models/cluster";

type Props = {
  cluster: Cluster | undefined;
  children: (x: Cluster) => ReactNode;
  notSet?: ReactNode;
}

export function ClusterGuard(props: Props) {
  if (!props.cluster) {
    return props.notSet ?? <NotFound />;
  }

  return props.children(props.cluster);
}