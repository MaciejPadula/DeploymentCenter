import { useParams } from "react-router-dom";
import {
  ResourceSummaryFactory,
  ResourceSummaryModel,
} from "../../shared/components/resource-page/resource-summary-model";
import useLoadBalancerPageDataService from "./load-balancer-page-data-service";
import { ResourceSummary } from "../../shared/components/resource-page/ResourceSummary";
import { getLoadBalancerUrl } from "../../shared/services/routing-service";
import { addRecentlyVisitedPage } from "../../shared/services/recently-visited-service";
import { useEffect, useState } from "react";
import { SvcIcon } from "../../assets/icons";
import { IpAddresses } from "./ip-addresses/IpAddresses";
import { LoadBalancerPorts } from "./load-balancer-ports/LoadBalancerPorts";
import { LoadBalancerToolbar } from "./toolbar/LoadBalancerToolbar";
import { NotFound } from "../../shared/components/error/not-found/NotFound";
import { Cluster } from "../../shared/models/cluster";

type Props = {
  cluster: Cluster;
}

export function LoadBalancerPage(props: Props) {
  const { loadBalancerName, namespace } = useParams();
  const dataService = useLoadBalancerPageDataService(props.cluster);
  const [areDetailsLoaded, setAreDetailsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (loadBalancerName === undefined || namespace === undefined) {
      return;
    }

    addRecentlyVisitedPage(
      props.cluster.name,
      loadBalancerName,
      namespace,
      SvcIcon,
      getLoadBalancerUrl(props.cluster.name, namespace, loadBalancerName)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadBalancerName === undefined || namespace === undefined) {
    return <NotFound />;
  }

  const factory: ResourceSummaryFactory = async () => {
    const summary = await dataService?.getLoadBalancerDetails(
      namespace,
      loadBalancerName ?? ""
    );
    const properties = new Map<string, string>();
    properties.set("Name", summary.loadBalancerName);
    properties.set("Cluster", `${props.cluster.name}:${props.cluster.apiUrl}`);
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
      {areDetailsLoaded && <LoadBalancerToolbar
        cluster={props.cluster}
        namespace={namespace}
        loadBalancerName={loadBalancerName}
      />}
      <ResourceSummary
        resourceSummaryKey={`loadbalancer-${namespace}-${loadBalancerName}`}
        resourceSummaryFactory={factory}
        onPageLoaded={() => setAreDetailsLoaded(true)}
        onPageError={() => setAreDetailsLoaded(false)}
      />
      {areDetailsLoaded && <>
        <IpAddresses
          cluster={props.cluster}
          namespace={namespace}
          loadBalancerName={loadBalancerName}
        />
        <LoadBalancerPorts
          cluster={props.cluster}
          namespace={namespace}
          loadBalancerName={loadBalancerName}
        />
      </>}
    </div>
  );
}
