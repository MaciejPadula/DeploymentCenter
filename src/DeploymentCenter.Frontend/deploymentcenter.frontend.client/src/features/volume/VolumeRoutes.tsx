import { ClusterFromUrlGuard } from "../../shared/guards/ClusterFromUrlGuard";
import { RouteDefinition } from "../../shared/models/route-definition";
import { CreateVolumePage } from "./CreateVolumePage";
import { VolumesListPage } from "./VolumesListPage";

export const volumeRoutes: RouteDefinition[] = [
  {
    route: "/:clusterName/volumes",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <VolumesListPage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  },
  {
    route: "/:clusterName/volumes/setup",
    component: (
      <ClusterFromUrlGuard>
        {(c) => <CreateVolumePage cluster={c} />}
      </ClusterFromUrlGuard>
    ),
  }
];
