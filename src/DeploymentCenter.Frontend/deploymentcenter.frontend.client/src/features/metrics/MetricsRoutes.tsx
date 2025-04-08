import { ClusterFromUrlGuard } from "../../shared/guards/ClusterFromUrlGuard";
import { MetricsPage } from "./MetricsPage";
import { RouteDefinition } from "../../shared/models/route-definition";

export const metricsRoutes: RouteDefinition[] = [
  {
    route: "/:clusterName/:namespace/metrics",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <MetricsPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
];
