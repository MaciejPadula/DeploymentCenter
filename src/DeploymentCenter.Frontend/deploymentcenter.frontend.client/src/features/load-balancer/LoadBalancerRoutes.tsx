import { ClusterFromUrlGuard } from "../../shared/guards/ClusterFromUrlGuard";
import { CreateLoadBalancerPage } from "./CreateLoadBalancerPage";
import { LoadBalancersList } from "./LoadBalancersList";
import { LoadBalancerPage } from "./LoadBalancerPage";
import { RouteDefinition } from "../../shared/models/route-definition";

export const loadBalancerRoutes: RouteDefinition[] = [
  {
    route: "/:clusterName/setup-load-balancer",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <CreateLoadBalancerPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/:namespace/load-balancers",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <LoadBalancersList cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/:namespace/load-balancers/:loadBalancerName",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <LoadBalancerPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  }
];