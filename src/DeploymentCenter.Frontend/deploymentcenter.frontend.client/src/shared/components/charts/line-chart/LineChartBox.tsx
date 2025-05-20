import { CircularProgress, Typography } from "@mui/material";
import { LineChart, LineSeriesType, ScaleName } from "@mui/x-charts";
import { ChartSerie } from "./chart-serie";
import { XAxisData } from "./x-axis-data";

type Props<T> = {
  title?: string;
  series: ChartSerie[];
  xAxis?: XAxisData<T>;
  onItemClicked?: (name: string) => void;
  height?: number;
};

export function LineChartBox<T>(props: Props<T>) {
  const height = props.height ?? 300;

  const chartData = props.series
    .map((serie) => {
      return {
        data: serie.data,
        area: serie.area ?? false,
        label: serie.title,
        curve: "linear",
      } as LineSeriesType;
    })
    .filter((x) => (x.data?.length ?? 0) > 1);

  const axisData = props.xAxis
    ? [{ data: props.xAxis.values, scaleType: "band" as ScaleName }]
    : [];

  return (props.xAxis?.values.length ?? 0) > 1 && chartData.length > 0 ? (
    <div>
      {props.title && (
        <Typography variant="h6" align="center" gutterBottom>
          {props.title}
        </Typography>
      )}
      <LineChart
        series={chartData}
        height={height}
        xAxis={axisData}
        slotProps={{
          legend: {
            position: { vertical: "top", horizontal: "right" },
            direction: "column",
            padding: 5,
            onItemClick: (_, index) => {
              props.onItemClicked?.(index.label);
            }
          },
        }}
      />
    </div>
  ) : (
    <div
      className="flex items-center justify-center w-full"
      style={{ height: `${height}px` }}
    >
      <CircularProgress size={60} />
    </div>
  );
}
