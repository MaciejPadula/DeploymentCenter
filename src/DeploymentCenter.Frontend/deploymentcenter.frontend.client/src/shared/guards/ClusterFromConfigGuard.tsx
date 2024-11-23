import { Cluster } from "../models/cluster";
import { selectedCluster } from "../services/configuration-service";
import { ClusterGuard } from "./ClusterGuard";

type Props = {
  factory: (x: Cluster) => JSX.Element;
  children?: JSX.Element;
}

export function ClusterFromConfigGuard(props: Props) {
  const cluster = selectedCluster.value;
  return <ClusterGuard cluster={cluster} factory={props.factory} children={props.children} />;
}