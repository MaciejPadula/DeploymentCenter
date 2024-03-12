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
import { useEffect } from "react";

export function LoadBalancersList() {
  const { configuration, setConfiguration } = useConfigurationContext();
  const navigate = useNavigate();
  const { namespace } = useParams();
  const dataService = useLoadBalancersDataService();

  useEffect(() => {
    if (namespace !== undefined && namespace !== configuration.namespace) {
      setConfiguration({
        ...configuration,
        namespace: namespace,
      });
    }
  }, [namespace, configuration, setConfiguration]);

  if (namespace === undefined) {
    return <div>Error</div>;
  }

  const factory: ResourcesFactory = async () => {
    const response = await dataService.getLoadBalancers(namespace);
    return response.map(
      (x) =>
        ({
          name: x.name,
          namespace,
          icon: SvcIcon,
          clickHandler: () => navigate(getLoadBalancerUrl(namespace, x.name)),
        } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList resourceText="Load Balancers" resourcesFactory={factory} />
  );
}
