import { Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { LineChartBox } from "../../../shared/components/charts/line-chart/LineChartBox";
import { useState } from "react";
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

  async function fetchMetrics() {
    const metr = await dataService.getDeploymentMetrics(
      props.namespace,
      props.deploymentName
    );
    setMetrics((old) =>
      lastElements(
        [
          ...old,
          {
            cpuUsage: metr.cpuUsage,
            memoryUsage: metr.memoryUsage,
            timestampUtc: getNowFormatedTime(),
          },
        ],
        maxPointsOnChart
      )
    );
  }

  const { error } = useQuery({
    queryKey: [
      "deploymentStatisticsLoader",
      props.deploymentName,
      props.namespace,
      props.cluster.apiUrl,
    ],
    queryFn: async () => await fetchMetrics(),
    refetchInterval: 1000,
  });

  const metricsAvailable =
    error === undefined ||
    !(error instanceof AxiosError && error?.response?.status === 501);

  const xAxisData: XAxisData<string> = {
    values: metrics.map((x) => x.timestampUtc),
  };

  const cpuChart: ChartSerie = {
    title: "Cpu Usage [%]",
    data: metrics.map((x) => x.cpuUsage),
  };

  const memoryChart: ChartSerie = {
    title: "Memory Usage [MB]",
    data: metrics.map((x) => x.memoryUsage),
  };

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
                    value: props.alivePods,
                    label: "Active Pods",
                    color: "green",
                  },
                  {
                    id: 1,
                    value: props.deadPods,
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
