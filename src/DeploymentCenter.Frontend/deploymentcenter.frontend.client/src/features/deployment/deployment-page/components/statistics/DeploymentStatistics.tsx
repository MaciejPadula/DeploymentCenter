import { CircularProgress, Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import { UsageCharts } from "../../../../metrics/components/UsageCharts";
import { groupPodsByHealth } from "../../../../pods/services/pod-services";
import { PodHealthStatus } from "../../../../pods/models/pod";
import { Cluster } from "../../../../../shared/models/cluster";
import { MetricsAvailableGuard } from "../../../../metrics/guards/MetricsAvailableGuard";
import usePodsDataService from "../../../../pods/services/pods-data-service";

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
};

export function DeploymentStatistics(props: Props) {
  const dataService = usePodsDataService(props.cluster);
  const { data: pods } = useQuery({
    queryKey: [`podsLoader-${props.deploymentName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getPods(
        props.namespace,
        props.deploymentName
      ),
    refetchInterval: 2000,
  });

  const groupedPods = groupPodsByHealth(pods ?? []);

  const podsChart = [
    {
      data: [
        {
          id: 0,
          value: groupedPods[PodHealthStatus.Waiting]?.length ?? 0,
          label: "Waiting",
          color: "orange",
        },
        {
          id: 1,
          value: groupedPods[PodHealthStatus.Running]?.length ?? 0,
          label: "Running",
          color: "green",
        },
        {
          id: 2,
          value: groupedPods[PodHealthStatus.Terminated]?.length ?? 0,
          label: "Terminated",
          color: "red",
        },
        {
          id: 3,
          value: groupedPods[PodHealthStatus.Unknown]?.length ?? 0,
          label: "Unknown Status",
          color: "gray",
        },
      ],
    },
  ]

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-col" elevation={2}>
      <Typography variant="h5">{"Pods Statistics"}</Typography>
      <div className="w-full flex flex-col 2xl:flex-row items-center justify-center">
        <div className="w-full">
          {!pods && (
            <div className="flex items-center justify-center w-full">
              <CircularProgress size={60} />
            </div>
          )}
          {pods && <PieChart series={podsChart} height={300} />}
        </div>
        <MetricsAvailableGuard cluster={props.cluster}>
          <UsageCharts
            cluster={props.cluster}
            deploymentName={props.deploymentName}
            namespace={props.namespace}
          />
        </MetricsAvailableGuard>
      </div>
    </Paper>
  );
}
