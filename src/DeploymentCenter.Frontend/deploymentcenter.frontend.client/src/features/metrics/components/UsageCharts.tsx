import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useMetricsDataService from "../services/metrics-service";
import { Cluster } from "../../../shared/models/cluster";
import { getNowFormatedTime } from "../../../shared/helpers/date-helpers";
import { lastElements } from "../../../shared/helpers/array-helpers";
import { XAxisData } from "../../../shared/components/charts/line-chart/x-axis-data";
import { ChartSerie } from "../../../shared/components/charts/line-chart/chart-serie";
import { LineChartBox } from "../../../shared/components/charts/line-chart/LineChartBox";
import { TimedDeploymentMetrics } from "../models/deployment-metrics";

const maxPointsOnChart = 10;

type Props = {
  cluster: Cluster;
  deploymentName: string;
  namespace: string;
};

export function UsageCharts(props: Props) {
  const metricsService = useMetricsDataService(props.cluster);
  const [metrics, setMetrics] = useState<TimedDeploymentMetrics[]>([]);
  const { mutateAsync: fetchMetrics } = useMutation({
    mutationFn: async () => await metricsService.getDeploymentMetrics(props.namespace, props.deploymentName),
  });

  async function loadMetrics() {
    const result = await fetchMetrics();
    setMetrics((old) => {
      const newMetrics = [
        ...old,
        {
          cpuUsage: result.cpuUsage * 100,
          memoryUsage: Math.round(result.memoryUsage / 1024 / 1024),
          timestampUtc: getNowFormatedTime(),
        },
      ];

      return lastElements(newMetrics, maxPointsOnChart);
    });
  }

  useEffect(() => {
    setMetrics([]);
  }, [props.deploymentName, props.namespace, props.cluster.name]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await loadMetrics();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <>
      <div className="w-full">
        <LineChartBox series={[cpuChart]} xAxis={xAxisData} />
      </div>
      <div className="w-full">
        <LineChartBox series={[memoryChart]} xAxis={xAxisData} />
      </div>
    </>
  );
}
