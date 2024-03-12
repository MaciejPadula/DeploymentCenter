import { useParams } from "react-router-dom";
import {
  ResourceSummaryFactory,
  ResourceSummaryModel,
} from "../../shared/components/resource-page/resource-summary-model";
import useLoadBalancerPageDataService from "./load-balancer-page-data-service";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import { getLoadBalancerUrl } from "../../shared/services/routing-service";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { useEffect } from "react";
import { SvcIcon } from "../../assets/icons";
import { IpAddresses } from "./ip-addresses/IpAddresses";
import { LoadBalancerPorts } from "./ports/LoadBalancerPorts";
import { useConfigurationContext } from "../../shared/contexts/context-helpers";

export function LoadBalancerPage() {
  const { configuration, setConfiguration } = useConfigurationContext();
  const { loadBalancerName, namespace } = useParams();
  const dataService = useLoadBalancerPageDataService();

  useEffect(() => {
    if (loadBalancerName === undefined || namespace === undefined) {
      return;
    }

    addRecentlyVisitedPage(
      loadBalancerName,
      namespace,
      SvcIcon,
      getLoadBalancerUrl(namespace, loadBalancerName)
    );
  });

  useEffect(() => {
    if (namespace !== undefined && namespace !== configuration.namespace) {
      setConfiguration({
        ...configuration,
        namespace: namespace,
      });
    }
  }, [namespace, configuration, setConfiguration]);

  if (loadBalancerName === undefined || namespace === undefined) {
    return <div>Error</div>;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await dataService.getLoadBalancerDetails(
      namespace,
      loadBalancerName ?? ""
    );
    const properties = new Map<string, string>();
    properties.set("Name", summary.loadBalancerName);
    properties.set("Namespace", summary.namespace);
    properties.set("Application", summary.applicationName);

    return {
      resourceTitle: "Load Balancer",
      icon: SvcIcon,
      properties: properties,
    } as ResourceSummaryModel;
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2">
      <ResourceSummary resourceSummaryFactory={factory} />
      <IpAddresses namespace={namespace} loadBalancerName={loadBalancerName} />
      <LoadBalancerPorts
        namespace={namespace}
        loadBalancerName={loadBalancerName}
      />
    </div>
  );
}
