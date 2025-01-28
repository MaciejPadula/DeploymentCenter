import { Divider, Typography } from "@mui/material";
import "./SearchSectionHeader.scss";

type Props = {
  header: string;
  divider?: boolean;
}

export function SearchSectionHeader(props: Props) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Typography className="whitespace-nowrap">{props.header}</Typography>
      { props.divider && <Divider className="w-3/5 sm:w-3/4 divider" /> }
    </div>
  );
}