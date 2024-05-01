import { Paper } from "@mui/material";

export function ResourceTypeBox(props: {
  icon: string;
  text: string;
  navigate: () => void;
}) {
  return (
    <Paper elevation={2} className="h-full cursor-pointer" onClick={props.navigate}>
      <div className="flex flex-col items-center p-4 justify-center h-full">
        <img className="w-18 h-18" src={props.icon} />
        <div className="text-lg mt-2 text-center">{props.text}</div>
      </div>
    </Paper>
  );
}
