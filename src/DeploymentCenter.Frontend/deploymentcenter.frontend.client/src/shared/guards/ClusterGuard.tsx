import { NotFound } from "../components/error/not-found/NotFound";
import { Cluster } from "../models/cluster";

type Props = {
  cluster: Cluster | undefined;
  children: (x: Cluster) => JSX.Element;
  notSet?: JSX.Element;
}

export function ClusterGuard(props: Props) {
  if (!props.cluster) {
    return props.notSet ?? <NotFound />;
  }

  return props.children(props.cluster);
}