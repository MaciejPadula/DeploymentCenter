import { getDeployments } from "./deployments-data-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { useNavigate, useParams } from "react-router-dom";
import { getDeploymentUrl } from "../../shared/services/routing-service";
import { DeployIcon } from "../../assets/icons";
import { useNamespaceContext } from "../../shared/contexts/namespace-context-helpers";
import { useEffect } from "react";

export function DeploymentsList() {
  const { namespace: currentNamespace, setNamespace: setCurrentNamespace } =
    useNamespaceContext();
  const navigate = useNavigate();
  const { namespace } = useParams();

  useEffect(() => {
    if (namespace !== undefined && namespace !== currentNamespace) {
      setCurrentNamespace(namespace);
    }
  }, [namespace, currentNamespace, setCurrentNamespace]);

  if (namespace === undefined) {
    return <div>Error</div>;
  }

  if (namespace !== currentNamespace) {
    setCurrentNamespace(namespace);
  }

  const factory: ResourcesFactory = async () => {
    const response = await getDeployments(namespace);
    return response.map((x) => {
      return {
        name: x.name,
        namespace: namespace,
        icon: DeployIcon,
        clickHandler: () => navigate(getDeploymentUrl(namespace, x.name)),
      } as ResourceRowModel;
    });
  };

  return (
    <ResourcesList resourceText="Deployments" resourcesFactory={factory} />
  );
}
