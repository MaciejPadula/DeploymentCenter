import { Cluster } from "../models/cluster";
import { selectedCluster } from "../services/configuration-service";
import { ClusterGuard } from "./ClusterGuard";

type Props = {
  children: (x: Cluster) => JSX.Element;
  notSet?: JSX.Element;
};

export function ClusterFromConfigGuard(props: Props) {
  const cluster = selectedCluster.value;
  return (
    <ClusterGuard
      cluster={cluster}
      children={props.children}
      notSet={props.notSet}
    />
  );
}
