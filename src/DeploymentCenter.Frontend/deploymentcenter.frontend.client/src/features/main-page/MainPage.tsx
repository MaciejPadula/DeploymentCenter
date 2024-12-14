import {
  ResourceRowModel,
  ResourcesFactory,
} from "../../shared/components/resources-list/resource-row-model";
import { getRecentlyVisitedPages } from "../../shared/services/recently-visited-service";
import { ResourcesList } from "../../shared/components/resources-list/ResourcesList";
import { ResourceTypesGrid } from "./resource-types-grid/ResourceTypesGrid";
import { Typography } from "@mui/material";
import { useAppRouting } from "../../shared/hooks/navigation";
import { ClusterStatistics } from "../../shared/components/cluster-statistics/ClusterStatistics";
import { NoClusterFound } from "./NoClusterFound";
import { ClusterFromConfigGuard } from "../../shared/guards/ClusterFromConfigGuard";
import { MetricsAvailableGuard } from "../../shared/guards/MetricsAvailableGuard";

export function MainPage() {
  const navigation = useAppRouting();

  const factory: ResourcesFactory = async () => {
    const response = getRecentlyVisitedPages();
    return response.map(
      (x) =>
        ({
          clusterName: x.clusterName,
          name: x.title,
          namespace: x.namespace,
          icon: x.icon,
          clickHandler: () => navigation.navigateToUrl(x.url),
        } as ResourceRowModel)
    );
  };

  return (
    <div className="w-full flex flex-col">
      <ClusterFromConfigGuard
        factory={(c) => (
          <MetricsAvailableGuard cluster={c}>
            <ClusterStatistics cluster={c} />
          </MetricsAvailableGuard>
        )}
      >
        <NoClusterFound />
      </ClusterFromConfigGuard>
      <ResourcesList
        resourceKey="RecentlyVisistedLoader"
        resourceText="Recently Visited Resources"
        resourcesFactory={factory}
        showIfEmpty={false}
      />
      <div className="flex flex-col p-4">
        <Typography variant="h5">All Resources</Typography>
        <ResourceTypesGrid />
      </div>
    </div>
  );
}
