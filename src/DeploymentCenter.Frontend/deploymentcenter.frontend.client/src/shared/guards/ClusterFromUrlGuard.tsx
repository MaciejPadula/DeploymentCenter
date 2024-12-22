import { useParams } from "react-router-dom";
import { Cluster } from "../models/cluster";
import { configuration } from "../services/configuration-service";
import { ClusterGuard } from "./ClusterGuard";
import { ReactNode } from "react";

type Props = {
  children: (x: Cluster) => ReactNode;
  notSet?: ReactNode;
};

export function ClusterFromUrlGuard(props: Props) {
  const { clusterName } = useParams();
  const cluster = configuration.value.clusters.find(
    (c) => c.name === clusterName
  );

  return (
    <ClusterGuard
      cluster={cluster}
      children={props.children}
      notSet={props.notSet}
    />
  );
}
