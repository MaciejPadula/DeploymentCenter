import { useNavigate, useParams } from "react-router-dom";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import useLoadBalancersDataService from "./load-balancers-data-service";
import { getLoadBalancerUrl } from "../../shared/services/routing-service";
import { SvcIcon } from "../../assets/icons";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";

export function LoadBalancersList() {
  const { configuration } = useConfigurationContext();
  const navigate = useNavigate();
  const { namespace, clusterName } = useParams();
  const cluster = configuration.clusters.find((x) => x.name === clusterName);
  const dataService = useLoadBalancersDataService(cluster?.apiUrl);

  if (namespace === undefined || clusterName === undefined || cluster === undefined) {
    return <div>Error</div>;
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
          clickHandler: () => navigate(getLoadBalancerUrl(clusterName, namespace, x.name)),
        } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList resourceKey="LoadBalancersLoader" resourceText="Load Balancers" resourcesFactory={factory} />
  );
}
