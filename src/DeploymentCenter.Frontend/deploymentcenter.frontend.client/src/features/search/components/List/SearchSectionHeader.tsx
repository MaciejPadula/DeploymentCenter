import { Divider, Typography } from "@mui/material";

type Props = {
  header: string;
}

export function SearchSectionHeader(props: Props) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Typography>{props.header}</Typography>
      <Divider className="w-3/4" />
    </div>
  );
}