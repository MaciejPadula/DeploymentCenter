import { useNavigate, useParams } from "react-router-dom";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { getLoadBalancers } from "./load-balancers-data-service";
import { getLoadBalancerUrl } from "../../shared/services/routing-service";
import { SvcIcon } from "../../assets/icons";
import { useNamespaceContext } from "../../shared/contexts/namespace-context-helpers";
import { useEffect } from "react";

export function LoadBalancersList() {
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

  const factory: ResourcesFactory = async () => {
    const response = await getLoadBalancers(namespace);
    return response.map((x) => {
      return {
        name: x.name,
        namespace: namespace,
        icon: SvcIcon,
        clickHandler: () => navigate(getLoadBalancerUrl(namespace, x.name)),
      } as ResourceRowModel;
    });
  };

  return (
    <ResourcesList resourceText="Load Balancers" resourcesFactory={factory} />
  );
}
