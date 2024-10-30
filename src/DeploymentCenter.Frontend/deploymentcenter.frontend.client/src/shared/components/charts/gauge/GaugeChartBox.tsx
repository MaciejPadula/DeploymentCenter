import { Gauge } from "@mui/x-charts";

type Props = {
  minValue?: number;
  value: number;
  maxValue?: number;
}

export function GargeChartBox(props: Props) {
  return <div className="w-full">
    <Gauge
      valueMin={props.minValue}
      value={props.value}
      valueMax={props.maxValue}
      startAngle={-110}
      endAngle={110}
      sx={{
        width: '100%',
        height: 300
      }}
      text={
        ({ value, valueMax }) => `${value} / ${valueMax}`
      }
    />
  </div>
}