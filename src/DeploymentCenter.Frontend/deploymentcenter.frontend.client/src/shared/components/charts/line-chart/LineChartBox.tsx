import { CircularProgress } from "@mui/material";
import { LineChart, LineSeriesType, ScaleName } from "@mui/x-charts";
import { ChartSerie } from "./chart-serie";
import { XAxisData } from "./x-axis-data";

export function LineChartBox<T>(props: {
  series: ChartSerie[];
  xAxis?: XAxisData<T>;
}) {
  const height = 300;

  const chartData = props.series
    .map((serie) => {
      return {
        data: serie.data,
        area: serie.area ?? false,
        label: serie.title,
      } as LineSeriesType;
    })
    .filter((x) => (x.data?.length ?? 0) > 1);

  const axisData = props.xAxis
    ? [{ data: props.xAxis.values, scaleType: 'band' as ScaleName }]
    : [];

  return chartData.length > 0 ? (
    <LineChart series={chartData} height={height} xAxis={axisData} />
  ) : (
    <div className="flex items-center justify-center w-full" style={{height: `${height}px`}}>
      <CircularProgress size={60} />
    </div>
  );
}
