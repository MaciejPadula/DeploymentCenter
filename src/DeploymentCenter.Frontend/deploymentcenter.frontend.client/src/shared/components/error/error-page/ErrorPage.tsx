import { Typography } from "@mui/material";

import './ErrorPage.scss';

export function ErrorPage(props: { text: string }) {
  return (
    <div className="error-page">
      <Typography className="frame" variant="h6">{props.text}</Typography>
    </div>
  );
}
