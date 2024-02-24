import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

export function ResourceTypeBox(props: { icon: string; text: string, url: string }) {
  return (
    <Link to={props.url}>
      <Paper elevation={2} className="h-full">
        <div className="flex flex-col items-center p-4">
          <img className="w-18 h-18" src={props.icon} />
          <div className="text-lg mt-2">{props.text}</div>
        </div>
      </Paper>
    </Link>
  );
}
