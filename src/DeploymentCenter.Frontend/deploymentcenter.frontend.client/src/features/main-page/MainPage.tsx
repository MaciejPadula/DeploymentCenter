import { ResourceTypesGrid } from "./resource-types-grid/ResourceTypesGrid";
import { Typography } from "@mui/material";
import { ClusterStatistics } from "../metrics/components/ClusterStatistics";
import { NoClusterFound } from "./NoClusterFound";
import { ClusterFromConfigGuard } from "../../shared/guards/ClusterFromConfigGuard";
import { MetricsAvailableGuard } from "../metrics/guards/MetricsAvailableGuard";

export function MainPage() {
  return (
    <div className="w-full flex flex-col">
      <ClusterFromConfigGuard notSet={<NoClusterFound />}>
        {(c) => (
          <MetricsAvailableGuard cluster={c}>
            <ClusterStatistics cluster={c} />
          </MetricsAvailableGuard>
        )}
      </ClusterFromConfigGuard>
      <ClusterFromConfigGuard notSet={<></>}>
        {() => (
          <div className="flex flex-col p-4">
            <Typography variant="h5">All Resources</Typography>
            <ResourceTypesGrid />
          </div>
        )}
      </ClusterFromConfigGuard>
    </div>
  );
}
