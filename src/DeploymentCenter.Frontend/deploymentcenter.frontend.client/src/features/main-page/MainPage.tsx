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
import { configuration } from "../../shared/services/configuration-service";
import { NoClusterFound } from "./NoClusterFound";

export function MainPage() {
  const navigation = useAppRouting();
  const cluster = configuration.value.clusters.find(
    (c) => c.name === configuration.value.cluster
  );

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
      {!cluster && <NoClusterFound />}
      <ClusterStatistics />
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
