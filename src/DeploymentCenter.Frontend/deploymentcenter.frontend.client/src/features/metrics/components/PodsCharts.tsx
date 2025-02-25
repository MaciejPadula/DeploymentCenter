import { Cluster } from "../../../shared/models/cluster";
import { XAxisData } from "../../../shared/components/charts/line-chart/x-axis-data";
import { LineChartBox } from "../../../shared/components/charts/line-chart/LineChartBox";
import { ChartSerie } from "../../../shared/components/charts/line-chart/chart-serie";
import { useTimedMetrics } from "../hooks/timed-metrics-hook";
import { useMetricsQuery } from "../hooks/metrics-query-hook";

type Props = {
  cluster: Cluster;
  namespace: string;
  prefix?: string;
  filter?: string;
  onItemClicked?: (name: string) => void;
  height?: number;
};

const maxPointsOnChart = 10;

export function PodsCharts(props: Props) {
  const { timeline, metrics, addNewMetric } = useTimedMetrics({
    maxPointsOnChart,
    filter: props.filter,
  });
  useMetricsQuery({
    namespace: props.namespace,
    prefix: props.prefix,
    cluster: props.cluster,
    onNewMetric: addNewMetric,
  });

  const xAxisData: XAxisData<string> = {
    values: timeline,
  };

  const cpuSeries: ChartSerie[] = metrics.map((x) => {
    return {
      data: x.cpu,
      title: x.title,
    };
  });

  const memorySeries: ChartSerie[] = metrics.map((x) => {
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
          onItemClicked={props.onItemClicked}
          height={props.height}
        />
      </div>
      <div className="w-full">
        <LineChartBox
          title="Memory Usage [MB]"
          series={memorySeries}
          xAxis={xAxisData}
          onItemClicked={props.onItemClicked}
          height={props.height}
        />
      </div>
    </>
  );
}
