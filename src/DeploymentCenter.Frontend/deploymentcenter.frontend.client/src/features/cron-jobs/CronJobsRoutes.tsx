import { ClusterFromUrlGuard } from "../../shared/guards/ClusterFromUrlGuard";
import { RouteDefinition } from "../../shared/models/route-definition";
import { CronJobPage } from "./CronJobPage";
import { CronJobsListPage } from "./CronJobsListPage";

export const cronJobsRoutes: RouteDefinition[] = [
  {
    route: "/:clusterName/:namespace/cron-jobs",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <CronJobsListPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/:namespace/cron-jobs/:cronJobName",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <CronJobPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
];
