import { TextField } from "@mui/material";
import { InputVariant } from "../../../../shared/helpers/material-config";

type Props = {
  address: string;
  onAddressChange: (port: string) => void;
};

export function ExternalIpDialog(props: Props) {
  return (
    <TextField
      label="Ip Address"
      variant={InputVariant}
      defaultValue={props.address}
      onChange={(e) => props.onAddressChange(e.target.value)}
    />
  );
}
