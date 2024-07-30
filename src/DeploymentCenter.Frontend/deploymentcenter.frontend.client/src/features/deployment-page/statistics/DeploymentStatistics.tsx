import { Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { LineChartBox } from "../../../shared/components/charts/line-chart/LineChartBox";
import { useEffect, useState } from "react";
import useDeploymentPageDataService from "../deployment-page-data-service";
import { XAxisData } from "../../../shared/components/charts/line-chart/x-axis-data";
import { ChartSerie } from "../../../shared/components/charts/line-chart/chart-serie";
import { getNowFormatedTime } from "../../../shared/helpers/date-helpers";
import { lastElements } from "../../../shared/helpers/array-helpers";
import { DeploymentMetrics } from "../models/deployment-metrics";

const maxPointsOnChart = 10;

export function DeploymentStatistics(props: {
  clusterUrl: string;
  deploymentName: string;
  namespace: string;
  alivePods: number;
  deadPods: number;
}) {
  const dataService = useDeploymentPageDataService(props.clusterUrl);
  const [metrics, setMetrics] = useState<DeploymentMetrics[]>([]);

  async function fetchDeploymentMetrics() {
    const metrics = await dataService.getDeploymentMetrics(
      props.namespace,
      props.deploymentName
    );

    setMetrics((old) =>
      lastElements(
        [
          ...old,
          {
            cpuUsage: metrics.cpuUsage,
            memoryUsage: metrics.memoryUsage,
            timestampUtc: getNowFormatedTime(),
          },
        ],
        maxPointsOnChart
      )
    );
  }

  useEffect(() => {
    const interval = setInterval(fetchDeploymentMetrics, 5000);
    return () => clearInterval(interval);
  });

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
          <LineChartBox series={[cpuChart]} xAxis={xAxisData} />
        </div>
        <div className="w-full">
          <LineChartBox series={[memoryChart]} xAxis={xAxisData} />
        </div>
      </div>
    </Paper>
  );
}
