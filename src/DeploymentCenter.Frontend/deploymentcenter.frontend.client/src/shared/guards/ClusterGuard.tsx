import { NotFound } from "../components/error/not-found/NotFound";
import { Cluster } from "../models/cluster";

type Props = {
  cluster: Cluster | undefined;
  factory: (x: Cluster) => JSX.Element;
  children?: JSX.Element;
}

export function ClusterGuard(props: Props) {
  if (!props.cluster) {
    return props.children ?? <NotFound />;
  }

  return props.factory(props.cluster);
}