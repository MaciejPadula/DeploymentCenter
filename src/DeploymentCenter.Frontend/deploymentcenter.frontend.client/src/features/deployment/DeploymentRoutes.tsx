import { ClusterFromUrlGuard } from "../../shared/guards/ClusterFromUrlGuard";
import { CreateDeploymentPage } from "./CreateDeploymentPage";
import { DeploymentsList } from "./DeploymentsListPage";
import { DeploymentPage } from "./DeploymentPage";
import { RouteDefinition } from "../../shared/models/route-definition";

export const deploymentRoutes: RouteDefinition[] = [
  {
    route: "/:clusterName/setup-deployment",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <CreateDeploymentPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/:namespace/deployments",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <DeploymentsList cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/:namespace/deployments/:deploymentName",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <DeploymentPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
];
