import { Typography } from "@mui/material";

export function ErrorPage(props: { text: string }) {
  return (
    <div className="flex flex-row justify-center items-center">
      <Typography variant="h6">{props.text}</Typography>
    </div>
  );
}
