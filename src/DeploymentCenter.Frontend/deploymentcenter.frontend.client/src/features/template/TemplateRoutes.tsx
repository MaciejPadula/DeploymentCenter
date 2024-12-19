import { ClusterFromUrlGuard } from "../../shared/guards/ClusterFromUrlGuard";
import { RouteDefinition } from "../../shared/models/route-definition"
import { ApplyTemplatePage } from "./ApplyTemplatePage";
import { TemplatesListPage } from "./TemplatesListPage";

export const templateRoutes: RouteDefinition[] = [
  {
    route: "/:clusterName/templates",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <TemplatesListPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/templates/:templateName/apply",
    component: (
      <ClusterFromUrlGuard>
        {c=> <ApplyTemplatePage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/templates/:templateName",
    component: (
      <ClusterFromUrlGuard>
        {c=> <ApplyTemplatePage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  }
];
