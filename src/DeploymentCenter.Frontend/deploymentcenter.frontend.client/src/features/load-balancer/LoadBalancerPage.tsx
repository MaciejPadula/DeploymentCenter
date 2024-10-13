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
import { selectedCluster } from "../../shared/services/configuration-service";

export function LoadBalancerPage() {
  const { loadBalancerName, namespace, clusterName } = useParams();
  const cluster = selectedCluster.value;
  const dataService = useLoadBalancerPageDataService(cluster);

  useEffect(() => {
    if (
      loadBalancerName === undefined ||
      namespace === undefined ||
      clusterName === undefined
    ) {
      return;
    }

    addRecentlyVisitedPage(
      clusterName,
      loadBalancerName,
      namespace,
      SvcIcon,
      getLoadBalancerUrl(clusterName, namespace, loadBalancerName)
    );
  });

  if (
    loadBalancerName === undefined ||
    clusterName === undefined ||
    cluster === undefined ||
    namespace === undefined
  ) {
    return <div>Error</div>;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await dataService.getLoadBalancerDetails(
      namespace,
      loadBalancerName ?? ""
    );
    const properties = new Map<string, string>();
    properties.set("Name", summary.loadBalancerName);
    properties.set("Cluster", `${clusterName}:${cluster.apiUrl}`);
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
      <ResourceSummary
        resourceSummaryKey={`loadbalancer-${namespace}-${loadBalancerName}`}
        resourceSummaryFactory={factory}
      />
      <IpAddresses
        cluster={cluster}
        namespace={namespace}
        loadBalancerName={loadBalancerName}
      />
      <LoadBalancerPorts
        cluster={cluster}
        namespace={namespace}
        loadBalancerName={loadBalancerName}
      />
    </div>
  );
}
