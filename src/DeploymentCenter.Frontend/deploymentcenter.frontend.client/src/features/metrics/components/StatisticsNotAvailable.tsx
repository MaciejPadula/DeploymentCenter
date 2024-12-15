import { Link } from "@mui/material";

export default function StatisticsNotAvailable() {
  return (
    <div
      className="flex items-center justify-center w-full p-24 flex-col"
    >
      <p>Install kubernetes metrics on your cluster to see statistics. </p>
      <p>
        <Link
          href={
            "https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/"
          }
          target="_blank"
        >
          Kubernetes Documentation
        </Link>
      </p>
    </div>
  );
}
