import { Paper } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export function ResourceToolbar(props: Props) {
  return (
    <Paper className="flex flex-wrap w-full p-4 flex-row" elevation={2}>
      {props.children}
    </Paper>
  );

}