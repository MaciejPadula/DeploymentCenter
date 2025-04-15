import { Chip } from "@mui/material";
import { DeploymentStatus } from "../models/deployment";

type Props = {
  status: DeploymentStatus;
};

export function HealthBadge(props: Props) {
  const getColor = (status: DeploymentStatus) => {
    switch (status) {
      case DeploymentStatus.Healthy:
        return "success";
      case DeploymentStatus.Error:
        return "error";
      case DeploymentStatus.Unknown:
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={DeploymentStatus[props.status]}
      color={getColor(props.status)}
    />
  );
}
