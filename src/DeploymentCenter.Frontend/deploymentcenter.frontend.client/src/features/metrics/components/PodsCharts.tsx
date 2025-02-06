import { useEffect, useState } from "react";
import { Cluster } from "../../../shared/models/cluster";
import useMetricsDataService from "../services/metrics-service";
import { useMutation } from "@tanstack/react-query";
import { getNowFormatedTime } from "../../../shared/helpers/date-helpers";
import { groupBy, lastElements } from "../../../shared/helpers/array-helpers";
import { XAxisData } from "../../../shared/components/charts/line-chart/x-axis-data";
import { LineChartBox } from "../../../shared/components/charts/line-chart/LineChartBox";
import { ChartSerie } from "../../../shared/components/charts/line-chart/chart-serie";
import { PodMetrics } from "../models/pod-metrics";

type Props = {
  cluster: Cluster;
  namespace: string;
  prefix?: string;
};

const maxPointsOnChart = 10;

export function PodsCharts(props: Props) {
  const metricsService = useMetricsDataService(props.cluster);
  const [metrics, setMetrics] = useState<Map<string, PodMetrics[]>>(new Map());
  const { mutateAsync: fetchMetrics } = useMutation({
    mutationFn: async () =>
      await metricsService.getPodsMetrics(props.namespace, props.prefix),
  });

  async function loadMetrics() {
    const result = await fetchMetrics();
    setMetrics((old) => {
      const now = getNowFormatedTime();

      const mapped = Object.keys(result).map((key) => {
        return {
          cpuUsage: result[key].cpuUsage,
          memoryUsage: result[key].memoryUsage / 1024 / 1024,
          podName: key,
        };
      });
      old.set(now, mapped);

      const resultMap = new Map<string, PodMetrics[]>();

      for (const key of lastElements(
        Array.from(old.keys()),
        maxPointsOnChart
      )) {
        resultMap.set(key, old.get(key) || []);
      }

      return resultMap;
    });
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      await loadMetrics();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const xAxisData: XAxisData<string> = {
    values: Array.from(metrics.keys()),
  };

  const podNames = new Set(
    Array.from(metrics.values())
      .flat()
      .map((m) => m.podName)
  );

  const podsMetrics = Array.from(metrics.values()).map((value) => {
    for (const podName of podNames) {
      if (!value.map((m) => m.podName).includes(podName)) {
        value.push({
          cpuUsage: 0,
          memoryUsage: 0,
          podName,
        });
      }
    }

    return value;
  });

  const grouped = Array.from(groupBy(podsMetrics.flat(), (x) => x.podName))
    .filter((x) => x[1].some((m) => m.cpuUsage > 0))
    .map((x) => {
      return {
        cpu: x[1].map((m) => m.cpuUsage),
        memory: x[1].map((m) => m.memoryUsage),
        title: x[0],
      };
    });

  const cpuSeries: ChartSerie[] = grouped.map((x) => {
    return {
      data: x.cpu,
      title: x.title,
    };
  });

  const memorySeries: ChartSerie[] = grouped.map((x) => {
    return {
      data: x.memory,
      title: x.title,
    };
  });

  return (
    <>
      <div className="w-full">
        <LineChartBox
          title="Cpu Usage [m]"
          series={cpuSeries}
          xAxis={xAxisData}
        />
      </div>
      <div className="w-full">
        <LineChartBox
          title="Memory Usage [MB]"
          series={memorySeries}
          xAxis={xAxisData}
        />
      </div>
    </>
  );
}
