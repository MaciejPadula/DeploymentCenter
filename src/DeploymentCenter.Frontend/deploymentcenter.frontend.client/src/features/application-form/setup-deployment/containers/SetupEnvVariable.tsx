import { TextField } from "@mui/material";
import { InputVariant } from "../../../../shared/helpers/material-config";
import { EnvironmentVariable } from "../../../deployment-page/models/environment-variable";

export function SetupEnvVariable(props: {
  environmentVariable: EnvironmentVariable;
}) {
  return (
    <div>
      <TextField
        label="Key"
        variant={InputVariant}
        defaultValue={props.environmentVariable.key}
      />

      <TextField
        label="Value"
        variant={InputVariant}
        defaultValue={props.environmentVariable.value}
      />
    </div>
  );
}
