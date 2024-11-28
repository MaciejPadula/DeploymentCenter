import { CircularProgress, Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useMemo } from "react";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { Cluster } from "../../../shared/models/cluster";
import { useQuery } from "@tanstack/react-query";
import { groupPodsByHealth } from "../services/pod-services";
import { PodHealthStatus } from "../models/pod";
import { UsageCharts } from "./UsageCharts";

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
};

export function DeploymentStatistics(props: Props) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const { data: pods } = useQuery({
    queryKey: [`podsLoader-${props.deploymentName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getDeploymentPods(
        props.namespace,
        props.deploymentName
      ),
    refetchInterval: 2000,
  });

  const groupedPods = useMemo(() => {
    return groupPodsByHealth(pods ?? []);
  }, [pods]);

  const podsChart = useMemo(() => [
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
  ], [groupedPods]);

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-col" elevation={2}>
      <Typography variant="h5">{"Pods Statistics"}</Typography>
      <div className="w-full flex flex-col 2xl:flex-row items-center justify-center">
        <div className="w-full">
          {
            !pods && <div className="flex items-center justify-center w-full">
              <CircularProgress size={60} />
            </div>
          }
          {pods && <PieChart
            series={podsChart}
            height={300}
          />
          }
        </div>
        <UsageCharts cluster={props.cluster} deploymentName={props.deploymentName} namespace={props.namespace} />
      </div>
    </Paper>
  );
}
