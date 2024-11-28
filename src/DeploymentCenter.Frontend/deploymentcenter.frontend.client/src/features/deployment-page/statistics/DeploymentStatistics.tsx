import { CircularProgress, Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { LineChartBox } from "../../../shared/components/charts/line-chart/LineChartBox";
import { useEffect, useMemo, useState } from "react";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { XAxisData } from "../../../shared/components/charts/line-chart/x-axis-data";
import { ChartSerie } from "../../../shared/components/charts/line-chart/chart-serie";
import { getNowFormatedTime } from "../../../shared/helpers/date-helpers";
import { lastElements } from "../../../shared/helpers/array-helpers";
import { DeploymentMetrics } from "../models/deployment-metrics";
import StatisticsNotAvailable from "./StatisticsNotAvailable";
import { AxiosError } from "axios";
import { Cluster } from "../../../shared/models/cluster";
import { useQuery } from "@tanstack/react-query";
import { createSummary } from "../details-factory";
import useMetricsDataService from "../../../shared/services/metrics-service";
import { isPodFailed, isPodPending, isPodRunning } from "../pod-helper";

const maxPointsOnChart = 10;

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
};

export function DeploymentStatistics(props: Props) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const metricsService = useMetricsDataService(props.cluster);
  const [metrics, setMetrics] = useState<DeploymentMetrics[]>([]);
  const { data: pods } = useQuery({
    queryKey: [`podsLoader-${props.deploymentName}-${props.namespace}`],
    queryFn: async () =>
      await dataService.getDeploymentPods(
        props.namespace,
        props.deploymentName
      ),
    refetchInterval: 2000,
  });
  const { data: deploymentDetails } = useQuery({
    queryKey: [`deployment-${props.namespace}-${props.deploymentName}`],
    queryFn: async () => {
      const summary = await dataService.getDeploymentDetails(
        props.namespace,
        props.deploymentName
      );
      return !summary ? null : createSummary(summary, props.cluster);
    },
  });
  const { error, data: stats } = useQuery({
    queryKey: [
      "deploymentStatisticsLoader",
      props.deploymentName,
      props.namespace,
      props.cluster.apiUrl,
    ],
    queryFn: async () =>
      await metricsService.getDeploymentMetrics(
        props.namespace,
        props.deploymentName
      ),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (stats === undefined) {
      return;
    }

    setMetrics((old) => {
      const newMetrics = [
        ...old,
        {
          cpuUsage: stats.cpuUsage * 100,
          memoryUsage: Math.round(stats.memoryUsage / 1024 / 1024),
          timestampUtc: getNowFormatedTime(),
        },
      ];
      return lastElements(newMetrics, maxPointsOnChart);
    });
  }, [stats]);

  const deploymentReplicas = useMemo(() => {
    return Number.parseInt(deploymentDetails?.properties.get("Replicas") ?? '0');
  }, [deploymentDetails])
  const pendingPods = useMemo(
    () => pods?.filter((x) => isPodPending(x)).length ?? 0,
    [pods]
  );
  const alivePods = useMemo(
    () => pods?.filter((x) => isPodRunning(x)).length ?? 0,
    [pods]
  );
  const deadPods = useMemo(
    () => pods?.filter((x) => isPodFailed(x)).length ?? deploymentReplicas - pendingPods - alivePods,
    [pods, deploymentReplicas, pendingPods, alivePods]
  );

  const metricsAvailable = useMemo(() => error === undefined ||
  !(error instanceof AxiosError && error?.response?.status === 501), [error]);

  const xAxisData: XAxisData<string> = useMemo(() => {
    return {
      values: metrics.map((x) => x.timestampUtc),
    };
  }, [metrics]);

  const cpuChart: ChartSerie = useMemo(() => {
    return {
      title: "Cpu Usage [%]",
      data: metrics.map((x) => x.cpuUsage),
    };
  }, [metrics]);

  const memoryChart: ChartSerie = useMemo(() => {
    return {
      title: "Memory Usage [MB]",
      data: metrics.map((x) => x.memoryUsage),
    };
  }, [metrics]);

  const podsChart = useMemo(() => [
    {
      data: [
        {
          id: 0,
          value: pendingPods,
          label: "Pending Pods",
          color: "orange",
        },
        {
          id: 1,
          value: alivePods,
          label: "Active Pods",
          color: "green",
        },
        {
          id: 2,
          value: deadPods,
          label: "Dead Pods",
          color: "red",
        },
      ],
    },
  ], [alivePods, deadPods, pendingPods]);

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
        <div className="w-full">
          {metricsAvailable ? (
            <LineChartBox series={[cpuChart]} xAxis={xAxisData} />
          ) : (
            <StatisticsNotAvailable />
          )}
        </div>
        <div className="w-full">
          {metricsAvailable ? (
            <LineChartBox series={[memoryChart]} xAxis={xAxisData} />
          ) : (
            <StatisticsNotAvailable />
          )}
        </div>
      </div>
    </Paper>
  );
}
