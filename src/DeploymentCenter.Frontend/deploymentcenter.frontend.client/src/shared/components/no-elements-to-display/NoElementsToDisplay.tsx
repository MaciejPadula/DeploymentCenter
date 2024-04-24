import { Typography } from "@mui/material";

export function NoElementsToDisplay() {
  return (
    <div className="flex flex-row justify-center items-center">
      <Typography variant="h6">No elements to display</Typography>
    </div>
  );
}