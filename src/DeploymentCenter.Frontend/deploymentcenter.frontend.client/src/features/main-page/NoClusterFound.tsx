import { Typography } from "@mui/material"

export function NoClusterFound() {
  return (
    <div className="text-center p-4">
      <Typography variant="h3">No cluster found</Typography>
      <Typography variant="body1">
        Please select a cluster using button in the right top corner
      </Typography>
    </div>
  );
}