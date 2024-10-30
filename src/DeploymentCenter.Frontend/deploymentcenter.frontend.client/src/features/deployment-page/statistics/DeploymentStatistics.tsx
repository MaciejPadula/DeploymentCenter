import { Paper, Typography } from "@mui/material";
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
import { Pod } from "../models/pod";

const maxPointsOnChart = 10;

export function DeploymentStatistics(props: {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
  alivePods: number;
  deadPods: number;
}) {
  const dataService = useDeploymentPageDataService(props.cluster);
  const [metrics, setMetrics] = useState<DeploymentMetrics[]>([]);
  const { data: pods } = useQuery<Pod[]>({ queryKey: ["podsLoader"] });
  const { error, data: stats } = useQuery({
    queryKey: [
      "deploymentStatisticsLoader",
      props.deploymentName,
      props.namespace,
      props.cluster.apiUrl,
    ],
    queryFn: async () =>
      await dataService.getDeploymentMetrics(
        props.namespace,
        props.deploymentName
      ),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (stats === undefined) {
      return;
    }

    setMetrics((old) =>
      lastElements(
        [
          ...old,
          {
            cpuUsage: stats.cpuUsage * 100,
            memoryUsage: Number.parseInt(
              (stats.memoryUsage / 1024 / 1024).toString()
            ),
            timestampUtc: getNowFormatedTime(),
          },
        ],
        maxPointsOnChart
      )
    );
  }, [stats]);

  const pendingPods = useMemo(
    () => pods?.filter((x) => x.status === "Pending")?.length ?? 0,
    [pods]
  );
  const alivePods = useMemo(
    () => pods?.filter((x) => x.status === "Running")?.length ?? 0,
    [pods]
  );
  const deadPods = useMemo(
    () =>
      pods?.filter((x) => x.status !== "Running" && x.status !== "Pending")
        ?.length ?? 0,
    [pods]
  );

  const metricsAvailable =
    error === undefined ||
    !(error instanceof AxiosError && error?.response?.status === 501);

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

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-col" elevation={2}>
      <Typography variant="h5">{"Pods Statistics"}</Typography>
      <div className="w-full flex flex-col 2xl:flex-row items-center justify-center">
        <div className="w-full">
          <PieChart
            series={[
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
            ]}
            height={200}
          />
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
