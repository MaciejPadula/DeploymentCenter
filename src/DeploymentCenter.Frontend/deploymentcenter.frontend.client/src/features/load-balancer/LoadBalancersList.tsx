import { useParams } from "react-router-dom";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import useLoadBalancersDataService from "./services/load-balancers-data-service";
import { SvcIcon } from "../../assets/icons";
import { useAppRouting } from "../../shared/hooks/navigation";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { Cluster } from "../../shared/models/cluster";

type Props = {
  cluster: Cluster;
}

export function LoadBalancersList(props: Props) {
  const navigation = useAppRouting();
  const { namespace } = useParams();
  const dataService = useLoadBalancersDataService(props.cluster);

  if (namespace === undefined) {
    return <NotFound />;
  }

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getLoadBalancers(namespace);
    return response.map(
      (x) =>
      ({
        clusterName: props.cluster.name,
        name: x.name,
        namespace,
        icon: SvcIcon,
        clickHandler: () =>
          navigation.loadBalancerPage(props.cluster.name, namespace, x.name),
      } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList
      resourceKey={`LoadBalancersLoader-${props.cluster.name}-${namespace}`}
      resourceText="Load Balancers"
      resourcesFactory={factory}
      setupResource={{
        title: "Setup new load balancer",
        clickHandler: () => navigation.setupLoadBalancer(props.cluster.name),
      }}
    />
  );
}
