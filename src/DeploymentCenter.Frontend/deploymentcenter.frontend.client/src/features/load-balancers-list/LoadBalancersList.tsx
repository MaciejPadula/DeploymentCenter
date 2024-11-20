import { useParams } from "react-router-dom";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import useLoadBalancersDataService from "./load-balancers-data-service";
import { SvcIcon } from "../../assets/icons";
import { useAppRouting } from "../../shared/hooks/navigation";
import { configuration } from "../../shared/services/configuration-service";
import { NotFound } from "../../shared/components/error/not-found/NotFound";

export function LoadBalancersList() {
  const navigation = useAppRouting();
  const { namespace, clusterName } = useParams();
  const cluster = configuration.value.clusters.find(
    (c) => c.name === clusterName
  );
  const dataService = useLoadBalancersDataService(cluster);

  if (
    !dataService ||
    namespace === undefined ||
    clusterName === undefined ||
    cluster === undefined
  ) {
    return <NotFound />;
  }

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getLoadBalancers(namespace);
    return response.map(
      (x) =>
        ({
          clusterName: clusterName,
          name: x.name,
          namespace,
          icon: SvcIcon,
          clickHandler: () =>
            navigation.loadBalancerPage(clusterName, namespace, x.name),
        } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList
      resourceKey="LoadBalancersLoader"
      resourceText="Load Balancers"
      resourcesFactory={factory}
      setupResource={{
        title: "Setup new load balancer",
        clickHandler: () => navigation.setupService(),
      }}
    />
  );
}
