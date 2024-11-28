import { useEffect, useMemo, useState } from "react";
import useMetricsDataService from "../../../shared/services/metrics-service";
import { DeploymentMetrics } from "../models/deployment-metrics";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LineChartBox } from "../../../shared/components/charts/line-chart/LineChartBox";
import StatisticsNotAvailable from "../../../shared/components/error/StatisticsNotAvailable";
import { ChartSerie } from "../../../shared/components/charts/line-chart/chart-serie";
import { getNowFormatedTime } from "../../../shared/helpers/date-helpers";
import { lastElements } from "../../../shared/helpers/array-helpers";
import { XAxisData } from "../../../shared/components/charts/line-chart/x-axis-data";
import { Cluster } from "../../../shared/models/cluster";

const maxPointsOnChart = 10;

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
};

export function UsageCharts(props: Props) {
  const metricsService = useMetricsDataService(props.cluster);
  const [metrics, setMetrics] = useState<DeploymentMetrics[]>([]);

  function areMetricsAvailable(error: unknown) {
    return error === undefined || error instanceof AxiosError && error?.response?.status !== 501;
  }

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
    retry: error => areMetricsAvailable(error),
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

  const metricsAvailable = useMemo(() => areMetricsAvailable(error), [error]);

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
    <>
      {
        metricsAvailable ? <>
          <div className="w-full">
            <LineChartBox series={[cpuChart]} xAxis={xAxisData} />
          </div>
          <div className="w-full">
            <LineChartBox series={[memoryChart]} xAxis={xAxisData} />
          </div>
        </> : (<StatisticsNotAvailable />)
      }
    </>
  );
}