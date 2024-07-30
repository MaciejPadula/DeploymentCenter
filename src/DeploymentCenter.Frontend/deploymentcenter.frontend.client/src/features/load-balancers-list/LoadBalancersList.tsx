import { useParams } from "react-router-dom";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import useLoadBalancersDataService from "./load-balancers-data-service";
import { SvcIcon } from "../../assets/icons";
import { selectedClusterApiUrl } from "../../shared/services/configuration-service";
import { useAppRouting } from "../../shared/hooks/navigation";

export function LoadBalancersList() {
  const navigation = useAppRouting();
  const { namespace, clusterName } = useParams();
  const clusterApiUrl = selectedClusterApiUrl.value;
  const dataService = useLoadBalancersDataService(clusterApiUrl);

  if (namespace === undefined || clusterName === undefined || clusterApiUrl === undefined) {
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
    />
  );
}
