import useDeploymentsDataService from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useNavigate, useParams } from "react-router-dom";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { useEffect } from "react";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";

export function DeploymentsList() {
  const { configuration, setConfiguration } = useConfigurationContext();
  const navigate = useNavigate();
  const { namespace } = useParams();
  const dataService = useDeploymentsDataService();

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
    const response = await dataService.getDeployments(namespace);
    return response.map(
      (x) =>
        ({
          name: x.name,
          namespace: namespace,
          icon: DeployIcon,
          clickHandler: () => navigate(getDeploymentUrl(namespace, x.name)),
        } as ResourceRowModel)
    );
  };

  return (
    <ResourcesList resourceText="Deployments" resourcesFactory={factory} />
  );
}
