import { Paper, Typography } from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";

export function DeploymentStatistics(props: {
  alivePods: number;
  deadPods: number;
}) {
    const cpuTreshold = 75;
    const procesorUsages = [20, 2, 100, 0, 55, 11, 100];

    const memoryTreshold = 2048;
    const memoryUsages = [5, 2, 512, 2, 2048, 2000, 1024, 5];

  return (
    <Paper className="flex flex-wrap w-full p-4 flex-col" elevation={2}>
      <Typography variant="h5">{"Pods Statistics"}</Typography>
      <div className="w-full flex flex-col sm:flex-row items-center justify-center">
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
          <LineChart
            series={[
              {
                data: procesorUsages,
                area: true,
                label: "CPU Usage [%]",
                color: procesorUsages?.some(x => x > cpuTreshold) ? "red" : "green",
              },
              {
                label: "CPU Limit [%]",
                data: memoryUsages.map(() => cpuTreshold),
                color: "blue",
                showMark: false,
              }
            ]}
            height={300}
          />
        </div>
        <div className="w-full">
          <LineChart
            series={[
              {
                data: memoryUsages,
                area: true,
                label: "Memory Usage [MB]",
                color: memoryUsages?.some(x => x > memoryTreshold) ? "red" : "green",
              },
              {
                data: memoryUsages.map(() => memoryTreshold),
                color: "blue",
                label: "Memory Limit [MB]",
                showMark: false,
                curve: 'stepBefore'
              }
            ]}
            height={300}
          />
        </div>
      </div>
    </Paper>
  );
}
