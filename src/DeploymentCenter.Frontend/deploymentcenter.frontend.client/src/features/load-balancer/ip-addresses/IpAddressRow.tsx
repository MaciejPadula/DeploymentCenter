import { Chip } from "@mui/material";

export function IpAddressRow(props: { ipAddress: string }) {
  return (
    <Chip label={props.ipAddress} />
  );
}